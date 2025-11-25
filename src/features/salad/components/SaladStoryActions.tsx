import { ArrowLeft, RefreshCw } from 'lucide-react';
import Link from 'next/link';

import ResetPreferenceAction from '@/features/preference/components/ResetPreferenceAction';
import { Button } from '@/shared/components/ui/Button';

export default function SaladStoryActions() {
  return (
    <div className="flex flex-col justify-center gap-4 pt-8 sm:flex-row">
      <ResetPreferenceAction>
        <Button asChild size="lg" variant="outline">
          <Link href="/">
            <RefreshCw className="mr-2 size-5" />
            다른 조합 추천받기
          </Link>
        </Button>
      </ResetPreferenceAction>
      <ResetPreferenceAction>
        <Button asChild size="lg">
          <Link href="/">
            <ArrowLeft className="mr-2 size-5" />
            처음으로
          </Link>
        </Button>
      </ResetPreferenceAction>
    </div>
  );
}
