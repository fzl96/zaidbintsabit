import { getExportAnggotaTahsin } from "@/server/api/tahsin/anggota/queries";
import { ExportButton } from "./export-button";

export async function ExportAnggotaTahsin() {
  const data = await getExportAnggotaTahsin();

  return <ExportButton data={data} />;
}
