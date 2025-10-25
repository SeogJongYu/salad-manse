import { Category } from '@prisma/client';

import { assembleSalad } from '@/features/salad/utils/assembleSalad';
import {
  assembleSaladRuleCases,
  mockIngredients,
} from '@/features/salad/utils/assembleSalad.mock';

jest.mock('lodash-es', () => ({
  shuffle: jest.fn(array => [...array]),
}));

describe('assembleSalad', () => {
  // [시나리오이름, 규칙, 기대_베이스개수, 기대_프로틴개수, 기대_토핑개수, 기대_지방개수, 기대_드레싱개수, 총개수
  test.each(assembleSaladRuleCases)(
    '규칙: %s 시나리오를 올바르게 조립해야 한다',
    (
      scenarioName,
      mockRule,
      expectedBaseCount,
      expectedProteinCount,
      expectedToppingCount,
      expectedFatCount,
      expectedDressingCount,
      expectedTotalCount,
    ) => {
      const { saladComponents, groupedIngredientNames } = assembleSalad(
        mockIngredients,
        mockRule,
      );

      expect(groupedIngredientNames[Category.BASE]).toHaveLength(
        expectedBaseCount as number,
      );
      expect(groupedIngredientNames[Category.PROTEIN]).toHaveLength(
        expectedProteinCount as number,
      );
      expect(groupedIngredientNames[Category.TOPPING]).toHaveLength(
        expectedToppingCount as number,
      );
      expect(groupedIngredientNames[Category.FAT]).toHaveLength(
        expectedFatCount as number,
      );
      expect(groupedIngredientNames[Category.DRESSING]).toHaveLength(
        expectedDressingCount as number,
      );
      expect(saladComponents).toHaveLength(expectedTotalCount as number);
    },
  );
});
