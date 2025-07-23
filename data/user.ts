import { getUserByEmail, getUserById } from "@/lib/db";

export { getUserByEmail, getUserById };

export const getUserRoleByID = async (id: string) => {
  try {
    const user = await getUserById(id);
    return user?.role;
  } catch (error) {
    console.error('Error fetching user role:', error);
    return null;
  }
};