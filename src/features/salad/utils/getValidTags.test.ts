import { getValidTags } from '@/features/salad/utils/getValidTags';

describe('getValidTags', () => {
  it('입력된 태그 객체에서 Goal 태그와, 유효한 태그만 배열로 반환해야 한다', () => {
    const mockTagData = {
      goal: 'overall_health',
      blood_pressure: 'unknown_blood_pressure',
      cholesterol: 'high_cholesterol',
      blood_sugar: 'unknown_blood_sugar',
    };
    const validTags = getValidTags(mockTagData);
    expect(validTags).toEqual(['overall_health', 'high_cholesterol']);
  });

  it('유효한 태그가 하나도 없으면 Goal 태그만 배열로 반환한다.', () => {
    const mockTagData = {
      goal: 'muscle_gain',
      blood_pressure: 'unknown_blood_pressure',
      cholesterol: 'unknown_cholesterol',
      blood_sugar: 'unknown_blood_sugar',
    };
    const validTags = getValidTags(mockTagData);
    expect(validTags).toEqual(['muscle_gain']);
  });
});
