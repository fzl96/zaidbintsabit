import { getAllKategoriInventaris } from "@/server/api/inventaris/queries";
import { CreateInventaris } from "./actions";

export async function CreateInventarisButton() {
  const data = await getAllKategoriInventaris();

  return <CreateInventaris kategori={data} />;
}
