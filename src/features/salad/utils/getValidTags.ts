import type { PreferenceData } from '@/features/preference/types';

export function getValidTags(data: PreferenceData) {
  const results = Object.values(data).filter(
    item =>
      item === 'high_blood_pressure' ||
      item === 'high_cholesterol' ||
      item === 'high_blood_sugar',
  );

  return results;
}
