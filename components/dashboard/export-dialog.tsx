'use client';

import { useState } from 'react';
import { LoanApplication } from '@/lib/types';
import { exportApplications, ExportData, ExportOptions } from '@/lib/export-utils';
import { useCurrency } from '@/lib/settings-context';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Download, FileSpreadsheet, FileText, Settings } from 'lucide-react';

interface ExportDialogProps {
  applications: LoanApplication[];
  filteredApplications: LoanApplication[];
  filters: {
    searchTerm: string;
    statusFilter: string;
  };
  children: React.ReactNode;
}

export function ExportDialog({
  applications,
  filteredApplications,
  filters,
  children,
}: ExportDialogProps) {
  const { toast } = useToast();
  const currency = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    format: 'excel',
    filename: '',
    includeFinancialData: false,
    currency: currency,
  });

  const handleExport = async () => {
    if (filteredApplications.length === 0) {
      toast({
        title: 'No Data to Export',
        description: 'Please adjust your filters to include some applications.',
        variant: 'destructive',
      });
      return;
    }

    setIsExporting(true);

    try {
      const exportData: ExportData = {
        applications: filteredApplications,
        filters: {
          ...filters,
          totalCount: applications.length,
          filteredCount: filteredApplications.length,
        },
      };

      await exportApplications(exportData, { ...exportOptions, currency });

      toast({
        title: 'Export Successful',
        description: `Exported ${filteredApplications.length} applications to ${exportOptions.format.toUpperCase()}`,
      });

      setIsOpen(false);
    } catch (error) {
      console.error('Export failed:', error);
      toast({
        title: 'Export Failed',
        description: 'An error occurred while exporting the data. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsExporting(false);
    }
  };

  const getExportSummary = () => {
    const totalCount = applications.length;
    const filteredCount = filteredApplications.length;
    const statusText = filters.statusFilter === 'all' ? 'All Statuses' : filters.statusFilter.replace('_', ' ').toUpperCase();
    const searchText = filters.searchTerm ? `"${filters.searchTerm}"` : 'None';

    return {
      totalCount,
      filteredCount,
      statusText,
      searchText,
    };
  };

  const summary = getExportSummary();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Export Applications
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Export Summary */}
          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <h4 className="font-medium flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Export Summary
            </h4>
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Applications:</span>
                <span className="font-medium">{summary.totalCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Filtered Applications:</span>
                <span className="font-medium text-primary">{summary.filteredCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status Filter:</span>
                <span className="font-medium">{summary.statusText}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Search Term:</span>
                <span className="font-medium">{summary.searchText}</span>
              </div>
            </div>
          </div>

          {/* Export Options */}
          <div className="space-y-4">
            <h4 className="font-medium">Export Options</h4>
            
            {/* Format Selection */}
            <div className="space-y-2">
              <Label htmlFor="format">Export Format</Label>
              <Select
                value={exportOptions.format}
                onValueChange={(value: 'csv' | 'excel') =>
                  setExportOptions(prev => ({ ...prev, format: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excel">
                    <div className="flex items-center gap-2">
                      <FileSpreadsheet className="h-4 w-4" />
                      Excel (.xlsx)
                    </div>
                  </SelectItem>
                  <SelectItem value="csv">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      CSV (.csv)
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Filename */}
            <div className="space-y-2">
              <Label htmlFor="filename">Filename (optional)</Label>
              <Input
                id="filename"
                placeholder="Leave empty for auto-generated name"
                value={exportOptions.filename}
                onChange={(e) =>
                  setExportOptions(prev => ({ ...prev, filename: e.target.value }))
                }
              />
            </div>

            {/* Include Financial Data */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="includeFinancial"
                checked={exportOptions.includeFinancialData}
                onCheckedChange={(checked) =>
                  setExportOptions(prev => ({ ...prev, includeFinancialData: !!checked }))
                }
              />
              <Label htmlFor="includeFinancial" className="text-sm">
                Include financial metrics (credit score, revenue, ratios, etc.)
              </Label>
            </div>
          </div>

          {/* Export Button */}
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isExporting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleExport}
              disabled={isExporting || filteredApplications.length === 0}
              className="flex items-center gap-2"
            >
              {isExporting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  Export {summary.filteredCount} Applications
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
