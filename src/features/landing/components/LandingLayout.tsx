import type { PropsWithChildren } from 'react';

export function LandingLayout({ children }: PropsWithChildren) {
  return (
    <main className="bg-background h-dvh px-4 py-12 lg:px-8 lg:py-20">
      {children}
    </main>
  );
}
