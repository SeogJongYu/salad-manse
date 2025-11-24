import type { Metadata } from 'next';

import { LandingHero } from '@/features/landing/components/LandingHero';
import { LandingHeroText } from '@/features/landing/components/LandingHeroText';
import { LandingHeroVisual } from '@/features/landing/components/LandingHeroVisual';
import { LandingLayout } from '@/features/landing/components/LandingLayout';

export const metadata: Metadata = {
  title: '30초 만에 찾는 완벽한 맞춤 샐러드 | 샐러드만세',
  description:
    '몇 가지 간단한 질문으로 내 몸에 꼭 맞는 샐러드 조합과 레시피를 추천받으세요. 건강한 식습관의 시작, 지금 바로 시작하세요!',
  keywords: [
    '맞춤 샐러드 추천',
    '샐러드 레시피',
    '건강한 식단',
    '다이어트 샐러드',
    '영양 관리',
    '개인맞춤 영양',
    '샐러드 조합',
    '건강식단 추천',
  ],
  alternates: {
    canonical: '/',
  },
};

export default function LandingPage() {
  return (
    <LandingLayout>
      <LandingHero>
        <LandingHero.Group>
          <LandingHero.TextSlot>
            <LandingHeroText />
          </LandingHero.TextSlot>

          <LandingHero.VisualSlot>
            <LandingHeroVisual />
          </LandingHero.VisualSlot>
        </LandingHero.Group>
      </LandingHero>
    </LandingLayout>
  );
}
