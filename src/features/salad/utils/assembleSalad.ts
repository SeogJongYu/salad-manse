import { Category } from '@prisma/client';
import { shuffle } from 'lodash-es';

import type { getIngredientsByTags } from '@/features/salad/api/db';
import type { getRuleByGoal } from '@/features/salad/utils/getRuleByGoal';

/**
 * 샐러드 조립
 * @description 규칙(rule)에 따라 재료(ingredients)를 조합합니다.
 */
export function assembleSalad(
  ingredients: Awaited<ReturnType<typeof getIngredientsByTags>>,
  rule: ReturnType<typeof getRuleByGoal>,
) {
  const candidates = shuffle(ingredients).sort(
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

  while (candidates.length > 0 && remain > 0) {
    const target = candidates.pop();
    if (target && rule[target.category] > 0) {
      saladComponents.push(target);
      groupedIngredientNames[target.category].push(target.name);
      rule[target.category] -= 1;
      remain -= 1;
    }
  }

  return { saladComponents, groupedIngredientNames };
}
