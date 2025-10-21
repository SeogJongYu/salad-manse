import { Category, TagKey } from '@prisma/client';

export const CATEGORY_COUNT_BY_GOAL = {
  [TagKey.overall_health]: {
    [Category.BASE]: 1,
    [Category.PROTEIN]: 1,
    [Category.TOPPING]: 2,
    [Category.FAT]: 1,
    [Category.DRESSING]: 1,
  },
  [TagKey.weight_loss]: {
    [Category.BASE]: 2,
    [Category.PROTEIN]: 1,
    [Category.TOPPING]: 1,
    [Category.FAT]: 1,
    [Category.DRESSING]: 1,
  },
  [TagKey.muscle_gain]: {
    [Category.BASE]: 1,
    [Category.PROTEIN]: 2,
    [Category.TOPPING]: 2,
    [Category.FAT]: 1,
    [Category.DRESSING]: 1,
  },
  [TagKey.light_meal]: {
    [Category.BASE]: 1,
    [Category.PROTEIN]: 1,
    [Category.TOPPING]: 1,
    [Category.FAT]: 1,
    [Category.DRESSING]: 1,
  },
};
