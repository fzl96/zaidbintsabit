import { getUserById } from "@/server/api/users/queries";
import { AkunForm } from "../../../_components/form";

export async function EditForm({ id }: { id: string }) {
  const data = await getUserById(id);
  console.log(data);

  return <AkunForm akun={data} action="update" />;
}
