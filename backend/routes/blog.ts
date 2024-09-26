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

blogRouter.use("/post/*", async (c, next) => {
  try {
    const sentToken = c.req.header("authorization");

    const isValid = sentToken?.includes("Bearer") ? true : false;

    if (!isValid || !sentToken)
      return c.json({ message: "Wrong header or malformed" }, 500);

    const token = sentToken.split(" ")[1];

    if (!token) return c.json({ message: "token missing" }, 403);

    const decoded = decode(token);

    const response = await verify(token, c.env.JWT_SECRET);

    if (!response) return c.json({ message: "Invalid user!" }, 403);

    c.set("jwtPayload", decoded.payload);

    await next();
  } catch (e: any) {
    return c.json({ message: e }, 403);
  }
});

blogRouter.post("/post/create", async (c) => {
  const client = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const { title, content } = await c.req.json();

  const { id, name } = c.get("jwtPayload");

  const userExists = await client.user.findFirst({
    where: {
      id,
    },
  });

  if (!userExists) {
    return c.json({ message: "User does not exist", id }, 404);
  }

  const response = await client.posts.create({
    data: {
      title,
      content,
      authorId: id,
      publishedBy: name,
    },
  });

  return c.json({
    message: "Posted Succesfully!",
    response,
  });
});

blogRouter.get("/post/bulk", async (c) => {
  try {
    const client = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const response = await client.posts.findMany({});
    console.log(response);
    return c.json({
      blogs : response
    });
  } catch (e) {
    console.log(e);
    c.json({
      message: "Something went worng",
    });
  }
});

blogRouter.put("/post/:id", async (c) => {
  try {
    const client = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const { id } = await c.req.param();
    const { title, content } = await c.req.json();

    const update = await client.posts.update({
      where: { id },
      data: {
        title,
        content,
      },
    });

    return c.json({
      message : "Updated succesfully!",
      update
    });
  } catch (e) {
    console.log(e);
    c.json({
      message: "Something went worng",
    },500);
  }
});

blogRouter.get("/post/:id", async (c) => {
  try {
    const client = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const { id } = await c.req.param();

    const post = await client.posts.findUnique({
      where: { id },
    });

    return c.json({
      post
    });
  } catch (e) {
    console.log(e);
    c.json({
      message: "Something went worng",
    },500);
  }
});

blogRouter.delete("/post/:id", async (c) => {
  try {
    const client = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const { id } = await c.req.param();

    const post = await client.posts.delete({
      where: { id },
    });

    return c.json({
      message : "Deleted successfully!"
    });
  } catch (e) {
    console.log(e);
    c.json({
      message: "Something went worng",
    },500);
  }
});



export default blogRouter;
