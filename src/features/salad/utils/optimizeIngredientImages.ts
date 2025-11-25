import type { SaladStoryWithIngredients } from '@/features/salad/types';
import { supabase } from '@/shared/lib/supabase'; // 가상의 경로

export function optimizeIngredientImages(
  ingredients: SaladStoryWithIngredients['ingredients'],
) {
  return ingredients.map(item => ({
    ...item,
    ingredient: {
      ...item.ingredient,
      imageUrl: item.ingredient.imageUrl
        ? supabase.storage
            .from('assets')
            .getPublicUrl(item.ingredient.imageUrl, {
              transform: { width: 500, height: 500, quality: 80 },
            }).data.publicUrl
        : '',
    },
  }));
}
