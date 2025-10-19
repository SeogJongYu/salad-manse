'use client';

import { useEffect, useState } from 'react';

export default function LoadingStep() {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [currentVeggie, setCurrentVeggie] = useState(0);

  const messages = [
    '건강 목표를 분석하고 있어요',
    '혈압 정보를 검토하고 있어요',
    '콜레스테롤 수치를 확인하고 있어요',
    '혈당 관리 방안을 찾고 있어요',
    '신선한 재료들을 선별하고 있어요',
    '영양소 균형을 맞추고 있어요',
    '완벽한 샐러드를 준비하고 있어요',
  ];

  const veggies = ['🥬', '🥕', '🍅', '🥒', '🫒', '🧅', '🌶️', '🥑'];

  useEffect(() => {
    // 메시지 변경
    const messageTimer = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % messages.length);
    }, 1800);

    // 야채 아이콘 변경
    const veggieTimer = setInterval(() => {
      setCurrentVeggie(prev => (prev + 1) % veggies.length);
    }, 500);

    return () => {
      clearInterval(messageTimer);
      clearInterval(veggieTimer);
    };
  }, [messages.length, veggies.length]);

  return (
    <div className="flex h-full items-center justify-center">
      <div className="w-full max-w-md space-y-8 text-center">
        {/* 메인 로딩 애니메이션 - 샐러드 볼 */}
        <div className="relative">
          {/* 외곽 원형 진행률 */}
          <div className="relative mx-auto h-32 w-32">
            <svg
              className="h-32 w-32 -rotate-90 transform"
              viewBox="0 0 100 100">
              {/* 배경 원 */}
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="rgba(34, 197, 94, 0.2)"
                strokeWidth="8"
                fill="none"
              />
              {/* 진행률 원 */}
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="url(#gradient)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - 100 / 100)}`}
                className="transition-all duration-300 ease-out"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#84cc16" />
                </linearGradient>
              </defs>
            </svg>

            {/* 중앙 샐러드 볼 */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-emerald-100 bg-gradient-to-br from-white to-gray-50 shadow-lg">
                <span
                  className="animate-bounce text-3xl"
                  style={{ animationDelay: '0.1s' }}>
                  {veggies[currentVeggie]}
                </span>
              </div>
            </div>
          </div>

          {/* 떠다니는 야채들 */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-4 left-8 animate-pulse text-2xl opacity-60">
              🥬
            </div>
            <div
              className="absolute top-8 right-6 animate-pulse text-xl opacity-50"
              style={{ animationDelay: '0.5s' }}>
              🍅
            </div>
            <div
              className="absolute bottom-6 left-4 animate-pulse text-lg opacity-40"
              style={{ animationDelay: '1s' }}>
              🥕
            </div>
            <div
              className="absolute right-8 bottom-8 animate-pulse text-xl opacity-55"
              style={{ animationDelay: '1.5s' }}>
              🥒
            </div>
          </div>
        </div>

        {/* 메시지 */}
        <div className="space-y-4">
          <div className="flex h-12 items-center justify-center">
            <h3 className="text-lg font-semibold text-emerald-800">
              {messages[currentMessage]}
            </h3>
          </div>

          <p className="text-sm leading-relaxed text-emerald-600">
            개인 맞춤형 영양 분석을 진행하고 있습니다.
            <br />
            최고의 샐러드를 만들기 위해 신중하게 검토하고 있어요.
          </p>
        </div>

        {/* 로딩 도트들 */}
        <div className="flex justify-center space-x-2">
          <div className="size-2 animate-bounce rounded-full bg-emerald-400" />
          <div className="size-2 animate-bounce rounded-full bg-green-400 delay-100" />
          <div className="size-2 animate-bounce rounded-full bg-lime-400 delay-200" />
        </div>

        {/* 추가 안내 */}
        <div className="space-y-1 text-xs text-emerald-500 opacity-80">
          <p>🌱 신선한 재료만을 엄선합니다</p>
          <p>⚡ 영양소 밸런스를 최적화합니다</p>
          <p>💚 건강한 라이프스타일을 제안합니다</p>
        </div>
      </div>
    </div>
  );
}
