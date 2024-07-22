import { getPostsTotalPages } from "@/server/api/home/post";
import { TablePagination } from "@/components/pagination";

export async function PostPagination({
  page,
  query,
  kategori,
}: {
  page: number;
  query: string;
  kategori: "artikel" | "kajian" | "pengumuman" | "aktivitas";
}) {
  const totalPages = await getPostsTotalPages({
    kategori,
    query,
  });

  return <TablePagination page={page} totalPages={totalPages} />;
}
