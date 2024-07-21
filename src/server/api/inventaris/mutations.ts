import { currentUser } from "@/lib/auth";
import { db } from "@/server/db";
import { UpdateSet, eq } from "drizzle-orm";
import {
  inventaris,
  kategoriInventaris,
  type NewInventarisParams,
  type NewKategoriInventarisParams,
  insertInventarisSchema,
  insertKategoriInventarisSchema,
  type UpdateInventarisParams,
  type UpdateKategoriInventarisParams,
  InventarisId,
  KategoriInventarisId,
} from "@/server/db/schema/inventaris";

export const createInventaris = async (values: NewInventarisParams) => {
  const user = await currentUser();
  if (!user || !["ADMIN", "PENGURUS"].includes(user.role)) {
    return { error: "Unauthorized" };
  }
  const newInventaris = insertInventarisSchema.safeParse(values);

  if (!newInventaris.success) {
    return { error: "Data tidak valid" };
  }

  try {
    await db.insert(inventaris).values(newInventaris.data);
    return { success: "Inventaris berhasil ditambahkan" };
  } catch (err) {
    const message =
      (err as Error).message ?? "Gagal menambahkan data inventaris";

    return { error: message };
  }
};

export const updateInventaris = async (
  id: InventarisId,
  values: UpdateInventarisParams
) => {
  const user = await currentUser();
  if (!user || !["ADMIN", "PENGURUS"].includes(user.role)) {
    return { error: "Unauthorized" };
  }
  const updatedInventaris = insertInventarisSchema.safeParse(values);

  if (!updatedInventaris.success) {
    return { error: "Data tidak valid" };
  }

  try {
    await db
      .update(inventaris)
      .set(updatedInventaris.data)
      .where(eq(inventaris.id, id));
    return;
  } catch (err) {
    const message = (err as Error).message ?? "Gagal mengubah data inventaris";
    return { error: message };
  }
};

export const deleteInventaris = async (id: InventarisId) => {
  const user = await currentUser();
  if (!user || !["ADMIN", "PENGURUS"].includes(user.role)) {
    return { error: "Unauthorized" };
  }

  try {
    await db.delete(inventaris).where(eq(inventaris.id, id));
    return;
  } catch (err) {
    const message = (err as Error).message ?? "Gagal menghapus data inventaris";
    return { error: message };
  }
};

export const createKategoriInventaris = async (
  values: NewKategoriInventarisParams
) => {
  const user = await currentUser();
  if (!user || !["ADMIN", "PENGURUS"].includes(user.role)) {
    return { error: "Unauthorized" };
  }
  const newKategoriInventaris =
    insertKategoriInventarisSchema.safeParse(values);

  if (!newKategoriInventaris.success) {
    return { error: "Data tidak valid" };
  }

  try {
    await db.insert(kategoriInventaris).values(newKategoriInventaris.data);
    return { success: "Berhasil menambahkan kategori inventaris baru" };
  } catch (err) {
    const message =
      (err as Error).message ?? "Gagal menambahkan data kategori inventaris";

    return { error: message };
  }
};

export const updateKategoriInventaris = async (
  id: KategoriInventarisId,
  values: UpdateKategoriInventarisParams
) => {
  const user = await currentUser();
  if (!user || !["ADMIN", "PENGURUS"].includes(user.role)) {
    return { error: "Unauthorized" };
  }
  const updatedKategoriInventaris =
    insertKategoriInventarisSchema.safeParse(values);

  if (!updatedKategoriInventaris.success) {
    return { error: "Data tidak valid" };
  }

  try {
    await db
      .update(kategoriInventaris)
      .set(updatedKategoriInventaris.data)
      .where(eq(kategoriInventaris.id, id));
    return;
  } catch (err) {
    const message =
      (err as Error).message ?? "Gagal mengubah data kategori inventaris";

    return { error: message };
  }
};

export const deleteKategoriInvnetaris = async (id: KategoriInventarisId) => {
  const user = await currentUser();
  if (!user || !["ADMIN", "PENGURUS"].includes(user.role)) {
    return { error: "Unauthorized" };
  }

  try {
    await db.delete(kategoriInventaris).where(eq(kategoriInventaris.id, id));
    return;
  } catch (err) {
    const message =
      (err as Error).message ?? "Gagal menghapus data kategori inventaris";

    return { error: message };
  }
};
