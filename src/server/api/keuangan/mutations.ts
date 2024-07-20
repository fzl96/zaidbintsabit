import { currentUser } from "@/lib/auth";
import { db } from "@/server/db";
import { Keuangan, KeuanganId, keuangan } from "@/server/db/schema/keuangan";
import {
  type NewKeuanganParams,
  insertFinanceSchema,
  type UpdateKeuanganParams,
} from "@/server/db/schema/keuangan";
import { eq } from "drizzle-orm";

export const createKeuangan = async (values: NewKeuanganParams) => {
  const user = await currentUser();
  if (!user || user?.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }
  const newKeuangan = insertFinanceSchema.safeParse(values);

  if (!newKeuangan.success) {
    return { error: "Data tidak valid" };
  }

  try {
    await db.insert(keuangan).values(newKeuangan.data);
    return { success: "Kategori berhasil dibuat" };
  } catch (error) {
    const message = (error as Error).message ?? "Gagal menambah data keuangan";

    return { error: message };
  }
};

export const updateKeuangan = async (
  id: KeuanganId,
  values: UpdateKeuanganParams
) => {
  const user = await currentUser();
  if (!user || user?.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }
  const updateKeuangan = insertFinanceSchema.safeParse(values);

  if (!updateKeuangan.success) {
    return { error: "Data tidak valid" };
  }

  const { jumlah, tipe, keterangan } = updateKeuangan.data;

  try {
    await db
      .update(keuangan)
      .set({
        jumlah,
        tipe,
        keterangan,
      })
      .where(eq(keuangan.id, id));
    return;
  } catch (e) {
    const message = (e as Error).message ?? "Gagal mengubah data keuangan";
    if (message.includes("duplicate key value")) {
      return { error: "Category already exists" };
    }
    return { error: "Gagal mengubah data keuangan" };
  }
};

export const deleteKeuangan = async (id: KeuanganId) => {
  const user = await currentUser();
  if (!user || user?.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  try {
    await db.delete(keuangan).where(eq(keuangan.id, id));
    return;
  } catch (e) {
    const message = (e as Error).message ?? "Gagal mengubah data keuangan";
    return { error: message };
  }
};
