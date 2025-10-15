import { useState } from 'react';

import StepNavigation from '@/features/preference/components/molecules/StepNavigation';
import { healthGoalOptions } from '@/features/preference/constants/options';
import type { PreferencePayload } from '@/features/preference/types';
import { RadioGroup } from '@/shared/components/atoms/RadioGroup';
import RadioCard from '@/shared/components/molecules/RadioCard';

interface HealthGoalStepProps {
  defaultValue?: HealthGoalStepData;
  onNext: (value: HealthGoalStepData) => void;
}

type HealthGoalStepData = Pick<PreferencePayload, 'goal'>;

export default function HealthGoalStep({
  defaultValue,
  onNext,
}: HealthGoalStepProps) {
  const [selectedValue, setSelectedValue] = useState<HealthGoalStepData | null>(
    defaultValue || null,
  );

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold">
        샐러드를 드시는 주된 이유는 무엇인가요?
      </h2>
      <RadioGroup
        value={selectedValue?.goal}
        className="grid grid-cols-1 gap-4 lg:grid-cols-2"
        onValueChange={value => setSelectedValue({ goal: value })}
      >
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
