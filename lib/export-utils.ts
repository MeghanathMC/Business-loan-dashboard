import * as XLSX from 'xlsx';
import { LoanApplication } from './types';
import { formatCurrency } from './currency-utils';

export interface ExportOptions {
  format: 'csv' | 'excel';
  filename?: string;
  includeFinancialData?: boolean;
  currency?: any; // CurrencySettings type
}

export interface ExportData {
  applications: LoanApplication[];
  filters: {
    searchTerm: string;
    statusFilter: string;
    totalCount: number;
    filteredCount: number;
  };
}

/**
 * Converts loan application data to a flat structure suitable for export
 */
export function prepareApplicationData(
  applications: LoanApplication[],
  includeFinancialData: boolean = false,
  currency?: any
): any[] {
  return applications.map(app => {
    const baseData = {
      'Application ID': app.id,
      'Business Name': app.applicant?.business_name || 'N/A',
      'Industry': app.applicant?.industry || 'N/A',
      'Business Type': app.applicant?.business_type || 'N/A',
      'Contact Name': app.applicant?.contact_name || 'N/A',
      'Contact Email': app.applicant?.contact_email || 'N/A',
      'Contact Phone': app.applicant?.contact_phone || 'N/A',
      'Years in Business': app.applicant?.years_in_business || 0,
      'Tax ID': app.applicant?.tax_id || 'N/A',
      'Address': app.applicant?.address || 'N/A',
      'Loan Amount': currency ? formatCurrency(app.loan_amount, currency) : app.loan_amount,
      'Loan Purpose': app.loan_purpose,
      'Loan Term (Months)': app.loan_term_months,
      'Collateral Type': app.collateral_type || 'N/A',
      'Collateral Value': currency ? formatCurrency(app.collateral_value, currency) : app.collateral_value,
      'Status': app.status.replace('_', ' ').toUpperCase(),
      'Submission Date': new Date(app.submission_date).toLocaleDateString(),
      'Review Date': app.review_date ? new Date(app.review_date).toLocaleDateString() : 'N/A',
      'Decision Date': app.decision_date ? new Date(app.decision_date).toLocaleDateString() : 'N/A',
      'Assigned Analyst': app.assigned_analyst_id || 'N/A',
      'Created At': new Date(app.created_at).toLocaleDateString(),
      'Updated At': new Date(app.updated_at).toLocaleDateString(),
    };

    // Add financial data if requested
    if (includeFinancialData && app.financial_metrics) {
      const metrics = app.financial_metrics;
      return {
        ...baseData,
        'Credit Score': metrics.credit_score,
        'Annual Revenue': currency ? formatCurrency(metrics.annual_revenue, currency) : metrics.annual_revenue,
        'Net Profit': currency ? formatCurrency(metrics.net_profit, currency) : metrics.net_profit,
        'Total Assets': currency ? formatCurrency(metrics.total_assets, currency) : metrics.total_assets,
        'Total Liabilities': currency ? formatCurrency(metrics.total_liabilities, currency) : metrics.total_liabilities,
        'Current Assets': currency ? formatCurrency(metrics.current_assets, currency) : metrics.current_assets,
        'Current Liabilities': currency ? formatCurrency(metrics.current_liabilities, currency) : metrics.current_liabilities,
        'Cash Flow': currency ? formatCurrency(metrics.cash_flow, currency) : metrics.cash_flow,
        'Debt to Income Ratio': metrics.debt_to_income_ratio,
        'Debt to Equity Ratio': metrics.debt_to_equity_ratio,
        'Current Ratio': metrics.current_ratio,
        'LTV Ratio': app.collateral_value > 0 ? (app.loan_amount / app.collateral_value * 100).toFixed(2) + '%' : 'N/A',
      };
    }

    return baseData;
  });
}

/**
 * Exports data to CSV format
 */
export function exportToCSV(data: any[], filename: string): void {
  if (data.length === 0) {
    throw new Error('No data to export');
  }

  // Get headers from the first row
  const headers = Object.keys(data[0]);
  
  // Create CSV content
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Escape values that contain commas, quotes, or newlines
        if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');

  // Create and download file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Exports data to Excel format
 */
export function exportToExcel(data: any[], filename: string): void {
  if (data.length === 0) {
    throw new Error('No data to export');
  }

  // Create a new workbook
  const workbook = XLSX.utils.book_new();
  
  // Convert data to worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);
  
  // Auto-size columns
  const columnWidths = Object.keys(data[0]).map(key => ({
    wch: Math.max(key.length, 15)
  }));
  worksheet['!cols'] = columnWidths;
  
  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Loan Applications');
  
  // Generate and download file
  XLSX.writeFile(workbook, `${filename}.xlsx`);
}

/**
 * Main export function that handles both CSV and Excel exports
 */
export function exportApplications(
  exportData: ExportData,
  options: ExportOptions
): void {
  const { applications, filters } = exportData;
  const { format, filename, includeFinancialData } = options;
  
  // Prepare data for export
  const preparedData = prepareApplicationData(applications, includeFinancialData, options.currency);
  
  // Generate filename with timestamp and filter info
  const timestamp = new Date().toISOString().split('T')[0];
  const filterSuffix = filters.statusFilter !== 'all' ? `_${filters.statusFilter}` : '';
  const searchSuffix = filters.searchTerm ? `_search-${filters.searchTerm.slice(0, 10)}` : '';
  const defaultFilename = `loan_applications_${timestamp}${filterSuffix}${searchSuffix}`;
  const finalFilename = filename || defaultFilename;
  
  try {
    if (format === 'csv') {
      exportToCSV(preparedData, finalFilename);
    } else if (format === 'excel') {
      exportToExcel(preparedData, finalFilename);
    } else {
      throw new Error('Unsupported export format');
    }
  } catch (error) {
    console.error('Export failed:', error);
    throw error;
  }
}

/**
 * Generates export summary information
 */
export function generateExportSummary(exportData: ExportData): string {
  const { filters } = exportData;
  const summary = [
    `Export Summary`,
    `Total Applications: ${filters.totalCount}`,
    `Filtered Applications: ${filters.filteredCount}`,
    `Status Filter: ${filters.statusFilter === 'all' ? 'All Statuses' : filters.statusFilter.replace('_', ' ').toUpperCase()}`,
    `Search Term: ${filters.searchTerm || 'None'}`,
    `Export Date: ${new Date().toLocaleString()}`,
  ].join('\n');
  
  return summary;
}
