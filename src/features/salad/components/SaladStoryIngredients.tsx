import type { Category } from '@prisma/client';

import IngredientCard from '@/features/salad/components/IngredientCard';
import SaladCategoryGroup from '@/features/salad/components/SaladCategoryGroup';
import type { SaladStoryWithIngredients } from '@/features/salad/types';

export const INGREDIENT_CATEGORY_MAP: Record<Category, string> = {
  BASE: '베이스',
  PROTEIN: '단백질',
  FAT: '지방',
  TOPPING: '토핑',
  DRESSING: '드레싱',
};

export const CATEGORY_ORDER = Object.keys(
  INGREDIENT_CATEGORY_MAP,
) as Category[];

interface SaladStoryIngredientsProps {
  ingredients: SaladStoryWithIngredients['ingredients'];
}

export function SaladStoryIngredients({
  ingredients,
}: SaladStoryIngredientsProps) {
  const groupedIngredients = Object.groupBy(
    ingredients,
    item => item.ingredient.category,
  );

  return (
    <section className="container mx-auto space-y-6">
      <h2 className="text-center text-2xl font-bold lg:text-3xl">
        샐러드 구성요소
      </h2>

      <div className="grid grid-cols-1 gap-x-10 gap-y-8 lg:grid-cols-2">
        {CATEGORY_ORDER.map(category => {
          const items = groupedIngredients[category];
          if (!items?.length) return null;

          return (
            <SaladCategoryGroup
              key={category}
              title={INGREDIENT_CATEGORY_MAP[category]}
            >
              {items.map(item => (
                <IngredientCard key={item.id} ingredient={item.ingredient} />
              ))}
            </SaladCategoryGroup>
          );
        })}
      </div>
    </section>
  );
}
