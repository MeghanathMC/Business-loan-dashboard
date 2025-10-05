'use client';

import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface GaugeChartProps {
  value: number;
  max: number;
  target?: number;
  title: string;
  subtitle?: string;
  unit?: string;
  color?: 'default' | 'success' | 'warning' | 'danger';
}

export function GaugeChart({ 
  value, 
  max, 
  target, 
  title, 
  subtitle, 
  unit = '%',
  color = 'default'
}: GaugeChartProps) {
  const percentage = (value / max) * 100;
  const targetPercentage = target ? (target / max) * 100 : 0;

  const getColorClass = () => {
    switch (color) {
      case 'success':
        return 'bg-emerald-500';
      case 'warning':
        return 'bg-amber-500';
      case 'danger':
        return 'bg-red-500';
      default:
        return 'bg-blue-500';
    }
  };

  const getStatusColor = () => {
    if (target && value >= target) {
      return 'bg-emerald-100 text-emerald-700';
    } else if (target && value >= target * 0.8) {
      return 'bg-amber-100 text-amber-700';
    } else {
      return 'bg-red-100 text-red-700';
    }
  };

  const getStatusText = () => {
    if (target && value >= target) {
      return 'Above Target';
    } else if (target && value >= target * 0.8) {
      return 'Near Target';
    } else {
      return 'Below Target';
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        {target && (
          <Badge className={getStatusColor()}>
            {getStatusText()}
          </Badge>
        )}
      </div>

      <div className="space-y-4">
        {/* Gauge Visualization */}
        <div className="relative">
          <div className="w-32 h-32 mx-auto relative">
            {/* Background Circle */}
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-muted-foreground/20"
              />
              {/* Progress Circle */}
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 50}`}
                strokeDashoffset={`${2 * Math.PI * 50 * (1 - percentage / 100)}`}
                className={`${getColorClass()} transition-all duration-1000 ease-out`}
                strokeLinecap="round"
              />
              {/* Target Line */}
              {target && (
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 50}`}
                  strokeDashoffset={`${2 * Math.PI * 50 * (1 - targetPercentage / 100)}`}
                  className="text-amber-500"
                  strokeLinecap="round"
                />
              )}
            </svg>
            
            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold">{value.toFixed(1)}{unit}</span>
              {target && (
                <span className="text-xs text-muted-foreground">
                  Target: {target}{unit}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{percentage.toFixed(1)}%</span>
          </div>
          <Progress 
            value={percentage} 
            className="h-2"
            indicatorClassName={getColorClass()}
          />
        </div>

        {/* Additional Info */}
        {subtitle && (
          <p className="text-sm text-muted-foreground text-center">
            {subtitle}
          </p>
        )}

        {/* Target Indicator */}
        {target && (
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <div className="w-3 h-0.5 bg-amber-500"></div>
            <span>Target: {target}{unit}</span>
          </div>
        )}
      </div>
    </Card>
  );
}
