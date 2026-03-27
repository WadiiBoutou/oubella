'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

type LenisLike = {
  scrollTo?: (target: number | string, opts?: { immediate?: boolean }) => void;
};

declare global {
  interface Window {
    __lenis?: LenisLike | null;
  }
}

const SmoothScrollProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/br6v1r9y3u
      wheelMultiplier: 1.2,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Expose the Lenis instance so other components (e.g. route scroll reset)
    // can trigger scroll actions without fighting the smooth scroll engine.
    window.__lenis = lenis;

    return () => {
      lenis.destroy();
      if (window.__lenis === lenis) {
        window.__lenis = null;
      }
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScrollProvider;
