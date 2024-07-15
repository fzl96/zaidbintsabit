"use server";

import { z } from "zod";
import { SigninSchema } from "@/lib/schema/auth";
import { signIn as login } from "@/auth";
import { AuthError } from "next-auth";

export async function signIn(values: z.infer<typeof SigninSchema>) {
  const validateFields = SigninSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid Fields" };
  }

  const { username, password } = validateFields.data;

  try {
    await login("credentials", {
      username,
      password,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      console.log("error : ", error);
      switch (error.type) {
        case "CredentialsSignin":
          return { error: error.message };
        default:
          return { error: "Terjadi kesalahan" };
      }
    }
    throw error;
  }
}
