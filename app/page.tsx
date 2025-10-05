'use client';

import { useState } from 'react';
import Link from 'next/link';
import { mockApplications } from '@/lib/mock-data';
import { useCurrency } from '@/lib/settings-context';
import { formatCurrency } from '@/lib/currency-utils';
import { ApplicationCard } from '@/components/dashboard/application-card';
import { ExportDialog } from '@/components/dashboard/export-dialog';
import { StatusCard } from '@/components/dashboard/status-card';
import PaginatedLoanTable from '@/components/ui/paginated-loan-table';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, Filter, BarChart, Download, Settings, LayoutGrid, List } from 'lucide-react';
import Image from 'next/image';

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [applications, setApplications] = useState(mockApplications);
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const currency = useCurrency();

  const filteredApplications = applications.filter(app => {
    const matchesSearch =
      searchTerm === '' ||
      app.applicant?.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicant?.industry.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'pending').length,
    underReview: applications.filter(a => a.status === 'under_review').length,
    approved: applications.filter(a => a.status === 'approved').length,
    totalAmount: applications.reduce((sum, app) => sum + app.loan_amount, 0),
  };


  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-3 flex-wrap">
                <Image src="/logo.png" alt="Logo" width={32} height={32} className="rounded" />
                Business Loan Dashboard
              </h1>
              <p className="text-muted-foreground mt-1 text-sm sm:text-base">
                Analyze applications, assess eligibility, and make informed decisions
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              {/* View Mode Toggle */}
              <div className="flex items-center border rounded-lg p-1">
                <Button
                  variant={viewMode === 'cards' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('cards')}
                  className="px-3 py-1"
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'table' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('table')}
                  className="px-3 py-1"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              <Link href="/analytics" className="w-full sm:w-auto">
                <Button variant="outline" className="flex items-center gap-2 w-full sm:w-auto">
                  <BarChart className="h-4 w-4" />
                  <span className="sm:inline">View Analytics</span>
                </Button>
              </Link>
              <Link href="/settings" className="w-full sm:w-auto">
                <Button variant="outline" className="flex items-center gap-2 w-full sm:w-auto">
                  <Settings className="h-4 w-4" />
                  <span className="sm:inline">Settings</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatusCard
            title="Total Applications"
            value={stats.total}
            variant="lead"
          />

          <StatusCard
            title="Pending Review"
            value={stats.pending}
            variant="started"
          />

          <StatusCard
            title="Under Review"
            value={stats.underReview}
            variant="closed"
          />

          <StatusCard
            title="Total Loan Value"
            value={formatCurrency(stats.totalAmount, currency)}
            variant="approved"
          />
        </div>

        <div className="bg-card border rounded-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by business name or industry..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="under_review">Under Review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="more_info_needed">More Info Needed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <ExportDialog
              applications={applications}
              filteredApplications={filteredApplications}
              filters={{ searchTerm, statusFilter }}
            >
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </ExportDialog>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Applications ({filteredApplications.length})
            </h2>
          </div>

          {viewMode === 'cards' ? (
            <>
              {filteredApplications.length === 0 ? (
                <div className="bg-card border rounded-lg p-12 text-center">
                  <p className="text-muted-foreground">No applications found matching your criteria</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                  {filteredApplications.map(application => (
                    <ApplicationCard
                      key={application.id}
                      application={application}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <PaginatedLoanTable
              applications={applications}
              searchTerm={searchTerm}
              statusFilter={statusFilter}
              itemsPerPage={10}
            />
          )}
        </div>
      </div>

    </div>
  );
}
