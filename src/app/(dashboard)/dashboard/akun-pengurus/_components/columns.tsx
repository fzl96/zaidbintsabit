"use client";

import { ColumnDef } from "@tanstack/react-table";
import { type User } from "@/server/db/schema/users";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { DeleteUser } from "./actions";
// import { DeletePengurus } from "./actions";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      return <span className="capitalize">{row.original.role}</span>;
    },
  },
  {
    id: "actions",
    header: () => <span className="sr-only">Aksi</span>,
    cell: ({ row }) => {
      return (
        <div className="space-x-2 text-right">
          <Link
            href={`/dashboard/akun-pengurus/${row.original.id}/edit`}
            className={cn(buttonVariants({ variant: "outline" }), "px-2")}
          >
            <Pencil className="h-4 w-4" />
          </Link>
          <DeleteUser akunId={row.original.id} />
        </div>
      );
    },
  },
];
