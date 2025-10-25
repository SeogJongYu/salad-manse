import { type SaladStory, type TagKey } from '@prisma/client';

import {
  createSaladStory,
  findDuplicatedSalad,
  getIngredientsByTags,
} from '@/features/salad/api/db';
import { generateSaladStoryData } from '@/features/salad/api/openai.service';
import { assembleSalad } from '@/features/salad/utils/assembleSalad';
import { getRuleByGoal } from '@/features/salad/utils/getRuleByGoal';

export type CustomizedSaladResponse =
  | {
      success: true;
      data: {
        saladStory: SaladStory;
      };
    }
  | {
      success: false;
      error: string;
    };

/**
 * 샐러드 추천의 전체 흐름을 관리합니다.
 */
export async function requestSalad(params: {
  goal: TagKey;
  tagKeys: TagKey[];
}): Promise<CustomizedSaladResponse> {
  try {
    const rule = getRuleByGoal(params.goal);
    const ingredients = await getIngredientsByTags(params.tagKeys);

    const { saladComponents, groupedIngredientNames } = assembleSalad(
      ingredients,
      rule,
    );

    const saladStory = await findOrCreateSaladStory(
      saladComponents,
      groupedIngredientNames,
      params.goal,
    );

    return {
      success: true,
      data: { saladStory },
    };
  } catch (error) {
    console.error('Error in getSaladStory:', error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : '샐러드 스토리를 가져오는 데 실패했습니다.',
    };
  }
}

/**
 * 샐러드 스토리 찾기 또는 생성 (DB/AI 로직)
 * @description 조합된 재료로 중복 스토리를 찾고, 없으면 AI로 새로 생성합니다.
 */
export async function findOrCreateSaladStory(
  saladComponents: ReturnType<typeof assembleSalad>['saladComponents'],
  groupedIngredientNames: ReturnType<
    typeof assembleSalad
  >['groupedIngredientNames'],
  goal: TagKey,
) {
  const ingredientIds = saladComponents.map(i => i.id);

  // 1. 중복 확인
  const duplicatedSaladStory = await findDuplicatedSalad(ingredientIds);

  // 2. 중복이 있으면 즉시 반환
  if (duplicatedSaladStory) {
    return duplicatedSaladStory;
  }

  // 3. 중복이 없으면 새로 생성
  const storyData = await generateSaladStoryData({
    goal,
    categories: groupedIngredientNames,
  });

  const createdStory = await createSaladStory({
    title: storyData.title,
    summary: storyData.summary,
    ingredientIds: ingredientIds,
  });

  return createdStory;
}
