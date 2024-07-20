import {
  getKeuangan,
  getKeuanganTotalPages,
} from "@/server/api/keuangan/queries";
import { FinanceTable } from "../../_components/table";
import { columns } from "./columns";

export async function AnakYatimTable({
  page,
  tipe,
}: {
  page: number;
  tipe: "semua" | "pemasukan" | "pengeluaran";
}) {
  const data = await getKeuangan({ page, kategori: "yatim", tipe });
  const totalPages = await getKeuanganTotalPages({ kategori: "yatim", tipe });

  return (
    <FinanceTable
      data={data}
      columns={columns}
      totalPages={totalPages}
      page={page}
    />
  );
}
