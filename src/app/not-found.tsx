import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/shared/components/ui/Button';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
      <Image
        src="/mascot.png"
        alt="Salad Mascot"
        width={180}
        height={180}
        className="mb-4 drop-shadow-lg"
        priority
      />
      <h1 className="text-2xl font-bold">페이지를 찾을 수 없습니다</h1>
      <p className="text-muted-foreground">
        요청하신 샐러드 또는 페이지가 존재하지 않아요.
        <br />
        홈으로 돌아가서 다시 시작해보세요!
      </p>
      <Button asChild size="xl">
        <Link href="/">홈으로 이동</Link>
      </Button>
    </div>
  );
}
