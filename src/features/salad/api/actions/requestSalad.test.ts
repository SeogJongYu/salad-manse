import { Category } from '@prisma/client';

import type { PreferenceData } from '@/features/preference/types';
import { requestSalad } from '@/features/salad/api/actions/requestSalad';
import {
  getIngredientsByTags,
  findDuplicatedSalad,
  createSaladStory,
} from '@/features/salad/api/db';
import { generateSaladStoryData } from '@/features/salad/api/openai.service';
import { assembleSalad } from '@/features/salad/utils/assembleSalad';
import { getRuleByGoal } from '@/features/salad/utils/getRuleByGoal';
import { getValidTags } from '@/features/salad/utils/getValidTags';

jest.mock('@/features/salad/utils/assembleSalad');
jest.mock('@/features/salad/utils/getValidTags');
jest.mock('@/features/salad/api/db');
jest.mock('@/features/salad/api/openai.service');
jest.mock('@/features/salad/utils/getRuleByGoal');
jest.mock('lodash-es', () => ({
  shuffle: jest.fn(array => [...array]),
}));

const mockedAssembleSalad = assembleSalad as jest.Mock;
const mockedGetValidTags = getValidTags as jest.Mock;
const mockedGetIngredientsByTags = getIngredientsByTags as jest.Mock;
const mockedFindDuplicatedSalad = findDuplicatedSalad as jest.Mock;
const mockedCreateSaladStory = createSaladStory as jest.Mock;
const mockedGenerateSaladStoryData = generateSaladStoryData as jest.Mock;
const mockedGetRuleByGoal = getRuleByGoal as jest.Mock; // 👈 여기!

describe('requestSalad (서버 액션)', () => {
  const mockValues: PreferenceData = {
    goal: 'muscle_gain',
    blood_pressure: 'high_blood_pressure',
    cholesterol: 'normal_cholesterol', // 서버가 필터링할 값
    blood_sugar: 'unknown_blood_sugar', // 서버가 필터링할 값
  };
  const mockAssembled = {
    saladComponents: [{ id: 10, name: '닭가슴살' }],
    groupedIngredientNames: { [Category.PROTEIN]: ['닭가슴살'] },
  };

  /**
   * 테스트 케이스 1: 중복 샐러드가 "없어서" AI로 새 스토리를 생성하는 경우
   */
  it('중복 샐러드가 없으면, AI로 스토리를 생성하고 새 샐러드를 반환해야 한다', async () => {
    mockedGetRuleByGoal.mockReturnValue({ FAKE_RULE: 1 });
    mockedGetValidTags.mockReturnValue(['high_blood_pressure']);
    mockedGetIngredientsByTags.mockReturnValue([]);
    mockedAssembleSalad.mockReturnValue(mockAssembled);

    mockedFindDuplicatedSalad.mockResolvedValue(null); // 중복 없음

    mockedGenerateSaladStoryData.mockResolvedValue({
      title: '생성된 스토리 제목',
      summary: '생성된 스토리 요약',
    });
    mockedCreateSaladStory.mockResolvedValue({
      id: 'new-salad-123', // 새로 생성된 샐러드
      title: '스토리 제목',
    });

    const result = await requestSalad(
      { success: false, error: '' },
      mockValues,
    );

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.saladStory?.id).toBe('new-salad-123');
    }

    expect(mockedGenerateSaladStoryData).toHaveBeenCalledTimes(1);
    expect(mockedCreateSaladStory).toHaveBeenCalledTimes(1);
  });

  /**
   * 테스트 케이스 2: 중복 샐러드를 발견해서 AI 호출을 건너뛰는 경우
   */
  it('중복 샐러드를 발견하면, AI/DB 호출 없이 기존 샐러드를 반환해야 한다', async () => {
    mockedGetRuleByGoal.mockReturnValue({ FAKE_RULE: 1 });
    mockedGetValidTags.mockReturnValue(['high_blood_pressure']);
    mockedGetIngredientsByTags.mockReturnValue([]);
    mockedAssembleSalad.mockReturnValue(mockAssembled);

    // 중복 발견
    mockedFindDuplicatedSalad.mockResolvedValue({
      id: 'existing-salad-456',
      title: '기존 샐러드',
    });

    const result = await requestSalad(
      { success: false, error: '' },
      mockValues,
    );

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.saladStory?.id).toBe('existing-salad-456');
    }

    expect(mockedGenerateSaladStoryData).not.toHaveBeenCalled();
    expect(mockedCreateSaladStory).not.toHaveBeenCalled();
  });

  /**
   * 테스트 케이스 3: 로직 초반(DB 조회)에서 에러가 발생하는 경우
   */
  it('DB 조회 중 에러가 발생하면, success: false와 에러 메시지를 반환해야 한다', async () => {
    const errorMessage = 'DB Connection Failed';
    mockedGetIngredientsByTags.mockRejectedValue(new Error(errorMessage));

    const result = await requestSalad(
      { success: false, error: '' },
      mockValues,
    );

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error).toBe(errorMessage);
    }

    expect(mockedAssembleSalad).not.toHaveBeenCalled();
    expect(mockedGenerateSaladStoryData).not.toHaveBeenCalled();
  });

  it('Error 객체가 아닌 값이 throw 되어도 success: false를 반환해야 한다', async () => {
    const errorMessage = '그냥 문자열 에러';
    mockedGetIngredientsByTags.mockRejectedValue(errorMessage); // 👈 new Error()가 아님

    const result = await requestSalad(
      { success: false, error: '' },
      mockValues,
    );

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toBe(
        '샐러드 추천에 실패했습니다. 잠시 후 다시 시도해주세요.',
      );
    }

    expect(mockedAssembleSalad).not.toHaveBeenCalled();
    expect(mockedGenerateSaladStoryData).not.toHaveBeenCalled();
  });
});
