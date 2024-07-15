import NextAuth, { type DefaultSession } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import authConfig from "./auth.config";

import { db } from "@/server/db";

declare module "next-auth" {
  interface Session {
    user: {
      role: "ADMIN" | "PENGURUS" | "USER";
      username: string;
    } & DefaultSession["user"];
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: DrizzleAdapter(db),
  ...authConfig,
});
