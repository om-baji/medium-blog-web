import { z } from "zod";

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type signinBody = z.infer<typeof signinSchema>

export const signupSchema = z.object({
  name: z.string().min(1,{ message : "Required field"}),
  email: z.string().email(),
  password: z.string(),
});

export type signupBody = z.infer<typeof signupSchema>

export const blogInputs = z.object({
  title : z.string().min(1,{ message : "Required Field"}),
  content : z.string().min(1,{ message : "Required Field"}) 
})

export type blogTypes = z.infer<typeof blogInputs>