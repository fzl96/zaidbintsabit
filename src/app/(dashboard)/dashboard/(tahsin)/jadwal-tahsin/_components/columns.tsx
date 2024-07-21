"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { UpdateJadwalTahsin, DeleteJadwalTahsin } from "./actions";

export const columns: ColumnDef<any, any>[] = [
  {
    accessorKey: "namaUstadz",
    header: "Nama Ustadz",
  },
  {
    accessorKey: "tanggal",
    header: "Tanggal",
    cell: ({ cell }) => format(cell.getValue(), "PPP HH:mm:ss", { locale: id }),
  },
  {
    accessorKey: "catatan",
    header: "Catatan",
  },
  {
    id: "actions",
    header: () => <span className="sr-only">Aksi</span>,
    cell: ({ row }) => {
      return (
        <div className="space-x-2 text-right">
          <UpdateJadwalTahsin jadwalTahsin={row.original} />
          <DeleteJadwalTahsin jadwalTahsinId={row.original.id} />
        </div>
      );
    },
  },
];
