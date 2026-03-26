'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const TextReveal: React.FC<TextRevealProps> = ({ children, className, delay = 0 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wiperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wiper = wiperRef.current;
    const text = textRef.current;
    const container = containerRef.current;

    if (!wiper || !text || !container) return;

    // Set initial text state: hidden until wipe starts
    gsap.set(text, { opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      delay: delay,
    });

    tl.to(wiper, {
      scaleX: 1,
      duration: 0.5,
      ease: 'power2.inOut',
      transformOrigin: 'left',
    })
    .set(text, { opacity: 1 }) // Show text right as wipe covers it
    .to(wiper, {
      scaleX: 0,
      duration: 0.5,
      ease: 'power2.inOut',
      transformOrigin: 'right',
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [delay]);

  return (
    <div ref={containerRef} className={cn("relative inline-flex flex-col w-fit overflow-hidden line h-fit", className)}>
      {/* The Wiper - Saffron Gold (#D9A045) */}
      <div 
        ref={wiperRef} 
        className="absolute inset-0 z-20 bg-tertiary scale-x-0" 
        aria-hidden="true"
      />
      
      {/* The Text - Locked to No-Wrap and Content-Width */}
      <div ref={textRef} className="relative z-10 w-fit">
        <span className="whitespace-nowrap inline-block">
          {children}
        </span>
      </div>
    </div>
  );
};

export default TextReveal;
