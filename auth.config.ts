import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { getUserByEmail, getUserById } from "./data/user";
import { LoginSchema } from "./schemas";

export default {
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const userId = token.sub as string;
        const userData = await getUserById(userId);
        token.role = userData?.role;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub || ""; // Add user ID to the session
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        console.log('Attempting to authorize with credentials:', { email: credentials?.email });
        
        const validateFields = LoginSchema.safeParse(credentials);

        if (validateFields.success) {
          const { email, password } = validateFields.data;

          const user = await getUserByEmail(email);
          console.log('User found:', user ? 'Yes' : 'No');
          
          if (!user || !user.password) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);
          console.log('Password match:', passwordMatch);
          
          if (passwordMatch) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
