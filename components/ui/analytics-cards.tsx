'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, YAxis } from 'recharts';

// Business Case 1: Loan Volume Trend (Detailed wavy pattern with micro-fluctuations)
const loanVolumeData = [
  { value: 15000 },
  { value: 18000 },
  { value: 25000 },
  { value: 32000 },
  { value: 35000 },
  { value: 28000 },
  { value: 20000 },
  { value: 12000 },
  { value: 5000 },
  { value: -2000 },
  { value: -10000 },
  { value: -18000 },
  { value: -25000 },
  { value: -22000 },
  { value: -15000 },
  { value: -8000 },
  { value: 0 },
  { value: 8000 },
  { value: 20000 },
  { value: 28000 },
  { value: 40000 },
  { value: 48000 },
  { value: 50000 },
  { value: 45000 },
  { value: 35000 },
  { value: 25000 },
  { value: 15000 },
  { value: 2000 },
  { value: -5000 },
  { value: -12000 },
  { value: -20000 },
  { value: -28000 },
  { value: -30000 },
  { value: -25000 },
  { value: -15000 },
  { value: -5000 },
  { value: 10000 },
  { value: 22000 },
  { value: 35000 },
  { value: 45000 },
  { value: 55000 },
  { value: 52000 },
  { value: 45000 },
  { value: 35000 },
  { value: 25000 },
  { value: 12000 },
  { value: 5000 },
  { value: -8000 },
  { value: -15000 },
  { value: -12000 },
  { value: -5000 },
  { value: 3000 },
  { value: 15000 },
  { value: 25000 },
  { value: 20000 },
  { value: 10000 },
  { value: -2000 },
  { value: -15000 },
  { value: -20000 },
  { value: -15000 },
];

// Business Case 2: Approval Rate (Detailed sine wave with micro-variations)
const approvalRateData = [
  { value: 0 },
  { value: 0.8 },
  { value: 1.5 },
  { value: 2.2 },
  { value: 2.8 },
  { value: 3.2 },
  { value: 3.5 },
  { value: 3.4 },
  { value: 3.2 },
  { value: 2.6 },
  { value: 2.0 },
  { value: 1.2 },
  { value: 0.5 },
  { value: -0.2 },
  { value: -1.2 },
  { value: -1.8 },
  { value: -2.5 },
  { value: -2.8 },
  { value: -3.0 },
  { value: -2.9 },
  { value: -2.8 },
  { value: -2.2 },
  { value: -1.5 },
  { value: -0.8 },
  { value: 0.2 },
  { value: 1.0 },
  { value: 2.0 },
  { value: 2.8 },
  { value: 3.5 },
  { value: 3.9 },
  { value: 4.2 },
  { value: 4.1 },
  { value: 3.8 },
  { value: 3.2 },
  { value: 2.5 },
  { value: 1.5 },
  { value: 0.8 },
  { value: 0.2 },
  { value: -1.0 },
  { value: -1.6 },
  { value: -2.5 },
  { value: -2.9 },
  { value: -3.2 },
  { value: -3.0 },
  { value: -2.0 },
  { value: -1.2 },
  { value: 0 },
  { value: 1.2 },
  { value: 2.5 },
  { value: 3.5 },
  { value: 4.0 },
  { value: 3.8 },
  { value: 2.8 },
  { value: 1.5 },
  { value: 0.5 },
  { value: -0.8 },
  { value: -2.0 },
  { value: -2.8 },
  { value: -2.5 },
  { value: -1.0 },
];

// Business Case 3: Portfolio Growth (Detailed oscillating decline with volatility)
const portfolioGrowthData = [
  { value: 5 },
  { value: 8 },
  { value: 10 },
  { value: 12 },
  { value: 8 },
  { value: 5 },
  { value: 3 },
  { value: 0 },
  { value: -2 },
  { value: -5 },
  { value: -8 },
  { value: -10 },
  { value: -12 },
  { value: -10 },
  { value: -8 },
  { value: -5 },
  { value: -3 },
  { value: 0 },
  { value: 2 },
  { value: 4 },
  { value: 6 },
  { value: 7 },
  { value: 4 },
  { value: 1 },
  { value: -1 },
  { value: -4 },
  { value: -6 },
  { value: -8 },
  { value: -10 },
  { value: -11 },
  { value: -12 },
  { value: -10 },
  { value: -8 },
  { value: -6 },
  { value: -4 },
  { value: -2 },
  { value: 1 },
  { value: 3 },
  { value: 5 },
  { value: 6 },
  { value: 3 },
  { value: 0 },
  { value: -2 },
  { value: -5 },
  { value: -7 },
  { value: -9 },
  { value: -11 },
  { value: -13 },
  { value: -15 },
  { value: -13 },
  { value: -11 },
  { value: -8 },
  { value: -5 },
  { value: -2 },
  { value: 0 },
  { value: -3 },
  { value: -6 },
  { value: -9 },
  { value: -12 },
  { value: -15 },
];

// Business Case 4: Average Loan Size (Detailed sine wave with micro-variations)
const loanSizeData = [
  { value: 2 },
  { value: 3 },
  { value: 4.5 },
  { value: 5.8 },
  { value: 6.2 },
  { value: 5.5 },
  { value: 4.2 },
  { value: 3.1 },
  { value: 2.5 },
  { value: 3.2 },
  { value: 4.8 },
  { value: 6.1 },
  { value: 7.0 },
  { value: 6.5 },
  { value: 5.2 },
  { value: 4.0 },
  { value: 3.5 },
  { value: 4.2 },
  { value: 5.5 },
  { value: 6.8 },
  { value: 7.5 },
  { value: 7.2 },
  { value: 6.0 },
  { value: 4.8 },
  { value: 3.9 },
  { value: 3.2 },
  { value: 3.8 },
  { value: 5.0 },
  { value: 6.2 },
  { value: 7.0 },
  { value: 6.8 },
  { value: 5.5 },
  { value: 4.2 },
  { value: 3.5 },
  { value: 4.0 },
  { value: 5.2 },
  { value: 6.5 },
  { value: 7.2 },
  { value: 7.0 },
  { value: 6.0 },
  { value: 5.0 },
  { value: 4.5 },
  { value: 5.0 },
  { value: 6.0 },
  { value: 7.0 },
  { value: 7.5 },
  { value: 7.2 },
  { value: 6.5 },
  { value: 5.8 },
  { value: 5.0 },
  { value: 4.5 },
  { value: 5.0 },
  { value: 6.0 },
  { value: 7.0 },
  { value: 7.8 },
  { value: 8.0 },
  { value: 7.5 },
  { value: 6.5 },
  { value: 5.5 },
  { value: 5.0 },
];

// Business Case 5: Total Applications (Detailed sine wave with micro-variations)
const applicationsData = [
  { value: 10 },
  { value: 15 },
  { value: 22 },
  { value: 28 },
  { value: 32 },
  { value: 30 },
  { value: 25 },
  { value: 20 },
  { value: 18 },
  { value: 22 },
  { value: 28 },
  { value: 35 },
  { value: 40 },
  { value: 38 },
  { value: 32 },
  { value: 25 },
  { value: 20 },
  { value: 24 },
  { value: 30 },
  { value: 38 },
  { value: 45 },
  { value: 48 },
  { value: 45 },
  { value: 38 },
  { value: 30 },
  { value: 25 },
  { value: 28 },
  { value: 35 },
  { value: 42 },
  { value: 48 },
  { value: 50 },
  { value: 45 },
  { value: 38 },
  { value: 30 },
  { value: 25 },
  { value: 28 },
  { value: 35 },
  { value: 42 },
  { value: 48 },
  { value: 45 },
  { value: 38 },
  { value: 32 },
  { value: 35 },
  { value: 40 },
  { value: 45 },
  { value: 48 },
  { value: 45 },
  { value: 40 },
  { value: 35 },
  { value: 32 },
  { value: 35 },
  { value: 40 },
  { value: 45 },
  { value: 50 },
  { value: 52 },
  { value: 48 },
  { value: 42 },
  { value: 38 },
  { value: 35 },
  { value: 38 },
];

// Business Case 6: Active Borrowers (Detailed sine wave with micro-variations)
const borrowersData = [
  { value: 5 },
  { value: 8 },
  { value: 12 },
  { value: 15 },
  { value: 18 },
  { value: 16 },
  { value: 12 },
  { value: 8 },
  { value: 6 },
  { value: 9 },
  { value: 14 },
  { value: 18 },
  { value: 22 },
  { value: 20 },
  { value: 16 },
  { value: 12 },
  { value: 10 },
  { value: 12 },
  { value: 16 },
  { value: 20 },
  { value: 24 },
  { value: 26 },
  { value: 24 },
  { value: 20 },
  { value: 16 },
  { value: 14 },
  { value: 16 },
  { value: 20 },
  { value: 24 },
  { value: 28 },
  { value: 30 },
  { value: 28 },
  { value: 24 },
  { value: 20 },
  { value: 18 },
  { value: 20 },
  { value: 24 },
  { value: 28 },
  { value: 30 },
  { value: 28 },
  { value: 24 },
  { value: 22 },
  { value: 24 },
  { value: 28 },
  { value: 32 },
  { value: 34 },
  { value: 32 },
  { value: 28 },
  { value: 24 },
  { value: 22 },
  { value: 24 },
  { value: 28 },
  { value: 32 },
  { value: 36 },
  { value: 38 },
  { value: 36 },
  { value: 32 },
  { value: 28 },
  { value: 26 },
  { value: 28 },
];

// Use custom or Tailwind standard colors: https://tailwindcss.com/docs/colors
const analyticsCards = [
  {
    title: 'Total Loan Portfolio',
    metric: 'Monthly change from baseline',
    baseValue: '$100M',
    baseCurrency: 'Start',
    targetValue: '$125M',
    targetCurrency: 'Current',
    data: loanVolumeData,
    change: '+15.2%',
    isPositive: true,
    color: 'var(--color-blue-500)',
  },
  {
    title: 'Total Applications',
    metric: 'Application count',
    baseValue: '400',
    baseCurrency: 'Previous',
    targetValue: '485',
    targetCurrency: 'This year',
    data: applicationsData,
    change: '+21.3%',
    isPositive: true,
    color: 'var(--color-violet-500)',
  },
  {
    title: 'Approval Rate',
    metric: 'Rate variance from target',
    baseValue: '70%',
    baseCurrency: 'Target',
    targetValue: '72.3%',
    targetCurrency: 'Current',
    data: approvalRateData,
    change: '+2.3%',
    isPositive: true,
    color: 'var(--color-emerald-500)',
  },
  {
    title: 'Average Loan Size',
    metric: 'Per application',
    baseValue: '$240K',
    baseCurrency: 'Previous',
    targetValue: '$257.7K',
    targetCurrency: 'Current',
    data: loanSizeData,
    change: '+7.4%',
    isPositive: true,
    color: 'var(--color-amber-500)',
  },
  {
    title: 'Active Borrowers',
    metric: 'Current portfolio',
    baseValue: '142',
    baseCurrency: 'Previous',
    targetValue: '156',
    targetCurrency: 'Current',
    data: borrowersData,
    change: '+9.9%',
    isPositive: true,
    color: 'var(--color-indigo-500)',
  },
  {
    title: 'Portfolio Growth',
    metric: 'Month over month',
    baseValue: '12%',
    baseCurrency: 'Target',
    targetValue: '15.2%',
    targetCurrency: 'Current',
    data: portfolioGrowthData,
    change: '+3.2%',
    isPositive: true,
    color: 'var(--color-green-500)',
  },
];

export default function AnalyticsCards() {
  return (
    <div className="@container w-full">
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Analytics Cards */}
        {analyticsCards.map((card, i) => (
          <Card key={i}>
            <CardContent className="flex flex-col gap-6 p-5">
              {/* Header */}
              <div className="flex flex-col">
                <h3 className="text-sm font-medium text-muted-foreground m-0">{card.title}</h3>
                <p className="text-2xl font-bold text-foreground m-0">{card.targetValue}</p>
                <p className={`text-xs ${card.isPositive ? 'text-emerald-600' : 'text-destructive'} mt-1`}>
                  {card.change} {card.isPositive ? 'from last period' : 'below target'}
                </p>
              </div>

              {/* Chart Section */}
              <div className="flex-1 h-14 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={card.data}
                    margin={{
                      top: 10,
                      right: 10,
                      left: 10,
                      bottom: 10,
                    }}
                  >
                    <YAxis domain={['dataMin', 'dataMax']} hide={true} />
                    <ReferenceLine y={0} stroke="var(--input)" strokeWidth={1} strokeDasharray="3 3" />
                    <Tooltip
                      cursor={{ stroke: card.color, strokeWidth: 1, strokeDasharray: '2 2' }}
                      position={{ x: undefined, y: undefined }}
                      offset={10}
                      allowEscapeViewBox={{ x: true, y: true }}
                      content={({ active, payload, coordinate }) => {
                        if (active && payload && payload.length && coordinate) {
                          const value = payload[0].value;
                          const formatValue = (val: number) => {
                            if (card.title === 'Total Loan Portfolio') {
                              return val >= 0 ? `+$${val.toLocaleString()}` : `-$${Math.abs(val).toLocaleString()}`;
                            } else if (card.title === 'Approval Rate' || card.title === 'Portfolio Growth') {
                              return val >= 0 ? `+${val.toFixed(1)}%` : `${val.toFixed(1)}%`;
                            } else {
                              return val >= 0 ? `+${val}` : `${val}`;
                            }
                          };

                          // Smart positioning logic
                          const tooltipStyle: React.CSSProperties = {
                            transform:
                              coordinate.x && coordinate.x > 120 ? 'translateX(-100%)' : 'translateX(10px)',
                            marginTop: coordinate.y && coordinate.y > 30 ? '-40px' : '10px',
                          };

                          return (
                            <div
                              className="bg-background/95 backdrop-blur-sm border border-border shadow-xl rounded-lg p-2.5 pointer-events-none z-50"
                              style={tooltipStyle}
                            >
                              <p className="text-sm font-semibold text-foreground leading-tight mb-1.5">
                                {formatValue(value as number)}
                              </p>
                              <p className="text-xs text-muted-foreground leading-tight">{card.title}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke={card.color}
                      strokeWidth={2}
                      dot={{
                        r: 0,
                        strokeWidth: 0,
                      }}
                      activeDot={{
                        r: 5,
                        fill: card.color,
                        stroke: 'white',
                        strokeWidth: 2,
                        filter: `drop-shadow(0 0 6px ${card.color})`,
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
