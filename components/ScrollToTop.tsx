"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

type LenisLike = {
  scrollTo?: (target: number | string, opts?: { immediate?: boolean }) => void;
};

declare global {
  interface Window {
    __lenis?: LenisLike | null;
  }
}

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Lenis (used in SmoothScrollProvider) can override `window.scrollTo`,
    // so prefer Lenis' own scrollTo when available.
    const lenis = window.__lenis;

    // Wait a tick so the new page content/layout is mounted.
    const t = window.setTimeout(() => {
      if (lenis?.scrollTo) {
        lenis.scrollTo(0, { immediate: true });
        return;
      }

      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, 0);

    return () => window.clearTimeout(t);
  }, [pathname]);

  return null;
}
