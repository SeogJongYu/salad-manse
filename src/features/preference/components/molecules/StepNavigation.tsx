import { Children, type ComponentProps, type PropsWithChildren } from 'react';

import { Button } from '@/shared/components/atoms/Button';
import { cn } from '@/shared/utils';

function StepNavigationRoot({ children }: PropsWithChildren) {
  const childCount = Children.count(children);

  if (childCount === 0 || childCount > 2) {
    throw new Error('StepNavigation은 1 또는 2개의 자식 요소가 필요합니다.');
  }

  return (
    <div className="border-border fixed right-0 bottom-0 left-0 border-t bg-white lg:static lg:mt-8 lg:border-0">
      <div
        className={cn('grid h-[60px]', {
          'grid-cols-1': childCount === 1,
          'grid-cols-2': childCount === 2,
        })}
      >
        {children}
      </div>
    </div>
  );
}

function PreviousButton({
  className,
  children,
  ...props
}: ComponentProps<typeof Button>) {
  return (
    <Button
      variant="outline"
      className={cn('h-full rounded-none bg-white text-base', className)}
      {...props}
    >
      {children || '이전'}
    </Button>
  );
}

function NextButton({
  className,
  children,
  ...props
}: ComponentProps<typeof Button>) {
  return (
    <Button
      className={cn('h-full rounded-none text-base', className)}
      {...props}
    >
      {children || '다음'}
    </Button>
  );
}

const StepNavigation = Object.assign(StepNavigationRoot, {
  Previous: PreviousButton,
  Next: NextButton,
});

export default StepNavigation;
