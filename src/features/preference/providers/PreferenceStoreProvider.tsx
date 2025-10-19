'use client';

import {
  createContext,
  useContext,
  useRef,
  type PropsWithChildren,
} from 'react';
import { useStore } from 'zustand';

import {
  createPreferenceStore,
  type PreferenceStore,
} from '@/features/preference/store/PreferenceStore';
import PersistHydrationBoundary from '@/shared/modules/PersistHydrationBoundary';

export type PreferenceStoreApi = ReturnType<typeof createPreferenceStore>;

export const PreferenceContext = createContext<PreferenceStoreApi | undefined>(
  undefined,
);

export function PreferenceStoreProvider({ children }: PropsWithChildren) {
  const storeRef = useRef<PreferenceStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createPreferenceStore();
  }

  return (
    <PreferenceContext.Provider value={storeRef.current}>
      {children}
    </PreferenceContext.Provider>
  );
}

export function usePreferenceStore<T>(selector: (value: PreferenceStore) => T) {
  const store = useContext(PreferenceContext);

  if (!store) {
    throw new Error(
      'usePreferenceStore must be used within a PreferenceProvider',
    );
  }

  return useStore(store, selector);
}

export function PreferenceStoreHydrationBoundary({
  children,
}: PropsWithChildren) {
  const store = useContext(PreferenceContext);

  if (!store) {
    throw new Error(
      'PreferenceStoreHydrationBoundary must be used within a PreferenceProvider',
    );
  }

  return (
    <PersistHydrationBoundary store={store}>
      {children}
    </PersistHydrationBoundary>
  );
}
