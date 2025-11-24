import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import ResetPreferenceAction from '@/features/preference/components/ResetPreferenceAction';
import { Button } from '@/shared/components/ui/Button';

export function LandingHeroText() {
  return (
    <div className="space-y-6 text-center lg:space-y-8 lg:text-left">
      <h1 className="text-4xl leading-tight font-bold lg:text-5xl">
        30초 만에 찾는,
        <br />
        <span className="text-primary">당신을 위한</span> 완벽한 샐러드
      </h1>
      <p className="text-muted-foreground max-w-2xl text-base leading-relaxed text-pretty lg:text-xl">
        몇 가지 간단한 질문으로 내 몸에 꼭 맞는 샐러드 조합과 레시피를
        추천받으세요.
      </p>
      <ResetPreferenceAction>
        <Button asChild size="xl" className="w-full">
          <Link href="/preference">
            내 맞춤 샐러드 찾기
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </ResetPreferenceAction>
    </div>
  );
}
