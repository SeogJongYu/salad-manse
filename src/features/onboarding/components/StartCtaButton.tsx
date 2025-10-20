'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { usePreferenceStore } from '@/features/preference/providers/PreferenceStoreProvider';
import { Button } from '@/shared/components/ui/Button';

export default function StartCtaButton() {
  const reset = usePreferenceStore(state => state.reset);

  return (
    <Link href="/preference?step=1" onClick={reset}>
      <Button size="xl" className="w-full">
        내 맞춤 샐러드 찾기
        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
      </Button>
    </Link>
  );
}
