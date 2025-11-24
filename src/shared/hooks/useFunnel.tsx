'use client';

import {
  ReactElement,
  ReactNode,
  Children,
  isValidElement,
  type PropsWithChildren,
  useMemo,
} from 'react';
import { toast } from 'sonner';

import { useQueryState } from '@/shared/hooks/useQueryState';

interface StepProps<T> {
  name: T;
  children: ReactNode;
}

export function useFunnel<T extends string>(steps: ReadonlyArray<T>) {
  const [queryState, setQueryState] = useQueryState<{ step: T }>();
  const step = queryState.step ?? steps[0];

  const currentIndex = steps.indexOf(step);
  const progressRatio = (currentIndex + 1) / steps.length;

  function stepNext() {
    if (currentIndex < steps.length - 1) {
      const next = steps[currentIndex + 1];
      setQueryState({ step: next });
    } else {
      toast.error('다음 단계로 이동할 수 없습니다.');
    }
  }

  function stepBack() {
    if (currentIndex > 0) {
      const prev = steps[currentIndex - 1];
      setQueryState({ step: prev });
    } else {
      toast.error('이전 단계로 이동할 수 없습니다.');
    }
  }

  const Funnel = useMemo(() => {
    const FunnelComponent = ({ children }: PropsWithChildren) => {
      const targetStep = Children.toArray(children).find(
        child =>
          isValidElement(child) &&
          (child as ReactElement<PropsWithChildren<{ name: T }>>).props.name ===
            step,
      ) as ReactElement<PropsWithChildren<{ name: T }>> | undefined;

      return <>{targetStep}</>;
    };

    FunnelComponent.displayName = 'Funnel';

    return Object.assign(FunnelComponent, {
      Step: (props: StepProps<T>) => <>{props.children}</>,
    });
  }, [step]);

  return {
    Funnel,
    step,
    setStep: (step: T) => setQueryState({ step }),
    stepNext,
    stepBack,
    progressRatio,
  } as const;
}
