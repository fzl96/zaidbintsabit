import {
  getPengurus,
  getPengurusTotalPages,
} from "@/server/api/pengurus/queries";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { columns } from "./columns";
import { TablePagination } from "@/components/pagination";
import { DataTable } from "@/components/data-table";
import { SearchFilter } from "@/components/search-filter";

export async function PenguruTable({
  page,
  query,
}: {
  page: number;
  query: string;
}) {
  const data = await getPengurus({ page, query });
  const totalPages = await getPengurusTotalPages({ query });

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <SearchFilter placeholder="Cari Inventaris" />
      </div>
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-[#f6f8fa] p-2 md:pt-0 shadow-sm">
          <div className="md:hidden">
            {data.map((pengurus) => (
              <div
                key={pengurus.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="text-lg text-gray-500">
                    <p className="text-gray-800">{pengurus.nama}</p>
                    <p className="text-sm">{pengurus.noHp}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-sm capitalize">{pengurus.status}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/dashboard/pengurus/${pengurus.id}/edit`}
                      className={cn(
                        buttonVariants({ variant: "outline" }),
                        "px-2"
                      )}
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    {/* <DeleteButton
                    id={pgrs.id}
                    url={pgrs.foto}
                    page="jamaah"
                    deleteFn={deletePengurus}
                  /> */}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="md:block hidden">
            <DataTable columns={columns} data={data} />
          </div>
        </div>
        <TablePagination totalPages={totalPages} page={page} />
      </div>
    </div>
  );
}
