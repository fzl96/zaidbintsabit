"use client";

import { type AnggotaTahsin } from "@/server/db/schema/tahsin";
import { Button } from "@/components/ui/button";
import { createAnggotaTahsinPdf } from "@/lib/pdf";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ExportButtonProps {
  data: AnggotaTahsin[];
}

export function ExportButton({ data }: ExportButtonProps) {
  return (
    <Button
      className={cn(buttonVariants({ variant: "outline" }), "text-black")}
      onClick={() => createAnggotaTahsinPdf(data)}
    >
      Export
    </Button>
  );
}
