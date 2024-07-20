import { Skeleton } from "@/components/ui/skeleton";

export function TableLoader() {
  return (
    <div className="">
      <div className="p-3 bg-[#f6f8fa] rounded-lg space-y-3">
        <div className="space-y-3 md:block hidden">
          <Skeleton className="h-10 bg-white" />
          <Skeleton className="h-10 bg-white" />
          <Skeleton className="h-10 bg-white" />
          <Skeleton className="h-10 bg-white" />
          <Skeleton className="h-10 bg-white" />
          <Skeleton className="h-10 bg-white" />
          <Skeleton className="h-10 bg-white" />
        </div>
        <div className="md:hidden">
          <MobileSkeleton />
          <MobileSkeleton />
          <MobileSkeleton />
          <MobileSkeleton />
          <MobileSkeleton />
          <MobileSkeleton />
        </div>
      </div>
    </div>
  );
}

function MobileSkeleton() {
  return (
    <div className="mb-2 w-full rounded-md bg-white p-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-8">
        <div className="h-6 w-full rounded bg-gray-100"></div>
      </div>
      <div className="flex w-full items-center justify-between pt-4">
        <div>
          <div className="h-6 w-16 rounded bg-gray-100"></div>
          <div className="mt-2 h-6 w-24 rounded bg-gray-100"></div>
        </div>
        <div className="flex justify-end gap-2">
          <div className="h-10 w-10 rounded bg-gray-100"></div>
          <div className="h-10 w-10 rounded bg-gray-100"></div>
        </div>
      </div>
    </div>
  );
}
