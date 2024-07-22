import { getPosts } from "@/server/api/home/post";
import { PostCard } from "../../_components/post-card";

export async function PostCards({
  page,
  query,
  kategori,
}: {
  page: number;
  query: string;
  kategori: "artikel" | "kajian" | "pengumuman" | "aktivitas";
}) {
  const data = await getPosts({ kategori, page, query });

  return (
    <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-4">
      {data?.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
