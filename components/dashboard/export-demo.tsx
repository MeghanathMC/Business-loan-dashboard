'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExportDialog } from './export-dialog';
import { mockApplications } from '@/lib/mock-data';
import { Download, FileSpreadsheet, FileText, Filter } from 'lucide-react';

/**
 * Demo component showing export functionality
 * This can be used to test the export features
 */
export function ExportDemo() {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Filter applications based on demo filters
  const filteredApplications = mockApplications.filter(app => {
    const matchesStatus = selectedStatus === 'all' || app.status === selectedStatus;
    const matchesSearch = 
      searchTerm === '' ||
      app.applicant?.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicant?.industry.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  const getStatusCounts = () => {
    const counts = mockApplications.reduce((acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return counts;
  };

  const statusCounts = getStatusCounts();

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Export Functionality Demo</h3>
          <Badge variant="outline" className="flex items-center gap-1">
            <Filter className="h-3 w-3" />
            {filteredApplications.length} of {mockApplications.length} applications
          </Badge>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {Object.entries(statusCounts).map(([status, count]) => (
            <Button
              key={status}
              variant={selectedStatus === status ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedStatus(status)}
              className="justify-between"
            >
              <span className="capitalize">{status.replace('_', ' ')}</span>
              <Badge variant="secondary" className="ml-2">
                {count}
              </Badge>
            </Button>
          ))}
          <Button
            variant={selectedStatus === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedStatus('all')}
            className="justify-between"
          >
            <span>All</span>
            <Badge variant="secondary" className="ml-2">
              {mockApplications.length}
            </Badge>
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search by business name or industry..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-md text-sm"
          />
          
          <ExportDialog
            applications={mockApplications}
            filteredApplications={filteredApplications}
            filters={{ searchTerm, statusFilter: selectedStatus }}
          >
            <Button className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Filtered Data
            </Button>
          </ExportDialog>
        </div>

        <div className="text-sm text-muted-foreground">
          <p>• <strong>CSV Export:</strong> Lightweight format, good for data analysis</p>
          <p>• <strong>Excel Export:</strong> Rich formatting, includes multiple sheets</p>
          <p>• <strong>Filter Awareness:</strong> Only exports currently filtered applications</p>
          <p>• <strong>Financial Data:</strong> Optional inclusion of credit scores, ratios, etc.</p>
        </div>
      </div>
    </Card>
  );
}
