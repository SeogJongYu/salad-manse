import { TagKey } from '@prisma/client';

import { CATEGORY_COUNT_BY_GOAL } from '@/features/salad/constants/saladCategoryRules';
import { getRuleByGoal } from '@/features/salad/utils/getRuleByGoal';

describe('getRuleByGoal', () => {
  it('매칭되는 Rule이 있으면 매칭된 Rule을 반환한다.', () => {
    const tagKey = TagKey.light_meal;
    const rule = getRuleByGoal(tagKey);
    expect(rule).toEqual(CATEGORY_COUNT_BY_GOAL[tagKey]);
  });

  it('매칭되는 Rule이 없으면 overall_health Rule을 반환한다.', () => {
    const tagKey = TagKey.high_blood_pressure;
    const rule = getRuleByGoal(tagKey);
    expect(rule).toEqual(CATEGORY_COUNT_BY_GOAL.overall_health);
  });
});
