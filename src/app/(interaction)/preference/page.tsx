import type { Metadata } from 'next';
import { Suspense, unstable_ViewTransition as ViewTransition } from 'react';

import PreferenceContainer from '@/features/preference/components/PreferenceContainer';

export const metadata: Metadata = {
  title: '내 맞춤 샐러드 찾기 | 샐러드만세',
  description: '취향에 맞는 샐러드를 추천받고, 나만의 샐러드를 찾아보세요.',
};

export default function PreferencePage() {
  return (
    <div className="container mx-auto h-(--content-height) px-4 pt-4 pb-[60px]">
      <ViewTransition>
        <Suspense>
          <PreferenceContainer />
        </Suspense>
      </ViewTransition>
    </div>
  );
}
