import { getZakatById } from "@/server/api/zakat/queries";
import { ZakatForm } from "../../../_components/form";

export async function EditZakatForm({ id }: { id: number }) {
  const zakat = await getZakatById(id);

  return <ZakatForm zakat={zakat} zakatId={id} action="update" />;
}
