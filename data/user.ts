import { db } from "@/lib/db";
import { useSession } from "next-auth/react";

export const getUserByEmail = async (email: string) => {
  console.log("getUserByEmail called with email:", email);
  try {
    const user = await db.user.findUnique({ where: { email } });
    console.log("User found:", user);
    return user;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });

    return user;
  } catch (error) {
    return null;
  }
};

export const loggedInUser = async () => {
  const { data: session, status } = useSession();
  return session;
};
