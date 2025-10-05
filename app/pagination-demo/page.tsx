'use client';

import React from 'react';
import { PaginatedTable } from '@/components/ui/paginated-table';
import { BoxedPagination, PaginationDemo } from '@/components/ui/pagination-demo';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Sample data for the table
const mockLoans = Array.from({ length: 100 }, (_, i) => ({
  id: `LOAN-${(i + 1).toString().padStart(3, '0')}`,
  borrower: `Borrower ${i + 1}`,
  amount: Math.floor(Math.random() * 500000) + 50000,
  status: ['Pending', 'Approved', 'Rejected', 'In Review'][Math.floor(Math.random() * 4)],
  date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toLocaleDateString(),
}));

export default function PaginationDemoPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold">Pagination Demo</h1>
                <p className="text-muted-foreground mt-1">
                  Examples of different pagination styles and implementations
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="space-y-12">
          {/* Basic Pagination */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Basic Pagination</h2>
            <div className="border rounded-lg p-6 bg-card">
              <PaginationDemo />
            </div>
          </div>

          {/* Boxed Pagination */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Boxed Pagination</h2>
            <div className="border rounded-lg p-6 bg-card">
              <BoxedPagination />
            </div>
          </div>

          {/* Paginated Table */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Paginated Table</h2>
            <div className="border rounded-lg p-6 bg-card">
              <PaginatedTable
                data={mockLoans}
                itemsPerPage={10}
                boxedPagination={true}
                renderHeader={() => (
                  <tr>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Loan ID</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Borrower</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Amount</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Date</th>
                  </tr>
                )}
                renderRow={(loan, index) => (
                  <tr key={loan.id} className="border-b transition-colors hover:bg-muted/50">
                    <td className="p-4 align-middle font-medium">{loan.id}</td>
                    <td className="p-4 align-middle">{loan.borrower}</td>
                    <td className="p-4 align-middle">${loan.amount.toLocaleString()}</td>
                    <td className="p-4 align-middle">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          loan.status === 'Approved'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                            : loan.status === 'Rejected'
                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                            : loan.status === 'In Review'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                        }`}
                      >
                        {loan.status}
                      </span>
                    </td>
                    <td className="p-4 align-middle">{loan.date}</td>
                  </tr>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
