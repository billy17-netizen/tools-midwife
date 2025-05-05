'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type ScrollAnimationProps = {
  children: React.ReactNode;
  animationType?: 'fadeIn' | 'slideUp' | 'slideIn' | 'scale' | 'reveal' | 'parallax' | 'rotate';
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  duration?: number;
  delay?: number;
  ease?: string;
  className?: string;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  pin?: boolean;
  pinSpacing?: boolean;
};

export default function GSAPScrollTrigger({
  children,
  animationType = 'fadeIn',
  start = 'top 80%',
  end = 'bottom 20%',
  scrub = false,
  markers = false,
  duration = 1,
  delay = 0,
  ease = 'power2.out',
  className = '',
  from,
  to,
  pin = false,
  pinSpacing = true,
}: ScrollAnimationProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!elementRef.current || typeof window === 'undefined') return;
    
    const element = elementRef.current;
    const trigger = triggerRef.current || element;
    
    // Base configuration for ScrollTrigger
    const scrollConfig: ScrollTrigger.Vars = {
      trigger: trigger,
      start: start,
      end: end || 'bottom 20%',
      markers: markers,
      scrub: scrub,
      pin: pin,
      pinSpacing: pinSpacing,
    };

    // Animation properties based on type
    let fromVars: gsap.TweenVars = {};
    let toVars: gsap.TweenVars = {
      duration: duration,
      ease: ease,
      delay: delay,
    };
    
    // Apply animation based on type
    switch (animationType) {
      case 'fadeIn':
        fromVars = { autoAlpha: 0, ...from };
        toVars = { ...toVars, autoAlpha: 1, ...to };
        break;
        
      case 'slideUp':
        fromVars = { y: 100, autoAlpha: 0, ...from };
        toVars = { ...toVars, y: 0, autoAlpha: 1, ...to };
        break;
        
      case 'slideIn':
        fromVars = { x: -100, autoAlpha: 0, ...from };
        toVars = { ...toVars, x: 0, autoAlpha: 1, ...to };
        break;
        
      case 'scale':
        fromVars = { scale: 0.8, autoAlpha: 0, ...from };
        toVars = { ...toVars, scale: 1, autoAlpha: 1, ...to };
        break;
        
      case 'reveal':
        fromVars = { clipPath: 'inset(0 100% 0 0)', autoAlpha: 0, ...from };
        toVars = { ...toVars, clipPath: 'inset(0 0% 0 0)', autoAlpha: 1, ...to };
        break;
        
      case 'parallax':
        fromVars = { y: 50, ...from };
        toVars = { ...toVars, y: -50, ...to };
        break;
        
      case 'rotate':
        fromVars = { rotation: 10, autoAlpha: 0, ...from };
        toVars = { ...toVars, rotation: 0, autoAlpha: 1, ...to };
        break;
        
      default:
        // Use custom from/to if provided
        if (from) fromVars = { ...from };
        if (to) toVars = { ...toVars, ...to };
    }

    // Create the GSAP animation with ScrollTrigger
    animationRef.current = gsap.fromTo(element, fromVars, {
      ...toVars,
      scrollTrigger: scrollConfig,
    });

    // Cleanup function
    return () => {
      if (animationRef.current) {
        const st = animationRef.current.scrollTrigger;
        if (st) st.kill();
        animationRef.current.kill();
      }
    };
  }, [animationType, start, end, scrub, markers, duration, delay, ease, from, to, pin, pinSpacing]);

  return (
    <>
      <div ref={triggerRef} style={{ position: 'relative' }} className="scroll-trigger-marker">
        <div ref={elementRef} className={className}>
          {children}
        </div>
      </div>
    </>
  );
} 