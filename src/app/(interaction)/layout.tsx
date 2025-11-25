import { type PropsWithChildren } from 'react';

import Header from '@/shared/components/layout/Header';

export default function InteractionLayout({ children }: PropsWithChildren) {
  return (
    <div className="bg-background min-h-dvh">
      <Header />
      <main className="pt-(--header-height)">{children}</main>
    </div>
  );
}
