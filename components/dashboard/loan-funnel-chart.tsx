'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardToolbar } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip } from '@/components/ui/area-charts-2';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileCheck, FileText, FileSearch, FileClock, TrendingDown, TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/currency-utils';
import { useCurrency } from '@/lib/settings-context';

// Loan application funnel data for different periods
const loanFunnelData = {
  '7d': [
    { period: 'Mon', submitted: 45, initialReview: 38, underReview: 32, finalReview: 25, approved: 20 },
    { period: 'Tue', submitted: 52, initialReview: 45, underReview: 38, finalReview: 30, approved: 24 },
    { period: 'Wed', submitted: 38, initialReview: 32, underReview: 28, finalReview: 22, approved: 18 },
    { period: 'Thu', submitted: 60, initialReview: 52, underReview: 45, finalReview: 36, approved: 30 },
    { period: 'Fri', submitted: 48, initialReview: 42, underReview: 35, finalReview: 28, approved: 22 },
    { period: 'Sat', submitted: 35, initialReview: 30, underReview: 25, finalReview: 20, approved: 15 },
    { period: 'Sun', submitted: 28, initialReview: 24, underReview: 20, finalReview: 16, approved: 12 },
  ],
  '30d': [
    { period: 'Week 1', submitted: 120, initialReview: 105, underReview: 90, finalReview: 72, approved: 58 },
    { period: 'Week 2', submitted: 145, initialReview: 125, underReview: 108, finalReview: 85, approved: 68 },
    { period: 'Week 3', submitted: 110, initialReview: 95, underReview: 82, finalReview: 65, approved: 52 },
    { period: 'Week 4', submitted: 95, initialReview: 82, underReview: 70, finalReview: 55, approved: 44 },
    { period: 'Week 5', submitted: 130, initialReview: 112, underReview: 95, finalReview: 75, approved: 60 },
  ],
  '90d': [
    { period: 'Jan', submitted: 320, initialReview: 280, underReview: 240, finalReview: 190, approved: 152 },
    { period: 'Feb', submitted: 350, initialReview: 305, underReview: 260, finalReview: 205, approved: 164 },
    { period: 'Mar', submitted: 290, initialReview: 250, underReview: 215, finalReview: 170, approved: 136 },
    { period: 'Apr', submitted: 270, initialReview: 235, underReview: 200, finalReview: 160, approved: 128 },
    { period: 'May', submitted: 310, initialReview: 270, underReview: 230, finalReview: 185, approved: 148 },
    { period: 'Jun', submitted: 340, initialReview: 295, underReview: 250, finalReview: 200, approved: 160 },
  ],
  '12m': [
    { period: 'Q1', submitted: 980, initialReview: 850, underReview: 730, finalReview: 580, approved: 464 },
    { period: 'Q2', submitted: 1120, initialReview: 970, underReview: 830, finalReview: 660, approved: 528 },
    { period: 'Q3', submitted: 850, initialReview: 740, underReview: 630, finalReview: 500, approved: 400 },
    { period: 'Q4', submitted: 750, initialReview: 650, underReview: 550, finalReview: 440, approved: 352 },
    { period: 'Q1 24', submitted: 1050, initialReview: 910, underReview: 780, finalReview: 620, approved: 496 },
    { period: 'Q2 24', submitted: 1200, initialReview: 1040, underReview: 890, finalReview: 710, approved: 568 },
  ],
};

// Average loan amounts by stage
const avgLoanAmounts = {
  submitted: 250000,
  initialReview: 260000,
  underReview: 275000,
  finalReview: 285000,
  approved: 300000,
};

const chartConfig = {
  submitted: {
    label: 'Submitted',
    color: 'var(--color-blue-400)',
  },
  initialReview: {
    label: 'Initial Review',
    color: 'var(--color-blue-500)',
  },
  underReview: {
    label: 'Under Review',
    color: 'var(--color-blue-600)',
  },
  finalReview: {
    label: 'Final Review',
    color: 'var(--color-blue-700)',
  },
  approved: {
    label: 'Approved',
    color: 'var(--color-green-600)',
  },
} satisfies ChartConfig;

// Period configuration
const PERIODS = {
  '7d': { key: '7d', label: 'Last 7 days' },
  '30d': { key: '30d', label: 'Last 30 days' },
  '90d': { key: '90d', label: 'Last 90 days' },
  '12m': { key: '12m', label: 'Last 12 months' },
} as const;

type PeriodKey = keyof typeof PERIODS;

// Define stage metrics
const stageMetrics = [
  { key: 'submitted', label: 'Submitted', icon: FileText, color: chartConfig.submitted.color },
  { key: 'initialReview', label: 'Initial Review', icon: FileSearch, color: chartConfig.initialReview.color },
  { key: 'underReview', label: 'Under Review', icon: FileClock, color: chartConfig.underReview.color },
  { key: 'finalReview', label: 'Final Review', icon: FileSearch, color: chartConfig.finalReview.color },
  { key: 'approved', label: 'Approved', icon: FileCheck, color: chartConfig.approved.color },
] as const;

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

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  const currency = useCurrency();
  
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-popover/95 backdrop-blur-sm p-4 shadow-lg min-w-[200px]">
        <div className="text-sm font-semibold text-popover-foreground mb-3.5 pb-2 border-b border-border/50">
          {label}
        </div>
        <div className="space-y-1.5">
          {stageMetrics.map((stage) => {
            const dataPoint = payload.find((p) => p.dataKey === stage.key);
            const value = dataPoint?.value || 0;
            const loanAmount = value * avgLoanAmounts[stage.key as keyof typeof avgLoanAmounts];

            return (
              <div key={stage.key} className="flex items-center justify-between gap-1.5">
                <div className="flex items-center gap-2">
                  <div className="size-2.5 rounded-sm" style={{ backgroundColor: stage.color }} />
                  <span className="text-xs font-medium text-muted-foreground">{stage.label}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold text-popover-foreground">{value}</span>
                  <div className="text-xs text-muted-foreground">
                    {formatCurrency(loanAmount, currency)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  return null;
};

export default function LoanFunnelChart() {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodKey>('30d');
  const currency = useCurrency();

  // Get data for selected period
  const currentData = loanFunnelData[selectedPeriod];

  // Calculate current totals for the latest data point
  const latestData = currentData[currentData.length - 1];

  // Calculate conversion rates
  const conversionRates = {
    initialReview: Math.round((latestData.initialReview / latestData.submitted) * 100),
    underReview: Math.round((latestData.underReview / latestData.initialReview) * 100),
    finalReview: Math.round((latestData.finalReview / latestData.underReview) * 100),
    approved: Math.round((latestData.approved / latestData.finalReview) * 100),
    overall: Math.round((latestData.approved / latestData.submitted) * 100),
  };

  // Calculate percentage changes (simulated based on period)
  const getChangeForMetric = (metric: string) => {
    const changes = {
      '7d': { submitted: 5, initialReview: 3, underReview: -2, finalReview: 4, approved: 8 },
      '30d': { submitted: 12, initialReview: 8, underReview: 5, finalReview: -3, approved: 10 },
      '90d': { submitted: -4, initialReview: 2, underReview: 7, finalReview: 5, approved: -2 },
      '12m': { submitted: 15, initialReview: 12, underReview: 8, finalReview: 6, approved: 14 },
    };
    return changes[selectedPeriod][metric as keyof (typeof changes)[typeof selectedPeriod]] || 0;
  };

  return (
    <Card className="w-full">
      <CardHeader className="border-0 min-h-auto py-6">
        <CardTitle className="text-lg font-semibold">Loan Application Funnel</CardTitle>
        <CardToolbar>
          {/* Period Selector */}
          <Select value={selectedPeriod} onValueChange={(value) => setSelectedPeriod(value as PeriodKey)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              {Object.values(PERIODS).map((period) => (
                <SelectItem key={period.key} value={period.key}>
                  {period.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardToolbar>
      </CardHeader>

      <CardContent className="px-2.5">
        {/* Stats Section */}
        <div className="@container px-2.5">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {stageMetrics.map((stage) => {
              const value = latestData[stage.key as keyof typeof latestData] as number;
              const change = getChangeForMetric(stage.key);
              const StageIcon = stage.icon;

              return (
                <div key={stage.key} className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <div className="w-0.5 h-12 rounded-full bg-border"></div>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-1.5">
                        <StageIcon className="size-3.5 text-muted-foreground" />
                        <div className="text-sm font-medium text-muted-foreground">{stage.label}</div>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl font-semibold leading-none">{value}</span>
                        <span
                          className={cn(
                            'inline-flex items-center gap-1 text-xs font-medium',
                            change >= 0 ? 'text-green-500' : 'text-destructive',
                          )}
                        >
                          {change >= 0 ? <TrendingUp className="size-3.5" /> : <TrendingDown className="size-3.5" />}{' '}
                          {Math.abs(change)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Conversion Rates */}
          <div className="flex flex-wrap justify-between gap-4 mb-8 px-2.5">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">Overall Conversion:</span>
              <span className="text-sm font-semibold">{conversionRates.overall}%</span>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-1.5">
                <div className="size-2 rounded-sm" style={{ backgroundColor: chartConfig.initialReview.color }} />
                <span className="text-xs text-muted-foreground">Initial: {conversionRates.initialReview}%</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="size-2 rounded-sm" style={{ backgroundColor: chartConfig.underReview.color }} />
                <span className="text-xs text-muted-foreground">Under: {conversionRates.underReview}%</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="size-2 rounded-sm" style={{ backgroundColor: chartConfig.finalReview.color }} />
                <span className="text-xs text-muted-foreground">Final: {conversionRates.finalReview}%</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="size-2 rounded-sm" style={{ backgroundColor: chartConfig.approved.color }} />
                <span className="text-xs text-muted-foreground">Approval: {conversionRates.approved}%</span>
              </div>
            </div>
          </div>

          {/* Chart */}
          <ChartContainer
            config={chartConfig}
            className="h-[400px] w-full [&_.recharts-curve.recharts-tooltip-cursor]:stroke-initial"
          >
            <AreaChart
              accessibilityLayer
              data={currentData}
              margin={{
                top: 10,
                bottom: 10,
                left: 20,
                right: 20,
              }}
            >
              {/* Background pattern for chart area only */}
              <defs>
                {/* Modern Abstract Background Pattern */}
                <pattern id="loanFunnelPattern" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                  {/* Diagonal grid lines */}
                  <path
                    d="M0,16 L32,16 M16,0 L16,32"
                    stroke="hsl(var(--muted-foreground))"
                    strokeWidth="0.5"
                    strokeOpacity="0.03"
                  />
                  <path
                    d="M0,0 L32,32 M0,32 L32,0"
                    stroke="hsl(var(--muted-foreground))"
                    strokeWidth="0.3"
                    strokeOpacity="0.02"
                  />

                  {/* Modern geometric elements */}
                  <circle cx="8" cy="8" r="1.5" fill="hsl(var(--muted-foreground))" fillOpacity="0.04" />
                  <circle cx="24" cy="24" r="1.5" fill="hsl(var(--muted-foreground))" fillOpacity="0.04" />
                </pattern>

                <linearGradient id="fillSubmitted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-submitted)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-submitted)" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="fillInitialReview" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-initialReview)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-initialReview)" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="fillUnderReview" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-underReview)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-underReview)" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="fillFinalReview" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-finalReview)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-finalReview)" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="fillApproved" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-approved)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-approved)" stopOpacity={0.1} />
                </linearGradient>
              </defs>

              <CartesianGrid vertical={false} />

              <XAxis
                dataKey="period"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                tick={{ textAnchor: 'middle', fontSize: 12 }}
                interval={0}
              />

              <YAxis hide />

              <ChartTooltip
                cursor={{
                  strokeDasharray: '4 4',
                  stroke: 'oklch(45.7% 0.24 277.023)',
                  strokeWidth: 1,
                  strokeOpacity: 0.6,
                }}
                content={<CustomTooltip />}
                offset={20}
                position={{ x: undefined, y: undefined }}
              />

              {/* Background Pattern Areas */}
              <Area
                dataKey="submitted"
                type="natural"
                fill="url(#loanFunnelPattern)"
                fillOpacity={1}
                stroke="transparent"
                stackId="pattern"
                dot={false}
                activeDot={false}
              />

              {/* Stacked Areas */}
              <Area
                dataKey="approved"
                type="natural"
                fill="url(#fillApproved)"
                fillOpacity={0.5}
                stroke="var(--color-approved)"
                stackId="a"
                dot={false}
                activeDot={{
                  r: 4,
                  fill: 'var(--color-approved)',
                  stroke: 'white',
                  strokeWidth: 1.5,
                }}
              />
              <Area
                dataKey="finalReview"
                type="natural"
                fill="url(#fillFinalReview)"
                fillOpacity={0.4}
                stroke="var(--color-finalReview)"
                stackId="a"
                dot={false}
                activeDot={{
                  r: 4,
                  fill: 'var(--color-finalReview)',
                  stroke: 'white',
                  strokeWidth: 1.5,
                }}
              />
              <Area
                dataKey="underReview"
                type="natural"
                fill="url(#fillUnderReview)"
                fillOpacity={0.3}
                stroke="var(--color-underReview)"
                stackId="a"
                dot={false}
                activeDot={{
                  r: 4,
                  fill: 'var(--color-underReview)',
                  stroke: 'white',
                  strokeWidth: 1.5,
                }}
              />
              <Area
                dataKey="initialReview"
                type="natural"
                fill="url(#fillInitialReview)"
                fillOpacity={0.2}
                stroke="var(--color-initialReview)"
                stackId="a"
                dot={false}
                activeDot={{
                  r: 4,
                  fill: 'var(--color-initialReview)',
                  stroke: 'white',
                  strokeWidth: 1.5,
                }}
              />
              <Area
                dataKey="submitted"
                type="natural"
                fill="url(#fillSubmitted)"
                fillOpacity={0.1}
                stroke="var(--color-submitted)"
                stackId="a"
                dot={false}
                activeDot={{
                  r: 4,
                  fill: 'var(--color-submitted)',
                  stroke: 'white',
                  strokeWidth: 1.5,
                }}
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
