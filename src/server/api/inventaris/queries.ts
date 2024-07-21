import { db } from "@/server/db";
import { currentUser } from "@/lib/auth";
import { sql, and, eq, ilike } from "drizzle-orm";
import { inventaris, kategoriInventaris } from "@/server/db/schema/inventaris";

const LIMIT = 6;

export async function getInventaris({
  query,
  page,
}: {
  query: string;
  page: number;
}) {
  const user = await currentUser();

  if (!user || !["ADMIN", "PENGURUS"].includes(user.role)) {
    throw new Error("Unauthorized");
  }

  const data = await db.query.inventaris.findMany({
    where: (inventaris, { ilike }) => ilike(inventaris.nama, `%${query}%`),
    with: {
      kategori: true,
    },
    orderBy: (inventaris, { desc }) => desc(inventaris.createdAt),
    limit: LIMIT,
    offset: (page - 1) * LIMIT,
  });

  return data;
}

export async function getInventarisPages({ query }: { query: string }) {
  const user = await currentUser();

  if (!user || !["ADMIN", "PENGURUS"].includes(user.role)) {
    throw new Error("Unauthorized");
  }

  const [countRes] = await db
    .select({
      count: sql`count(*)`.mapWith(Number).as("count"),
    })
    .from(inventaris)
    .where(ilike(inventaris.nama, `%${query}%`));

  return countRes?.count ? Math.ceil(countRes.count / LIMIT) : 1;
}

export async function getKategoriInventaris({
  page,
  query,
}: {
  page: number;
  query: string;
}) {
  const user = await currentUser();

  if (!user || !["ADMIN", "PENGURUS"].includes(user.role)) {
    throw new Error("Unauthorized");
  }

  const data = await db.query.kategoriInventaris.findMany({
    where: (kategoriInventaris, { ilike }) =>
      ilike(kategoriInventaris.nama, `%${query}%`),
    orderBy: (kategoriInventaris, { desc }) =>
      desc(kategoriInventaris.createdAt),
    limit: LIMIT,
    offset: (page - 1) * LIMIT,
  });

  return data;
}

export async function getKategoriInventarisPages({ query }: { query: string }) {
  const user = await currentUser();

  if (!user || !["ADMIN", "PENGURUS"].includes(user.role)) {
    throw new Error("Unauthorized");
  }

  const [countRes] = await db
    .select({
      count: sql`count(*)`.mapWith(Number).as("count"),
    })
    .from(kategoriInventaris)
    .where(ilike(kategoriInventaris.nama, `%${query}%`));

  return countRes?.count ? Math.ceil(countRes.count / LIMIT) : 1;
}
