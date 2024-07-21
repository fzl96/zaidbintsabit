import { eq } from "drizzle-orm";
import { db } from "@/server/db";
import { jadwalSholat } from "@/server/db/schema";

type Jenis = {
  jenis: "wajib" | "jumat" | "tarawih" | "adha" | "fitri";
};

export async function getJadwalSholat({ jenis }: Jenis) {
  const data = await db
    .select()
    .from(jadwalSholat)
    .where(eq(jadwalSholat.jenisJadwalSholat, jenis));

  return data;
}
