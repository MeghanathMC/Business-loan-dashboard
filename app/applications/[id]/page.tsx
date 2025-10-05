'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { LoanApplication, EligibilityCriteria } from '@/lib/types';
import { mockApplications, mockCriteria } from '@/lib/mock-data';
import { calculateEligibility } from '@/lib/eligibility-calculator';
import { ApplicantDetails } from '@/components/dashboard/applicant-details';
import { MetricsOverview } from '@/components/dashboard/metrics-overview';
import { EligibilityScore } from '@/components/dashboard/eligibility-score';
import { FinancialCharts } from '@/components/dashboard/financial-charts';
import { ActionPanel } from '@/components/dashboard/action-panel';
import { RiskAlerts } from '@/components/dashboard/risk-alerts';
import { CriteriaCustomizer } from '@/components/dashboard/criteria-customizer';
import { CompanyLogo, getCompanyCodeFromName } from '@/components/ui/company-logo';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';

export default function ApplicationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [application, setApplication] = useState<LoanApplication | null>(null);
  const [criteria, setCriteria] = useState<EligibilityCriteria[]>(mockCriteria);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Find the application by ID from mock data
    const app = mockApplications.find(app => app.id === params.id);
    if (app) {
      setApplication(app);
    }
    setIsLoading(false);
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading application...</p>
        </div>
      </div>
    );
  }

  if (!application || !application.financial_metrics) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Application Not Found</h1>
          <p className="text-muted-foreground mb-6">The requested application could not be found.</p>
          <Button onClick={() => router.push('/')} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const eligibilityResult = calculateEligibility(
    application,
    application.financial_metrics,
    criteria
  );

  const handleApprove = (notes: string) => {
    toast({
      title: 'Application Approved',
      description: `${application.applicant?.business_name} has been approved.`,
    });
    setApplication({ ...application, status: 'approved' });
  };

  const handleReject = (notes: string) => {
    toast({
      title: 'Application Rejected',
      description: `${application.applicant?.business_name} has been rejected.`,
      variant: 'destructive',
    });
    setApplication({ ...application, status: 'rejected' });
  };

  const handleRequestInfo = (notes: string) => {
    toast({
      title: 'Information Requested',
      description: `Additional information requested from ${application.applicant?.business_name}.`,
    });
    setApplication({ ...application, status: 'more_info_needed' });
  };

  const handleCriteriaUpdate = (updatedCriteria: EligibilityCriteria[]) => {
    setCriteria(updatedCriteria);
    toast({
      title: 'Criteria Updated',
      description: 'Eligibility score has been recalculated with new weights.',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/')}
              className="flex items-center gap-2 w-fit"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-3 flex-wrap">
                <CompanyLogo 
                  code={getCompanyCodeFromName(application.applicant?.business_name || '')} 
                  size={32}
                />
                <span className="break-words">{application.applicant?.business_name}</span>
              </h1>
              <p className="text-muted-foreground mt-1 text-sm sm:text-base">
                Application ID: {application.id} • Submitted{' '}
                {new Date(application.submission_date).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-1 sm:grid-cols-3 gap-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="financial">Financial Analysis</TabsTrigger>
            <TabsTrigger value="criteria">Customize Criteria</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 sm:space-y-6">
            <div className="bg-card rounded-lg border p-4 sm:p-6">
              <ApplicantDetails application={application} />
            </div>

            <div className="bg-card rounded-lg border p-4 sm:p-6">
              <MetricsOverview metrics={application.financial_metrics} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-card rounded-lg border p-4 sm:p-6">
                <EligibilityScore result={eligibilityResult} />
              </div>
              <div className="bg-card rounded-lg border p-4 sm:p-6">
                <ActionPanel
                  application={application}
                  onApprove={handleApprove}
                  onReject={handleReject}
                  onRequestInfo={handleRequestInfo}
                />
              </div>
            </div>

            {application.risk_alerts && application.risk_alerts.length > 0 && (
              <div className="bg-card rounded-lg border p-4 sm:p-6">
                <RiskAlerts alerts={application.risk_alerts} />
              </div>
            )}
          </TabsContent>

          <TabsContent value="financial" className="space-y-4 sm:space-y-6">
            <div className="bg-card rounded-lg border p-4 sm:p-6">
              <MetricsOverview metrics={application.financial_metrics} />
            </div>
            <div className="bg-card rounded-lg border p-4 sm:p-6">
              <FinancialCharts metrics={application.financial_metrics} />
            </div>
          </TabsContent>

          <TabsContent value="criteria" className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-card rounded-lg border p-4 sm:p-6">
                <CriteriaCustomizer criteria={criteria} onUpdate={handleCriteriaUpdate} />
              </div>
              <div className="bg-card rounded-lg border p-4 sm:p-6">
                <EligibilityScore result={eligibilityResult} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
