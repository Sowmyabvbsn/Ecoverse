import { db } from "@/lib/db";
import { useSession } from "next-auth/react";

export const getUserByEmail = async (email: string) => {
  console.log({ email });

  try {
    console.log("AAA");
    const user = await db.user.findUnique({ where: { email } });
    return user;
  } catch (error) {
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
