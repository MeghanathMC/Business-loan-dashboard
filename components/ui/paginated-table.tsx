import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { usePagination } from '@/hooks/use-pagination';

interface PaginatedTableProps<T> {
  data: T[];
  itemsPerPage?: number;
  renderHeader: () => React.ReactNode;
  renderRow: (item: T, index: number) => React.ReactNode;
  className?: string;
  emptyState?: React.ReactNode;
  boxedPagination?: boolean;
  showItemCount?: boolean;
}

export function PaginatedTable<T>({
  data,
  itemsPerPage = 10,
  renderHeader,
  renderRow,
  className = '',
  emptyState,
  boxedPagination = false,
  showItemCount = true,
}: PaginatedTableProps<T>) {
  const {
    currentPage,
    totalPages,
    pageItems,
    nextPage,
    prevPage,
    goToPage,
    startItem,
    endItem,
    hasNextPage,
    hasPrevPage,
  } = usePagination({
    totalItems: data.length,
    itemsPerPage,
  });

  // Get current items
  const currentItems = React.useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);

  return (
    <div className="space-y-4">
      {/* Table */}
      <div className={`w-full overflow-auto ${className}`}>
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b">
            {renderHeader()}
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {currentItems.length > 0 ? (
              currentItems.map((item, index) => renderRow(item, index))
            ) : (
              <tr>
                <td colSpan={100} className="h-24 text-center">
                  {emptyState || (
                    <div className="text-center text-muted-foreground">No results found</div>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {data.length > 0 && totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Item count */}
          {showItemCount && (
            <div className="text-sm text-muted-foreground">
              Showing {startItem} to {endItem} of {data.length} entries
            </div>
          )}

          {/* Pagination */}
          <Pagination>
            <PaginationContent className={boxedPagination ? "gap-0.5 rounded-lg border border-border p-1" : ""}>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (hasPrevPage) prevPage();
                  }}
                  className={!hasPrevPage ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>

              {pageItems.map((page, i) => {
                // Render ellipsis
                if (page < 0) {
                  return (
                    <PaginationItem key={`ellipsis-${i}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }

                // Render page number
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      isActive={page === currentPage}
                      onClick={(e) => {
                        e.preventDefault();
                        goToPage(page);
                      }}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (hasNextPage) nextPage();
                  }}
                  className={!hasNextPage ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
