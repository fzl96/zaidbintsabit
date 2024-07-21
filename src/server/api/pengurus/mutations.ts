import { currentUser } from "@/lib/auth";
import { db } from "@/server/db";
import {
  PengurusId,
  pengurusMasjid,
  type NewPengurusParams,
  insertPengurusSchema,
  type UpdatePengurusParams,
} from "@/server/db/schema/pengurus";
import { eq } from "drizzle-orm";

export const createPengurus = async (values: NewPengurusParams) => {
  const user = await currentUser();
  if (!user || !["ADMIN", "PENGURUS"].includes(user.role)) {
    return { error: "Unauthorized" };
  }
  const newPengurus = insertPengurusSchema.safeParse(values);

  if (!newPengurus.success) {
    return { error: "Data tidak valid" };
  }

  try {
    await db.insert(pengurusMasjid).values(newPengurus.data);
    return { success: "Kategori berhasil dibuat" };
  } catch (error) {
    const message = (error as Error).message ?? "Gagal menambah data keuangan";

    return { error: message };
  }
};

export const updatePengurus = async (
  id: PengurusId,
  values: UpdatePengurusParams
) => {
  const user = await currentUser();
  if (!user || !["ADMIN", "PENGURUS"].includes(user.role)) {
    return { error: "Unauthorized" };
  }
  const updatePengurus = insertPengurusSchema.safeParse(values);

  if (!updatePengurus.success) {
    return { error: "Data tidak valid" };
  }

  const { nama, noHp, foto, status } = updatePengurus.data;

  try {
    await db
      .update(pengurusMasjid)
      .set({
        nama,
        noHp,
        foto,
        status,
      })
      .where(eq(pengurusMasjid.id, id));
    return;
  } catch (e) {
    const message = (e as Error).message ?? "Gagal mengubah data keuangan";
    if (message.includes("duplicate key value")) {
      return { error: "Category already exists" };
    }
    return { error: "Gagal mengubah data keuangan" };
  }
};

export const deletePengurus = async (id: PengurusId) => {
  const user = await currentUser();

  if (!user || !["ADMIN", "PENGURUS"].includes(user.role)) {
    return { error: "Unauthorized" };
  }

  try {
    await db.delete(pengurusMasjid).where(eq(pengurusMasjid.id, id));
    return;
  } catch (e) {
    const message = (e as Error).message ?? "Gagal mengubah data keuangan";
    return { error: message };
  }
};
