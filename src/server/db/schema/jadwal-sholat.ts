import {
  timestamp,
  varchar,
  serial,
  integer,
  pgEnum,
  pgTable,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { timestamps } from "@/lib/utils";
import { z } from "zod";

export const jenisJadwalSholatEnum = pgEnum("jenis_jadwal_sholat", [
  "wajib",
  "jumat",
  "tarawih",
  "fitri",
  "adha",
]);

export const jadwalSholat = pgTable("jadwal_sholat", {
  id: serial("id").notNull().primaryKey(),
  nama: varchar("nama", { length: 255 }).notNull(),
  jenisJadwalSholat: jenisJadwalSholatEnum("jenis_jadwal_sholat").notNull(),
  imam: varchar("imam", { length: 255 }),
  tanggal: timestamp("tanggal").notNull().defaultNow(),
  judul: varchar("judul", { length: 255 }),
  khatib: varchar("khatib", { length: 255 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

const baseSchema = createSelectSchema(jadwalSholat);
export const insertJadwalSholatSchema =
  createInsertSchema(jadwalSholat).omit(timestamps);
export const updateJadwalSholatSchema = baseSchema.omit(timestamps);
export const updateJadwalSholatParams = insertJadwalSholatSchema.extend({});
export const jadwalSholatIdSchema = baseSchema.pick({ id: true });

export type JadwalSholat = typeof jadwalSholat.$inferSelect;
export type UpdateJadwalSholatParams = z.infer<typeof updateJadwalSholatParams>;
export type JadwalSholatId = z.infer<typeof jadwalSholatIdSchema>["id"];