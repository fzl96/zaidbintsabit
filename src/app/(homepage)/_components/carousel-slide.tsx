import { getLatestPost } from "@/server/api/home/post";
import { Carousel } from "./carousel";

export async function CarouselSlide() {
  const kegiatan = await getLatestPost(5, "aktivitas");

  return (
    <Carousel
      imgs={kegiatan.map((item) => {
        return {
          src: item.thumbnail,
          title: item.judul,
          href: `/post/${item.slug}`,
        };
      })}
    />
  );
}
