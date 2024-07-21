import { getJadwalSholat } from "@/server/api/jadwal-sholat/queries";
import { formatDate } from "@/lib/utils";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { UpdateJadwalSholat } from "./actions";
import { format } from "date-fns";

export async function SholatIedTable() {
  const data = await getJadwalSholat({ jenis: "ied" });

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
                {jadwal.nama && (
                  <div className="flex items-center justify-between border-b pb-4">
                    <div className="text-sm text-gray-500">{jadwal.nama}</div>
                  </div>
                )}
                <div className="flex w-full items-center justify-between pt-4">
                  <div className="flex flex-col">
                    <div className="text-sm flex flex-col">
                      <span>{format(jadwal.tanggal, "HH:mm")}</span>
                      <span>{formatDate(jadwal.tanggal)} </span>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateJadwalSholat jadwal={jadwal} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="hidden md:block">
            <DataTable data={data} columns={columns} />
          </div>
        </div>
      </div>
    </div>
  );
}
