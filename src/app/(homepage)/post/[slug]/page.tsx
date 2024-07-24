import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { getPostBySlug } from "@/server/api/home/post";
import { capitalizeFirstLetter, cn } from "@/lib/utils";
import { Suspense } from "react";
import { AsideRelatedPosts } from "./_components/related-posts";
import { Post } from "./_components/post";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Page({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const post = await getPostBySlug(params.slug);

  return (
    <MaxWidthWrapper className="mb-12 mt-10 md:mt-20 flex flex-col w-full">
      <div className="flex gap-10 items-start md:flex-row flex-col">
        <Suspense
          fallback={<Skeleton className="md:w-[42rem] w-full h-[40rem]" />}
        >
          <Post slug={params.slug} />
        </Suspense>
        <aside className="prose md:top-[4rem] md:sticky md:px-0 px-3">
          <h3 className="text-xl font-semibold">
            {capitalizeFirstLetter(post?.kategori.toLowerCase() || "lainnya")}{" "}
            Terbaru
          </h3>
          <div className="">
            <Suspense
              fallback={<Skeleton className="md:w-[20rem] w-full h-[20rem]" />}
            >
              {post?.kategori && (
                <AsideRelatedPosts kategori={post?.kategori} />
              )}
            </Suspense>
          </div>
        </aside>
      </div>
    </MaxWidthWrapper>
  );
}
