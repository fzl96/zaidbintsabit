import { getLatestPost } from "@/server/api/home/post";
import Image from "next/image";
import { cn, removeHtmlTags } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export async function PengumumanSection() {
  const data = await getLatestPost(3, "pengumuman");

  return (
    <div className="px-8 flex flex-col items-center">
      <div className="-m-2 rounded-xl bg-gray-400/5 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl  flex-col space-y-3">
        <div className="grid">
          {data.map((pengumuman) => {
            return (
              <div
                className="border-b p-5 flex flex-col md:flex-row gap-5 w-full"
                key={pengumuman.id}
              >
                <Link href={`/post/${pengumuman.slug}`}>
                  <div className="md:w-[200px] md:h-[120px] h-[150px] relative md:block">
                    <Image
                      src={pengumuman.thumbnail || ""}
                      alt={pengumuman.judul}
                      fill={true}
                      className="object-cover w-full h-full md:block rounded-md ring-2 ring-gray-900/10 shadow-md"
                    />
                  </div>
                </Link>
                <div className="flex flex-col gap-3">
                  <Link href={`/post/${pengumuman.slug}`}>
                    <h2 className="text-base font-semibold leading-6">
                      {pengumuman.judul}
                    </h2>
                    <p className="mt-2 text-zinc-700">
                      {pengumuman.konten.length > 100
                        ? removeHtmlTags(pengumuman.konten.slice(0, 100)) +
                          "..."
                        : removeHtmlTags(pengumuman.konten)}
                    </p>
                  </Link>
                  <Link href={`/post/${pengumuman.slug}`}>
                    Baca Selengkapnya
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Link href="/post/pengumuman" className={cn(buttonVariants(), "mt-10")}>
        Lihat Semua Pengumuman
      </Link>
    </div>
  );
}
