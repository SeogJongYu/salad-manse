import { useState } from 'react';

import StepNavigation from '@/features/preference/components/StepNavigation';
import { bloodSugarOptions } from '@/features/preference/constants/options';
import RadioCard from '@/shared/components/ui/RadioCard';
import { RadioGroup } from '@/shared/components/ui/RadioGroup';

interface BloodSugarStepProps {
  defaultValue?: string;
  onNext: (value: string) => void;
  onPrevious: () => void;
}

export default function BloodSugarStep({
  defaultValue,
  onNext,
  onPrevious,
}: BloodSugarStepProps) {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    defaultValue,
  );

  return (
    <div>
      <div className="mb-6 text-center">
        <div className="mb-2 text-3xl">🍯</div>
        <h2 className="mb-2 text-xl font-bold text-sky-700">혈당 관리</h2>
        <p className="text-sm text-sky-600">혈당은 어떤 편인가요?</p>
      </div>
      <RadioGroup
        value={selectedValue}
        className="grid grid-cols-1 gap-4 lg:grid-cols-2"
        onValueChange={setSelectedValue}
      >
        {bloodSugarOptions.map(option => (
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
        >
          결과보기
        </StepNavigation.Next>
      </StepNavigation>
    </div>
  );
}
