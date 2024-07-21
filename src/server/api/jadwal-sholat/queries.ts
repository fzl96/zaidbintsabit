import { db } from "@/server/db";
import { jadwalSholat } from "@/server/db/schema/jadwal-sholat";

type Jenis = {
  jenis: "wajib" | "jumat" | "tarawih" | "adha" | "fitri";
};

export async function getJadwalSholat({ jenis }: Jenis) {
  const data = await db.query.jadwalSholat.findMany({
    where: (jadwalSholat, { eq }) => eq(jadwalSholat.jenisJadwalSholat, jenis),
  });

  return data;
}
