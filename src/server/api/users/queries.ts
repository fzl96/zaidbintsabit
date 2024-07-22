import { currentRole, currentUser } from "@/lib/auth";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { eq, sql, ilike, or, desc } from "drizzle-orm";

const LIMIT = 6;

export async function getUsers({
  page,
  query,
}: {
  page: number;
  query: string;
}) {
  const user = await currentUser();
  if (!user || user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const data = await db.query.users.findMany({
    columns: {
      id: true,
      name: true,
      username: true,
      role: true,
    },
    where: (users, { ilike, or }) =>
      or(ilike(users.username, `%${query}%`), ilike(users.name, `%${query}%`)),
    limit: LIMIT,
    offset: (page - 1) * LIMIT,
  });

  return data;
}

export async function getUsersTotalPages({ query }: { query: string }) {
  const user = await currentUser();
  if (!user || user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const [countRes] = await db
    .select({
      count: sql`count(*)`.mapWith(Number).as("count"),
    })
    .from(users)
    .where(
      or(ilike(users.username, `%${query}%`), ilike(users.name, `%${query}%`))
    );

  return countRes?.count ? Math.ceil(countRes.count / LIMIT) : 1;
}

export async function getUserById(id: string) {
  const user = await currentUser();
  if (!user || user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const data = await db.query.users.findFirst({
    where: eq(users.id, id),
    columns: {
      id: true,
      name: true,
      username: true,
      role: true,
    },
  });

  return data;
}
