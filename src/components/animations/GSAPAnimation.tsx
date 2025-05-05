'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

type GSAPAnimationProps = {
  children: React.ReactNode;
  animationType?: 'fadeIn' | 'slideUp' | 'slideIn' | 'scale' | 'pulse';
  duration?: number;
  delay?: number;
  className?: string;
  ease?: string;
  repeat?: number;
  yoyo?: boolean;
  stagger?: number;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
};

export default function GSAPAnimation({
  children,
  animationType = 'fadeIn',
  duration = 1,
  delay = 0,
  className = '',
  ease = 'power2.out',
  repeat = 0,
  yoyo = false,
  stagger = 0,
  from,
  to
}: GSAPAnimationProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    let animation: gsap.core.Tween | undefined;

    const baseConfig = {
      duration,
      delay,
      ease,
      repeat,
      yoyo,
      stagger
    };

    // Reset any previous animations
    gsap.killTweensOf(element);

    // Apply animation based on type
    switch (animationType) {
      case 'fadeIn':
        animation = gsap.fromTo(
          element,
          { opacity: 0 },
          { ...baseConfig, opacity: 1 }
        );
        break;
      case 'slideUp':
        animation = gsap.fromTo(
          element,
          { y: 50, opacity: 0 },
          { ...baseConfig, y: 0, opacity: 1 }
        );
        break;
      case 'slideIn':
        animation = gsap.fromTo(
          element,
          { x: -50, opacity: 0 },
          { ...baseConfig, x: 0, opacity: 1 }
        );
        break;
      case 'scale':
        animation = gsap.fromTo(
          element,
          { scale: 0.8, opacity: 0 },
          { ...baseConfig, scale: 1, opacity: 1 }
        );
        break;
      case 'pulse':
        animation = gsap.to(element, {
          ...baseConfig,
          scale: 1.05,
          repeat: -1,
          yoyo: true,
          duration: 0.8
        });
        break;
      default:
        // Custom animation if from and to are provided
        if (from && to) {
          animation = gsap.fromTo(element, from, { ...baseConfig, ...to });
        }
    }

    return () => {
      if (animation) {
        animation.kill();
      }
    };
  }, [animationType, duration, delay, ease, repeat, yoyo, stagger, from, to]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
} 