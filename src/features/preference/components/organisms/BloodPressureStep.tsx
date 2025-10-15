import { useState } from 'react';

import StepNavigation from '@/features/preference/components/molecules/StepNavigation';
import { bloodPressureOptions } from '@/features/preference/constants/options';
import type { PreferencePayload } from '@/features/preference/types';
import { RadioGroup } from '@/shared/components/atoms/RadioGroup';
import RadioCard from '@/shared/components/molecules/RadioCard';

interface BloodPressureStepProps {
  defaultValue?: BloodPressureStepData;
  onNext: (value: BloodPressureStepData) => void;
  onPrevious: () => void;
}

type BloodPressureStepData = Pick<PreferencePayload, 'bp'>;

export default function BloodPressureStep({
  defaultValue,
  onNext,
  onPrevious,
}: BloodPressureStepProps) {
  const [selectedValue, setSelectedValue] =
    useState<BloodPressureStepData | null>(defaultValue || null);

  return (
    <div>
      <div className="mb-6 text-center">
        <div className="mb-2 text-3xl">❤️</div>
        <h2 className="mb-2 text-xl font-bold text-rose-700">혈압 관리</h2>
        <p className="text-sm text-rose-600">혈압은 어떤 편인가요?</p>
      </div>
      <RadioGroup
        value={selectedValue?.bp}
        className="grid grid-cols-1 gap-4 lg:grid-cols-2"
        onValueChange={value => setSelectedValue({ bp: value })}
      >
        {bloodPressureOptions.map(option => (
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
