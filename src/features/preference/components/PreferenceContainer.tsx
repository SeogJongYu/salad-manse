'use client';

import type { TagKey } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { unstable_ViewTransition as ViewTransition } from 'react';
import { toast } from 'sonner';

import PreferenceStepFlow from '@/features/preference/components/steps/PreferenceStepFlow';
import type { PreferenceData } from '@/features/preference/store/PreferenceStore';
import { requestSalad } from '@/features/salad/api/actions/requestSalad';

export default function PreferenceContainer() {
  const router = useRouter();

  async function handleSubmit(values: PreferenceData) {
    const params = [values.goal] as TagKey[];

    if (values.blood_pressure === 'high_blood_pressure') {
      params.push(values.blood_pressure);
    } else if (values.cholesterol === 'high_cholesterol') {
      params.push(values.cholesterol);
    } else if (values.blood_sugar === 'high_blood_sugar') {
      params.push(values.blood_sugar);
    }

    try {
      const response = await requestSalad({
        goal: values.goal as TagKey,
        tagKeys: params,
      });

      if (response.success) {
        router.push(`/salads/${response.data.saladStory.id}`);
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      console.error('Error submitting preference data:', error);
      toast.error(
        '서버와의 통신 중 오류가 발생했습니다. 잠시후 다시 시도해주세요.',
      );
    }
  }

  return (
    <ViewTransition>
      <PreferenceStepFlow onSubmit={handleSubmit} />
    </ViewTransition>
  );
}
