import { useState } from 'react';

import StepNavigation from '@/features/preference/components/StepNavigation';
import { healthGoalOptions } from '@/features/preference/constants/options';
import RadioCard from '@/shared/components/ui/RadioCard';
import { RadioGroup } from '@/shared/components/ui/RadioGroup';

interface HealthGoalStepProps {
  defaultValue?: string;
  onNext: (value: string) => void;
}

export default function HealthGoalStep({
  defaultValue,
  onNext,
}: HealthGoalStepProps) {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    defaultValue,
  );

  return (
    <div>
      <div className="mb-6 text-center">
        <div className="mb-2 text-3xl">🌱</div>
        <h2 className="mb-2 text-xl font-bold text-emerald-700">목적</h2>
        <p className="text-sm text-emerald-600">
          샐러드를 드시는 주된 이유는 무엇인가요?
        </p>
      </div>
      <RadioGroup
        value={selectedValue}
        className="grid grid-cols-1 gap-4 lg:grid-cols-2"
        onValueChange={setSelectedValue}>
        {healthGoalOptions.map(option => (
          <RadioCard
            key={option.value}
            id={option.value}
            value={option.value}
            label={option.label}
            description={option.description}
          />
        ))}
      </RadioGroup>

      <StepNavigation>
        <StepNavigation.Next
          disabled={!selectedValue}
          onClick={() => {
            if (!selectedValue) return;
            onNext(selectedValue);
          }}
        />
      </StepNavigation>
    </div>
  );
}
