import { timestamp, pgEnum, pgTable, text } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { z } from "zod";

export const roleEnum = pgEnum("role", ["ADMIN", "PENGURUS", "USER"]);

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name"),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: roleEnum("role").default("PENGURUS").notNull(),
});

export const updateUserNameParams = z.object({
  name: z.string().min(3).max(50),
});
export const updatePasswordParams = z.object({
  currentPassword: z.string(),
  newPassword: z.string().min(6).max(255),
  confirmPassword: z.string().min(6).max(255),
});
export type UpdateUserNameParams = z.infer<typeof updateUserNameParams>;
export type UpdatePasswordParams = z.infer<typeof updatePasswordParams>;
