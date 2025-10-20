'use client';

import BloodPressureStep from '@/features/preference/components/steps/BloodPressureStep';
import BloodSugarStep from '@/features/preference/components/steps/BloodSugarStep';
import CholesterolStep from '@/features/preference/components/steps/CholesterolStep';
import HealthGoalStep from '@/features/preference/components/steps/HealthGoalStep';
import {
  PreferenceStoreHydrationBoundary,
  usePreferenceStore,
} from '@/features/preference/providers/PreferenceStoreProvider';
import type { PreferenceData } from '@/features/preference/store/PreferenceStore';
import { Progress } from '@/shared/components/ui/Progress';
import { useQueryState } from '@/shared/hooks/useQueryState';

interface PreferenceStepFlowProps {
  onSubmit: (values: PreferenceData) => void;
}

export default function PreferenceStepFlow({
  onSubmit,
}: PreferenceStepFlowProps) {
  const preferenceData = usePreferenceStore(state => state.data);
  const setField = usePreferenceStore(state => state.setField);
  const [queryState, setQueryState] = useQueryState<{ step: string }>();
  const currentStep = Number(queryState.step) || 1;

  function handlePrevious() {
    setQueryState(prev => ({
      ...prev,
      step: String(Number(prev.step) - 1),
    }));
  }

  function handleNext(key: keyof typeof preferenceData, value: string) {
    setField(key, value);
    setQueryState(prev => ({ ...prev, step: String(Number(prev.step) + 1) }));
  }

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
        {currentStep === 1 && (
          <HealthGoalStep
            defaultValue={preferenceData?.goal ?? undefined}
            onNext={value => handleNext('goal', value)}
            key={preferenceData?.goal ? 'load' : 'loading'}
          />
        )}
        {currentStep === 2 && (
          <BloodPressureStep
            defaultValue={preferenceData?.blood_pressure ?? undefined}
            onNext={value => handleNext('blood_pressure', value)}
            onPrevious={handlePrevious}
          />
        )}
        {currentStep === 3 && (
          <CholesterolStep
            defaultValue={preferenceData?.cholesterol ?? undefined}
            onNext={value => handleNext('cholesterol', value)}
            onPrevious={handlePrevious}
          />
        )}
        {currentStep === 4 && (
          <BloodSugarStep
            defaultValue={preferenceData?.blood_sugar ?? undefined}
            onNext={value => handleSubmit('blood_sugar', value)}
            onPrevious={handlePrevious}
          />
        )}
      </PreferenceStoreHydrationBoundary>
    </>
  );
}
