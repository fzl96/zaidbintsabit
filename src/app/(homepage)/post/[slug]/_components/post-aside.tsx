import { getPostBySlug } from "@/server/api/home/post";
import { capitalizeFirstLetter } from "@/lib/utils";
import { AsideRelatedPosts } from "./related-posts";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export async function PostAside({ slug }: { slug: string }) {
  const post = await getPostBySlug(slug);

  return (
    <aside className="prose md:top-[4rem] md:sticky md:px-0 px-3">
      <h3 className="text-xl font-semibold">
        {capitalizeFirstLetter(post?.kategori.toLowerCase() || "lainnya")}{" "}
        Terbaru
      </h3>
      <div className="">
        <Suspense
          fallback={<Skeleton className="md:w-[20rem] w-full h-[20rem]" />}
        >
          {post?.kategori && <AsideRelatedPosts kategori={post?.kategori} />}
        </Suspense>
      </div>
    </aside>
  );
}
