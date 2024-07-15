import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { CredentialsSignin } from "next-auth";

import { SigninSchema } from "@/lib/schema/auth";
import { getUserByUsername, getUserById } from "./server/api/user/queries";

import bcrypt from "bcryptjs";

class InvalidCredentials extends CredentialsSignin {
  code = "custom";
  message = "Username atau password salah";
}

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validateFields = SigninSchema.safeParse(credentials);

        if (!validateFields.success) {
          return null;
        }

        const { username, password } = validateFields.data;
        const user = await getUserByUsername(username);

        if (!user) throw new InvalidCredentials();

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) throw new InvalidCredentials();

        return {
          username: user.username,
          name: user.name,
          role: user.role,
          id: user.id,
        };
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user;
      }

      if (token.role && session.user) {
        session.user.role = token.role as "ADMIN" | "PENGURUS" | "USER";
      }

      if (token.username && session.user) {
        session.user.username = token.username as string;
      }

      if (session.user) {
        session.user.name = token.name;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.id = existingUser.id;
      token.name = existingUser.name;
      token.username = existingUser.username;
      token.role = existingUser.role;

      return token;
    },
  },
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;
