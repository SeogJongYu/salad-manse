'use server';

import { Category, type SaladStory, type TagKey } from '@prisma/client';
import { shuffle } from 'lodash-es';

import { getRuleByGoal } from '@/features/salad/utils/getRuleByGoal';
import { prisma } from '@/shared/lib/prisma';

export async function getIngredientsByTags(tagKeys: TagKey[]) {
  const result = await prisma.ingredient.findMany({
    where: {
      tags: {
        some: {
          tag: {
            key: { in: tagKeys },
          },
        },
      },
    },
    select: {
      id: true,
      name: true,
      category: true,
      tags: {
        include: {
          tag: {
            select: {
              key: true,
            },
          },
        },
      },
    },
  });

  return result;
}

async function findDuplicatedSalad(ingredientIds: number[]) {
  const targetIds = ingredientIds; // [1, 2, 3, 4, 5, 6]

  const result = await prisma.saladStory.findFirst({
    where: {
      ingredients: {
        every: {
          ingredientId: {
            in: targetIds,
          },
        },
      },
    },
    include: {
      ingredients: {
        include: {
          ingredient: true,
        },
      },
    },
  });

  return result;
}

async function generateSaladStoryData(params: {
  goal: TagKey;
  categories: Record<Category, string[]>;
}): Promise<{ title: string; summary: string }> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/salad/story`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        goal: params.goal,
        categories: params.categories,
      }),
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `[${response.statusText}] Failed to request salad story: ${errorData.error}`,
    );
  }

  const result = await response.json();
  return result.data;
}

async function createSaladStory({
  title,
  summary,
  ingredientIds,
}: {
  title: string;
  summary: string;
  ingredientIds: number[];
}) {
  const result = await prisma.saladStory.create({
    data: {
      title: title,
      summary: summary,
      ingredients: {
        createMany: {
          data: ingredientIds.map(ingredientId => ({
            ingredientId,
          })),
        },
      },
    },
  });

  return result;
}

interface GetResultParams {
  goal: TagKey;
  tagKeys: TagKey[];
}

export type SaladStoryResponse =
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

export async function requestCustomizedSalad(params: GetResultParams) {
  try {
    const rule = getRuleByGoal(params.goal);

    const ingredients = await getIngredientsByTags(params.tagKeys);
    const queue = shuffle(ingredients).sort(
      (a, b) => a.tags.length - b.tags.length,
    );

    const saladComponents = [];
    const groupedIngredientNames: Record<Category, string[]> = {
      [Category.BASE]: [],
      [Category.PROTEIN]: [],
      [Category.TOPPING]: [],
      [Category.FAT]: [],
      [Category.DRESSING]: [],
    };
    let remain = Object.values(rule!).reduce((a, b) => a + b, 0);

    while (queue.length > 0 && remain > 0) {
      const target = queue.pop();
      if (target && rule[target.category] > 0) {
        saladComponents.push(target);
        groupedIngredientNames[target.category].push(target.name);
        rule[target.category] -= 1;
        remain -= 1;
      }
    }

    let saladStoryResult;

    const duplicatedSaladStory = await findDuplicatedSalad(
      saladComponents.map(i => i.id),
    );

    if (duplicatedSaladStory) {
      saladStoryResult = duplicatedSaladStory;
    }

    if (!duplicatedSaladStory) {
      const storyData = await generateSaladStoryData({
        goal: params.goal,
        categories: groupedIngredientNames,
      });

      const createdStory = await createSaladStory({
        title: storyData.title,
        summary: storyData.summary,
        ingredientIds: saladComponents.map(i => i.id),
      });

      saladStoryResult = createdStory;
    }

    return {
      success: true,
      data: {
        saladStory: saladStoryResult,
      },
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

export async function getSaladStory(id: string) {
  const results = await prisma.saladStory.findUnique({
    where: {
      id,
    },
    include: {
      ingredients: {
        include: {
          ingredient: true,
        },
      },
    },
  });

  return results;
}
