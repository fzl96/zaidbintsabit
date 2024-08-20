import { getYearlyExpenseReport } from "@/server/api/keuangan/queries";
import { DashboardChart } from "./dashboard-chart";

export async function ExpenseChart({ year }: { year: number }) {
  const expenses = await getYearlyExpenseReport({ year });

  return (
    <DashboardChart
      title={`Pengeluaran Infaq ${year}`}
      description={`Data pengeluaran infaq pada tahun ${year}`}
      data={expenses}
    />
  );
}
