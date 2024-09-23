import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, decode, verify } from "hono/jwt";

const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

blogRouter.use("/blog/*", async (c, next) => {
  try {
    const sentToken = c.req.header("authorization");

    // console.log(sentToken?.split(" ")[1]);
    

    const isValid = sentToken?.includes("Bearer") ? true : false;

    if (!isValid || !sentToken)
      return c.json({ message: "Wrong header or malformed" }, 500);

    const token = sentToken.split(" ")[1];

    if (!token) return c.json({ message: "token missing" }, 403);

    const decoded = decode(token);

    c.set("jwtPayload", decoded.payload);

    const response = await verify(token, c.env.JWT_SECRET);

    await next();
  } catch (e: any) {
    return c.json({ message: e }, 403);
  }
});

blogRouter.post("/blog/create", async (c) => {
  const client = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const { title, content } = await c.req.json();

  const { id,name } = c.get("jwtPayload");


  const userExists = await client.user.findFirst({
    where: { 
      id
     },
  });
  

  if (!userExists) {
    return c.json({ message: "User does not exist" , id}, 404);
  }

  const response = await client.posts.create({
    data : {
      title,
      content,
      authorId : id,
      publishedBy : name
    }

  })

  return c.json({
    message: "Posted Succesfully!",
    response
  });
});

export default blogRouter;
