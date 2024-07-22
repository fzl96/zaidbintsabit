"use client";

import { useState } from "react";
import { ZakatForm } from "./form";
import { DrawerDialog } from "@/app/(dashboard)/_components/drawer-dialog";
import { type ZakatId } from "@/server/db/schema/zakat";

export function DeleteZakat({ zakatId }: { zakatId: ZakatId }) {
  const [open, setOpen] = useState(false);

  return (
    <DrawerDialog
      title="Hapus zakat"
      description="Apakah anda yakin ingin menghapus data zakat ini?"
      trigger="delete"
      open={open}
      setOpen={setOpen}
    >
      <ZakatForm
        zakatId={zakatId}
        action="delete"
        close={() => setOpen(false)}
      />
    </DrawerDialog>
  );
}
