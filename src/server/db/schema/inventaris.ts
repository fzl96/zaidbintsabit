import {
  timestamp,
  varchar,
  serial,
  integer,
  pgEnum,
  pgTable,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { timestamps } from "@/lib/utils";
import { z } from "zod";

export const kondisiEnum = pgEnum("kondisi", ["baik", "rusak"]);

export const kategoriInventaris = pgTable("kategori_inventaris", {
  id: serial("id").notNull().primaryKey(),
  nama: varchar("nama", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

const baseSchema = createSelectSchema(kategoriInventaris);

export const insertKategoriInventarisSchema =
  createInsertSchema(kategoriInventaris).omit(timestamps);
export const insertKategoriInventarisParams = insertKategoriInventarisSchema
  .extend({})
  .omit({ id: true });
export const updateKateogriInventarisParams = insertKategoriInventarisSchema;
export const kategoriInvetarisIdSchema = baseSchema.pick({ id: true });

export type KategoriInventaris = typeof kategoriInventaris.$inferSelect;
export type KategoriInventarisId = z.infer<
  typeof kategoriInvetarisIdSchema
>["id"];
export type NewKategoriInvetaris = z.infer<
  typeof insertKategoriInventarisSchema
>;
export type NewKategoriInventarisParams = z.infer<
  typeof insertKategoriInventarisParams
>;
export type UpdateKategoriInventarisParams = z.infer<
  typeof updateKateogriInventarisParams
>;

export const inventaris = pgTable("inventaris", {
  id: serial("id").notNull().primaryKey(),
  nama: varchar("nama", { length: 255 }).notNull(),
  jumlah: integer("jumlah").notNull(),
  satuan: varchar("satuan", { length: 255 }),
  kondisi: kondisiEnum("kondisi").notNull(),
  keterangan: varchar("keterangan", { length: 255 }),
  kategoriId: integer("kategori_id").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const inventarisRelations = relations(inventaris, ({ one }) => ({
  kategori: one(kategoriInventaris, {
    fields: [inventaris.kategoriId],
    references: [kategoriInventaris.id],
  }),
}));

const inventarisBaseSchema = createSelectSchema(inventaris);

export const insertInventarisSchema =
  createInsertSchema(inventaris).omit(timestamps);
export const insertInventarisParams = insertInventarisSchema
  .extend({
    satuan: z.string().nullish(),
    keterangan: z.string().nullish(),
  })
  .omit({ id: true });

export const updateInventarisParams = insertInventarisSchema;

const inventarisIdSchema = inventarisBaseSchema.pick({ id: true });

export type Inventaris = typeof inventaris.$inferSelect;
export type InventarisId = z.infer<typeof inventarisIdSchema>["id"];
export type NewInventaris = z.infer<typeof insertInventarisSchema>;
export type NewInventarisParams = z.infer<typeof insertInventarisParams>;
export type UpdateInventarisParams = z.infer<typeof updateInventarisParams>;
