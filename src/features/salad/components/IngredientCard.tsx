'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState, type ComponentProps } from 'react';

import HealthTagBadge from '@/features/salad/components/HealthTagBadge';
import IngredientDetailDialog from '@/features/salad/components/IngredientDetailDialog';
import type { IngredientWithTags } from '@/features/salad/types';
import { cn } from '@/shared/utils';

interface IngredientCardProps extends ComponentProps<'div'> {
  ingredient: IngredientWithTags;
}

export default function IngredientCard({
  ingredient,
  className,
  ...propss
}: IngredientCardProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <div
        ref={ref}
        className={cn('group cursor-pointer space-y-3 p-0', className)}
        onClick={() => setOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            setOpen(true);
            e.preventDefault();
          }
        }}
        {...propss}
      >
        <motion.div
          className="relative"
          layoutId={`ingradient-${ingredient.id}-thumbnail`}
          onLayoutAnimationComplete={() =>
            ref.current?.focus({ preventScroll: true })
          }
        >
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
        </motion.div>
        <div className="space-y-2">
          <motion.div
            className="font-semibold"
            layoutId={`ingradient-${ingredient.id}-name`}
          >
            {ingredient.name}
          </motion.div>
          <motion.div
            className="text-muted-foreground line-clamp-2 text-sm"
            layoutId={`ingradient-${ingredient.id}-description`}
          >
            {ingredient.description}
          </motion.div>
          <div className="text-primary mt-2 flex items-center gap-1 text-xs font-medium transition-colors">
            <span>더 많은 건강 정보 보기</span>
            <ChevronRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:transform" />
          </div>
        </div>
      </div>

      {open && (
        <IngredientDetailDialog
          ingredient={ingredient}
          open={open}
          onOpenChange={setOpen}
        />
      )}
    </>
  );
}
