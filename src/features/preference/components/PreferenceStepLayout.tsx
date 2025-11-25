import { type PropsWithChildren } from 'react';

import { cn } from '@/shared/utils';

interface StepLayoutProps extends PropsWithChildren {
  className?: string;
}

function Root({ children, className }: StepLayoutProps) {
  return <div className={cn(className)}>{children}</div>;
}

/**
 * 모바일 Footer영역의 스크롤을 커버하기 위해
 * padding-bottom Footer 높이만큼 추가
 */
function Content({ children, className }: StepLayoutProps) {
  return <div className={cn('pb-16 lg:pb-8', className)}>{children}</div>;
}

function Header({ children, className }: StepLayoutProps) {
  return <div className={cn('mb-6 text-center', className)}>{children}</div>;
}

function Icon({ children, className }: StepLayoutProps) {
  return <div className={cn('mb-2 text-3xl', className)}>{children}</div>;
}

function Title({ children, className }: StepLayoutProps) {
  return (
    <h2 className={cn('mb-2 text-xl font-bold', className)}>{children}</h2>
  );
}

function Description({ children, className }: StepLayoutProps) {
  return <div className={cn('text-sm', className)}>{children}</div>;
}

function Footer({ children, className }: StepLayoutProps) {
  return (
    <div
      className={cn(
        'border-border border-t bg-white',
        'fixed right-0 bottom-0 left-0', // 모바일
        'lg:static lg:border-0', // 데스크탑
        className,
      )}
    >
      {children}
    </div>
  );
}

export const PreferenceStepLayout = Object.assign(Root, {
  Content,
  Header,
  Icon,
  Title,
  Description,
  Footer,
});
