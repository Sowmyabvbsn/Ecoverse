import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import prisma from "./lib/prisma";
import * as bcrypt from "bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (!user) throw new Error("Email or password is not correct");

        // const isPasswordCorrect = credentials.password === user.password;

        if (!credentials.password)
          throw new Error("Please provide your password");

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );
      },
    }),
  ],
});
