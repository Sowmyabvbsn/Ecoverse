import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Extend the global object to hold a Prisma client instance in non-production environments.
declare global {
  var prismaGlobal: PrismaClient | undefined; // Define the type for the global variable.
}

// Create a Prisma client instance.
const prisma =
  process.env.NODE_ENV === "production"
    ? prismaClientSingleton() // In production, create a new instance.
    : global.prismaGlobal ?? prismaClientSingleton(); // In development, use a global instance if it exists, otherwise create a new one.

// Assign the Prisma client to the global variable in development to prevent multiple instances.
if (process.env.NODE_ENV !== "production") global.prismaGlobal = prisma;

export default prisma;
