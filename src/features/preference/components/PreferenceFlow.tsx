'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';

import PreferenceSteps from '@/features/preference/components/steps/PreferenceSteps';
import type { PreferenceData } from '@/features/preference/types';
import { requestSalad } from '@/features/salad/api/actions/requestSalad';

export default function PreferenceFlow() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleSubmit(values: PreferenceData) {
    startTransition(async () => {
      const response = await requestSalad(values);

      if (!response.success) {
        toast.error(response.error);
        return;
      }

      router.push(`/salads/${response.data.saladStory.id}`);
    });
  }

  return <PreferenceSteps onSubmit={handleSubmit} isPending={isPending} />;
}
