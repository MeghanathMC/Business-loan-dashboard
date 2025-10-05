import { useState, useCallback, useMemo } from 'react';

interface UsePaginationProps {
  totalItems: number;
  initialPage?: number;
  itemsPerPage?: number;
  maxPages?: number;
}

interface UsePaginationReturn {
  currentPage: number;
  totalPages: number;
  pageItems: number[];
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (page: number) => void;
  startItem: number;
  endItem: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export function usePagination({
  totalItems,
  initialPage = 1,
  itemsPerPage = 10,
  maxPages = 5,
}: UsePaginationProps): UsePaginationReturn {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(totalItems / itemsPerPage)), [totalItems, itemsPerPage]);

  // Keep currentPage in bounds
  useMemo(() => {
    if (currentPage < 1) {
      setCurrentPage(1);
    } else if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const nextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const goToPage = useCallback((page: number) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(pageNumber);
  }, [totalPages]);

  // Generate array of page numbers to display
  const pageItems = useMemo(() => {
    const pages: number[] = [];
    
    // If we have fewer pages than the max we want to display
    if (totalPages <= maxPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }
    
    // Always include first page
    pages.push(1);
    
    // Calculate start and end of the middle section
    let startPage = Math.max(2, currentPage - Math.floor(maxPages / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxPages - 3);
    
    // Adjust if we're near the end
    if (endPage >= totalPages - 1) {
      endPage = totalPages - 1;
      startPage = Math.max(2, endPage - (maxPages - 3));
    }
    
    // Add ellipsis after first page if needed
    if (startPage > 2) {
      pages.push(-1); // -1 represents an ellipsis
    }
    
    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      pages.push(-2); // -2 represents an ellipsis
    }
    
    // Always include last page
    pages.push(totalPages);
    
    return pages;
  }, [currentPage, totalPages, maxPages]);

  // Calculate start and end items
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(startItem + itemsPerPage - 1, totalItems);

  return {
    currentPage,
    totalPages,
    pageItems,
    nextPage,
    prevPage,
    goToPage,
    startItem,
    endItem,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  };
}
