import Image from 'next/image';

import { Particle } from '@/features/landing/components/Particle';

export function LandingHeroVisual() {
  return (
    <div className="flex w-full justify-center">
      <div className="relative flex w-full max-w-[360px] items-center justify-center lg:order-2 lg:max-w-none">
        <div className="relative z-10 size-[280px] lg:size-[450px]">
          <Image
            src="/mascot.png"
            alt="Friendly Salad Mascot"
            width={1024}
            height={1024}
            sizes="(min-width: 1024px) 450px, 280px"
            className="drop-shadow-2xl"
            priority
          />
        </div>

        <Particle
          type="bubble"
          animationName="floatReverse"
          duration="3s"
          className="absolute top-3 right-2 size-12 bg-emerald-400/70 shadow-lg shadow-emerald-200/50 lg:top-10 lg:right-10 lg:size-16"
        />
        <Particle
          type="bubble"
          animationName="float"
          duration="4s"
          delay="1s"
          className="absolute bottom-8 left-2 size-10 bg-green-300/60 shadow-lg shadow-green-200/40 lg:bottom-20 lg:left-10 lg:size-12"
        />

        <Particle
          type="bubble"
          animationName="float"
          duration="3s"
          className="absolute top-1/4 left-1 size-6 bg-lime-300/50 shadow-md shadow-lime-200/30 lg:left-8 lg:size-8"
        />
        <Particle
          type="bubble"
          animationName="floatReverse"
          duration="2s"
          className="absolute top-1/3 right-1 size-8 bg-teal-300/55 shadow-md shadow-teal-200/35 lg:right-12 lg:size-10"
        />
        <Particle
          type="bubble"
          animationName="pulseSlow"
          className="absolute right-1 bottom-1/4 size-5 bg-emerald-200/60 shadow-sm shadow-emerald-100/40 lg:right-8 lg:size-7"
        />
        <Particle
          type="bubble"
          animationName="float"
          className="absolute bottom-1/3 left-1 size-7 bg-green-200/65 shadow-md shadow-green-100/45 lg:left-12 lg:size-9"
        />

        <Particle
          type="sparkle"
          animationName="twinkle"
          className="absolute top-12 left-1/4 size-3 bg-yellow-200/80 shadow-sm shadow-yellow-100/60 lg:top-16 lg:size-4"
        />
        <Particle
          type="sparkle"
          animationName="twinkle"
          delay="0.7s"
          className="absolute right-1/4 bottom-12 size-4 bg-lime-200/70 shadow-sm shadow-lime-100/50 lg:bottom-16 lg:size-5"
        />
        <Particle
          type="sparkle"
          animationName="twinkle"
          className="absolute top-2/3 left-0 size-2 bg-emerald-300/60 lg:left-6 lg:size-3"
        />

        <Particle
          type="gradient"
          duration="3s"
          animationName="floatReverse"
          className="absolute top-1/2 right-0 size-14 bg-gradient-to-br from-emerald-300/40 to-green-400/25 lg:right-4 lg:size-18"
        />
        <Particle
          type="gradient"
          duration="7s"
          animationName="floatReverseSlow"
          className="absolute bottom-1/2 left-0 size-12 bg-gradient-to-br from-lime-200/35 to-emerald-300/20 lg:left-4 lg:size-16"
        />
      </div>
    </div>
  );
}
