"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/lib/utils";
import { type JadwalSholat } from "@/server/db/schema/jadwal-sholat";
import { format } from "date-fns";
import { UpdateJadwalSholat } from "./actions";

export const columns: ColumnDef<JadwalSholat>[] = [
  {
    accessorKey: "nama",
    header: "Nama",
  },
  {
    accessorKey: "imam",
    header: "Imam",
  },
  {
    accessorKey: "khatib",
    header: "Khatib",
  },
  {
    accessorKey: "judul",
    header: "Judul Khutbah",
  },
  {
    accessorKey: "tanggal",
    header: "Tanggal dan waktu",
    cell: ({ row }) => {
      const value = row.original;
      return (
        <div>
          {formatDate(new Date(value.tanggal))}, waktu{" "}
          {format(new Date(value.tanggal), "HH:mm")}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <span className="sr-only">Aksi</span>,
    cell: ({ row }) => {
      return (
        <div className="space-x-2 text-right">
          <UpdateJadwalSholat jadwal={row.original} />
        </div>
      );
    },
  },
];
