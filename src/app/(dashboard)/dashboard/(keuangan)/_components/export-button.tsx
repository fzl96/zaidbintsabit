"use client";

import { type Keuangan } from "@/server/db/schema/keuangan";
import { Button } from "@/components/ui/button";
import { createFinancePdf } from "@/lib/pdf";

interface ExportButtonProps {
  data: Keuangan[];
  month: number;
  year: number;
  kategori: "infaq" | "yatim" | "ramadhan" | "jumat";
}

export function ExportButton({
  data,
  month,
  year,
  kategori,
}: ExportButtonProps) {
  const date = new Date();
  date.setMonth(month - 1);
  const monthName = date.toLocaleString("id-ID", { month: "long" });
  let name;
  if (kategori === "infaq") {
    name = "infaq_masjid";
  } else if (kategori === "yatim") {
    name = "infaq_anak_yatim";
  } else if (kategori === "ramadhan") {
    name = "infaq_ramadhan";
  } else if (kategori === "jumat") {
    name = "infaq_jumat";
  }
  let kat: string;
  if (kategori === "infaq") {
    kat = "masjid";
  } else if (kategori === "yatim") {
    kat = "anak yatim";
  } else if (kategori === "ramadhan") {
    kat = "ramadhan";
  } else if (kategori === "jumat") {
    kat = "jum'at";
  }

  const fileName = `Laporan_${name}_${monthName}-${year}`;
  return (
    <Button
      className="w-full"
      onClick={() => createFinancePdf(data, fileName, kat.toUpperCase())}
    >
      Export
    </Button>
  );
}
