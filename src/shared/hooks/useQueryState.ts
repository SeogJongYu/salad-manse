'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

import type { AppRoutes } from '../../../.next/types/routes';

type QueryState = Record<string, string>;

export function useQueryState<T extends QueryState>() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const queryState = Object.fromEntries(searchParams.entries()) as T;

  const setQueryState = useCallback(
    (updater: ((prev: T) => T) | T, options?: { replace?: boolean }) => {
      const prev = Object.fromEntries(searchParams.entries()) as T;
      const next = typeof updater === 'function' ? updater(prev) : updater;
      const params = new URLSearchParams(next);
      const url = `${pathname}?${params.toString()}` as AppRoutes;
      router[options?.replace ? 'replace' : 'push'](url);
    },
    [pathname, router, searchParams],
  );

  return [queryState, setQueryState] as const;
}
