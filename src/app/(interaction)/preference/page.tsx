'use client';
import { unstable_ViewTransition as ViewTransition } from 'react';

import BloodPressureStep from '@/features/preference/components/organisms/BloodPressureStep';
import BloodSugarStep from '@/features/preference/components/organisms/BloodSugarStep';
import CholesterolStep from '@/features/preference/components/organisms/CholesterolStep';
import HealthGoalStep from '@/features/preference/components/organisms/HealthGoalStep';
import type { PreferencePayload } from '@/features/preference/types';
import { Progress } from '@/shared/components/atoms/Progress';
import { useQueryState } from '@/shared/hooks/useQueryState';

export default function PreferencePage() {
  const [queryState, setQueryState] = useQueryState<
    Partial<PreferencePayload> & { step: string }
  >();
  const currentStep = Number(queryState.step) || 1;

  const handlePrevious = () => {
    setQueryState(
      prev => ({
        ...prev,
        step: String(Number(prev.step) - 1),
      }),
      { replace: true },
    );
  };

  const handleNext = (value: Partial<PreferencePayload>) => {
    setQueryState(prev => ({
      ...prev,
      ...value,
      step: String(Number(prev.step) + 1),
    }));
  };

  return (
    <ViewTransition>
      <div className="px-4 pt-4 pb-[60px]">
        <Progress value={currentStep - 1} max={4} className="mb-8" />

        {currentStep === 1 && (
          <HealthGoalStep
            defaultValue={
              queryState.goal ? { goal: queryState.goal } : undefined
            }
            onNext={handleNext}
          />
        )}
        {currentStep === 2 && (
          <BloodPressureStep
            defaultValue={queryState.bp ? { bp: queryState.bp } : undefined}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )}
        {currentStep === 3 && (
          <CholesterolStep
            defaultValue={
              queryState.cholesterol
                ? { cholesterol: queryState.cholesterol }
                : undefined
            }
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )}
        {currentStep === 4 && (
          <BloodSugarStep
            defaultValue={queryState.bs ? { bs: queryState.bs } : undefined}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )}
      </div>
    </ViewTransition>
  );
}
