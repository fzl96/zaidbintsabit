import { Suspense } from "react";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { SearchFilter } from "@/components/search-filter";
import { Skeleton } from "@/components/ui/skeleton";
import { PostCards } from "../_components/post-cards";
import { PostPagination } from "../_components/post-pagination";
import { PostCardsSkeleton } from "../_components/pos-cards-skeleton";
import { unstable_noStore as noStore } from "next/cache";

export default function KajianPage({
  searchParams,
}: {
  searchParams: {
    page?: string;
    query?: string;
  };
}) {
  noStore();
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const query = searchParams.query ?? "";

  return (
    <MaxWidthWrapper className="mt-10">
      <h1 className="text-3xl text-center tracking-tight font-semibold">
        Kajian
      </h1>
      <div className="py-3">
        <SearchFilter placeholder="Cari kajian" />
      </div>
      <Suspense fallback={<PostCardsSkeleton />}>
        <PostCards page={page} query={query} kategori="kajian" />
      </Suspense>
      <div className="my-5 flex w-full justify-center">
        <Suspense fallback={<Skeleton className="w-40 h-10" />}>
          <PostPagination page={page} query={query} kategori="kajian" />
        </Suspense>
      </div>
    </MaxWidthWrapper>
  );
}
