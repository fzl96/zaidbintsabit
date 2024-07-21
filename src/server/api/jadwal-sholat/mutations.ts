import { currentUser } from "@/lib/auth";
import { db } from "@/server/db";
import { eq } from "drizzle-orm";
import {
  jadwalSholat,
  updateJadwalSholatSchema,
  type UpdateJadwalSholatParams,
  type JadwalSholatId,
} from "@/server/db/schema/jadwal-sholat";

export const updateJadwalSholat = async (
  id: JadwalSholatId,
  values: UpdateJadwalSholatParams
) => {
  const user = await currentUser();
  if (!user || !["ADMIN", "PENGURUS"].includes(user.role)) {
    return { error: "Unauthorized" };
  }
  const updatedJadwalSholat = updateJadwalSholatSchema.safeParse(values);

  if (!updatedJadwalSholat.success) {
    return { error: "Data tidak valid" };
  }

  try {
    await db
      .update(jadwalSholat)
      .set(updatedJadwalSholat.data)
      .where(eq(jadwalSholat.id, id));
    return;
  } catch (err) {
    const message =
      (err as Error).message ?? "Gagal mengubah data jadwal sholat";
    return { error: message };
  }
};
