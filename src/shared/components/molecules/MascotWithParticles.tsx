import Image from 'next/image';

export default function MascotWithParticles() {
  return (
    <div className="relative flex w-full max-w-[360px] items-center justify-center lg:order-2 lg:max-w-none">
      <div className="relative z-10 size-[280px] lg:size-[450px]">
        <Image
          src="/mascot.png"
          alt="Friendly Salad Mascot"
          fill
          className="drop-shadow-2xl"
          priority
        />
      </div>

      {/* Floating Elements */}
      {/* Main floating circles - 양상추 그린 계열 */}
      <div className="animate-bounce-slow absolute top-3 right-2 size-12 rounded-full bg-emerald-400/70 shadow-lg shadow-emerald-200/50 lg:top-10 lg:right-10 lg:size-16" />
      <div className="animate-bounce-slower absolute bottom-8 left-2 size-10 rounded-full bg-green-300/60 shadow-lg shadow-green-200/40 lg:bottom-20 lg:left-10 lg:size-12" />

      {/* Additional floating elements - 건강한 자연 색감 */}
      <div className="animate-float-delayed absolute top-1/4 left-1 size-6 rounded-full bg-lime-300/50 shadow-md shadow-lime-200/30 lg:left-8 lg:size-8" />
      <div className="animate-float-reverse absolute top-1/3 right-1 size-8 rounded-full bg-teal-300/55 shadow-md shadow-teal-200/35 lg:right-12 lg:size-10" />
      <div className="animate-pulse-slow absolute right-1 bottom-1/4 size-5 rounded-full bg-emerald-200/60 shadow-sm shadow-emerald-100/40 lg:right-8 lg:size-7" />
      <div className="animate-float absolute bottom-1/3 left-1 size-7 rounded-full bg-green-200/65 shadow-md shadow-green-100/45 lg:left-12 lg:size-9" />

      {/* Sparkle elements - 신선함을 표현하는 밝은 색감 */}
      <div className="animate-twinkle absolute top-12 left-1/4 size-3 rotate-45 bg-yellow-200/80 shadow-sm shadow-yellow-100/60 lg:top-16 lg:size-4" />
      <div className="animate-twinkle-delayed absolute right-1/4 bottom-12 size-4 rotate-45 bg-lime-200/70 shadow-sm shadow-lime-100/50 lg:bottom-16 lg:size-5" />
      <div className="animate-twinkle absolute top-2/3 left-0 size-2 rotate-45 bg-emerald-300/60 lg:left-6 lg:size-3" />

      {/* Gradient orbs - 부드러운 자연 그라데이션 */}
      <div className="animate-float-slow absolute top-1/2 right-0 size-14 rounded-full bg-gradient-to-br from-emerald-300/40 to-green-400/25 blur-sm lg:right-4 lg:size-18" />
      <div className="animate-float-reverse-slow absolute bottom-1/2 left-0 h-12 w-12 rounded-full bg-gradient-to-br from-lime-200/35 to-emerald-300/20 blur-sm lg:left-4 lg:size-16" />
    </div>
  );
}
