import { getPosts, getPostsTotalPages } from "@/server/api/post/queries";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { columns } from "./columns";
import { TablePagination } from "@/components/pagination";
import { DataTable } from "@/components/data-table";
import { SearchFilter } from "@/components/search-filter";
import { DeletePost } from "./actions";

export async function PostTable({
  page,
  query,
}: {
  page: number;
  query: string;
}) {
  const posts = await getPosts({ page, query });
  const totalPages = await getPostsTotalPages({ query });

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <SearchFilter placeholder="Cari Post" />
      </div>
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-[#f6f8fa] p-2 md:pt-0 shadow-sm">
          <div className="md:hidden">
            {posts.map((post) => (
              <div
                key={post.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="text-lg text-gray-500">
                    <p className="text-gray-800 text-sm">{post.judul}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <span className="text-sm capitalize">{post.kategori}</span>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/dashboard/post/${post.id}/edit`}
                      className={cn(
                        buttonVariants({ variant: "outline" }),
                        "px-2"
                      )}
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <DeletePost postId={post.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="md:block hidden">
            <DataTable columns={columns} data={posts} />
          </div>
        </div>
        <TablePagination totalPages={totalPages} page={page} />
      </div>
    </div>
  );
}
