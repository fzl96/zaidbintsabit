import { Skeleton } from "@/components/ui/skeleton";

export function CardsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Skeleton className="bg-gray-100 w-full h-[7.5rem]" />
      <Skeleton className="bg-gray-100 w-full h-[7.5rem]" />
      <Skeleton className="bg-gray-100 w-full h-[7.5rem]" />
      <Skeleton className="bg-gray-100 w-full h-[7.5rem]" />
    </div>
  );
}
