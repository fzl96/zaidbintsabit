import {
  getJadwalTahsin,
  getJadwalTahsinTotalPages,
} from "@/server/api/tahsin/jadwal/queries";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { TablePagination } from "@/components/pagination";

export async function JadwalTahsinTable({ page }: { page: number }) {
  const data = await getJadwalTahsin({ page });
  const totalPages = await getJadwalTahsinTotalPages();

  return (
    <div className="space-y-2">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-[#f6f8fa] p-2 md:pt-0 shadow-sm">
          <div className="md:hidden">
            {data.map((jadwal) => (
              <div
                key={jadwal.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                {jadwal.namaUstadz && (
                  <div className="flex items-center justify-between border-b pb-4">
                    <div className="text-sm text-gray-500">
                      {jadwal.namaUstadz}
                    </div>
                  </div>
                )}
                <div className="flex w-full items-center justify-between pt-4">
                  <div className="flex flex-col">
                    <span className="text-base">
                      {format(new Date(jadwal.tanggal), "PPP HH:mm:ss", {
                        locale: id,
                      })}
                    </span>
                  </div>
                  <div className="flex justify-end gap-2"></div>
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
