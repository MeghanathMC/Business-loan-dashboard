'use client';

import { Card } from '@/components/ui/card';

interface BulletChartProps {
  title: string;
  value: number;
  target: number;
  max: number;
  ranges: {
    poor: number;
    fair: number;
    good: number;
  };
  unit?: string;
  formatValue?: (value: number) => string;
}

export function BulletChart({
  title,
  value,
  target,
  max,
  ranges,
  unit = '',
  formatValue = (val) => val.toString()
}: BulletChartProps) {
  const valuePercentage = (value / max) * 100;
  const targetPercentage = (target / max) * 100;
  const poorPercentage = (ranges.poor / max) * 100;
  const fairPercentage = ((ranges.fair - ranges.poor) / max) * 100;
  const goodPercentage = ((ranges.good - ranges.fair) / max) * 100;

  const getPerformanceColor = () => {
    if (value >= ranges.good) return 'bg-emerald-500';
    if (value >= ranges.fair) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const getPerformanceText = () => {
    if (value >= ranges.good) return 'Excellent';
    if (value >= ranges.fair) return 'Good';
    if (value >= ranges.poor) return 'Fair';
    return 'Poor';
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <div className="text-right">
            <div className="text-2xl font-bold">{formatValue(value)}{unit}</div>
            <div className="text-sm text-muted-foreground">
              Target: {formatValue(target)}{unit}
            </div>
          </div>
        </div>

        {/* Bullet Chart Visualization */}
        <div className="space-y-2">
          <div className="relative h-8 bg-muted rounded-lg overflow-hidden">
            {/* Background Ranges */}
            <div className="absolute inset-0 flex">
              <div 
                className="bg-red-200" 
                style={{ width: `${poorPercentage}%` }}
              ></div>
              <div 
                className="bg-amber-200" 
                style={{ width: `${fairPercentage}%` }}
              ></div>
              <div 
                className="bg-emerald-200" 
                style={{ width: `${goodPercentage}%` }}
              ></div>
            </div>

            {/* Value Bar */}
            <div 
              className={`absolute top-1 bottom-1 ${getPerformanceColor()} rounded-sm`}
              style={{ width: `${valuePercentage}%` }}
            ></div>

            {/* Target Marker */}
            <div 
              className="absolute top-0 bottom-0 w-0.5 bg-gray-800"
              style={{ left: `${targetPercentage}%` }}
            >
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-gray-800 rounded-full"></div>
            </div>
          </div>

          {/* Performance Indicator */}
          <div className="flex items-center justify-between text-sm">
            <span className={`font-medium ${getPerformanceColor().replace('bg-', 'text-')}`}>
              {getPerformanceText()}
            </span>
            <span className="text-muted-foreground">
              {valuePercentage.toFixed(1)}% of max
            </span>
          </div>
        </div>

        {/* Range Labels */}
        <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
          <div className="text-center">
            <div className="w-3 h-3 bg-red-200 rounded mx-auto mb-1"></div>
            <div>Poor</div>
            <div>&lt; {formatValue(ranges.poor)}{unit}</div>
          </div>
          <div className="text-center">
            <div className="w-3 h-3 bg-amber-200 rounded mx-auto mb-1"></div>
            <div>Fair</div>
            <div>{formatValue(ranges.poor)}-{formatValue(ranges.fair)}{unit}</div>
          </div>
          <div className="text-center">
            <div className="w-3 h-3 bg-emerald-200 rounded mx-auto mb-1"></div>
            <div>Good</div>
            <div>&gt; {formatValue(ranges.fair)}{unit}</div>
          </div>
        </div>
      </div>
    </Card>
  );
}
