'use client';

import { unstable_Activity as Activity } from 'react';

import AnalyzingLoaderDialog from '@/features/preference/components/AnalyzingLoaderDialog';
import BloodPressureStep from '@/features/preference/components/steps/BloodPressureStep';
import BloodSugarStep from '@/features/preference/components/steps/BloodSugarStep';
import CholesterolStep from '@/features/preference/components/steps/CholesterolStep';
import HealthGoalStep from '@/features/preference/components/steps/HealthGoalStep';
import { usePreferenceStep } from '@/features/preference/hooks/usePreferenceStep';
import { PreferenceStoreHydrationBoundary } from '@/features/preference/providers/PreferenceStoreProvider';
import type { PreferenceData } from '@/features/preference/types';
import { Progress } from '@/shared/components/ui/Progress';

interface PreferenceStepFlowProps {
  onSubmit: (values: PreferenceData) => void;
  isPending: boolean;
}

export default function PreferenceStepFlow({
  onSubmit,
  isPending,
}: PreferenceStepFlowProps) {
  const { preferenceData, setField, currentStep, handleNext, handlePrevious } =
    usePreferenceStep();

  function handleSubmit(key: keyof typeof preferenceData, value: string) {
    setField(key, value);
    const submitData = {
      ...preferenceData,
      [key]: value,
    };

    onSubmit(submitData);
  }

  return (
    <>
      {currentStep <= 4 && (
        <Progress value={currentStep - 1} max={4} className="mb-8" />
      )}

      <PreferenceStoreHydrationBoundary>
        <Activity mode={currentStep === 1 ? 'visible' : 'hidden'}>
          <HealthGoalStep
            defaultValue={preferenceData?.goal}
            onNext={value => handleNext('goal', value)}
          />
        </Activity>
        <Activity mode={currentStep === 2 ? 'visible' : 'hidden'}>
          <BloodPressureStep
            defaultValue={preferenceData?.blood_pressure}
            onNext={value => handleNext('blood_pressure', value)}
            onPrevious={handlePrevious}
          />
        </Activity>
        <Activity mode={currentStep === 3 ? 'visible' : 'hidden'}>
          <CholesterolStep
            defaultValue={preferenceData?.cholesterol}
            onNext={value => handleNext('cholesterol', value)}
            onPrevious={handlePrevious}
          />
        </Activity>
        <Activity mode={currentStep === 4 ? 'visible' : 'hidden'}>
          <BloodSugarStep
            defaultValue={preferenceData?.blood_sugar}
            onNext={value => handleSubmit('blood_sugar', value)}
            onPrevious={handlePrevious}
          />
        </Activity>
      </PreferenceStoreHydrationBoundary>

      <AnalyzingLoaderDialog open={isPending} />
    </>
  );
}
