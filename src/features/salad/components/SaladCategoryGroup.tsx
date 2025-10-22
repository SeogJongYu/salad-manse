import type { Category } from '@prisma/client';
import { type PropsWithChildren } from 'react';

interface SaladCategoryGroupProps {
  category: Category;
}

export default function SaladCategoryGroup({
  category,
  children,
}: PropsWithChildren<SaladCategoryGroupProps>) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold tracking-wide uppercase">
        {category}
      </h3>
      <div className="grid grid-cols-2 gap-4 lg:gap-6">
        {children || (
          <div className="text-muted-foreground col-span-full text-center text-sm">
            해당 카테고리에 속하는 재료가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
