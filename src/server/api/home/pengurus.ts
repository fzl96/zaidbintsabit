import { db } from "@/server/db";

export async function getPengurus() {
  return await db.query.pengurusMasjid.findMany();
}
