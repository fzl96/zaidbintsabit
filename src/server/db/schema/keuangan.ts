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

export const typeEnum = pgEnum("tipe_keuangan", ["pemasukan", "pengeluaran"]);
export const categoryEnum = pgEnum("kategori_keuangan", [
  "infaq",
  "yatim",
  "ramadhan",
]);

export const keuangan = pgTable("keuangan", {
  id: serial("id").notNull().primaryKey(),
  jumlah: integer("jumlah").notNull(),
  keterangan: varchar("keterangan", { length: 255 }),
  tipe: typeEnum("tipe").notNull(),
  kategori: categoryEnum("kategori").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

const baseSchema = createSelectSchema(keuangan);

export const insertFinanceSchema =
  createInsertSchema(keuangan).omit(timestamps);
export const insertFinanceParams = insertFinanceSchema
  .extend({
    jumlah: z.coerce.number().min(1, {
      message: "Jumlah minimal adalah 1",
    }),
    keterangan: z.string().nullish(),
  })
  .omit({
    id: true,
  });
export const updateFinanceSchema = baseSchema;
export const updateFinanceParams = insertFinanceSchema;
export const keuanganIdScehma = baseSchema.pick({ id: true });

export type Keuangan = typeof keuangan.$inferSelect;
export type NewKeuangan = z.infer<typeof insertFinanceSchema>;
export type NewKeuanganParams = z.infer<typeof insertFinanceParams>;
export type UpdateKeuanganParams = z.infer<typeof updateFinanceParams>;
export type KeuanganId = z.infer<typeof keuanganIdScehma>["id"];
