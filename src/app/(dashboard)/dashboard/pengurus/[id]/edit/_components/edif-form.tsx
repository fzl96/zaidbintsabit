import { getPengurusById } from "@/server/api/pengurus/queries";
import { PengurusForm } from "../../../_components/form";

export async function EditForm({ id }: { id: number }) {
  const data = await getPengurusById({ id });

  return <PengurusForm pengurus={data} action="update" />;
}
