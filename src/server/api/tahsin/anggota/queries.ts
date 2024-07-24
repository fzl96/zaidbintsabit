import { db } from "@/server/db";
import { currentUser } from "@/lib/auth";
import { sql, ilike } from "drizzle-orm";
import { anggotaTahsin } from "@/server/db/schema";

const LIMIT = 6;

export async function getAnggotaTahsin({
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

  return await db.query.anggotaTahsin.findMany({
    orderBy: (anggotaTahsin, { desc }) => desc(anggotaTahsin.createdAt),
    where: (anggotaTahsin, { ilike }) =>
      ilike(anggotaTahsin.nama, `%${query}%`),
    limit: LIMIT,
    offset: (page - 1) * LIMIT,
  });
}

export async function getAnggotaTahsinTotalPages({ query }: { query: string }) {
  const user = await currentUser();

  if (!user || !["ADMIN", "PENGURUS"].includes(user.role)) {
    throw new Error("Unauthorized");
  }

  const [countRes] = await db
    .select({
      count: sql`count(*)`.mapWith(Number).as("count"),
    })
    .from(anggotaTahsin)
    .where(ilike(anggotaTahsin.nama, `%${query}%`));

  return countRes?.count ? Math.ceil(countRes.count / LIMIT) : 1;
}

export async function getExportAnggotaTahsin() {
  const user = await currentUser();

  if (!user || !["ADMIN", "PENGURUS"].includes(user.role)) {
    throw new Error("Unauthorized");
  }

  return await db.query.anggotaTahsin.findMany({
    orderBy: (anggotaTahsin, { desc }) => desc(anggotaTahsin.createdAt),
  });
}
