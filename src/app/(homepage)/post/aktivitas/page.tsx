import { Suspense } from "react";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { SearchFilter } from "@/components/search-filter";
import { Skeleton } from "@/components/ui/skeleton";
import { PostCards } from "../_components/post-cards";
import { PostPagination } from "../_components/post-pagination";

export default function AktivitasPage({
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
        Aktivitas
      </h1>
      <div className="py-3">
        <SearchFilter placeholder="Cari aktivitas" />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <PostCards page={page} query={query} kategori="aktivitas" />
      </Suspense>
      <div className="my-5 flex w-full justify-center">
        <Suspense fallback={<Skeleton className="w-10 h-40" />}>
          <PostPagination page={page} query={query} kategori="aktivitas" />
        </Suspense>
      </div>
    </MaxWidthWrapper>
  );
}
