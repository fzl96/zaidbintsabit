import {
  timestamp,
  varchar,
  serial,
  pgEnum,
  pgTable,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { timestamps } from "@/lib/utils";
import { z } from "zod";

export const statusPengurusEnum = pgEnum("status_pengurus", [
  "imam",
  "muadzin",
]);

export const pengurusMasjid = pgTable("pengurus", {
  id: serial("id").notNull().primaryKey(),
  nama: varchar("nama").notNull(),
  noHp: varchar("no_hp"),
  foto: varchar("foto"),
  status: statusPengurusEnum("status").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

const baseSchema = createSelectSchema(pengurusMasjid);

export const insertPengurusSchema =
  createInsertSchema(pengurusMasjid).omit(timestamps);
export const insertPengurusParams = insertPengurusSchema
  .extend({
    nama: z.string().min(2, { message: "Nama minimal 2 karakter" }),
    noHp: z.string().nullish(),
    foto: z.string().nullish(),
  })
  .omit({
    id: true,
  });
export const updatePengurusSchema = baseSchema;
export const updatePengurusParams = insertPengurusSchema;
export const pengurusIdScehma = baseSchema.pick({ id: true });

export type Pengurus = typeof pengurusMasjid.$inferSelect;
export type NewPengurus = z.infer<typeof insertPengurusSchema>;
export type NewPengurusParams = z.infer<typeof insertPengurusParams>;
export type UpdatePengurusParams = z.infer<typeof updatePengurusParams>;
export type PengurusId = z.infer<typeof pengurusIdScehma>["id"];
