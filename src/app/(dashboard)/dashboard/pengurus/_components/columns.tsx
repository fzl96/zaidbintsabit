"use client";

import { ColumnDef } from "@tanstack/react-table";
import { type Pengurus } from "@/server/db/schema/pengurus";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<Pengurus>[] = [
  {
    accessorKey: "nama",
    header: "Nama",
  },
  {
    accessorKey: "noHp",
    header: "No. Hp",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    header: () => <span className="sr-only">Aksi</span>,
    cell: ({ row }) => {
      return (
        <div className="space-x-2 text-right">
          <Link
            href={`/dashboard/pengurus/${row.original.id}/edit`}
            className={cn(buttonVariants({ variant: "outline" }), "px-2")}
          >
            <Pencil className="h-4 w-4" />
          </Link>
        </div>
      );
    },
  },
];
