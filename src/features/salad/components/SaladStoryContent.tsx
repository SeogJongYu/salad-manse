import { Category } from '@prisma/client';
import { ArrowLeft, RefreshCw, Sparkles } from 'lucide-react';
import Link from 'next/link';

import ResetPreferenceAction from '@/features/preference/components/ResetPreferenceAction';
import IngredientCard from '@/features/salad/components/IngredientCard';
import SaladCategoryGroup from '@/features/salad/components/SaladCategoryGroup';
import type { SaladStoryWithIngredients } from '@/features/salad/types';
import { Badge } from '@/shared/components/ui/Badge';
import { Button } from '@/shared/components/ui/Button';

interface SaladContentProps {
  data: SaladStoryWithIngredients;
}

export default async function SaladStoryContent({ data }: SaladContentProps) {
  const ingredientGroup = Object.groupBy(
    data.ingredients,
    item => item.ingredient.category,
  );

  return (
    <div className="bg-primary">
      <div className="sticky top-(--header-height) container mx-auto space-y-6 px-4 py-10 text-center lg:py-20">
        <Badge className="text-primary rounded-full bg-white px-4 py-1.5 text-sm">
          <Sparkles className="size-3.5!" />
          맞춤 추천
        </Badge>
        <h1 className="text-4xl font-bold text-balance text-white lg:text-5xl">
          {data.title}
        </h1>
        <p className="mx-auto max-w-2xl text-lg leading-relaxed font-medium text-pretty text-white">
          {data.summary}
        </p>
      </div>

      <div className="bg-background relative z-10 rounded-t-3xl px-4 py-10 lg:rounded-t-4xl">
        <section className="container mx-auto space-y-6">
          <h2 className="text-center text-2xl font-bold lg:text-3xl">
            샐러드 구성요소
          </h2>

          <div className="grid grid-cols-1 gap-x-10 gap-y-8 lg:grid-cols-2">
            <SaladCategoryGroup category={Category.BASE}>
              {(ingredientGroup.BASE ?? []).map(item => (
                <IngredientCard key={item.id} ingredient={item.ingredient} />
              ))}
            </SaladCategoryGroup>
            <SaladCategoryGroup category={Category.PROTEIN}>
              {(ingredientGroup.PROTEIN ?? []).map(item => (
                <IngredientCard key={item.id} ingredient={item.ingredient} />
              ))}
            </SaladCategoryGroup>
            <SaladCategoryGroup category={Category.FAT}>
              {(ingredientGroup.FAT ?? []).map(item => (
                <IngredientCard key={item.id} ingredient={item.ingredient} />
              ))}
            </SaladCategoryGroup>
            <SaladCategoryGroup category={Category.TOPPING}>
              {(ingredientGroup.TOPPING ?? []).map(item => (
                <IngredientCard key={item.id} ingredient={item.ingredient} />
              ))}
            </SaladCategoryGroup>
            <SaladCategoryGroup category={Category.DRESSING}>
              {(ingredientGroup.DRESSING ?? []).map(item => (
                <IngredientCard key={item.id} ingredient={item.ingredient} />
              ))}
            </SaladCategoryGroup>
          </div>
        </section>

        <div className="flex flex-col justify-center gap-4 pt-8 sm:flex-row">
          <ResetPreferenceAction>
            <Button asChild size="lg" variant="outline">
              <Link href="/">
                <RefreshCw className="mr-2 h-5 w-5" />
                다른 조합 추천받기
              </Link>
            </Button>
          </ResetPreferenceAction>
          <ResetPreferenceAction>
            <Button asChild size="lg">
              <Link href="/">
                <ArrowLeft className="mr-2 h-5 w-5" />
                처음으로
              </Link>
            </Button>
          </ResetPreferenceAction>
        </div>
      </div>
    </div>
  );
}
