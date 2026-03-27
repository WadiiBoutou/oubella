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
  noWrap?: boolean;
}

const TextReveal: React.FC<TextRevealProps> = ({ children, className, delay = 0, noWrap = true }) => {
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
    <div
      ref={containerRef}
      className={cn(
        /* overflow-visible: glyphs / wiper overscan must not clip parent */
        "relative inline-flex h-fit flex-col overflow-visible leading-none",
        noWrap ? "w-fit" : "w-full",
        className
      )}
    >
      {/* Wiper bleeds horizontally only (scaleX); vertical matches text box. */}
      <div
        ref={wiperRef}
        className="absolute inset-y-0 -inset-x-1.5 z-20 bg-tertiary scale-x-0"
        aria-hidden="true"
      />
      
      {/* Text wrapper can opt into wrapping for narrow viewports (e.g. long hero titles). */}
      <div ref={textRef} className={cn("relative z-10", noWrap ? "w-fit" : "w-full")}>
        <span className={cn("inline-block", noWrap ? "whitespace-nowrap" : "whitespace-normal break-words")}>
          {children}
        </span>
      </div>
    </div>
  );
};

export default TextReveal;
