import { db } from "@/server/db";

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
