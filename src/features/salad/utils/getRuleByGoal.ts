import type { TagKey } from '@prisma/client';

import { CATEGORY_COUNT_BY_GOAL } from '@/features/salad/constants/saladCategoryRules';

export function getRuleByGoal(goal: TagKey) {
  const results =
    CATEGORY_COUNT_BY_GOAL[goal as keyof typeof CATEGORY_COUNT_BY_GOAL] ||
    CATEGORY_COUNT_BY_GOAL.overall_health;
  return { ...results };
}
