import { db } from "@/server/db";
import { currentUser } from "@/lib/auth";
import { sql } from "drizzle-orm";
import { jadwalTahsin } from "@/server/db/schema";

const LIMIT = 6;

export async function getJadwalTahsin({ page }: { page: number }) {
  return await db.query.jadwalTahsin.findMany({
    orderBy: (jadwalTahsin, { desc }) => desc(jadwalTahsin.createdAt),
    limit: LIMIT,
    offset: (page - 1) * LIMIT,
  });
}

export async function getJadwalTahsinTotalPages() {
  const [countRes] = await db
    .select({
      count: sql`count(*)`.mapWith(Number).as("count"),
    })
    .from(jadwalTahsin);

  return countRes?.count ? Math.ceil(countRes.count / LIMIT) : 1;
}
