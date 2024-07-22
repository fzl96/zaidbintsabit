import {
  timestamp,
  varchar,
  serial,
  pgEnum,
  pgTable,
  integer,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { timestamps } from "@/lib/utils";
import { z } from "zod";

export const zakat = pgTable("zakat", {
  id: serial("id").notNull().primaryKey(),
  namaKK: varchar("nama_kk").notNull(),
  jumlahKeluarga: integer("jumlah_keluarga").notNull(),
  hargaBeras: integer("harga_beras").notNull(),
  orangB: integer("jumlah_orang_beras").notNull(),
  liter: integer("jumlah_liter").notNull(),
  orangU: integer("jumlah_orang_uang").notNull(),
  rupiah: integer("jumlah_rupiah").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const mutateSchema = createInsertSchema(zakat)
  .extend({
    id: z.number().optional(),
    jumlahKeluarga: z.coerce.number(),
    hargaBeras: z.coerce.number(),
    orangB: z.coerce.number(),
    liter: z.coerce.number(),
    orangU: z.coerce.number(),
    rupiah: z.coerce.number(),
  })
  .omit(timestamps);

export type Zakat = typeof zakat.$inferSelect;
export type ZakatId = number;
export type ZakatParams = z.infer<typeof mutateSchema>;
