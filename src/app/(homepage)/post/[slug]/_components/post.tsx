import { getPostBySlug } from "@/server/api/home/post";
import parse from "html-react-parser";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { id } from "date-fns/locale";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { capitalizeFirstLetter, cn } from "@/lib/utils";

export async function Post({ slug }: { slug: string }) {
  const post = await getPostBySlug(slug);

  return (
    <article className="prose">
      <div className="flex gap-5 mb-0">
        <div className="flex p-7 rounded-xl border  bg-gray-400/5 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl flex-col">
          <h1 className="mb-0 text-2xl md:text-4xl">{post?.judul}</h1>
          <div className="flex md:hidden text-sm">
            <p className="my-3">
              {format(post?.tanggal || new Date(), "cccc, dd MMMM yyyy", {
                locale: id,
              })}
            </p>
          </div>
          <h4 className="text-gray-500 mt-3 mb-5 font-normal md:flex hidden items-center gap-3 ">
            <span>
              {format(post?.tanggal || new Date(), "cccc, dd MMMM yyyy", {
                locale: id,
              })}
            </span>
            <span>|</span>
            <span className="-mt-1">
              <Badge className={cn("shadow-none")}>
                {post?.kategori === "aktivitas"
                  ? "Aktivitas"
                  : capitalizeFirstLetter(
                      post?.kategori.toLowerCase() || "lainnya"
                    )}
              </Badge>
            </span>
          </h4>
          <div className="">
            <div className="h-96 overflow-hidden rounded-md mb-5">
              <Image
                src={post?.thumbnail || siteConfig.thumbnailPlaceholder}
                alt={post?.judul || ""}
                width={500}
                height={300}
                className="object-cover h-full w-full rounded-md"
              />
            </div>
            {parse(post?.konten || "")}
          </div>
        </div>
      </div>
    </article>
  );
}
