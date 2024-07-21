import { currentUser } from "@/lib/auth";
import { db } from "@/server/db";
import {
  insertAnggotaTahsinSchema,
  type NewAnggotaTahsinParams,
  type AnggotaTahsinId,
  anggotaTahsin,
  type UpdateAnggotaTahsinParams,
} from "@/server/db/schema/tahsin";
import { eq } from "drizzle-orm";

export const createAnggotaTahsin = async (values: NewAnggotaTahsinParams) => {
  const user = await currentUser();
  if (!user || !["ADMIN", "PENGURUS"].includes(user.role)) {
    return { error: "Unauthorized" };
  }
  const newAnggotaTahsin = insertAnggotaTahsinSchema.safeParse(values);

  if (!newAnggotaTahsin.success) {
    return { error: "Data tidak valid" };
  }

  try {
    await db.insert(anggotaTahsin).values(newAnggotaTahsin.data);
    return { success: "Anggota tahsin berhasil ditambahkan" };
  } catch (error) {
    const message =
      (error as Error).message ?? "Gagal menambah data anggota tahsin";

    return { error: message };
  }
};

export const updateAnggotaTahsin = async (
  id: AnggotaTahsinId,
  values: UpdateAnggotaTahsinParams
) => {
  const user = await currentUser();
  if (!user || !["ADMIN", "PENGURUS"].includes(user.role)) {
    return { error: "Unauthorized" };
  }
  const updateAnggotaTahsin = insertAnggotaTahsinSchema.safeParse(values);

  if (!updateAnggotaTahsin.success) {
    return { error: "Data tidak valid" };
  }

  try {
    await db
      .update(anggotaTahsin)
      .set(updateAnggotaTahsin.data)
      .where(eq(anggotaTahsin.id, id));
    return;
  } catch (error) {
    const message =
      (error as Error).message ?? "Gagal mengubah data anggota tahsin";
    return { error: message };
  }
};

export const deleteAnggotaTahsin = async (id: AnggotaTahsinId) => {
  const user = await currentUser();
  if (!user || !["ADMIN", "PENGURUS"].includes(user.role)) {
    return { error: "Unauthorized" };
  }

  try {
    await db.delete(anggotaTahsin).where(eq(anggotaTahsin.id, id));
    return;
  } catch (error) {
    const message =
      (error as Error).message ?? "Gagal menghapus data anggota tahsin";
    return { error: message };
  }
};
