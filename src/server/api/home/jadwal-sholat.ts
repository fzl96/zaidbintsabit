import { db } from "@/server/db";

export async function getJadwalSholat() {
  return await db.query.jadwalSholat.findMany({
    where: (jadwalSholat, { eq }) => eq(jadwalSholat.display, true),
  });
}
