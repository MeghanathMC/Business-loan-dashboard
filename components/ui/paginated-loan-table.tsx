"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/originui-table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/originui-tooltip";
import { CompanyLogo, getCompanyCodeFromName } from "@/components/ui/company-logo";
import { Badge } from "@/components/ui/originui-badge";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/shadcn-button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Eye, Building2, Mail, Phone, MapPin, Calendar, Hash, DollarSign, Clock } from "lucide-react";
import { LoanApplication } from "@/lib/types";
import { useCurrency } from "@/lib/settings-context";
import { formatCurrency } from "@/lib/currency-utils";
import { usePagination } from "@/hooks/use-pagination";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const statusConfig = {
  pending: { label: 'Pending', variant: 'secondary' as const, color: 'bg-slate-100 text-slate-700' },
  under_review: { label: 'Under Review', variant: 'default' as const, color: 'bg-blue-100 text-blue-700' },
  approved: { label: 'Approved', variant: 'default' as const, color: 'bg-emerald-100 text-emerald-700' },
  rejected: { label: 'Rejected', variant: 'destructive' as const, color: 'bg-red-100 text-red-700' },
  more_info_needed: { label: 'More Info Needed', variant: 'outline' as const, color: 'bg-amber-100 text-amber-700' },
};

const allColumns = [
  "Business",
  "Industry",
  "Loan Amount",
  "Purpose",
  "Term",
  "Collateral",
  "Status",
  "Submitted",
  "Contact",
] as const;

interface PaginatedLoanTableProps {
  applications: LoanApplication[];
  searchTerm?: string;
  statusFilter?: string;
  itemsPerPage?: number;
}

function PaginatedLoanTable({ 
  applications, 
  searchTerm = '', 
  statusFilter = 'all',
  itemsPerPage = 10
}: PaginatedLoanTableProps) {
  const currency = useCurrency();
  const [visibleColumns, setVisibleColumns] = useState<string[]>([...allColumns]);

  // Filter applications based on search and status
  const filteredData = applications.filter(app => {
    const matchesSearch =
      searchTerm === '' ||
      app.applicant?.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicant?.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.loan_purpose.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Pagination
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
    totalItems: filteredData.length,
    itemsPerPage,
  });

  // Get current items
  const currentItems = (() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  })();

  const toggleColumn = (col: string) => {
    setVisibleColumns((prev) =>
      prev.includes(col)
        ? prev.filter((c) => c !== col)
        : [...prev, col]
    );
  };

  return (
    <div className="space-y-4">
      {/* Column Visibility Controls */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Showing {startItem}-{endItem} of {filteredData.length} applications
          </span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            {allColumns.map((col) => (
              <DropdownMenuCheckboxItem
                key={col}
                checked={visibleColumns.includes(col)}
                onCheckedChange={() => toggleColumn(col)}
              >
                {col}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table with Fixed Business Column */}
      <div className="border border-border rounded-lg bg-background shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <div className="inline-flex min-w-full">
            {/* Fixed Business Column */}
            {visibleColumns.includes("Business") && (
              <div className="w-[280px] flex-shrink-0">
                <Table className="w-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[280px] bg-muted/50 border-r border-border sticky left-0 z-10 h-12">
                        Business
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentItems.length ? (
                      currentItems.map((application) => (
                        <TableRow key={application.id}>
                          <TableCell className="font-medium bg-background border-r border-border sticky left-0 z-10 min-w-[280px] h-16">
                            <div className="flex items-center gap-3">
                              <CompanyLogo 
                                code={getCompanyCodeFromName(application.applicant?.business_name || '')} 
                                fallbackText={application.applicant?.business_name.substring(0, 2).toUpperCase()}
                                size={32}
                                alt={application.applicant?.business_name}
                              />
                              <span className="text-sm">{application.applicant?.business_name || 'N/A'}</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell className="text-center py-6 h-16 bg-background border-r border-border sticky left-0 z-10">
                          No applications found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}

            {/* Scrollable Columns */}
            <div className="overflow-x-auto">
              <Table className="min-w-max">
                <TableHeader>
                  <TableRow>
                    {visibleColumns.includes("Industry") && <TableHead className="w-[150px] h-12">Industry</TableHead>}
                    {visibleColumns.includes("Loan Amount") && <TableHead className="w-[150px] h-12">Loan Amount</TableHead>}
                    {visibleColumns.includes("Purpose") && <TableHead className="w-[200px] h-12">Purpose</TableHead>}
                    {visibleColumns.includes("Term") && <TableHead className="w-[150px] h-12">Term</TableHead>}
                    {visibleColumns.includes("Collateral") && <TableHead className="w-[150px] h-12">Collateral</TableHead>}
                    {visibleColumns.includes("Status") && <TableHead className="w-[150px] h-12">Status</TableHead>}
                    {visibleColumns.includes("Submitted") && <TableHead className="w-[150px] h-12">Submitted</TableHead>}
                    {visibleColumns.includes("Contact") && <TableHead className="w-[200px] h-12">Contact</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentItems.length ? (
                    currentItems.map((application) => {
                      const status = statusConfig[application.status];
                      return (
                        <TableRow key={application.id}>
                          {visibleColumns.includes("Industry") && (
                            <TableCell className="w-[150px] h-16 align-middle">
                              {application.applicant?.industry || 'N/A'}
                            </TableCell>
                          )}
                          {visibleColumns.includes("Loan Amount") && (
                            <TableCell className="w-[150px] h-16 align-middle font-medium">
                              <div className="flex items-center gap-2">
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                                {formatCurrency(application.loan_amount, currency)}
                              </div>
                            </TableCell>
                          )}
                          {visibleColumns.includes("Purpose") && (
                            <TableCell className="w-[200px] h-16 align-middle max-w-[200px]">
                              <div className="line-clamp-2">{application.loan_purpose}</div>
                            </TableCell>
                          )}
                          {visibleColumns.includes("Term") && (
                            <TableCell className="w-[150px] h-16 align-middle">
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                {application.loan_term_months} months
                              </div>
                            </TableCell>
                          )}
                          {visibleColumns.includes("Collateral") && (
                            <TableCell className="w-[150px] h-16 align-middle">
                              {application.collateral_type && application.collateral_value ?
                                `${application.collateral_type} (${formatCurrency(application.collateral_value, currency)})` :
                                'N/A'
                              }
                            </TableCell>
                          )}
                          {visibleColumns.includes("Status") && (
                            <TableCell className="w-[150px] h-16 align-middle">
                              <Badge className={status.color}>
                                {status.label}
                              </Badge>
                            </TableCell>
                          )}
                          {visibleColumns.includes("Submitted") && (
                            <TableCell className="w-[150px] h-16 align-middle">
                              {new Date(application.submission_date).toLocaleDateString()}
                            </TableCell>
                          )}
                          {visibleColumns.includes("Contact") && (
                            <TableCell className="w-[200px] h-16 align-middle">
                              <div className="flex items-center gap-2">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <a
                                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(application.applicant?.contact_email || '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1 text-sm underline-offset-2 hover:underline"
                                      >
                                        <Mail className="h-3 w-3 text-muted-foreground" />
                                        <span className="truncate max-w-[120px]">
                                          {application.applicant?.contact_email || 'N/A'}
                                        </span>
                                      </a>
                                    </TooltipTrigger>
                                    <TooltipContent className="text-sm">
                                      <p className="font-semibold">{application.applicant?.contact_name}</p>
                                      <p className="text-xs text-muted-foreground">{application.applicant?.contact_email}</p>
                                      <p className="text-xs">{application.applicant?.contact_phone}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            </TableCell>
                          )}
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={visibleColumns.filter(col => col !== "Business").length || 1} className="text-center py-6 h-16">
                        No applications found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      {filteredData.length > 0 && totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
          {/* Item count */}
          <div className="text-sm text-muted-foreground">
            Showing {startItem} to {endItem} of {filteredData.length} entries
          </div>

          {/* Pagination */}
          <Pagination>
            <PaginationContent className="gap-0.5 rounded-lg border border-border p-1">
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

export default PaginatedLoanTable;
