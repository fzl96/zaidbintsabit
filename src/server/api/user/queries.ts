import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";

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
