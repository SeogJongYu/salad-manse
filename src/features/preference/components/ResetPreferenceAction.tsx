'use client';

import {
  Children,
  cloneElement,
  type MouseEvent,
  type ReactElement,
} from 'react';

import { usePreferenceStore } from '@/features/preference/providers/PreferenceStoreProvider';

interface ResetPreferenceActionProps {
  children: ReactElement<{ onClick: (e: MouseEvent<unknown>) => void }>;
}

export default function ResetPreferenceAction({
  children,
}: ResetPreferenceActionProps) {
  const reset = usePreferenceStore(state => state.reset);

  const child = Children.only(children);

  return cloneElement(child, {
    onClick: e => {
      reset();
      child.props.onClick?.(e);
    },
  });
}
