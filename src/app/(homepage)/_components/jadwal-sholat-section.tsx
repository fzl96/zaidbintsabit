import { formatDate } from "@/lib/utils";
import { getJadwalSholat } from "@/server/api/home/jadwal-sholat";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { jadwalSholat } from "@/config/jadwal-sholat";

export const nameSholat: string[] = [
  "subuh",
  "dzuhur",
  "ashar",
  "maghrib",
  "isya",
];

export async function JadwalSholatSection() {
  const data = await getJadwalSholat();
  const date = new Date();

  const jumat = data.find((item) => item.jenisJadwalSholat === "jumat");
  const tanggalJumat = new Date(jumat?.tanggal ?? new Date());
  tanggalJumat.setHours(tanggalJumat.getHours() + 7);
  const ied = data.filter((item) => item.jenisJadwalSholat === "ied");
  const tarawih = data.find((item) => item.jenisJadwalSholat === "tarawih");
  const tanggalTarawih = new Date(tarawih?.tanggal ?? new Date());
  tanggalTarawih.setHours(tanggalTarawih.getHours() + 7);

  return (
    <div id="jadwal-sholat" className="mx-auto max-w-6xl px-6 lg:px-8 mt-40">
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
                const tanggal = new Date(item.tanggal);
                tanggal.setHours(tanggal.getHours() + 7);

                return (
                  <div
                    key={item.id}
                    className={cn(
                      "flex flex-col items-center bg-white p-4 rounded-lg ring-1 ring-inset ring-gray-900/10",
                      active && "bg-primary text-white"
                    )}
                  >
                    <div className="font-medium">{item.nama}</div>
                    <div>{format(tanggal, "HH:mm")}</div>
                    <div className="text-center">
                      Imam: {item.imam?.toUpperCase()}
                    </div>
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
                {format(tanggalJumat, "HH:mm")}
              </div>
              <div>Imam: {jumat.imam?.toUpperCase()}</div>
              <div>Khatib: {jumat.khatib}</div>
              <div>Judul Khutbah: {jumat.judul}</div>
            </div>
          </div>
        )}

        {tarawih && (
          <div className="space-y-5">
            <h2 className="md:text-3xl text-lg text-center font-medium">
              Jadwal Sholat tarawih
            </h2>
            <div className="flex flex-col items-center bg-white p-4 rounded-lg ring-1 ring-inset ring-gray-900/10">
              <div className="font-medium">{tarawih.nama}</div>
              <div className="text-lg font-medium">
                {format(tanggalTarawih, "HH:mm")}
              </div>
              <div>Imam: {tarawih.imam?.toUpperCase()}</div>
            </div>
          </div>
        )}

        {ied.length > 0 && (
          <div className="space-y-5">
            <h2 className="md:text-3xl text-lg text-center font-medium">
              Jadwal Sholat Ied
            </h2>
            <div className="flex md:flex-row flex-col gap-4 w-full">
              {ied.map((item) => {
                const tanggal = new Date(item.tanggal);
                tanggal.setHours(tanggal.getHours() + 7);

                return (
                  <div
                    key={item.id}
                    className="flex flex-col items-center bg-white p-4 rounded-lg ring-1 ring-inset ring-gray-900/10 w-full"
                  >
                    <div className="font-medium">{item.nama}</div>
                    <div className="text-lg font-medium">
                      {format(tanggal, "PPP HH:mm", { locale: id })}
                    </div>
                    <div>Imam: {item.imam?.toUpperCase()}</div>
                    <div>Khatib: {item.khatib}</div>
                    <div>Judul Khutbah: {item.judul}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
