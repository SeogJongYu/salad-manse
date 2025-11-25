import { useState } from 'react';

import { PreferenceStepLayout as Layout } from '@/features/preference/components/PreferenceStepLayout';
import StepNavigation from '@/features/preference/components/StepNavigation';
import { cholesterolOptions } from '@/features/preference/constants/options';
import RadioCard from '@/shared/components/ui/RadioCard';
import { RadioGroup } from '@/shared/components/ui/RadioGroup';

interface CholesterolStepProps {
  defaultValue?: string;
  onNext: (value: string) => void;
  onPrevious: () => void;
}

export default function CholesterolStep({
  defaultValue,
  onNext,
  onPrevious,
}: CholesterolStepProps) {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    defaultValue,
  );

  return (
    <Layout>
      <Layout.Content>
        <Layout.Header>
          <Layout.Icon>🫒</Layout.Icon>
          <Layout.Title className="text-amber-700">
            콜레스테롤 관리
          </Layout.Title>
          <Layout.Description className="text-amber-600">
            콜레스테롤 수치는 어떤 편인가요?
          </Layout.Description>
        </Layout.Header>
        <RadioGroup
          value={selectedValue}
          className="grid grid-cols-1 gap-4 lg:grid-cols-2"
          onValueChange={setSelectedValue}
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
