# Business Loan Dashboard

A comprehensive, modern loan management dashboard built with Next.js 13, TypeScript, and Tailwind CSS. This application provides loan officers and analysts with powerful tools to assess, analyze, and manage business loan applications.

## 🚀 Features

### 📊 Dashboard Overview
- **Real-time Analytics**: Comprehensive loan portfolio analysis with interactive charts
- **Application Management**: Streamlined workflow for reviewing and processing loan applications
- **Risk Assessment**: Advanced eligibility scoring and risk alert system
- **Multi-currency Support**: Flexible currency settings for global operations

### 🔍 Application Analysis
- **Detailed Applicant Profiles**: Complete business and financial information
- **Financial Metrics**: Revenue, profit margins, debt-to-income ratios, and more
- **Eligibility Scoring**: Customizable criteria with weighted scoring system
- **Risk Alerts**: Automated flagging of potential issues and concerns

### 📈 Analytics & Reporting
- **Performance Gauges**: Visual KPIs with targets and benchmarks
- **Trend Analysis**: Loan volume and application trends over time
- **Funnel Analytics**: Conversion rates through the application process
- **Export Capabilities**: Data export in multiple formats (Excel, CSV, PDF)

### 🎨 User Experience
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop
- **Dark/Light Mode**: Theme switching with system preference detection
- **Accessibility**: WCAG compliant with keyboard navigation support
- **Modern UI**: Clean, professional interface built with shadcn/ui components

## 🛠️ Tech Stack

- **Framework**: Next.js 13 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Charts**: Recharts
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation
- **State Management**: React Context API
- **Animations**: Framer Motion

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/loan-dashboard.git
   cd loan-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
loan-dashboard/
├── app/                          # Next.js 13 App Router
│   ├── analytics/               # Analytics dashboard page
│   ├── applications/[id]/       # Individual application details
│   ├── settings/                # User settings and preferences
│   ├── pagination-demo/         # Pagination examples
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout component
│   └── page.tsx                 # Main dashboard page
├── components/                   # Reusable components
│   ├── dashboard/               # Dashboard-specific components
│   │   ├── analytics-charts.tsx
│   │   ├── application-card.tsx
│   │   ├── eligibility-score.tsx
│   │   └── ...
│   └── ui/                      # Base UI components
│       ├── button.tsx
│       ├── card.tsx
│       ├── table.tsx
│       └── ...
├── lib/                         # Utility functions and types
│   ├── types.ts                 # TypeScript type definitions
│   ├── mock-data.ts             # Sample data for development
│   ├── currency-utils.ts        # Currency formatting utilities
│   └── settings-context.tsx     # Global state management
├── hooks/                       # Custom React hooks
├── public/                      # Static assets
└── styles/                      # Additional stylesheets
```

## 🎯 Key Components

### Dashboard Components
- **ApplicationCard**: Displays loan application summary with key metrics
- **AnalyticsCharts**: Interactive charts for portfolio analysis
- **EligibilityScore**: Visual scoring system with customizable criteria
- **RiskAlerts**: Automated risk assessment and alerting
- **MetricsOverview**: Financial metrics display and analysis

### UI Components
- **PaginatedTable**: Advanced table with sorting, filtering, and pagination
- **ExportDialog**: Data export functionality with multiple format options
- **StatusCard**: KPI display cards with trend indicators
- **GaugeChart**: Performance gauge charts with targets
- **BulletChart**: Bullet charts for performance tracking

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the root directory:

```env
# Optional: Add your environment variables here
NEXT_PUBLIC_APP_NAME="Business Loan Dashboard"
NEXT_PUBLIC_APP_VERSION="1.0.0"
```

### Currency Settings
The application supports multiple currencies with automatic formatting:
- USD (US Dollar)
- EUR (Euro)
- GBP (British Pound)
- JPY (Japanese Yen)
- CAD (Canadian Dollar)
- AUD (Australian Dollar)

### User Roles
- **Loan Officer**: Can review and process applications
- **Senior Analyst**: Advanced analytics and reporting access
- **Manager**: Full system access and user management
- **Admin**: Complete administrative control

## 📱 Responsive Design

The application is fully responsive across all device types:

- **Mobile** (< 640px): Optimized touch interface with stacked layouts
- **Tablet** (640px - 1024px): Balanced layout with collapsible navigation
- **Desktop** (> 1024px): Full-featured interface with sidebar navigation

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

### Other Platforms
The application can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework for production
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautifully designed components
- [Radix UI](https://www.radix-ui.com/) - Low-level UI primitives
- [Recharts](https://recharts.org/) - Composable charting library
- [Lucide](https://lucide.dev/) - Beautiful & consistent icon toolkit

## 📞 Support

For support, email support@loandashboard.com or join our Slack channel.

---

**Built with ❤️ for modern loan management**
