'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { CircleCheck as CheckCircle, Circle as XCircle, Info, MessageSquare } from 'lucide-react';
import { LoanApplication } from '@/lib/types';

interface ActionPanelProps {
  application: LoanApplication;
  onApprove: (notes: string) => void;
  onReject: (notes: string) => void;
  onRequestInfo: (notes: string) => void;
}

export function ActionPanel({
  application,
  onApprove,
  onReject,
  onRequestInfo,
}: ActionPanelProps) {
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAction = async (action: 'approve' | 'reject' | 'request_info') => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    switch (action) {
      case 'approve':
        onApprove(notes);
        break;
      case 'reject':
        onReject(notes);
        break;
      case 'request_info':
        onRequestInfo(notes);
        break;
    }

    setNotes('');
    setIsSubmitting(false);
  };

  const canTakeAction = application.status !== 'approved' && application.status !== 'rejected';

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Decision Actions</h3>
        <Badge
          variant={
            application.status === 'approved'
              ? 'default'
              : application.status === 'rejected'
              ? 'destructive'
              : 'secondary'
          }
        >
          {application.status.replace('_', ' ').toUpperCase()}
        </Badge>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Analyst Notes
          </label>
          <Textarea
            placeholder="Add your analysis, recommendations, or required information..."
            value={notes}
            onChange={e => setNotes(e.target.value)}
            className="min-h-[120px] resize-none"
            disabled={!canTakeAction || isSubmitting}
          />
        </div>

        {canTakeAction && (
          <div className="grid grid-cols-3 gap-3 pt-4">
            <Button
              onClick={() => handleAction('approve')}
              disabled={isSubmitting}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Approve
            </Button>
            <Button
              onClick={() => handleAction('reject')}
              disabled={isSubmitting}
              variant="destructive"
            >
              <XCircle className="h-4 w-4 mr-2" />
              Reject
            </Button>
            <Button
              onClick={() => handleAction('request_info')}
              disabled={isSubmitting}
              variant="outline"
            >
              <Info className="h-4 w-4 mr-2" />
              Request Info
            </Button>
          </div>
        )}

        {!canTakeAction && (
          <div className="pt-4 text-center text-sm text-muted-foreground">
            This application has already been {application.status}
          </div>
        )}
      </div>
    </Card>
  );
}
