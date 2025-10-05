'use client';

import { Card } from '@/components/ui/card';
import { mockApplications } from '@/lib/mock-data';
import { useCurrency } from '@/lib/settings-context';
import { formatCurrency } from '@/lib/currency-utils';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  FunnelChart,
  Funnel,
  LabelList,
} from 'recharts';

// Mock data for different chart types
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

const industryBreakdown = [
  { name: 'Technology', value: 35, amount: 18500000 },
  { name: 'Manufacturing', value: 25, amount: 13200000 },
  { name: 'Healthcare', value: 20, amount: 10500000 },
  { name: 'Retail', value: 12, amount: 6300000 },
  { name: 'Construction', value: 8, amount: 4200000 },
];

const topBorrowers = [
  { name: 'TechCorp Solutions', amount: 2500000, applications: 3 },
  { name: 'MediCare Systems', amount: 2200000, applications: 2 },
  { name: 'BuildRight Construction', amount: 1800000, applications: 4 },
  { name: 'RetailMax Stores', amount: 1500000, applications: 2 },
  { name: 'Manufacturing Inc', amount: 1200000, applications: 1 },
];

const creditScoreDistribution = [
  { range: '300-400', count: 5, percentage: 6.4 },
  { range: '401-500', count: 8, percentage: 10.3 },
  { range: '501-600', count: 12, percentage: 15.4 },
  { range: '601-700', count: 18, percentage: 23.1 },
  { range: '701-800', count: 25, percentage: 32.1 },
  { range: '801-900', count: 10, percentage: 12.8 },
];

const applicationFunnel = [
  { name: 'Applications Submitted', value: 100, fill: '#8884d8' },
  { name: 'Initial Review', value: 85, fill: '#82ca9d' },
  { name: 'Under Review', value: 65, fill: '#ffc658' },
  { name: 'Final Review', value: 45, fill: '#ff7300' },
  { name: 'Approved', value: 35, fill: '#00ff00' },
];

const utilizationVsExposure = [
  { utilization: 25, exposure: 500000, borrower: 'TechCorp' },
  { utilization: 45, exposure: 1200000, borrower: 'MediCare' },
  { utilization: 60, exposure: 800000, borrower: 'BuildRight' },
  { utilization: 35, exposure: 1500000, borrower: 'RetailMax' },
  { utilization: 70, exposure: 600000, borrower: 'Manufacturing' },
  { utilization: 30, exposure: 2000000, borrower: 'FinanceCorp' },
  { utilization: 55, exposure: 900000, borrower: 'Logistics Inc' },
  { utilization: 40, exposure: 1100000, borrower: 'Energy Solutions' },
];

const revenueTrend = [
  { month: 'Jan', actual: 1200000, forecast: 1150000, interest: 180000 },
  { month: 'Feb', actual: 1350000, forecast: 1300000, interest: 195000 },
  { month: 'Mar', actual: 1420000, forecast: 1400000, interest: 210000 },
  { month: 'Apr', actual: 1380000, forecast: 1450000, interest: 205000 },
  { month: 'May', actual: 1550000, forecast: 1500000, interest: 225000 },
  { month: 'Jun', actual: 1620000, forecast: 1550000, interest: 240000 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export function AnalyticsCharts() {
  const currency = useCurrency();
  return (
    <div className="space-y-8">
      {/* Row 1: Time Series Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart - Total Loan Volume Trend */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Total Loan Volume Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={loanVolumeTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis 
                tickFormatter={(value) => formatCurrency(value, currency)}
              />
              <Tooltip
                formatter={(value: number) => [
                  formatCurrency(value, currency),
                  'Loan Volume'
                ]}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="volume" 
                stroke="#8884d8" 
                strokeWidth={3}
                dot={{ fill: '#8884d8', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Area Chart - Monthly Applications */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Monthly Applications</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyApplications}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="applications" 
                stackId="1" 
                stroke="#8884d8" 
                fill="#8884d8" 
                fillOpacity={0.6}
              />
              <Area 
                type="monotone" 
                dataKey="approved" 
                stackId="1" 
                stroke="#82ca9d" 
                fill="#82ca9d" 
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Row 2: Distribution Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart - Portfolio by Industry */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Portfolio by Industry</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={industryBreakdown}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {industryBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number, name: string, props: any) => [
                  new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(props.payload.amount),
                  'Loan Amount'
                ]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Bar Chart - Top Borrowers */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Top Borrowers</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topBorrowers} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                type="number"
                tickFormatter={(value) => formatCurrency(value, currency)}
              />
              <YAxis dataKey="name" type="category" width={120} />
              <Tooltip
                formatter={(value: number) => [
                  formatCurrency(value, currency),
                  'Loan Amount'
                ]}
              />
              <Bar dataKey="amount" fill="#8884d8" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Row 3: Distribution and Funnel Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Histogram - Credit Score Distribution */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Credit Score Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={creditScoreDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip
                formatter={(value: number, name: string, props: any) => [
                  `${value} applicants (${props.payload.percentage}%)`,
                  'Count'
                ]}
              />
              <Bar dataKey="count" fill="#8884d8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Funnel Chart - Application Funnel */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Application Funnel</h3>
          <ResponsiveContainer width="100%" height={300}>
            <FunnelChart>
              <Funnel
                dataKey="value"
                data={applicationFunnel}
                isAnimationActive
              >
                <LabelList position="center" fill="#fff" stroke="none" />
              </Funnel>
              <Tooltip />
            </FunnelChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Row 4: Correlation and Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scatter Plot - Utilization vs Exposure */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Utilization vs Exposure</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart data={utilizationVsExposure}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="utilization" 
                name="Utilization %"
                type="number"
                scale="linear"
              />
              <YAxis 
                dataKey="exposure" 
                name="Exposure"
                tickFormatter={(value) => formatCurrency(value, currency)}
              />
              <Tooltip
                cursor={{ strokeDasharray: '3 3' }}
                formatter={(value: number, name: string, props: any) => {
                  if (name === 'exposure') {
                    return [
                      formatCurrency(value, currency),
                      'Exposure'
                    ];
                  }
                  return [`${value}%`, 'Utilization'];
                }}
                labelFormatter={(label, payload) => 
                  payload && payload[0] ? `Borrower: ${payload[0].payload.borrower}` : ''
                }
              />
              <Scatter dataKey="exposure" fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </Card>

        {/* Combo Chart - Revenue Trend */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Revenue & Interest Income Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={revenueTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis 
                yAxisId="left"
                tickFormatter={(value) => formatCurrency(value, currency)}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right"
                tickFormatter={(value) => formatCurrency(value, currency)}
              />
              <Tooltip
                formatter={(value: number, name: string) => [
                  formatCurrency(value, currency),
                  name
                ]}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="actual" fill="#8884d8" name="Actual Revenue" />
              <Bar yAxisId="left" dataKey="forecast" fill="#82ca9d" name="Forecast Revenue" />
              <Line 
                yAxisId="right" 
                type="monotone" 
                dataKey="interest" 
                stroke="#ff7300" 
                strokeWidth={3}
                name="Interest Income"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}
