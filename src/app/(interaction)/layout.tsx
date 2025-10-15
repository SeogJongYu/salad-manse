import { type PropsWithChildren } from 'react';

import Header from '@/shared/components/organisms/Header';

export default function InteractionLayout({ children }: PropsWithChildren) {
  return (
    <div className="bg-background min-h-dvh">
      <Header />
      <div className="pt-(--header-height)">
        <main className="container mx-auto">{children}</main>
      </div>
    </div>
  );
}
