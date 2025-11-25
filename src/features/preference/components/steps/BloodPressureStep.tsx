import { useState } from 'react';

import { PreferenceStepLayout as Layout } from '@/features/preference/components/PreferenceStepLayout';
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
    <Layout>
      <Layout.Content>
        <Layout.Header>
          <Layout.Icon>❤️</Layout.Icon>
          <Layout.Title className="text-rose-700">혈압 관리</Layout.Title>
          <Layout.Description className="text-rose-600">
            혈압은 어떤 편인가요?
          </Layout.Description>
        </Layout.Header>
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
      </Layout.Content>

      <Layout.Footer>
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
      </Layout.Footer>
    </Layout>
  );
}
