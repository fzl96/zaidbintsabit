import { formatDate } from "@/lib/utils";
import { getJadwalSholat } from "@/server/api/home/jadwal-sholat";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { jadwalSholat } from "@/config/jadwal-sholat";

export async function JadwalSholatSection() {
  const data = await getJadwalSholat();
  const date = new Date();

  const jumat = data.find((item) => item.jenisJadwalSholat === "jumat");
  const ied = data.filter((item) => item.jenisJadwalSholat === "ied");

  return (
    <div className="mx-auto max-w-6xl px-6 lg:px-8 mt-40">
      <div className="rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-8 space-y-10">
        <div className="space-y-5">
          <h2 className="md:text-3xl text-lg text-center flex md:flex-row flex-col items-center font-medium justify-center">
            Jadwal Sholat <span>{formatDate(date)}</span>
          </h2>
          <div className="grid md:grid-cols-5 gap-4">
            {data
              .filter((item) => item.jenisJadwalSholat === "wajib")
              .map((item) => {
                const date = new Date();
                const hour = date.getHours();
                const jadwal = jadwalSholat.find((j) => j.id === item.id);
                const active =
                  jadwal && hour >= jadwal.jamMulai && hour < jadwal.jamSelesai;

                return (
                  <div
                    key={item.id}
                    className={cn(
                      "flex flex-col items-center bg-white p-4 rounded-lg ring-1 ring-inset ring-gray-900/10",
                      active && "bg-primary text-white"
                    )}
                  >
                    <div className="font-medium">{item.nama}</div>
                    <div>{format(new Date(item.tanggal), "HH:mm")}</div>
                  </div>
                );
              })}
          </div>
        </div>

        {jumat && (
          <div className="space-y-5">
            <h2 className="md:text-3xl text-lg text-center font-medium">
              Jadwal Sholat Jum&apos;at
            </h2>
            <div className="flex flex-col items-center bg-white p-4 rounded-lg ring-1 ring-inset ring-gray-900/10">
              <div className="font-medium">{jumat.nama}</div>
              <div className="text-lg font-medium">
                {format(jumat.tanggal, "HH:mm")}
              </div>
              <div>{jumat.imam}</div>
              <div>{jumat.judul}</div>
              <div>{jumat.khatib}</div>
            </div>
          </div>
        )}

        {ied.length > 0 && (
          <div className="space-y-5">
            <h2 className="md:text-3xl text-lg text-center font-medium">
              Jadwal Sholat Ied
            </h2>
            <div className="flex md:flex-row flex-col gap-4 w-full">
              {ied.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col items-center bg-white p-4 rounded-lg ring-1 ring-inset ring-gray-900/10 w-full"
                >
                  <div className="font-medium">{item.nama}</div>
                  <div className="text-lg font-medium">
                    {format(item.tanggal, "PPP HH:mm", { locale: id })}
                  </div>
                  <div>{item.imam}</div>
                  <div>{item.judul}</div>
                  <div>{item.khatib}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
