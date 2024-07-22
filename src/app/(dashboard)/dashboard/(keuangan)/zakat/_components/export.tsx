import { getExportZakatData } from "@/server/api/zakat/queries";
import { DrawerDialog } from "@/components/drawer-dialog";
import { Label } from "@/components/ui/label";
import { YearSelect } from "../../_components/year-select";
import { MonthSelect } from "../../_components/month-select";
import { ExportButton } from "./export-button";

interface ExportZakatProps {
  month: number;
  year: number;
}

export async function ExportZakat({ month, year }: ExportZakatProps) {
  const data = await getExportZakatData({
    month,
    year,
  });

  return (
    <DrawerDialog
      trigger="export"
      title="Export PDF"
      description="Pilih tahun dan bulan untuk data yang ingin diexport"
    >
      <div className="md:px-0 px-4 space-y-2">
        <div className="space-y-1">
          <Label>Tahun</Label>
          <YearSelect />
        </div>
        <div className="space-y-1 pb-1">
          <Label>Bulan</Label>
          <MonthSelect />
        </div>
        <ExportButton data={data} year={year} month={month} />
      </div>
    </DrawerDialog>
  );
}
