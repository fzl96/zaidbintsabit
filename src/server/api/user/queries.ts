import { currentRole, currentUser } from "@/lib/auth";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { eq, sql, ilike, or } from "drizzle-orm";

const LIMIT = 6;

export async function getUserByUsername(username: string) {
  return db.query.users.findFirst({
    where: (users, { eq }) => eq(users.username, username),
  });
}

export async function getUserById(id: string) {
  const [user] = await db
    .select({
      id: users.id,
      username: users.username,
      name: users.name,
      role: users.role,
    })
    .from(users)
    .where(eq(users.id, id));

  return user;
}
