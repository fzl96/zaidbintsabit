import { getYearlyIncomeReport } from "@/server/api/keuangan/queries";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Chart } from "./chart";

export async function DashboardChart({ year }: { year: number }) {
  const data = await getYearlyIncomeReport({ year });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pemasukan Infaq {year}</CardTitle>
        <CardDescription>
          Data pemasukan infaq pada tahun {year}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Chart data={data} />
      </CardContent>
    </Card>
  );
}
