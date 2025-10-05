'use client';

import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { EligibilityResult } from '@/lib/eligibility-calculator';
import { useCurrency } from '@/lib/settings-context';
import { formatCurrency } from '@/lib/currency-utils';
import { CircleCheck as CheckCircle2, Circle as XCircle, CircleAlert as AlertCircle } from 'lucide-react';

interface EligibilityScoreProps {
  result: EligibilityResult;
}

export function EligibilityScore({ result }: EligibilityScoreProps) {
  const currency = useCurrency();
  const recommendationConfig = {
    approve: {
      label: 'Recommend Approval',
      color: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      icon: CheckCircle2,
      iconColor: 'text-emerald-600',
    },
    review: {
      label: 'Requires Review',
      color: 'bg-amber-100 text-amber-700 border-amber-200',
      icon: AlertCircle,
      iconColor: 'text-amber-600',
    },
    reject: {
      label: 'Recommend Rejection',
      color: 'bg-red-100 text-red-700 border-red-200',
      icon: XCircle,
      iconColor: 'text-red-600',
    },
  };

  const config = recommendationConfig[result.recommendation];
  const Icon = config.icon;

  const getScoreColor = (percentage: number) => {
    if (percentage >= 75) return 'bg-emerald-500';
    if (percentage >= 50) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Eligibility Assessment</h3>
        <Badge className={`${config.color} border`}>
          <Icon className={`h-3 w-3 mr-1 ${config.iconColor}`} />
          {config.label}
        </Badge>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex items-end justify-between mb-2">
            <span className="text-sm font-medium">Overall Score</span>
            <span className="text-3xl font-bold">{result.scorePercentage}%</span>
          </div>
          <Progress
            value={result.scorePercentage}
            className="h-3"
            indicatorClassName={getScoreColor(result.scorePercentage)}
          />
          <p className="text-xs text-muted-foreground mt-2">
            {result.passedCriteria} of {result.totalCriteria} criteria met
          </p>
        </div>

        <div className="space-y-3 pt-4 border-t">
          <p className="text-sm font-medium mb-3">Criteria Breakdown</p>
          {result.criteriaScores.map((score, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                {score.passes ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-600" />
                )}
                <span className={score.passes ? 'text-foreground' : 'text-muted-foreground'}>
                  {score.criteria.name}
                </span>
              </div>
              <span className="text-muted-foreground">
                {formatCriteriaValue(score.value, score.criteria.criteria_type, currency)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function formatCriteriaValue(value: number, type: string, currency: any): string {
  switch (type) {
    case 'credit_score':
    case 'years_in_business':
      return Math.round(value).toString();
    case 'debt_to_income_ratio':
    case 'debt_to_equity_ratio':
      return `${(value * 100).toFixed(1)}%`;
    case 'current_ratio':
    case 'collateral_coverage':
      return value.toFixed(2);
    case 'annual_revenue':
    case 'cash_flow':
      return formatCurrency(value, currency);
    default:
      return value.toString();
  }
}
