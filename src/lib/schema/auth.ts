import * as z from "zod";

export const SigninSchema = z.object({
  username: z.string().min(1, {
    message: "Username tidak boleh kosong",
  }),
  password: z.string().min(1, {
    message: "Password tidak boleh kosong",
  }),
});

export const SignupSchema = z.object({
  username: z.string().min(4, {
    message: "Username minimal 4 karakter",
  }),
  password: z.string().min(4, {
    message: "Password minimal 4 karakter",
  }),
  name: z.string().min(4, {
    message: "Nama minimal 4 karakter",
  }),
});

export const NewPasswordSchema = z.object({
  newPassword: z.string().min(4, {
    message: "Password minimal 4 karakter",
  }),
  confirmPassword: z.string().min(4, {
    message: "Konfirmasi password minimal 4 karakter",
  }),
});
