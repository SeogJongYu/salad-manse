import { ComponentProps } from 'react';

import { cn } from '@/shared/utils';

function SectionGroup({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('space-y-3 bg-gray-100', className)} {...props} />;
}

function SectionItem({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('bg-white px-4 py-6', className)} {...props} />;
}

function SectionTitle({ className, ...props }: ComponentProps<'h3'>) {
  return <h3 className={cn('mb-4 text-lg font-bold', className)} {...props} />;
}

export const Section = {
  Group: SectionGroup,
  Item: SectionItem,
  Title: SectionTitle,
};
