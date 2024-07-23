import { getExportKeuanganData } from "@/server/api/keuangan/queries";
import { DrawerDialog } from "@/components/drawer-dialog";
import { Label } from "@/components/ui/label";
import { YearSelect } from "./year-select";
import { MonthSelect } from "./month-select";
import { ExportButton } from "./export-button";

interface ExportFinanceProps {
  month: number;
  year: number;
  kategori: "infaq" | "yatim" | "ramadhan" | "jumat";
}

export async function ExportFinance({
  month,
  year,
  kategori,
}: ExportFinanceProps) {
  const data = await getExportKeuanganData({
    month,
    year,
    kategori,
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
        <ExportButton
          data={data}
          year={year}
          month={month}
          kategori={kategori}
        />
      </div>
    </DrawerDialog>
  );
}
