import { currentUser } from "@/lib/auth";
import { db } from "@/server/db";
import { sql, ilike } from "drizzle-orm";
import { posts, type PostId } from "@/server/db/schema/post";

const LIMIT = 6;

export async function getPosts({
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

  const data = await db.query.posts.findMany({
    where: (post, { and, ilike, eq }) => ilike(post.judul, `%${query}%`),
    orderBy: (post, { desc }) => desc(post.createdAt),
    limit: LIMIT,
    offset: (page - 1) * LIMIT,
  });

  return data;
}

export async function getPostsTotalPages({ query }: { query: string }) {
  const user = await currentUser();

  if (!user || !["ADMIN", "PENGURUS"].includes(user.role)) {
    throw new Error("Unauthorized");
  }

  const [countRes] = await db
    .select({
      count: sql`count(*)`.mapWith(Number).as("count"),
    })
    .from(posts)
    .where(ilike(posts.judul, `%${query}%`));

  return countRes?.count ? Math.ceil(countRes.count / LIMIT) : 1;
}

export async function getPostById({ id }: { id: PostId }) {
  const user = await currentUser();

  if (!user || !["ADMIN", "PENGURUS"].includes(user.role)) {
    throw new Error("Unauthorized");
  }

  const data = await db.query.posts.findFirst({
    where: (post, { eq }) => eq(post.id, id),
  });

  return data;
}
