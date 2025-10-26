import type { TagKey } from '@prisma/client';

import type { PreferenceData } from '@/features/preference/types';

const validTags = [
  'overall_health',
  'weight_loss',
  'muscle_gain',
  'light_meal',
  'high_blood_pressure',
  'high_cholesterol',
  'high_blood_sugar',
];

export function getValidTags(data: PreferenceData) {
  const results = Object.values(data).filter(item =>
    validTags.includes(item),
  ) as TagKey[];

  return results;
}
