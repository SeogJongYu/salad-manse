'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type { ComponentProps, ReactNode } from 'react';

import HealthTagBadge from '@/features/salad/components/HealthTagBadge';
import type { IngredientDetail } from '@/features/salad/types';
import { Button } from '@/shared/components/ui/Button';
import { Card } from '@/shared/components/ui/Card';
import { Dialog } from '@/shared/components/ui/Dialog';
import { ScrollArea } from '@/shared/components/ui/ScrollArea';

interface IngredientDetailModalProps extends ComponentProps<typeof Dialog> {
  trigger?: ReactNode;
  ingredient: IngredientDetail;
}

export default function IngredientDetailDialog({
  trigger,
  ingredient,
  ...dialogProps
}: IngredientDetailModalProps) {
  const healthBenefits = ingredient.healthBenefits as {
    title: string;
    description: string;
  }[];

  return (
    <Dialog {...dialogProps}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      <Dialog.Content
        className="overflow-hidden px-0 pt-0 pb-4 sm:max-w-2xl sm:pt-6"
        hideClose
      >
        <Dialog.Header className="sr-only">
          <Dialog.Title>{ingredient.name}</Dialog.Title>
          <Dialog.Description>{ingredient.description}</Dialog.Description>
        </Dialog.Header>
        <ScrollArea className="h-[70vh]">
          <div className="pb-0.5">
            <div className="grid gap-6 px-0 sm:grid-cols-2 sm:px-4">
              <motion.div
                className="relative aspect-square max-h-[400px] w-full sm:max-h-none"
                layoutId={`ingradient-${ingredient.id}-thumbnail`}
              >
                <Image
                  src={ingredient.imageUrl || '/placeholder.svg'}
                  fill
                  alt={ingredient.name}
                  className="sm:rounded-lg"
                  unoptimized
                />
                <div className="absolute top-0 left-0 w-full p-1.5">
                  <div className="flex flex-wrap gap-1">
                    {ingredient.tags.map(tag => (
                      <HealthTagBadge
                        key={tag.id}
                        tag={tag.tag.key}
                        className="rounded-lg px-2 py-0.5 text-base"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
              <div className="space-y-4 px-4 sm:px-0">
                <div>
                  <motion.h1
                    className="mb-2 text-4xl font-bold"
                    layoutId={`ingradient-${ingredient.id}-name`}
                  >
                    {ingredient.name}
                  </motion.h1>
                  <motion.p
                    className="text-muted-foreground leading-relaxed"
                    layoutId={`ingradient-${ingredient.id}-description`}
                  >
                    {ingredient.description}
                  </motion.p>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-8 px-4">
              <div>
                <h2 className="mb-4 text-2xl font-bold">
                  영양 정보 (100g 기준)
                </h2>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <Card className="p-4 text-center">
                    <div className="text-primary text-2xl font-bold">
                      {ingredient.calories}kcal
                    </div>
                    <div className="text-muted-foreground mt-1 text-sm">
                      칼로리
                    </div>
                  </Card>
                  <Card className="p-4 text-center">
                    <div className="text-primary text-2xl font-bold">
                      {ingredient.protein}g
                    </div>
                    <div className="text-muted-foreground mt-1 text-sm">
                      단백질
                    </div>
                  </Card>
                  <Card className="p-4 text-center">
                    <div className="text-primary text-2xl font-bold">
                      {ingredient.carbohydrate}g
                    </div>
                    <div className="text-muted-foreground mt-1 text-sm">
                      탄수화물
                    </div>
                  </Card>
                  <Card className="p-4 text-center">
                    <div className="text-primary text-2xl font-bold">
                      {ingredient.fat}g
                    </div>
                    <div className="text-muted-foreground mt-1 text-sm">
                      지방
                    </div>
                  </Card>
                </div>
              </div>

              <div>
                <h2 className="mb-4 text-2xl font-bold">건강 효능</h2>
                <div className="space-y-4">
                  {healthBenefits.map((benefit, index) => {
                    return (
                      <Card key={index} className="p-5">
                        <div className="flex items-start gap-4">
                          <div className="bg-primary flex size-8 flex-shrink-0 items-center justify-center rounded-full font-bold text-white">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <h4 className="mb-2 text-lg font-semibold">
                              {benefit.title}
                            </h4>
                            <p className="text-muted-foreground leading-relaxed">
                              {benefit.description}
                            </p>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
        <Dialog.Footer className="px-4">
          <Dialog.Close asChild>
            <Button size="lg">닫기</Button>
          </Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}
