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
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/originui-avatar";
import { Badge } from "@/components/ui/originui-badge";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/shadcn-button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Eye, Building2, Mail, Phone, MapPin, Calendar, Hash, DollarSign, Clock } from "lucide-react";
import { LoanApplication } from "@/lib/types";
import { useCurrency } from "@/lib/settings-context";
import { formatCurrency } from "@/lib/currency-utils";

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

interface LoanApplicationsTableProps {
  applications: LoanApplication[];
  searchTerm?: string;
  statusFilter?: string;
}

function LoanApplicationsTable({ applications, searchTerm = '', statusFilter = 'all' }: LoanApplicationsTableProps) {
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
            Showing {filteredData.length} of {applications.length} applications
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
              <div className="w-[220px] flex-shrink-0">
                <Table className="w-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[220px] bg-muted/50 border-r border-border sticky left-0 z-10">
                        Business
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.length ? (
                      filteredData.map((application) => (
                        <TableRow key={application.id}>
                          <TableCell className="font-medium whitespace-nowrap bg-background border-r border-border sticky left-0 z-10 min-w-[220px]">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${application.applicant?.business_name}`} />
                                <AvatarFallback>
                                  {application.applicant?.business_name.charAt(0) || 'N'}
                                </AvatarFallback>
                              </Avatar>
                              <span className="truncate">{application.applicant?.business_name || 'N/A'}</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell className="text-center py-6 bg-background border-r border-border sticky left-0 z-10">
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
                    {visibleColumns.includes("Industry") && <TableHead className="w-[150px]">Industry</TableHead>}
                    {visibleColumns.includes("Loan Amount") && <TableHead className="w-[150px]">Loan Amount</TableHead>}
                    {visibleColumns.includes("Purpose") && <TableHead className="w-[150px]">Purpose</TableHead>}
                    {visibleColumns.includes("Term") && <TableHead className="w-[100px]">Term</TableHead>}
                    {visibleColumns.includes("Collateral") && <TableHead className="w-[150px]">Collateral</TableHead>}
                    {visibleColumns.includes("Status") && <TableHead className="w-[120px]">Status</TableHead>}
                    {visibleColumns.includes("Submitted") && <TableHead className="w-[120px]">Submitted</TableHead>}
                    {visibleColumns.includes("Contact") && <TableHead className="w-[200px]">Contact</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.length ? (
                    filteredData.map((application) => {
                      const status = statusConfig[application.status];
                      return (
                        <TableRow key={application.id}>
                          {visibleColumns.includes("Industry") && (
                            <TableCell className="whitespace-nowrap">
                              {application.applicant?.industry || 'N/A'}
                            </TableCell>
                          )}
                          {visibleColumns.includes("Loan Amount") && (
                            <TableCell className="whitespace-nowrap font-medium">
                              <div className="flex items-center gap-2">
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                                {formatCurrency(application.loan_amount, currency)}
                              </div>
                            </TableCell>
                          )}
                          {visibleColumns.includes("Purpose") && (
                            <TableCell className="whitespace-nowrap">
                              {application.loan_purpose}
                            </TableCell>
                          )}
                          {visibleColumns.includes("Term") && (
                            <TableCell className="whitespace-nowrap">
                              {application.loan_term_months} months
                            </TableCell>
                          )}
                          {visibleColumns.includes("Collateral") && (
                            <TableCell className="whitespace-nowrap">
                              {application.collateral_type && application.collateral_value ?
                                `${application.collateral_type} (${formatCurrency(application.collateral_value, currency)})` :
                                'N/A'
                              }
                            </TableCell>
                          )}
                          {visibleColumns.includes("Status") && (
                            <TableCell className="whitespace-nowrap">
                              <Badge className={status.color}>
                                {status.label}
                              </Badge>
                            </TableCell>
                          )}
                          {visibleColumns.includes("Submitted") && (
                            <TableCell className="whitespace-nowrap">
                              {new Date(application.submission_date).toLocaleDateString()}
                            </TableCell>
                          )}
                          {visibleColumns.includes("Contact") && (
                            <TableCell className="whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <div className="flex items-center gap-1 text-sm">
                                        <Mail className="h-3 w-3 text-muted-foreground" />
                                        <span className="truncate max-w-[120px]">
                                          {application.applicant?.contact_email || 'N/A'}
                                        </span>
                                      </div>
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
                      <TableCell colSpan={visibleColumns.filter(col => col !== "Business").length || 1} className="text-center py-6">
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
    </div>
  );
}

export default LoanApplicationsTable;
