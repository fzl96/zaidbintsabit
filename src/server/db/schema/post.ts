import {
  timestamp,
  varchar,
  serial,
  pgEnum,
  pgTable,
  text,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { timestamps } from "@/lib/utils";
import { z } from "zod";
import { createId } from "@paralleldrive/cuid2";

export const postCategoryEnum = pgEnum("post_category", [
  "aktivitas",
  "pengumuman",
  "artikel",
  "kajian",
]);

export const posts = pgTable("post", {
  id: varchar("id", { length: 100 })
    .primaryKey()
    .$defaultFn(() => createId()),
  judul: varchar("judul", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  thumbnail: varchar("thumbnail", { length: 255 }),
  tanggal: timestamp("tanggal").notNull().defaultNow(),
  konten: text("konten").notNull(),
  kategori: postCategoryEnum("kategori").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

const baseSchema = createSelectSchema(posts).omit(timestamps);

export const insertPostSchema = createInsertSchema(posts).omit({
  createdAt: true,
  updatedAt: true,
  slug: true,
});
export const insertPostParams = insertPostSchema
  .extend({
    judul: z.string().min(1, { message: "Judul minimal 1 karakter" }),
    slug: z.string().min(1, { message: "Slug minimal 1 karakter" }),
    konten: z.string().min(1, { message: "Konten minimal 1 karakter" }),
  })
  .omit({
    id: true,
    slug: true,
  });

export const updatePostSchema = baseSchema;
export const updatePostParams = insertPostSchema.omit({});

export const postIdScehma = baseSchema.pick({ id: true });

export type Post = typeof posts.$inferSelect;
export type NewPost = z.infer<typeof insertPostSchema>;
export type NewPostParams = z.infer<typeof insertPostParams>;
export type UpdatePostParams = z.infer<typeof updatePostParams>;
export type PostId = z.infer<typeof postIdScehma>["id"];
