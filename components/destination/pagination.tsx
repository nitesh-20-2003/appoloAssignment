"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Meta {
  pageCount: number;
  page: number;
}

interface PaginationDemoProps {
  meta: Meta;
  onPageChange: (page: number) => void;
}

export function PaginationDemo({ meta, onPageChange }: PaginationDemoProps) {
  if (!meta) return null; // Early return if meta is undefined

  const pages = Array.from({ length: meta.pageCount }, (_, i) => i + 1);

  if (meta.pageCount < 2) return null;

  return (
    <section>
      <div className="flex justify-end items-center pt-10">
        <div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className="cursor-pointer"
                  onClick={() => {
                    let prevPage = meta.page - 1;
                    if (prevPage < 1) prevPage = meta.pageCount;
                    onPageChange(prevPage);
                  }}
                />
              </PaginationItem>
              {pages.map((pageNumber) => (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    className="cursor-pointer"
                    isActive={pageNumber === meta.page}
                    onClick={() => onPageChange(pageNumber)}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  className="cursor-pointer"
                  onClick={() => {
                    let nextPage = meta.page + 1;
                    if (nextPage > meta.pageCount) nextPage = 1;
                    onPageChange(nextPage);
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </section>
  );
}
