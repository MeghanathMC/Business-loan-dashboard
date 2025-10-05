'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/currency-utils';
import { cn } from '@/lib/utils';
import { Users, Clock, ClipboardList, CheckCircle } from 'lucide-react';

type StatusCardVariant = 'lead' | 'started' | 'closed' | 'approved' | 'default';

interface StatusCardProps {
  title: string;
  value: number | string;
  variant?: StatusCardVariant;
  isCurrency?: boolean;
  currency?: string;
  badge?: string | number;
  subtitle?: string;
  subtitleValue?: string | number;
  extraInfo?: React.ReactNode;
  showFileCount?: boolean;
  fileCount?: number;
  icon?: React.ReactNode;
}

const cardStyles: Record<StatusCardVariant, string> = {
  lead: 'bg-purple-50 border-purple-100',
  started: 'bg-amber-50 border-amber-100',
  closed: 'bg-blue-50 border-blue-100',
  approved: 'bg-emerald-50 border-emerald-100',
  default: 'bg-card border-border',
};

const valueStyles: Record<StatusCardVariant, string> = {
  lead: 'text-purple-900',
  started: 'text-amber-900',
  closed: 'text-blue-900',
  approved: 'text-emerald-900',
  default: 'text-foreground',
};

const defaultIcons: Record<StatusCardVariant, React.ReactNode> = {
  lead: <Users className="h-5 w-5 text-purple-700" />,
  started: <Clock className="h-5 w-5 text-amber-700" />,
  closed: <ClipboardList className="h-5 w-5 text-blue-700" />,
  approved: <CheckCircle className="h-5 w-5 text-emerald-700" />,
  default: <Users className="h-5 w-5 text-muted-foreground" />,
};

const subtitleStyles: Record<StatusCardVariant, string> = {
  lead: 'text-purple-700',
  started: 'text-amber-700',
  closed: 'text-blue-700',
  approved: 'text-emerald-700',
  default: 'text-muted-foreground',
};

export function StatusCard({
  title,
  value,
  variant = 'default',
  isCurrency = false,
  currency = '$',
  badge,
  subtitle,
  subtitleValue,
  extraInfo,
  showFileCount = false,
  fileCount = 12,
  icon,
}: StatusCardProps) {
  const formattedValue = isCurrency 
    ? (typeof value === 'number' ? formatCurrency(value, currency) : value)
    : value;

  const IconElement = icon || defaultIcons[variant];

  return (
    <div className={cn('rounded-lg p-6 border', cardStyles[variant])}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {IconElement}
          <p className={cn('text-sm font-medium', subtitleStyles[variant])}>{title}</p>
        </div>
        {badge && (
          <Badge variant="outline" className={cn('bg-white/80', subtitleStyles[variant])}>
            {badge}
          </Badge>
        )}
      </div>
      <p className={cn('text-2xl font-bold', valueStyles[variant])}>
        {formattedValue}
      </p>
      
      {subtitle && (
        <div className="flex items-center justify-between mt-2">
          <p className={cn('text-xs', subtitleStyles[variant])}>{subtitle}</p>
          {subtitleValue && (
            <p className={cn('text-xs font-medium', subtitleStyles[variant])}>
              ${subtitleValue}
            </p>
          )}
        </div>
      )}
      
      {extraInfo && (
        <div className="mt-2">
          {extraInfo}
        </div>
      )}
      
      {/* File count indicator */}
      {showFileCount && (
        <div className="flex justify-end mt-3">
          <div className={cn('text-xs flex items-center gap-1', subtitleStyles[variant])}>
            <span>File(s)</span>
            <span className="font-medium">{fileCount}</span>
          </div>
        </div>
      )}
    </div>
  );
}
