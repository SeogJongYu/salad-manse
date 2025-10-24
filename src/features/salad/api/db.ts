import type { TagKey } from '@prisma/client';
import { unstable_cache } from 'next/cache';

import type { SaladStoryWithIngredients } from '@/features/salad/types';
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

export async function findDuplicatedSalad(ingredientIds: number[]) {
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

export async function createSaladStory({
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

export const getSaladStoryDetail = unstable_cache(
  async (saladId: string): Promise<SaladStoryWithIngredients | null> => {
    const results = await prisma.saladStory.findUnique({
      where: {
        id: saladId,
      },
      include: {
        ingredients: {
          include: {
            ingredient: {
              include: {
                tags: {
                  include: {
                    tag: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return results;
  },
  ['salad-story-by-id'],
  {
    revalidate: false,
    tags: ['salad-stories'],
  },
);
