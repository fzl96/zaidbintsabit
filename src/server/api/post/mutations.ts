import { db } from "@/server/db";
import { currentUser } from "@/lib/auth";
import { sql, eq, ilike } from "drizzle-orm";
import {} from "@/server/db/schema/post";
import {
  insertPostParams,
  updatePostParams,
  posts,
  type PostId,
  type NewPostParams,
  type UpdatePostParams,
} from "@/server/db/schema/post";

export const createPost = async (values: NewPostParams) => {
  const user = await currentUser();
  if (!user || !["ADMIN", "PENGURUS"].includes(user.role)) {
    return { error: "Unauthorized" };
  }
  const newPost = insertPostParams.safeParse(values);

  if (!newPost.success) {
    return { error: "Data tidak valid" };
  }

  try {
    const slug = newPost.data.judul.toLowerCase().replace(/\s/g, "-");
    const [countRes] = await db
      .select({
        count: sql`count(*)`.mapWith(Number).as("count"),
      })
      .from(posts)
      .where(ilike(posts.slug, `%${slug}%`));

    const newSlug =
      countRes?.count > 0 ? `${slug}-${countRes.count + 1}` : slug;

    await db.insert(posts).values({
      ...newPost.data,
      slug: newSlug,
    });
    return { success: "Post berhasil dibuat" };
  } catch (error) {
    const message = (error as Error).message ?? "Gagal menambah data keuangan";

    return { error: message };
  }
};

export const updatePost = async (id: PostId, values: UpdatePostParams) => {
  const user = await currentUser();
  if (!user || !["ADMIN", "PENGURUS"].includes(user.role)) {
    return { error: "Unauthorized" };
  }
  const updatePost = updatePostParams.safeParse(values);

  if (!updatePost.success) {
    return { error: "Data tidak valid" };
  }

  const { judul, thumbnail, tanggal, konten, kategori } = updatePost.data;

  try {
    const slug = updatePost.data.judul.toLowerCase().replace(/\s/g, "-");
    const [countRes] = await db
      .select({
        count: sql`count(*)`.mapWith(Number).as("count"),
      })
      .from(posts)
      .where(ilike(posts.slug, `%${slug}%`));

    const newSlug =
      countRes?.count > 0 ? `${slug}-${countRes.count + 1}` : slug;

    await db
      .update(posts)
      .set({
        judul,
        slug: newSlug,
        thumbnail,
        tanggal,
        konten,
        kategori,
      })
      .where(eq(posts.id, id));
    return;
  } catch (e) {
    const message = (e as Error).message ?? "Gagal mengubah data keuangan";
    if (message.includes("duplicate key value")) {
      return { error: "Post already exists" };
    }
    return { error: "Gagal mengubah data keuangan" };
  }
};

export const deletePost = async (id: PostId) => {
  const user = await currentUser();

  if (!user || !["ADMIN", "PENGURUS"].includes(user.role)) {
    return { error: "Unauthorized" };
  }

  try {
    await db.delete(posts).where(eq(posts.id, id));
    return;
  } catch (e) {
    const message = (e as Error).message ?? "Gagal mengubah data keuangan";
    return { error: message };
  }
};
