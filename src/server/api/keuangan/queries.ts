import { db } from "@/server/db";
import { currentUser } from "@/lib/auth";
import { sql, and, eq } from "drizzle-orm";
import { keuangan } from "@/server/db/schema";

const LIMIT = 6;

export async function getKeuangan({
  kategori,
  page,
  tipe,
}: // date,
{
  kategori: "infaq" | "yatim" | "ramadhan";
  page: number;
  tipe: "semua" | "pengeluaran" | "pemasukan";
  // date: string;
}) {
  const user = await currentUser();

  if (!user || !["ADMIN", "PENGURUS"].includes(user.role)) {
    throw new Error("Unauthorized");
  }

  if (tipe === "semua")
    return await db.query.keuangan.findMany({
      where: (keuangan, { and, eq, gte, lte }) =>
        and(eq(keuangan.kategori, kategori)),
      orderBy: (keuangan, { desc }) => desc(keuangan.createdAt),
      limit: LIMIT,
      offset: (page - 1) * LIMIT,
    });

  return await db.query.keuangan.findMany({
    where: (keuangan, { and, eq, gte, lte }) =>
      and(eq(keuangan.kategori, kategori), eq(keuangan.tipe, tipe)),
    orderBy: (keuangan, { desc }) => desc(keuangan.createdAt),
    limit: LIMIT,
    offset: (page - 1) * LIMIT,
  });
}

export async function getKeuanganTotalPages({
  kategori,
  tipe,
}: {
  kategori: "infaq" | "yatim" | "ramadhan";
  tipe: "semua" | "pengeluaran" | "pemasukan";
}) {
  const user = await currentUser();

  if (!user || !["ADMIN", "PENGURUS"].includes(user.role)) {
    throw new Error("Unauthorized");
  }

  if (tipe === "semua") {
    const [countRes] = await db
      .select({
        count: sql`count(*)`.mapWith(Number).as("count"),
      })
      .from(keuangan)
      .where(eq(keuangan.kategori, kategori));

    return countRes?.count ? Math.ceil(countRes.count / 6) : 1;
  }

  const [countRes] = await db
    .select({
      count: sql`count(*)`.mapWith(Number).as("count"),
    })
    .from(keuangan)
    .where(and(eq(keuangan.kategori, kategori), eq(keuangan.tipe, tipe)));

  return countRes?.count ? Math.ceil(countRes.count / 6) : 1;
}
