'use client';

import { useRouter } from 'next/navigation';
import { startTransition, useActionState, useEffect } from 'react';
import { toast } from 'sonner';

import PreferenceStepFlow from '@/features/preference/components/steps/PreferenceStepFlow';
import { requestSalad } from '@/features/salad/api/actions/requestSalad';

export default function PreferenceContainer() {
  const router = useRouter();
  const [state, submitAction, isPending] = useActionState(requestSalad, {
    success: false,
    error: '',
  });

  useEffect(() => {
    if (state.success) {
      router.push(`/salads/${state.data.saladStory.id}`);
    } else if (state.error) {
      toast.error(state.error);
    }
  }, [state, router]);

  return (
    <PreferenceStepFlow
      onSubmit={values => {
        startTransition(() => {
          submitAction(values);
        });
      }}
      isPending={isPending}
    />
  );
}
