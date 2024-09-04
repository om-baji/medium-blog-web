import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Jwt } from "hono/utils/jwt";
import { z } from "zod";

const app = new Hono<{
  Bindings : {
    DATABASE_URL : string
    JWT_SECRET : string
  }
}>();

app.get("/api/v1/signin", async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const signInBody = z.object({
    email : z.string().email(),
    password : z.string().min(6)
  })

  const { success } = signInBody.safeParse(body);
  
  if (!success) {
    return c.json({ message : "Invalid inputs!"});
  }

  try {
      const user = await prisma.user.findUnique({
        where : {
          email : body.email,
        }
      })

      if (!user) {
        return c.json({ message : "User not found!"})
      }

      const token = await Jwt.sign({ id : user.id} , c.env.JWT_SECRET)
      return c.json({token});


  } catch (e : any) {
      return c.json({ message : e.message})
  }

});

app.post("/api/v1/signup", async (c) => {

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const signUpBody = z.object({
        name : z.string(),
        email : z.string().email(),
        password : z.string().min(6)
    })

    const { success } = signUpBody.safeParse(body);

    if (!success) {
        return c.json({ message : "Invalid inputs!"});
    }

    try {
      const user = await prisma.user.create({
        data : {
          name : body.name,
          email : body.email,
          password : body.password
        }
      })

      const token = await Jwt.sign({ id : user.id }, c.env.JWT_SECRET);

      return c.json({ message : `User created successfully!\n ${token}`});

    } catch (e : any ) {
        return c.json({ message : e.message });
    }
    
});

app.post("/api/v1/blog", (c) => {
  return c.text("blog page!");
});

app.get("/api/v1/blog/:id", (c) => {
  return c.text("blog page!");
});

app.put("/api/v1/blog", (c) => {
  return c.text("blog update page!");
});

export default app;
