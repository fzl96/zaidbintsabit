"use client";

import { type Zakat } from "@/server/db/schema/zakat";
import { Button } from "@/components/ui/button";
import { createZakatPdf } from "@/lib/pdf";

interface ExportButtonProps {
  data: Zakat[];
  month: number;
  year: number;
}

export function ExportButton({ data, month, year }: ExportButtonProps) {
  const date = new Date();
  date.setMonth(month - 1);
  const monthName = date.toLocaleString("id-ID", { month: "long" });

  const fileName = `Laporan_zakat_${monthName}-${year}`;
  return (
    <Button className="w-full" onClick={() => createZakatPdf(data, fileName)}>
      Export
    </Button>
  );
}
