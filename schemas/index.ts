import { passwordMatchSchema } from "@/validation/passwordMatchSchema";
import { passwordSchema } from "@/validation/passwordSchema";
import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: passwordSchema,
});

export const RegisterSchema = z
  .object({
    name: z.string({ required_error: "Name is required" }),
    email: z.string().email(),
  })
  .and(passwordMatchSchema);
