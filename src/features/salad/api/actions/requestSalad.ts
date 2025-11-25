'use server';

import { TagKey, type SaladStory } from '@prisma/client';

import type { PreferenceData } from '@/features/preference/types';
import {
  createSaladStory,
  findDuplicatedSalad,
  getIngredientsByTags,
} from '@/features/salad/api/db';
import { generateSaladStoryData } from '@/features/salad/api/openai.service';
import { assembleSalad } from '@/features/salad/utils/assembleSalad';
import { getRuleByGoal } from '@/features/salad/utils/getRuleByGoal';
import { getValidTags } from '@/features/salad/utils/getValidTags';

export type SaladResponse =
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
 * 샐러드 추천을 요청하는 메인 서버 액션.
 */
export async function requestSalad(
  values: PreferenceData,
): Promise<SaladResponse> {
  try {
    const rule = getRuleByGoal(values.goal as TagKey);
    const validTags = getValidTags(values);
    const ingredients = await getIngredientsByTags(validTags);

    const { saladComponents, groupedIngredientNames } = assembleSalad(
      ingredients,
      rule,
    );

    const saladStory = await findOrCreateSaladStory(
      saladComponents,
      groupedIngredientNames,
      values.goal as TagKey,
    );

    return {
      success: true,
      data: { saladStory },
    };
  } catch (error) {
    console.error('Error in requestSalad:', error);
    return {
      success: false,
      error: '일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
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
