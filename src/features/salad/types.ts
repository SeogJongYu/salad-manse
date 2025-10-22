import type { Prisma } from '@prisma/client';

export type SaladStoryWithIngredients = Prisma.SaladStoryGetPayload<{
  include: {
    ingredients: {
      include: {
        ingredient: {
          include: {
            tags: {
              include: {
                tag: true;
              };
            };
          };
        };
      };
    };
  };
}>;

export type IngredientWithTags = Prisma.IngredientGetPayload<{
  include: {
    tags: {
      include: {
        tag: true;
      };
    };
  };
}>;
