'use client';

import React, { useRef, useEffect } from 'react';

type LottieAnimationProps = {
  animationPath: string;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
  style?: React.CSSProperties;
  speed?: number;
  onComplete?: () => void;
  width?: number | string;
  height?: number | string;
};

export default function LottieAnimation({
  animationPath,
  loop = true,
  autoplay = true,
  className = '',
  style = {},
  speed = 1,
  onComplete,
  width = '100%',
  height = '100%'
}: LottieAnimationProps) {
  const animationContainer = useRef<HTMLDivElement>(null);
  const animationInstance = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;
    let lottie: any;
    let anim: any;
    if (!animationContainer.current) return;

    import('lottie-web').then((mod) => {
      if (!isMounted) return;
      lottie = mod.default;
      anim = lottie.loadAnimation({
        container: animationContainer.current,
        renderer: 'svg',
        loop,
        autoplay,
        path: animationPath
      });
      anim.setSpeed(speed);
      animationInstance.current = anim;
      if (onComplete) {
        anim.addEventListener('complete', onComplete);
      }
    });

    return () => {
      isMounted = false;
      if (animationInstance.current) {
        animationInstance.current.destroy();
        if (onComplete) {
          animationInstance.current.removeEventListener('complete', onComplete);
        }
      }
    };
  }, [animationPath, loop, autoplay, speed, onComplete]);

  return (
    <div
      ref={animationContainer}
      className={className}
      style={{
        width,
        height,
        ...style
      }}
    />
  );
} 