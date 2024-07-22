import { currentUser } from "@/lib/auth";
import { db } from "@/server/db";
import { zakat, type ZakatId } from "@/server/db/schema/zakat";
import { sql, ilike } from "drizzle-orm";

const LIMIT = 6;

export async function getZakat({
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

  return await db.query.zakat.findMany({
    // where: (zakat, { ilike }) => ilike(zakat.namaKK, `%${query}%`),
    // limit: LIMIT,
    // offset: LIMIT * page,
  });
}

export async function getZakatById(id: ZakatId) {
  const user = await currentUser();
  if (!user || !["ADMIN", "PENGURUS"].includes(user.role)) {
    throw new Error("Unauthorized");
  }

  return await db.query.zakat.findFirst({
    where: (zakat, { eq }) => eq(zakat.id, id),
  });
}

export async function getZakatTotalPages({ query }: { query: string }) {
  const user = await currentUser();
  if (!user || !["ADMIN", "PENGURUS"].includes(user.role)) {
    throw new Error("Unauthorized");
  }

  const [countRes] = await db
    .select({
      count: sql`count(*)`.mapWith(Number).as("count"),
    })
    .from(zakat)
    .where(ilike(zakat.namaKK, `%${query}%`));

  return countRes?.count ? Math.ceil(countRes.count / LIMIT) : 1;
}
