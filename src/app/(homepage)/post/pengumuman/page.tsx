import { Suspense } from "react";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { SearchFilter } from "@/components/search-filter";
import { Skeleton } from "@/components/ui/skeleton";
import { PostCards } from "../_components/post-cards";
import { PostPagination } from "../_components/post-pagination";
import { PostCardsSkeleton } from "../_components/pos-cards-skeleton";

export default function PengumumanPage({
  searchParams,
}: {
  searchParams: {
    page?: string;
    query?: string;
  };
}) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const query = searchParams.query ?? "";

  return (
    <MaxWidthWrapper className="mt-10">
      <h1 className="text-3xl text-center tracking-tight font-semibold">
        Pengumuman
      </h1>
      <div className="py-3">
        <SearchFilter placeholder="Cari pengumuman" />
      </div>
      <Suspense fallback={<PostCardsSkeleton />}>
        <PostCards page={page} query={query} kategori="pengumuman" />
      </Suspense>
      <div className="my-5 flex w-full justify-center">
        <Suspense fallback={<Skeleton className="w-10 h-40" />}>
          <PostPagination page={page} query={query} kategori="pengumuman" />
        </Suspense>
      </div>
    </MaxWidthWrapper>
  );
}
