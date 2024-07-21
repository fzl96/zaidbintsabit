import { currentUser } from "@/lib/auth";
import { db } from "@/server/db";
import {
  insertJadwalTahsinSchema,
  type NewJadwalTahsinParams,
  type JadwalTahsinId,
  jadwalTahsin,
  type UpdateJadwalTahsinParams,
} from "@/server/db/schema/tahsin";
import { eq } from "drizzle-orm";

export const createJadwalTahsin = async (values: NewJadwalTahsinParams) => {
  const user = await currentUser();
  if (!user || !["ADMIN", "PENGURUS"].includes(user.role)) {
    return { error: "Unauthorized" };
  }
  const newJadwalTahsin = insertJadwalTahsinSchema.safeParse(values);

  if (!newJadwalTahsin.success) {
    return { error: "Data tidak valid" };
  }

  try {
    await db.insert(jadwalTahsin).values(newJadwalTahsin.data);
    return { success: "Jadwal tahsin berhasil dibuat" };
  } catch (error) {
    const message =
      (error as Error).message ?? "Gagal menambah data jadwal tahsin";

    return { error: message };
  }
};

export const updateJadwalTahsin = async (
  id: JadwalTahsinId,
  values: UpdateJadwalTahsinParams
) => {
  const user = await currentUser();
  if (!user || !["ADMIN", "PENGURUS"].includes(user.role)) {
    return { error: "Unauthorized" };
  }
  const updateJadwalTahsin = insertJadwalTahsinSchema.safeParse(values);

  if (!updateJadwalTahsin.success) {
    return { error: "Data tidak valid" };
  }

  const { namaUstadz, tanggal, catatan } = updateJadwalTahsin.data;

  try {
    await db
      .update(jadwalTahsin)
      .set({
        namaUstadz,
        tanggal,
        catatan,
      })
      .where(eq(jadwalTahsin.id, id));
    return;
  } catch (e) {
    const message = (e as Error).message ?? "Gagal mengubah data jadwal tahsin";
    if (message.includes("duplicate key value")) {
      return { error: "Jadwal tahsin already exists" };
    }
    return { error: "Gagal mengubah data jadwal tahsin" };
  }
};

export const deleteJadwalTahsin = async (id: JadwalTahsinId) => {
  const user = await currentUser();

  if (!user || !["ADMIN", "PENGURUS"].includes(user.role)) {
    return { error: "Unauthorized" };
  }

  try {
    await db.delete(jadwalTahsin).where(eq(jadwalTahsin.id, id));
    return;
  } catch (e) {
    const message = (e as Error).message ?? "Gagal mengubah data jadwal tahsin";
    return { error: message };
  }
};
