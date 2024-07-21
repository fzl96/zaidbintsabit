import { db } from "@/server/db";
import { currentUser } from "@/lib/auth";
import { sql, ilike } from "drizzle-orm";
import { pengurusMasjid, type PengurusId } from "@/server/db/schema/pengurus";

export async function getPengurus({
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

  const data = await db.query.pengurusMasjid.findMany({
    where: (pengurus, { and, ilike, eq }) => ilike(pengurus.nama, `%${query}%`),
    orderBy: (pengurus, { desc }) => desc(pengurus.createdAt),
    limit: 6,
    offset: (page - 1) * 6,
  });

  return data;
}

export async function getPengurusTotalPages({ query }: { query: string }) {
  const user = await currentUser();

  if (!user || !["ADMIN", "PENGURUS"].includes(user.role)) {
    throw new Error("Unauthorized");
  }

  const [countRes] = await db
    .select({
      count: sql`count(*)`.mapWith(Number).as("count"),
    })
    .from(pengurusMasjid)
    .where(ilike(pengurusMasjid.nama, `%${query}%`));

  return countRes?.count ? Math.ceil(countRes.count / 6) : 1;
}

export async function getPengurusById({ id }: { id: PengurusId }) {
  const user = await currentUser();

  if (!user || !["ADMIN", "PENGURUS"].includes(user.role)) {
    throw new Error("Unauthorized");
  }

  const data = await db.query.pengurusMasjid.findFirst({
    where: (pengurus, { eq }) => eq(pengurus.id, id),
  });

  return data;
}
