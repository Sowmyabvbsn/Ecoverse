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

export const productSchema = z.object({
  sellerId: z
    .string()
    .uuid({ message: "Seller ID must be a valid UUID string" })
    .optional(),
  title: z.string().min(1, "Product title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.array(
    z.string({ message: "At least one category must be selected" })
  ),
  images: z.array(z.instanceof(File)).min(1, "At least one image is required"),
  price: z.number().min(1, "Price must be at least 1"),
  stocks: z.number().min(1, "Stocks must be at least 1"),
});
