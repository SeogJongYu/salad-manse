import { Fragment, useEffect, useState, type PropsWithChildren } from 'react';
import type { StoreApi, StoreMutators } from 'zustand';

interface PersistHydrationBoundaryProps<T> {
  store?: StoreMutators<StoreApi<T>, unknown>['zustand/persist'];
}

/**
 * persist 미들웨어와 함께 사용되는 zustand store의 하이드레이션 생명주기를 관리합니다.
 * 하이드레이션 상태에 따라 변경되는 키를 가진 Fragment를 사용하여
 * 자식 컴포넌트의 강제 재마운트를 수행합니다.
 *
 * @param props.store - 하이드레이션 생명주기 이벤트를 지원하는 지속적인 스토어 인스턴스
 * @param props.children - 하이드레이션 경계 내에서 렌더링될 자식 컴포넌트들
 *
 * @returns 하이드레이션 상태에 따라 변경되는 키를 가진 자식 컴포넌트들을 포함하는 Fragment
 *
 * @example
 * ```tsx
 * <PersistHydrationBoundary store={myPersistedStore}>
 *   <MyComponent />
 * </PersistHydrationBoundary>
 * ```
 */
export default function PersistHydrationBoundary<T = unknown>({
  store,
  children,
}: PropsWithChildren<PersistHydrationBoundaryProps<T>>) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (!store) return;

    const unsubHydrate = store.persist.onHydrate(() => setHydrated(false));

    const unsubFinishHydration = store.persist.onFinishHydration(() =>
      setHydrated(true),
    );

    setHydrated(store.persist.hasHydrated());

    return () => {
      unsubHydrate();
      unsubFinishHydration();
    };
  }, [store]);

  return (
    <Fragment key={hydrated ? 'finished' : 'hydrating'}>{children}</Fragment>
  );
}
