'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { EligibilityCriteria } from '@/lib/types';
import { Settings2, RotateCcw } from 'lucide-react';

interface CriteriaCustomizerProps {
  criteria: EligibilityCriteria[];
  onUpdate: (updated: EligibilityCriteria[]) => void;
}

export function CriteriaCustomizer({ criteria, onUpdate }: CriteriaCustomizerProps) {
  const [localCriteria, setLocalCriteria] = useState(criteria);
  const [hasChanges, setHasChanges] = useState(false);

  const handleWeightChange = (id: string, weight: number) => {
    const updated = localCriteria.map(c =>
      c.id === id ? { ...c, weight } : c
    );
    setLocalCriteria(updated);
    setHasChanges(true);
  };

  const handleActiveToggle = (id: string) => {
    const updated = localCriteria.map(c =>
      c.id === id ? { ...c, is_active: !c.is_active } : c
    );
    setLocalCriteria(updated);
    setHasChanges(true);
  };

  const handleReset = () => {
    setLocalCriteria(criteria);
    setHasChanges(false);
  };

  const handleApply = () => {
    onUpdate(localCriteria);
    setHasChanges(false);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Settings2 className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Customize Review Criteria</h3>
        </div>
        {hasChanges && (
          <Button variant="ghost" size="sm" onClick={handleReset}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {localCriteria.map(criterion => (
          <div
            key={criterion.id}
            className={`space-y-3 pb-6 border-b last:border-b-0 ${
              !criterion.is_active ? 'opacity-50' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label className="font-medium">{criterion.name}</Label>
                <p className="text-xs text-muted-foreground mt-1">
                  {criterion.description}
                </p>
              </div>
              <Switch
                checked={criterion.is_active}
                onCheckedChange={() => handleActiveToggle(criterion.id)}
              />
            </div>

            {criterion.is_active && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Weight</span>
                  <span className="font-semibold">{criterion.weight.toFixed(1)}</span>
                </div>
                <Slider
                  value={[criterion.weight]}
                  onValueChange={([value]) => handleWeightChange(criterion.id, value)}
                  min={0}
                  max={5}
                  step={0.5}
                  className="py-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Low Impact</span>
                  <span>High Impact</span>
                </div>
              </div>
            )}
          </div>
        ))}

        {hasChanges && (
          <Button onClick={handleApply} className="w-full">
            Apply Changes & Recalculate
          </Button>
        )}
      </div>
    </Card>
  );
}
