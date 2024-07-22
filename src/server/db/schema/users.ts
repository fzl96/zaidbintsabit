import { timestamp, pgEnum, pgTable, text } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { z } from "zod";
import { createSelectSchema, createInsertSchema } from "drizzle-zod";

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

export const akunSchema = z.object({
  id: z.string().optional(),
  name: z.string().nullish(),
  username: z.string().min(4, { message: "Username minimal 4 karakter" }),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
  role: z.enum(["ADMIN", "PENGURUS", "USER"]),
});

export type User = {
  id: string;
  name: string | null;
  username: string;
  role: "ADMIN" | "PENGURUS" | "USER";
};
export type AkunParams = z.infer<typeof akunSchema>;
