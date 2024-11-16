import { db } from "@/lib/db";

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
    return error;
  }
};

export const getUserRoleByID = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });

    return user?.role;
  } catch (error) {
    return error;
  }
};
