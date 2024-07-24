"use client";

import { InventarisWithKategori } from "@/server/db/schema/inventaris";
import { Button } from "@/components/ui/button";
import { createInventarisPdf } from "@/lib/pdf";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ExportButtonProps {
  data: InventarisWithKategori[];
}

export function ExportButton({ data }: ExportButtonProps) {
  const fileName = `Laporan_Inventaris`;
  return (
    <Button
      className={cn(buttonVariants({ variant: "outline" }), "text-black")}
      onClick={() => createInventarisPdf(data, fileName)}
    >
      Export
    </Button>
  );
}
