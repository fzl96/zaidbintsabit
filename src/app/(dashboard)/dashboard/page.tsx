import { Suspense } from "react";
import { Wrapper } from "../_components/wrapper";
import { YearSelect } from "./(keuangan)/_components/year-select";
import { DashboardCards } from "./_components/dashboard-cards";
import { CardsSkeleton } from "./_components/dashboard-cards-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { unstable_noStore as noStore } from "next/cache";
import { IncomeChart } from "./_components/income-chart-wrapper";
import { ExpenseChart } from "./_components/expense-chart-wrapper";

export default async function Dashboard({
  searchParams,
}: {
  searchParams: {
    year?: string;
  };
}) {
  noStore();
  const year = searchParams.year
    ? parseInt(searchParams.year)
    : new Date().getFullYear();

  return (
    <Wrapper>
      <div className="flex md:flex-row flex-col gap-5 md:items-center">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Dashboard
        </h1>
        <YearSelect className="w-[100px]" />
      </div>
      <Suspense fallback={<CardsSkeleton />}>
        <DashboardCards />
      </Suspense>
      <Suspense
        fallback={
          <Skeleton className="bg-gray-100 w-full h-[28rem] animate-pulse" />
        }
      >
        <IncomeChart year={year} />
      </Suspense>

      <Suspense
        fallback={
          <Skeleton className="bg-gray-100 w-full h-[28rem] animate-pulse" />
        }
      >
        <ExpenseChart year={year} />
      </Suspense>
    </Wrapper>
  );
}
