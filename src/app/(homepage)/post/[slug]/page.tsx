import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Suspense } from "react";
import { Post } from "./_components/post";
import { Skeleton } from "@/components/ui/skeleton";
import { unstable_noStore as noStore } from "next/cache";
import { PostAside } from "./_components/post-aside";

export default async function Page({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  noStore();

  return (
    <MaxWidthWrapper className="mb-12 mt-10 md:mt-20 flex flex-col w-full">
      <div className="flex gap-10 items-start md:flex-row flex-col">
        <Suspense
          fallback={<Skeleton className="md:w-[42rem] w-full h-[40rem]" />}
        >
          <Post slug={params.slug} />
        </Suspense>
        <Suspense
          fallback={<Skeleton className="md:w-[42rem] w-full h-[40rem]" />}
        >
          <PostAside slug={params.slug} />
        </Suspense>
      </div>
    </MaxWidthWrapper>
  );
}
