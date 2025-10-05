'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RiskAlert } from '@/lib/types';
import { CircleAlert as AlertCircle, ShieldAlert, FileQuestion, CircleCheck as CheckCircle2 } from 'lucide-react';

interface RiskAlertsProps {
  alerts: RiskAlert[];
}

const alertTypeConfig = {
  high_risk: {
    icon: ShieldAlert,
    label: 'High Risk',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
  },
  compliance: {
    icon: AlertCircle,
    label: 'Compliance',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
  },
  verification_needed: {
    icon: FileQuestion,
    label: 'Verification',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
};

const severityConfig = {
  low: { label: 'Low', className: 'bg-slate-100 text-slate-700' },
  medium: { label: 'Medium', className: 'bg-amber-100 text-amber-700' },
  high: { label: 'High', className: 'bg-orange-100 text-orange-700' },
  critical: { label: 'Critical', className: 'bg-red-100 text-red-700' },
};

export function RiskAlerts({ alerts }: RiskAlertsProps) {
  const activeAlerts = alerts.filter(alert => !alert.is_resolved);

  if (activeAlerts.length === 0) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          <h3 className="text-lg font-semibold">Risk Assessment</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          No active risk alerts. All verification checks passed.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Risk Alerts</h3>
        <Badge variant="outline" className="bg-amber-50 text-amber-700">
          {activeAlerts.length} Active
        </Badge>
      </div>

      <div className="space-y-3">
        {activeAlerts.map(alert => {
          const typeConfig = alertTypeConfig[alert.alert_type];
          const severityInfo = severityConfig[alert.severity];
          const Icon = typeConfig.icon;

          return (
            <div
              key={alert.id}
              className={`p-4 rounded-lg border ${typeConfig.bgColor}`}
            >
              <div className="flex items-start gap-3">
                <Icon className={`h-5 w-5 ${typeConfig.color} flex-shrink-0 mt-0.5`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-sm">{typeConfig.label}</span>
                    <Badge className={severityInfo.className}>{severityInfo.label}</Badge>
                  </div>
                  <p className="text-sm text-foreground">{alert.message}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Created: {new Date(alert.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
