import { db } from "@/server/db";
import { sql, eq, and, ilike } from "drizzle-orm";
import { posts } from "@/server/db/schema/post";

const LIMIT = 6;

export async function getLatestPost(
  limit = 3,
  kategori: "aktivitas" | "artikel" | "pengumuman" | "kajian"
) {
  return await db.query.posts.findMany({
    where: (post, { eq }) => eq(post.kategori, kategori ?? "aktivitas"),
    orderBy: (post, { desc }) => desc(post.createdAt),
    limit,
  });
}

export async function getPosts({
  kategori,
  page,
  query,
}: {
  kategori: "aktivitas" | "artikel" | "pengumuman" | "kajian";
  page: number;
  query: string;
}) {
  return await db.query.posts.findMany({
    where: (post, { eq, and, ilike }) =>
      and(
        eq(post.kategori, kategori ?? "aktivitas"),
        ilike(post.judul, `%${query}%`)
      ),
    orderBy: (post, { desc }) => desc(post.createdAt),
    limit: LIMIT,
    offset: (page - 1) * LIMIT,
  });
}

export async function getPostsTotalPages({
  kategori,
  query,
}: {
  kategori: "aktivitas" | "artikel" | "pengumuman" | "kajian";
  query: string;
}) {
  const [countRes] = await db
    .select({
      count: sql`count(*)`.mapWith(Number).as("count"),
    })
    .from(posts)
    .where(
      and(
        eq(posts.kategori, kategori ?? "aktivitas"),
        ilike(posts.judul, `%${query}%`)
      )
    );

  return countRes?.count ? Math.ceil(countRes.count / LIMIT) : 1;
}
