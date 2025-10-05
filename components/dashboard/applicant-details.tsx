'use client';

import { Card } from '@/components/ui/card';
import { LoanApplication } from '@/lib/types';
import { useCurrency } from '@/lib/settings-context';
import { formatCurrency } from '@/lib/currency-utils';
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Hash,
  DollarSign,
  Clock,
  Shield,
} from 'lucide-react';

interface ApplicantDetailsProps {
  application: LoanApplication;
}

export function ApplicantDetails({ application }: ApplicantDetailsProps) {
  const { applicant } = application;
  const currency = useCurrency();

  if (!applicant) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Business Information
        </h3>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Business Name</p>
              <p className="font-semibold">{applicant.business_name}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Business Type</p>
              <p className="font-semibold">{applicant.business_type}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-2">
              <Briefcase className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground mb-1">Industry</p>
                <p className="text-sm font-medium">{applicant.industry}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground mb-1">Years in Business</p>
                <p className="text-sm font-medium">{applicant.years_in_business} years</p>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2 pt-2">
            <Hash className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground mb-1">Tax ID</p>
              <p className="text-sm font-medium font-mono">{applicant.tax_id}</p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Contact Information
        </h3>

        <div className="space-y-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Primary Contact</p>
            <p className="font-semibold">{applicant.contact_name}</p>
          </div>

          <div className="flex items-start gap-2">
            <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground mb-1">Email</p>
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(applicant.contact_email)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium underline-offset-2 hover:underline"
              >
                {applicant.contact_email}
              </a>
            </div>
          </div>

          {applicant.contact_phone && (
            <div className="flex items-start gap-2">
              <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground mb-1">Phone</p>
                <p className="text-sm font-medium">{applicant.contact_phone}</p>
              </div>
            </div>
          )}

          {applicant.address && (
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground mb-1">Address</p>
                <p className="text-sm font-medium">{applicant.address}</p>
              </div>
            </div>
          )}
        </div>
      </Card>

      <Card className="p-6 lg:col-span-2">
        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Loan Request Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Loan Amount</p>
            <p className="text-2xl font-bold">{formatCurrency(application.loan_amount, currency)}</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground mb-1">Loan Term</p>
            <p className="text-2xl font-bold">{application.loan_term_months} months</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground mb-1">Collateral Type</p>
            <p className="text-sm font-semibold mt-1">
              {application.collateral_type || 'N/A'}
            </p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground mb-1">Collateral Value</p>
            <p className="text-sm font-semibold mt-1">
              {formatCurrency(application.collateral_value, currency)}
            </p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t">
          <div className="flex items-start gap-2 mb-4">
            <Briefcase className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground mb-1">Purpose</p>
              <p className="text-sm font-medium">{application.loan_purpose}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Submitted</p>
                <p className="font-medium">
                  {new Date(application.submission_date).toLocaleDateString()}
                </p>
              </div>
            </div>

            {application.collateral_value > 0 && (
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">LTV Ratio</p>
                  <p className="font-medium">
                    {((application.loan_amount / application.collateral_value) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
