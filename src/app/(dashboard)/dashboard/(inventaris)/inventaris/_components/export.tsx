import { getExportInventarisData } from "@/server/api/inventaris/queries";
import { ExportButton } from "./export-button";

export async function ExportInventaris() {
  const data = await getExportInventarisData();

  return <ExportButton data={data} />;
}
