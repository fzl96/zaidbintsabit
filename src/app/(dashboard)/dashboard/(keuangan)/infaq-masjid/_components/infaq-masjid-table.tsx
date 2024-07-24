import {
  getKeuangan,
  getKeuanganTotalPages,
  getKeuanganSaldo,
} from "@/server/api/keuangan/queries";
import { FinanceTable } from "../../_components/table";
import { columns } from "./columns";

export async function InfaqMasjidTable({
  page,
  tipe,
}: {
  page: number;
  tipe: "semua" | "pemasukan" | "pengeluaran";
}) {
  const data = await getKeuangan({ page, kategori: "infaq", tipe });
  const totalPages = await getKeuanganTotalPages({ kategori: "infaq", tipe });
  const saldo = await getKeuanganSaldo({ kategori: "infaq" });

  return (
    <FinanceTable
      data={data}
      columns={columns}
      totalPages={totalPages}
      page={page}
      tipe={tipe}
      saldo={saldo}
      kategori="infaq"
    />
  );
}
