'use client';

import { FinancialMetrics } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { useCurrency } from '@/lib/settings-context';
import { formatCurrency } from '@/lib/currency-utils';
import { formatPercent, formatRatio } from '@/lib/eligibility-calculator';
import { TrendingUp, TrendingDown, Activity, CreditCard } from 'lucide-react';

interface MetricsOverviewProps {
  metrics: FinancialMetrics;
}

export function MetricsOverview({ metrics }: MetricsOverviewProps) {
  const currency = useCurrency();
  const profitMargin = (metrics.net_profit / metrics.annual_revenue) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-muted-foreground">Credit Score</p>
          <CreditCard className="h-5 w-5 text-muted-foreground" />
        </div>
        <p className="text-3xl font-bold">{metrics.credit_score}</p>
        <p className="text-xs text-muted-foreground mt-1">
          {metrics.credit_score >= 700 ? 'Excellent' : metrics.credit_score >= 650 ? 'Good' : 'Fair'}
        </p>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-muted-foreground">Annual Revenue</p>
          <TrendingUp className="h-5 w-5 text-emerald-600" />
        </div>
        <p className="text-3xl font-bold">{formatCurrency(metrics.annual_revenue, currency)}</p>
        <p className="text-xs text-muted-foreground mt-1">
          Profit Margin: {profitMargin.toFixed(1)}%
        </p>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-muted-foreground">Current Ratio</p>
          <Activity className="h-5 w-5 text-blue-600" />
        </div>
        <p className="text-3xl font-bold">{formatRatio(metrics.current_ratio)}</p>
        <p className="text-xs text-muted-foreground mt-1">
          {metrics.current_ratio >= 1.5 ? 'Strong liquidity' : 'Adequate liquidity'}
        </p>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-muted-foreground">Cash Flow</p>
          <TrendingDown className="h-5 w-5 text-teal-600" />
        </div>
        <p className="text-3xl font-bold">{formatCurrency(metrics.cash_flow, currency)}</p>
        <p className="text-xs text-muted-foreground mt-1">
          Monthly avg: {formatCurrency(metrics.cash_flow / 12, currency)}
        </p>
      </Card>
    </div>
  );
}
