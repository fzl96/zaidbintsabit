import Link from "next/link";
import { getLatestPost } from "@/server/api/home/post";

export async function AsideRelatedPosts({
  kategori,
}: {
  kategori: "aktivitas" | "pengumuman" | "kajian" | "artikel";
}) {
  const posts = await getLatestPost(5, kategori);
  return (
    <div>
      <ul className="list-none p-0">
        {posts.map((post) => (
          <li className="" key={post.id}>
            <Link href={`/post/${post.slug}`}>{post.judul}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
