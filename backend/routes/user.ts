import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
// import bcrypt from "bcrypt";
import { sign } from "hono/jwt";

const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.get("/signin", async (c) => {
  try {
    const { email, password } = await c.req.json();

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

    // const hash = await bcrypt.compare(password, user.password);

    // if (!hash) return c.json({ message: "Wrong password" }, 403);

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

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    // const hashPass = await bcrypt.hash(password, 10);

    const response = await prisma.user.create({
      data: {
        name,
        email,
        password,
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
    console.log("Error during sign-up:", e);
    return c.json({ message: "Internal Server Error" }, 500);
  }
});

export default userRouter;
