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

// Monthly applications data
const monthlyApplications = [
  { month: 'Jan', applications: 45, approved: 32 },
  { month: 'Feb', applications: 52, approved: 38 },
  { month: 'Mar', applications: 48, approved: 35 },
  { month: 'Apr', applications: 55, approved: 42 },
  { month: 'May', applications: 62, approved: 48 },
  { month: 'Jun', applications: 58, approved: 45 },
  { month: 'Jul', applications: 65, approved: 52 },
  { month: 'Aug', applications: 59, approved: 46 },
  { month: 'Sep', applications: 68, approved: 55 },
  { month: 'Oct', applications: 72, approved: 58 },
  { month: 'Nov', applications: 75, approved: 62 },
  { month: 'Dec', applications: 78, approved: 65 },
];

// Chart configuration
const chartConfig = {
  applications: {
    label: 'Applications',
    color: 'var(--color-violet-500)',
  },
  approved: {
    label: 'Approved',
    color: 'var(--color-green-500)',
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
  if (active && payload && payload.length) {
    // Calculate approval rate
    const applications = payload.find(p => p.dataKey === 'applications')?.value || 0;
    const approved = payload.find(p => p.dataKey === 'approved')?.value || 0;
    const approvalRate = applications > 0 ? Math.round((approved / applications) * 100) : 0;
    
    return (
      <div className="rounded-lg border bg-popover p-3 shadow-sm shadow-black/5 min-w-[180px]">
        <div className="text-xs font-medium text-muted-foreground tracking-wide mb-2.5">{label}</div>
        <div className="space-y-2">
          {payload.map((entry, index) => {
            const isApplications = entry.dataKey === 'applications';
            return (
              <div key={index} className="flex items-center justify-between gap-2 text-xs">
                <ChartLabel 
                  label={isApplications ? 'Applications:' : 'Approved:'} 
                  color={entry.color} 
                />
                <span className="font-semibold text-popover-foreground">{entry.value}</span>
              </div>
            );
          })}
          <div className="pt-1.5 mt-1.5 border-t border-border/50">
            <div className="flex items-center justify-between gap-2 text-xs">
              <span className="text-muted-foreground">Approval Rate:</span>
              <span className="font-semibold text-popover-foreground">{approvalRate}%</span>
            </div>
          </div>
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

export default function MonthlyApplicationsChart() {
  return (
    <Card className="w-full">
      <CardHeader className="border-0 pt-6 pb-4">
        <CardTitle className="text-lg font-semibold">Monthly Applications</CardTitle>
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
            data={monthlyApplications}
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
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: 'var(--text-muted-foreground)' }}
              domain={[0, 'auto']}
              tickMargin={10}
            />

            <ChartTooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3', stroke: 'var(--input)' }} />

            {/* Applications Line */}
            <Line 
              dataKey="applications" 
              type="monotone" 
              stroke="var(--color-applications)" 
              strokeWidth={3}
              dot={{ 
                stroke: 'var(--color-applications)',
                strokeWidth: 2,
                r: 4,
                fill: 'var(--background)'
              }}
              activeDot={{
                stroke: 'var(--color-applications)',
                strokeWidth: 2,
                r: 6,
                fill: 'var(--background)'
              }}
            />

            {/* Approved Line */}
            <Line 
              dataKey="approved" 
              type="monotone" 
              stroke="var(--color-approved)" 
              strokeWidth={3}
              dot={{ 
                stroke: 'var(--color-approved)',
                strokeWidth: 2,
                r: 4,
                fill: 'var(--background)'
              }}
              activeDot={{
                stroke: 'var(--color-approved)',
                strokeWidth: 2,
                r: 6,
                fill: 'var(--background)'
              }}
            />
          </LineChart>
        </ChartContainer>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6">
          <ChartLegend label="Applications" color={chartConfig.applications.color} />
          <ChartLegend label="Approved" color={chartConfig.approved.color} />
        </div>
      </CardContent>
    </Card>
  );
}
