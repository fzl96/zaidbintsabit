import { timestamp, varchar, serial, pgTable } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { timestamps } from "@/lib/utils";
import { z } from "zod";

export const anggotaTahsin = pgTable("anggota_tahsin", {
  id: serial("id").notNull().primaryKey(),
  nama: varchar("nama", { length: 255 }).notNull(),
  alamat: varchar("alamat", { length: 255 }),
  noHp: varchar("no_hp", { length: 255 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

const baseSchema = createSelectSchema(anggotaTahsin);

export const insertAnggotaTahsinSchema =
  createInsertSchema(anggotaTahsin).omit(timestamps);
export const insertAnggotaTahsinParams = insertAnggotaTahsinSchema
  .extend({
    nama: z.string().min(1, { message: "Nama harus diisi" }),
    alamat: z.string().nullish(),
    noHp: z.string().nullish(),
  })
  .omit({ id: true });
export const updateAnggotaTahsinParams = insertAnggotaTahsinSchema;
export const anggotaTahsinIdSchema = baseSchema.pick({ id: true });

export type AnggotaTahsin = typeof anggotaTahsin.$inferSelect;
export type AnggotaTahsinId = z.infer<typeof anggotaTahsinIdSchema>["id"];
export type NewAnggotaTahsin = z.infer<typeof insertAnggotaTahsinSchema>;
export type NewAnggotaTahsinParams = z.infer<typeof insertAnggotaTahsinParams>;
export type UpdateAnggotaTahsinParams = z.infer<
  typeof updateAnggotaTahsinParams
>;

export const jadwalTahsin = pgTable("jadwal_tahsin", {
  id: serial("id").notNull().primaryKey(),
  namaUstadz: varchar("nama_ustadz", { length: 255 }).notNull(),
  tanggal: timestamp("tanggal_tahsin").notNull(),
  catatan: varchar("catatan", { length: 255 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const jadwalTahsinBaseSchema = createSelectSchema(jadwalTahsin);

export const insertJadwalTahsinSchema =
  createInsertSchema(jadwalTahsin).omit(timestamps);
export const insertJadwalTahsinParams = insertJadwalTahsinSchema
  .extend({
    namaUstadz: z.string().min(1, { message: "Nama Ustadz harus diisi" }),
    catatan: z.string().nullish(),
  })
  .omit({ id: true });
export const updateJadwalTahsinParams = insertJadwalTahsinSchema;
export const jadwalTahsinIdSchema = jadwalTahsinBaseSchema.pick({ id: true });

export type JadwalTahsin = typeof jadwalTahsin.$inferSelect;
export type JadwalTahsinId = z.infer<typeof jadwalTahsinIdSchema>["id"];
export type NewJadwalTahsin = z.infer<typeof insertJadwalTahsinSchema>;
export type NewJadwalTahsinParams = z.infer<typeof insertJadwalTahsinParams>;
export type UpdateJadwalTahsinParams = z.infer<typeof updateJadwalTahsinParams>;
