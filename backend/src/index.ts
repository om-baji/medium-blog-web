import { Hono } from "hono";
import dotenv from "dotenv";
import userRouter from "../routes/user";
import blogRouter from "../routes/blog";
import { cors } from 'hono/cors'

dotenv.config();



const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.use('/*', cors())



app.route("/api/v1/user",userRouter)
app.route("/api/v1/blog", blogRouter)


export default app;
