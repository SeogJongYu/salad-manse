import { useState } from 'react';

import StepNavigation from '@/features/preference/components/StepNavigation';
import { bloodPressureOptions } from '@/features/preference/constants/options';
import RadioCard from '@/shared/components/ui/RadioCard';
import { RadioGroup } from '@/shared/components/ui/RadioGroup';

interface BloodPressureStepProps {
  defaultValue?: string;
  onNext: (value: string) => void;
  onPrevious: () => void;
}

export default function BloodPressureStep({
  defaultValue,
  onNext,
  onPrevious,
}: BloodPressureStepProps) {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    defaultValue,
  );

  return (
    <div>
      <div className="mb-6 text-center">
        <div className="mb-2 text-3xl">❤️</div>
        <h2 className="mb-2 text-xl font-bold text-rose-700">혈압 관리</h2>
        <p className="text-sm text-rose-600">혈압은 어떤 편인가요?</p>
      </div>
      <RadioGroup
        value={selectedValue}
        className="grid grid-cols-1 gap-4 lg:grid-cols-2"
        onValueChange={setSelectedValue}
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
