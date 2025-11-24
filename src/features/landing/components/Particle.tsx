import type { CSSProperties } from 'react';

import styles from '@/features/landing/components/LandingHeroVisual.module.css';
import { cn } from '@/shared/utils';

interface ParticleProps {
  type: 'bubble' | 'sparkle' | 'gradient';
  className?: string;
  duration?: string;
  delay?: string;
  animationName?:
    | 'float'
    | 'floatReverse'
    | 'floatReverseSlow'
    | 'pulseSlow'
    | 'twinkle';
}

const animateConfig = {
  float: styles.animateFloat,
  floatReverse: styles.animateFloatReverse,
  pulseSlow: styles.animatePulseSlow,
  twinkle: styles.animateTwinkle,
  floatReverseSlow: styles.animateFloatReverseSlow,
};

export function Particle({
  type = 'bubble',
  className,
  duration,
  delay,
  animationName = 'float',
}: ParticleProps) {
  const styleConfig = animateConfig[animationName];

  return (
    <div
      className={cn(
        {
          'rounded-full': type === 'bubble',
          'rotate-45': type === 'sparkle',
          'rounded-full blur-sm': type === 'gradient',
        },
        styleConfig,
        className,
      )}
      style={
        {
          '--anim-duration': duration,
          '--anim-delay': delay,
        } as CSSProperties
      }
    />
  );
}
