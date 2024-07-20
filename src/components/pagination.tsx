"use client";

import { usePathname, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationLink,
} from "@/components/ui/pagination";
import { ChevronsRight, ChevronsLeft } from "lucide-react";

interface TablePaginationProps {
  page: number;
  totalPages: number;
}

export function TablePagination({ page, totalPages }: TablePaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));

    return `${pathname}?${params.toString()}`;
  };

  return (
    <Pagination className="mt-5">
      <PaginationContent>
        {page > 1 && (
          <>
            <PaginationItem className="hidden md:block">
              <PaginationLink
                aria-label="Go to first page"
                className="gap-1 pr-2.5"
                size="default"
                href={createPageUrl(1)}
              >
                <ChevronsLeft className="h-4 w-4" />
                <span>Pertama</span>
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationPrevious href={createPageUrl(currentPage - 1)} />
            </PaginationItem>

            {page > 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationLink
                isActive={false}
                href={createPageUrl(currentPage - 1)}
              >
                {page - 1}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <PaginationLink
            isActive={true}
            href={createPageUrl(currentPage)}
            className="bg-primary text-white hover:bg-primary hover:text-white"
          >
            {page}
          </PaginationLink>
        </PaginationItem>

        {page < totalPages && (
          <>
            <PaginationItem>
              <PaginationLink href={createPageUrl(currentPage + 1)}>
                {page + 1}
              </PaginationLink>
            </PaginationItem>

            {page < totalPages - 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext href={createPageUrl(currentPage + 1)} />
            </PaginationItem>
            <PaginationItem className="hidden md:block">
              <PaginationLink
                aria-label="Go to last page"
                size="default"
                className="gap-1 pr-2.5"
                href={createPageUrl(totalPages)}
              >
                <span>Terakhir</span>
                <ChevronsRight className="h-4 w-4" />
              </PaginationLink>
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </Pagination>
  );
}
