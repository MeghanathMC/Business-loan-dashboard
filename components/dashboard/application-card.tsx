'use client';

import Link from 'next/link';
import { LoanApplication } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCurrency } from '@/lib/settings-context';
import { formatCurrency } from '@/lib/currency-utils';
import { CompanyLogo, getCompanyCodeFromName } from '@/components/ui/company-logo';
import { Calendar, DollarSign, CircleAlert as AlertCircle } from 'lucide-react';

interface ApplicationCardProps {
  application: LoanApplication;
}

const statusConfig = {
  pending: { label: 'Pending', variant: 'secondary' as const, color: 'bg-slate-100 text-slate-700' },
  under_review: { label: 'Under Review', variant: 'default' as const, color: 'bg-blue-100 text-blue-700' },
  approved: { label: 'Approved', variant: 'default' as const, color: 'bg-emerald-100 text-emerald-700' },
  rejected: { label: 'Rejected', variant: 'destructive' as const, color: 'bg-red-100 text-red-700' },
  more_info_needed: { label: 'More Info Needed', variant: 'outline' as const, color: 'bg-amber-100 text-amber-700' },
};

export function ApplicationCard({ application }: ApplicationCardProps) {
  const status = statusConfig[application.status];
  const hasAlerts = application.risk_alerts && application.risk_alerts.length > 0;
  const currency = useCurrency();

  return (
    <Link href={`/applications/${application.id}`}>
      <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer border-l-4 hover:border-l-primary h-[280px] flex flex-col">
        {/* Header Section - Fixed height */}
        <div className="flex items-start justify-between mb-4 flex-shrink-0">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <CompanyLogo 
                code={getCompanyCodeFromName(application.applicant?.business_name || '')} 
                fallbackText={application.applicant?.business_name.substring(0, 2).toUpperCase()}
                size={32}
              />
              <h3 className="font-semibold text-lg break-words">{application.applicant?.business_name}</h3>
            </div>
            <p className="text-sm text-muted-foreground truncate">{application.applicant?.industry}</p>
          </div>
          <Badge className={`${status.color} flex-shrink-0 ml-2`}>
            {status.label}
          </Badge>
        </div>

        {/* Data Section - Fixed height */}
        <div className="grid grid-cols-2 gap-4 mb-4 flex-shrink-0">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Loan Amount</p>
              <p className="text-sm font-semibold truncate">{formatCurrency(application.loan_amount, currency)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Submitted</p>
              <p className="text-sm font-semibold truncate">
                {new Date(application.submission_date).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Purpose Section - Fixed height */}
        <div className="pt-4 border-t mb-4 flex-shrink-0">
          <p className="text-sm text-muted-foreground mb-1">Purpose</p>
          <div className="h-10 overflow-hidden">
            <p className="text-sm font-medium line-clamp-2">
              {application.loan_purpose}
            </p>
          </div>
        </div>

        {/* Alerts Section - Flexible bottom spacing */}
        <div className="flex-1 flex items-end">
          {hasAlerts ? (
            <div className="flex items-center gap-2 text-amber-600 w-full">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span className="text-xs font-medium truncate">
                {application.risk_alerts?.filter(a => !a.is_resolved).length} active alert(s)
              </span>
            </div>
          ) : (
            <div className="w-full"></div>
          )}
        </div>
      </Card>
    </Link>
  );
}
