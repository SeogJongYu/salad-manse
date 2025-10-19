import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { unstable_ViewTransition as ViewTransition } from 'react';

import MascotWithParticles from '@/features/onboarding/components/MascotWithParticles';
import { Button } from '@/shared/components/ui/Button';

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
  openGraph: {
    title: '샐러드만세 - 30초 만에 찾는 완벽한 맞춤 샐러드',
    description:
      '몇 가지 간단한 질문으로 내 몸에 꼭 맞는 샐러드 조합과 레시피를 추천받으세요.',
    type: 'website',
    images: [
      {
        url: '/og-home.png', // 홈페이지 전용 OG 이미지
        width: 1200,
        height: 630,
        alt: '샐러드만세 메인페이지 - 맞춤 샐러드 추천 시작하기',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '샐러드만세 - 30초 만에 찾는 완벽한 맞춤 샐러드',
    description:
      '몇 가지 간단한 질문으로 내 몸에 꼭 맞는 샐러드 조합과 레시피를 추천받으세요.',
    images: ['/og-home.png'],
  },
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return (
    <ViewTransition>
      <main className="bg-background h-dvh">
        <div className="flex h-full items-center justify-center px-4 py-12 lg:py-20">
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col items-center gap-8 lg:grid lg:grid-cols-2 lg:gap-12">
              <div className="order-2 space-y-6 text-center lg:order-1 lg:space-y-8 lg:text-left">
                <h1 className="text-4xl leading-tight font-bold lg:text-5xl">
                  30초 만에 찾는,
                  <br />
                  <span className="text-primary">당신을 위한</span> 완벽한
                  샐러드
                </h1>
                <p className="text-muted-foreground max-w-2xl text-base leading-relaxed text-pretty lg:text-xl">
                  몇 가지 간단한 질문으로 내 몸에 꼭 맞는 샐러드 조합과 레시피를
                  추천받으세요.
                </p>
                <Link href="/preference?step=1">
                  <Button size="xl" className="w-full">
                    내 맞춤 샐러드 찾기
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>

              <div className="order-1 flex w-full justify-center">
                <MascotWithParticles />
              </div>
            </div>
          </div>
        </div>
      </main>
    </ViewTransition>
  );
}
