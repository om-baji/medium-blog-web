import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { hash,compare } from "bcryptjs";
import { sign } from "hono/jwt";
import { signupSchema,signinSchema } from "@ombaji124/common";

const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signin", async (c) => {

  try {
    const { email, password } = await c.req.json();

    const { success } = signinSchema.safeParse({email,password})

    if(!success) return c.json({ message : "Invalid inputs!"},403)

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });

    if (!user) return c.json({ message: "User doesnot exist" }, 403);

    const isValid = await compare(password, user.password);

    if (!isValid) return c.json({ message: "Wrong password" }, 403);

    const jwt = await sign(
      { id: user.id, name: user.name, email: user.email },
      c.env.JWT_SECRET
    );

    return c.json({
      token: jwt,
    });
  } catch (e) {
    console.log("Error during sign-in:", e);
    return c.json({ message: "Internal Server Error" }, 500);
  }
});



userRouter.post("/signup", async (c) => {
  try {
    const { name, email, password } = await c.req.json();

    // console.log(name,email,password)

    const { success,error } = signupSchema.safeParse({name,email,password})

    if(!success) return c.json({ message : "Invalid inputs!", error}, 403)

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const isExist = await prisma.user.findUnique({
      where : { email }
    })

    if(isExist) return c.json({ message : "User already exists"}, 403)

    const hashPass = await hash(password,10)

    const response = await prisma.user.create({
      data: {
        name,
        email,
        password : hashPass,
      },
    });

    const token = await sign(
      { id: response.id, name: name, email: email },
      c.env.JWT_SECRET
    );

    return c.json({
      message: "User created succesfully!",
      token,
    });
  } catch (e: any) {
    const data = await c.req.json()
    console.log('Received data:', { data });
    console.log("Error during sign-up:\n", e);
    return c.json({ message: "Internal Server Error" }, 500);
  }
});

export default userRouter;
