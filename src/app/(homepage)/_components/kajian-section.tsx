import { getLatestPost } from "@/server/api/home/post";
import { PostCard } from "./post-card";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export async function KajianSection() {
  const data = await getLatestPost(3, "kajian");

  return (
    <div className="px-8 w-full flex flex-col items-center">
      <div className="grid xl:grid-cols-3 auto-rows-max lg:grid-cols-2 md:gap-14 gap-8 items-stretch">
        {data.map((kajian) => (
          <PostCard className="-m-2 lg:-m-4" post={kajian} key={kajian.id} />
        ))}
      </div>
      <Link className={cn(buttonVariants(), "mt-10")} href="/post/kegiatan">
        Lihat Semua Kajian
      </Link>
    </div>
  );
}
