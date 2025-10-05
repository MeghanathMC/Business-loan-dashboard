'use client';

import { AnalyticsCharts } from '@/components/dashboard/analytics-charts';
import { GaugeChart } from '@/components/dashboard/gauge-chart';
import { BulletChart } from '@/components/dashboard/bullet-chart';
import LoanFunnelChart from '@/components/dashboard/loan-funnel-chart';
import LoanTrendChart from '@/components/dashboard/loan-trend-chart';
import MonthlyApplicationsChart from '@/components/dashboard/monthly-applications-chart';
import AnalyticsCards from '@/components/ui/analytics-cards';
import { Button } from '@/components/ui/button';
import { useCurrency } from '@/lib/settings-context';
import { formatCurrency } from '@/lib/currency-utils';
import { ArrowLeft, BarChart3, TrendingUp, Users, DollarSign, Download } from 'lucide-react';
import Link from 'next/link';

export default function AnalyticsPage() {
  const currency = useCurrency();
  
  // Mock analytics data for KPIs
  const analyticsData = {
    totalLoans: 125000000,
    totalApplications: 485,
    approvalRate: 72.3,
    averageLoanSize: 257731,
    activeBorrowers: 156,
    portfolioGrowth: 15.2,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-6">
          <div className="relative flex items-center justify-between">
            {/* Back */}
            <Link href="/">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>

            {/* Heading */}
            <div className="absolute left-1/2 -translate-x-1/2 text-center">
              <h1 className="text-3xl font-bold flex items-center gap-3 justify-center">
                <BarChart3 className="h-8 w-8" />
                Analytics Dashboard
              </h1>
              <p className="text-muted-foreground mt-1 whitespace-nowrap">
                Comprehensive loan portfolio analysis and performance metrics
              </p>
            </div>

            {/* Export */}
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Analytics
            </Button>
          </div>
        </div>
      </div>

      {/* Modern KPI Cards with Charts */}
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <AnalyticsCards />
        </div>

        {/* Performance Gauges */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Performance Metrics</h2>
            <p className="text-sm text-muted-foreground">
              Key performance indicators with targets and benchmarks
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <GaugeChart
              title="Approval Rate"
              value={analyticsData.approvalRate}
              max={100}
              target={70}
              subtitle="Target: 70%"
              color="success"
            />
            
            <BulletChart
              title="Monthly Loan Volume"
              value={analyticsData.totalLoans / 12}
              target={10000000}
              max={15000000}
              ranges={{
                poor: 5000000,
                fair: 8000000,
                good: 12000000
              }}
              unit=""
              formatValue={(val) => formatCurrency(val, currency)}
            />

            <GaugeChart
              title="Portfolio Growth"
              value={analyticsData.portfolioGrowth}
              max={30}
              target={12}
              subtitle="Target: 12%"
              color="success"
            />
          </div>
        </div>

        {/* Loan Trend and Monthly Applications Charts */}
        <div className="space-y-6 mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Loan Performance</h2>
            <p className="text-sm text-muted-foreground">
              Track loan volume and application trends over time
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LoanTrendChart />
            <MonthlyApplicationsChart />
          </div>
        </div>

        {/* Loan Funnel Chart */}
        <div className="space-y-6 mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Loan Application Funnel</h2>
            <p className="text-sm text-muted-foreground">
              Track conversion rates through the loan application process
            </p>
          </div>

          <LoanFunnelChart />
        </div>

        {/* Charts Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Portfolio Analytics</h2>
            <p className="text-sm text-muted-foreground">
              Interactive charts showing loan portfolio performance and trends
            </p>
          </div>

          <AnalyticsCharts />
        </div>
      </div>
    </div>
  );
}
