import { z } from "zod";

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type signinBody = z.infer<typeof signinSchema>



export const signupSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export type signupBody = z.infer<typeof signupSchema>