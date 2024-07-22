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

export async function getKeuanganSaldo({
  kategori,
}: {
  kategori: "infaq" | "yatim" | "ramadhan";
}) {
  const data = await db.query.keuangan.findMany({
    where: (keuangan, { eq }) => eq(keuangan.kategori, kategori),
  });

  const saldo = data.reduce((acc, curr) => {
    if (curr.tipe === "pemasukan") {
      return acc + curr.jumlah;
    } else if (curr.tipe === "pengeluaran") {
      return acc - curr.jumlah;
    }
    return acc;
  }, 0);

  return saldo;
}

export async function getKeuanganTotalPages({
  kategori,
  tipe,
}: {
  kategori: "infaq" | "yatim" | "ramadhan";
  tipe: "semua" | "pengeluaran" | "pemasukan";
}) {
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

  return countRes?.count ? Math.ceil(countRes.count / LIMIT) : 1;
}

export async function getExportKeuanganData({
  month,
  year,
  kategori,
}: {
  month: number;
  year: number;
  kategori: "infaq" | "yatim" | "ramadhan";
}) {
  const user = await currentUser();

  if (!user || !["ADMIN", "PENGURUS"].includes(user.role)) {
    throw new Error("Unauthorized");
  }

  const data = await db.query.keuangan.findMany({
    where: (keuangan, { and, eq, gte, lte }) =>
      and(
        eq(keuangan.kategori, kategori),
        gte(keuangan.createdAt, new Date(year, month - 1, 1)),
        lte(keuangan.createdAt, new Date(year, month, 1))
      ),
    orderBy: (keuangan, { desc }) => desc(keuangan.createdAt),
  });

  return data;
}
