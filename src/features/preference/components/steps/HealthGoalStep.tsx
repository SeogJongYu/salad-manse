import { useState } from 'react';

import { PreferenceStepLayout as Layout } from '@/features/preference/components/PreferenceStepLayout';
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
    <Layout>
      <Layout.Content>
        <Layout.Header>
          <Layout.Icon>🌱</Layout.Icon>
          <Layout.Title className="text-emerald-700">목적</Layout.Title>
          <Layout.Description className="text-emerald-600">
            샐러드를 드시는 주된 이유는 무엇인가요?
          </Layout.Description>
        </Layout.Header>
        <RadioGroup
          value={selectedValue}
          className="grid grid-cols-1 gap-4 lg:grid-cols-2"
          onValueChange={setSelectedValue}
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
      </Layout.Content>

      <Layout.Footer>
        <StepNavigation>
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
