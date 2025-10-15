import { useState } from 'react';

import StepNavigation from '@/features/preference/components/molecules/StepNavigation';
import { cholesterolOptions } from '@/features/preference/constants/options';
import type { PreferencePayload } from '@/features/preference/types';
import { RadioGroup } from '@/shared/components/atoms/RadioGroup';
import RadioCard from '@/shared/components/molecules/RadioCard';

interface CholesterolStepProps {
  defaultValue?: CholesterolStepData;
  onNext: (value: CholesterolStepData) => void;
  onPrevious: () => void;
}

type CholesterolStepData = Pick<PreferencePayload, 'cholesterol'>;

export default function CholesterolStep({
  defaultValue,
  onNext,
  onPrevious,
}: CholesterolStepProps) {
  const [selectedValue, setSelectedValue] =
    useState<CholesterolStepData | null>(defaultValue || null);

  return (
    <div>
      <div className="mb-6 text-center">
        <div className="mb-2 text-3xl">🫒</div>
        <h2 className="mb-2 text-xl font-bold text-amber-700">
          콜레스테롤 관리
        </h2>
        <p className="text-sm text-amber-600">
          콜레스테롤 수치는 어떤 편인가요?
        </p>
      </div>
      <RadioGroup
        value={selectedValue?.cholesterol}
        className="grid grid-cols-1 gap-4 lg:grid-cols-2"
        onValueChange={value => setSelectedValue({ cholesterol: value })}
      >
        {cholesterolOptions.map(option => (
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
        <StepNavigation.Previous onClick={onPrevious} />
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
