"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/lib/db";
import { supabaseAdmin } from "@/lib/supabase";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validationFields = RegisterSchema.safeParse(values);

  if (!validationFields.success) {
    return { error: "Invalid Fields!" };
  }

  const { name, email, password } = validationFields.data;

  const hashPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('users')
      .insert([{
        name,
        email,
        password: hashPassword,
        role: "BUYER",
      }])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating user:', error);
      return { error: "Failed to create user!" };
    }
    
    console.log('User created successfully:', data);
  } catch (error) {
    console.error('Error in user creation:', error);
    return { error: "Failed to create user!" };
  }

  return { success: "User Created!" };
};
