'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardToolbar } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip } from '@/components/ui/line-charts-4';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Calendar, Download, Filter, MoreHorizontal, RefreshCw, Share2 } from 'lucide-react';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import { formatCurrency, formatCurrencyCompact } from '@/lib/currency-utils';
import { useCurrency } from '@/lib/settings-context';

// Loan volume trend data
const loanVolumeTrend = [
  { month: 'Jan', volume: 2400000, applications: 45 },
  { month: 'Feb', volume: 2800000, applications: 52 },
  { month: 'Mar', volume: 3200000, applications: 48 },
  { month: 'Apr', volume: 2900000, applications: 55 },
  { month: 'May', volume: 3600000, applications: 62 },
  { month: 'Jun', volume: 3800000, applications: 58 },
  { month: 'Jul', volume: 4200000, applications: 65 },
  { month: 'Aug', volume: 3900000, applications: 59 },
  { month: 'Sep', volume: 4500000, applications: 68 },
  { month: 'Oct', volume: 4800000, applications: 72 },
  { month: 'Nov', volume: 5200000, applications: 75 },
  { month: 'Dec', volume: 5500000, applications: 78 },
];

// Chart configuration
const chartConfig = {
  volume: {
    label: 'Loan Volume',
    color: 'var(--color-blue-600)',
  },
  applications: {
    label: 'Applications',
    color: 'var(--color-orange-500)',
  },
} satisfies ChartConfig;

// Custom Tooltip Component
interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    dataKey: string;
    value: number;
    color: string;
  }>;
  label?: string;
}

const ChartLabel = ({ label, color }: { label: string; color: string }) => {
  return (
    <div className="flex items-center gap-1.5">
      <div className="size-3.5 border-4 rounded-full bg-background" style={{ borderColor: color }}></div>
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  const currency = useCurrency();
  
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-popover p-3 shadow-sm shadow-black/5 min-w-[180px]">
        <div className="text-xs font-medium text-muted-foreground tracking-wide mb-2.5">{label}</div>
        <div className="space-y-2">
          {payload.map((entry, index) => {
            const isVolume = entry.dataKey === 'volume';
            return (
              <div key={index} className="flex items-center justify-between gap-2 text-xs">
                <ChartLabel 
                  label={isVolume ? 'Loan Volume:' : 'Applications:'} 
                  color={entry.color} 
                />
                <span className="font-semibold text-popover-foreground">
                  {isVolume 
                    ? formatCurrency(entry.value, currency)
                    : entry.value
                  }
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  return null;
};

// Chart Legend Component
const ChartLegend = ({ label, color }: { label: string; color: string }) => {
  return (
    <div className="flex items-center gap-2">
      <div
        className="size-3.5 border-4 rounded-full bg-background border-border"
        style={{ borderColor: `${color}` }}
      ></div>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  );
};

export default function LoanTrendChart() {
  const currency = useCurrency();
  
  return (
    <Card className="w-full">
      <CardHeader className="border-0 pt-6 pb-4">
        <CardTitle className="text-lg font-semibold">Total Loan Volume Trend</CardTitle>
        <CardToolbar>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="h-8 w-8 p-0 flex items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export Data
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Change Date Range
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter Data
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Refresh
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Share Report
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardToolbar>
      </CardHeader>

      <CardContent className="ps-0 pe-4.5 pb-6">
        <ChartContainer
          config={chartConfig}
          className="h-[300px] w-full mb-6 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-initial"
        >
          <LineChart
            data={loanVolumeTrend}
            margin={{
              top: 5,
              right: 20,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid
              strokeDasharray="4 8"
              stroke="var(--input)"
              strokeOpacity={1}
              horizontal={true}
              vertical={false}
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: 'var(--text-muted-foreground)' }}
              tickMargin={10}
            />

            <YAxis
              yAxisId="left"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: 'var(--text-muted-foreground)' }}
              tickFormatter={(value) => formatCurrencyCompact(value, currency)}
              domain={['auto', 'auto']}
              tickMargin={10}
            />

            <YAxis
              yAxisId="right"
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: 'var(--text-muted-foreground)' }}
              tickMargin={10}
            />

            <ChartTooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3', stroke: 'var(--input)' }} />

            {/* Loan Volume Line */}
            <Line 
              yAxisId="left"
              dataKey="volume" 
              type="monotone" 
              stroke="var(--color-volume)" 
              strokeWidth={3}
              dot={{ 
                stroke: 'var(--color-volume)',
                strokeWidth: 2,
                r: 4,
                fill: 'var(--background)'
              }}
              activeDot={{
                stroke: 'var(--color-volume)',
                strokeWidth: 2,
                r: 6,
                fill: 'var(--background)'
              }}
            />

            {/* Applications Line */}
            <Line 
              yAxisId="right"
              dataKey="applications" 
              type="monotone" 
              stroke="var(--color-applications)" 
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ 
                stroke: 'var(--color-applications)',
                strokeWidth: 2,
                r: 3,
                fill: 'var(--background)'
              }}
              activeDot={{
                stroke: 'var(--color-applications)',
                strokeWidth: 2,
                r: 5,
                fill: 'var(--background)'
              }}
            />
          </LineChart>
        </ChartContainer>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6">
          <ChartLegend label="Loan Volume" color={chartConfig.volume.color} />
          <ChartLegend label="Applications" color={chartConfig.applications.color} />
        </div>
      </CardContent>
    </Card>
  );
}
