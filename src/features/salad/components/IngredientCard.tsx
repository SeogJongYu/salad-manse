'use client';

import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState, type ComponentProps } from 'react';

import HealthTagBadge from '@/features/salad/components/HealthTagBadge';
import IngredientDetailDialog from '@/features/salad/components/IngredientDetailDialog';
import type { IngredientWithTags } from '@/features/salad/types';
import { Card } from '@/shared/components/ui/Card';
import { cn } from '@/shared/utils';

interface IngredientCardProps extends ComponentProps<typeof Card> {
  ingredient: IngredientWithTags;
}

export default function IngredientCard({
  ingredient,
  className,
  ...propss
}: IngredientCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className={cn('group cursor-pointer space-y-3 p-0', className)}
        onClick={() => setOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={e => {
          e.stopPropagation();
          if (e.key === 'Enter') {
            setOpen(true);
            e.preventDefault();
          }
        }}
        {...propss}
      >
        <div className="relative">
          <Image
            src={ingredient.imageUrl || '/placeholder.svg'}
            width={400}
            height={400}
            alt={ingredient.name}
            className="rounded-lg"
            unoptimized
          />
          <div className="absolute top-0 left-0 w-full p-1">
            <div className="flex flex-wrap gap-1">
              {ingredient.tags.map(tag => (
                <HealthTagBadge key={tag.id} tag={tag.tag.key} />
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="font-semibold">{ingredient.name}</div>
          <div className="text-muted-foreground line-clamp-2 text-sm">
            {ingredient.description}
          </div>
          <div className="text-primary mt-2 flex items-center gap-1 text-xs font-medium transition-colors">
            <span>더 많은 건강 정보 보기</span>
            <ChevronRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:transform" />
          </div>
        </div>
      </div>

      <IngredientDetailDialog
        ingredient={ingredient}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}
