import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Chart } from "./chart";

type Data = {
  month: string;
  masjid: number;
  ramadhan: number;
  yatim: number;
  jumat: number;
};

export async function DashboardChart({
  data,
  title,
  description,
}: {
  data: Data[];
  title: string;
  description: string;
}) {
  return (
    <Card>
      <CardHeader>
        {/* <CardTitle>Pemasukan Infaq {year}</CardTitle> */}
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        {/* <CardDescription> */}
        {/*   Data pemasukan infaq pada tahun {year} */}
        {/* </CardDescription> */}
      </CardHeader>
      <CardContent>
        <Chart data={data} />
      </CardContent>
    </Card>
  );
}
