'use client';

import AnalyzingLoaderDialog from '@/features/preference/components/AnalyzingLoaderDialog';
import BloodPressureStep from '@/features/preference/components/steps/BloodPressureStep';
import BloodSugarStep from '@/features/preference/components/steps/BloodSugarStep';
import CholesterolStep from '@/features/preference/components/steps/CholesterolStep';
import HealthGoalStep from '@/features/preference/components/steps/HealthGoalStep';
import {
  PreferenceStoreHydrationBoundary,
  usePreferenceStore,
} from '@/features/preference/providers/PreferenceStoreProvider';
import type { PreferenceData } from '@/features/preference/types';
import { Progress } from '@/shared/components/ui/Progress';
import { useFunnel } from '@/shared/hooks/useFunnel';

interface PreferenceStepsProps {
  onSubmit: (values: PreferenceData) => void;
  isPending: boolean;
}

export const STEP_ORDER = [
  'goal',
  'blood_pressure',
  'cholesterol',
  'blood_sugar',
] as const;

export default function PreferenceSteps({
  onSubmit,
  isPending,
}: PreferenceStepsProps) {
  const { Funnel, stepNext, stepBack, progressRatio } = useFunnel(STEP_ORDER);
  const preference = usePreferenceStore(state => state.data);
  const setPreference = usePreferenceStore(state => state.setField);

  return (
    <>
      <Progress value={Math.ceil(progressRatio * 100)} className="mb-8" />

      <PreferenceStoreHydrationBoundary>
        <Funnel>
          <Funnel.Step name="goal">
            <HealthGoalStep
              defaultValue={preference?.goal}
              onNext={value => {
                setPreference('goal', value);
                stepNext();
              }}
            />
          </Funnel.Step>
          <Funnel.Step name="blood_pressure">
            <BloodPressureStep
              defaultValue={preference?.blood_pressure}
              onNext={value => {
                setPreference('blood_pressure', value);
                stepNext();
              }}
              onPrevious={stepBack}
            />
          </Funnel.Step>
          <Funnel.Step name="cholesterol">
            <CholesterolStep
              defaultValue={preference?.cholesterol}
              onNext={value => {
                setPreference('cholesterol', value);
                stepNext();
              }}
              onPrevious={stepBack}
            />
          </Funnel.Step>
          <Funnel.Step name="blood_sugar">
            <BloodSugarStep
              defaultValue={preference?.blood_sugar}
              onNext={value => {
                setPreference('blood_sugar', value);
                onSubmit({
                  ...preference,
                  blood_sugar: value,
                });
              }}
              onPrevious={stepBack}
            />
          </Funnel.Step>
        </Funnel>
      </PreferenceStoreHydrationBoundary>

      <AnalyzingLoaderDialog open={isPending} />
    </>
  );
}
