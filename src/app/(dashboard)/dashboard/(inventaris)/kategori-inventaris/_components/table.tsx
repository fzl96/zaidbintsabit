import {
  getKategoriInventaris,
  getKategoriInventarisPages,
} from "@/server/api/inventaris/queries";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { formatDate } from "@/lib/utils";
import { TablePagination } from "@/components/pagination";
import { SearchFilter } from "@/components/search-filter";
import { UpdateKategoriInventaris, DeleteKategoriInventaris } from "./actions";

export async function KategoriInventarisTable({
  page,
  query,
}: {
  page: number;
  query: string;
}) {
  const data = await getKategoriInventaris({ page, query });
  const totalPages = await getKategoriInventarisPages({ query });

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <SearchFilter placeholder="Cari Kategori Inventaris" />
      </div>

      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-[#f6f8fa] p-2 md:pt-0 shadow-sm">
          <div className="md:hidden">
            {data.map((kategori) => (
              <div
                key={kategori.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                {kategori.nama && (
                  <div className="flex items-center justify-between border-b pb-4">
                    <div className="text-sm text-gray-500">{kategori.nama}</div>
                  </div>
                )}
                <div className="flex w-full items-center justify-between pt-4">
                  <div className="flex flex-col">
                    <span className="text-base">
                      {formatDate(kategori.createdAt)}
                    </span>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateKategoriInventaris kategoriInventaris={kategori} />
                    <DeleteKategoriInventaris
                      kategoriInventarisId={kategori.id}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="hidden md:block">
            <DataTable data={data} columns={columns} />
          </div>
        </div>
        <TablePagination totalPages={totalPages} page={page} />
      </div>
    </div>
  );
}
