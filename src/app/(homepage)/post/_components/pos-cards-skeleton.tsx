import { Skeleton } from "@/components/ui/skeleton";

export function PostCardsSkeleton() {
  return (
    <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-4">
      <div className="col-span-1 flex flex-col gap-2">
        <Skeleton className="h-80 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
      <div className="col-span-1 flex flex-col gap-2">
        <Skeleton className="h-80 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
      <div className="col-span-1 flex flex-col gap-2">
        <Skeleton className="h-80 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
}
