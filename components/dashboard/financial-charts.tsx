'use client';

import { Card } from '@/components/ui/card';
import { FinancialMetrics } from '@/lib/types';
import { useCurrency } from '@/lib/settings-context';
import { formatCurrency } from '@/lib/currency-utils';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  PieChart,
  Pie,
  Legend,
} from 'recharts';

interface FinancialChartsProps {
  metrics: FinancialMetrics;
}

export function FinancialCharts({ metrics }: FinancialChartsProps) {
  const currency = useCurrency();
  const ratioData = [
    {
      name: 'Debt-to-Income',
      value: metrics.debt_to_income_ratio,
      threshold: 0.43,
      fill: metrics.debt_to_income_ratio <= 0.43 ? 'hsl(173, 58%, 39%)' : 'hsl(0, 84%, 60%)',
    },
    {
      name: 'Debt-to-Equity',
      value: metrics.debt_to_equity_ratio,
      threshold: 2.0,
      fill: metrics.debt_to_equity_ratio <= 2.0 ? 'hsl(173, 58%, 39%)' : 'hsl(0, 84%, 60%)',
    },
    {
      name: 'Current Ratio',
      value: metrics.current_ratio,
      threshold: 1.2,
      fill: metrics.current_ratio >= 1.2 ? 'hsl(173, 58%, 39%)' : 'hsl(0, 84%, 60%)',
    },
  ];

  const assetsLiabilities = [
    { name: 'Total Assets', value: metrics.total_assets, fill: 'hsl(173, 58%, 39%)' },
    { name: 'Total Liabilities', value: metrics.total_liabilities, fill: 'hsl(0, 84%, 60%)' },
  ];

  const revenueBreakdown = [
    { name: 'Net Profit', value: metrics.net_profit, fill: 'hsl(173, 58%, 39%)' },
    {
      name: 'Operating Expenses',
      value: metrics.annual_revenue - metrics.net_profit,
      fill: 'hsl(197, 37%, 24%)',
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Key Financial Ratios</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={ratioData}>
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
            <Tooltip
              formatter={(value: number) => value.toFixed(2)}
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
              {ratioData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Assets vs Liabilities</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={assetsLiabilities}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {assetsLiabilities.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) =>
                formatCurrency(value, currency)
              }
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Revenue Breakdown</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={revenueBreakdown}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {revenueBreakdown.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) =>
                formatCurrency(value, currency)
              }
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Liquidity Position</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Current Assets</span>
              <span className="font-semibold">
                {formatCurrency(metrics.current_assets, currency)}
              </span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Current Liabilities</span>
              <span className="font-semibold">
                {formatCurrency(metrics.current_liabilities, currency)}
              </span>
            </div>
            <div className="pt-3 mt-3 border-t">
              <div className="flex justify-between">
                <span className="font-semibold">Current Ratio</span>
                <span className="text-2xl font-bold">{metrics.current_ratio.toFixed(2)}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {metrics.current_ratio >= 2
                  ? 'Excellent liquidity position'
                  : metrics.current_ratio >= 1.5
                  ? 'Strong liquidity position'
                  : metrics.current_ratio >= 1.2
                  ? 'Adequate liquidity position'
                  : 'Weak liquidity position'}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
