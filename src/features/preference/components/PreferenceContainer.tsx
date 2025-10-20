'use client';

import {
  useTransition,
  unstable_ViewTransition as ViewTransition,
} from 'react';

import AnalyzingLoaderDialog from '@/features/preference/components/AnalyzingLoaderDialog';
import PreferenceStepFlow from '@/features/preference/components/steps/PreferenceStepFlow';
import type { PreferenceData } from '@/features/preference/store/PreferenceStore';

export default function PreferenceContainer() {
  const [isPending, startTransition] = useTransition();

  function handleSubmit(values: PreferenceData) {
    console.log('values:', values);
    startTransition(async () => {
      await new Promise(resolve => setTimeout(resolve, 3000));
    });
  }

  return (
    <ViewTransition>
      <PreferenceStepFlow onSubmit={handleSubmit} />
      <AnalyzingLoaderDialog open={isPending} />
    </ViewTransition>
  );
}
