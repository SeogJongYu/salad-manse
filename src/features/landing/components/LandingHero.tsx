import { type PropsWithChildren } from 'react';

function Root({ children }: PropsWithChildren) {
  return (
    <div className="flex h-full items-center justify-center">{children}</div>
  );
}

function Group({ children }: PropsWithChildren) {
  return (
    <div className="container mx-auto max-w-7xl">
      <div className="flex flex-col items-center gap-8 lg:grid lg:grid-cols-2 lg:gap-12">
        {children}
      </div>
    </div>
  );
}

function TextSlot({ children }: PropsWithChildren) {
  return <div className="order-2 lg:order-1">{children}</div>;
}

function VisualSlot({ children }: PropsWithChildren) {
  return <div className="order-1 w-full lg:order-2">{children}</div>;
}

export const LandingHero = Object.assign(Root, {
  Group,
  TextSlot,
  VisualSlot,
});
