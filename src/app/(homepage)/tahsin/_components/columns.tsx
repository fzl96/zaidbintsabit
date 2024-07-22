"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { id } from "date-fns/locale";

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
];
