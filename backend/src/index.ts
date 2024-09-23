import { Hono } from "hono";
import dotenv from "dotenv";
import userRouter from "../routes/user";
import blogRouter from "../routes/blog";

dotenv.config();

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();



app.route("/api/v1/user",userRouter)
app.route("/api/v1/book", blogRouter)


export default app;
