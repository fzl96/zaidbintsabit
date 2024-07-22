import { getPengurus } from "@/server/api/home/pengurus";
import { PengurusCard } from "./pengurus-card";

export async function PengurusCards() {
  const pengurus = await getPengurus();

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 md:gap-10 gap-5 px-5 md:px-0">
      {pengurus
        ?.sort((pgrs) => (pgrs.status === "imam" ? -1 : 1))
        .map((pgrs) => (
          <PengurusCard key={pgrs.id} pengurus={pgrs} />
        ))}
    </div>
  );
}
