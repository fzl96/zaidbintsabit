"use client";

import { useState } from "react";
import { AkunForm } from "./form";
import { DrawerDialog } from "@/app/(dashboard)/_components/drawer-dialog";

export function DeleteUser({ akunId }: { akunId: string }) {
  const [open, setOpen] = useState(false);

  return (
    <DrawerDialog
      title="Hapus akun"
      description="Apakah anda yakin ingin menghapus akun ini?"
      trigger="delete"
      open={open}
      setOpen={setOpen}
    >
      <AkunForm akunId={akunId} action="delete" close={() => setOpen(false)} />
    </DrawerDialog>
  );
}
