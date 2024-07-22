"use client";

import { useState } from "react";
import { PengurusForm } from "./form";
import { DrawerDialog } from "@/app/(dashboard)/_components/drawer-dialog";
import { type PengurusId } from "@/server/db/schema/pengurus";

export function DeletePengurus({ pengurusId }: { pengurusId: PengurusId }) {
  const [open, setOpen] = useState(false);

  return (
    <DrawerDialog
      title="Hapus pengurus"
      description="Apakah anda yakin ingin menghapus data pengurus ini?"
      trigger="delete"
      open={open}
      setOpen={setOpen}
    >
      <PengurusForm
        pengurusId={pengurusId}
        action="delete"
        close={() => setOpen(false)}
      />
    </DrawerDialog>
  );
}
