import { getYearlyIncomeReport } from "@/server/api/keuangan/queries";
import { DashboardChart } from "./dashboard-chart";

export async function IncomeChart({ year }: { year: number }) {
  const income = await getYearlyIncomeReport({ year });

  return (
    <DashboardChart
      title={`Pemasukan Infaq ${year}`}
      description={`Data pemasukan infaq pada tahun ${year}`}
      data={income}
    />
  );
}
