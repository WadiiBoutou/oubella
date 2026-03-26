"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { TransitionProvider } from "@/context/TransitionContext";

const TAB_ORDER = ["/", "/about", "/services", "/gallery", "/contact"] as const;

function getTabIndex(pathname: string) {
  const cleaned = pathname.split("?")[0]?.split("#")[0] ?? pathname;
  const found = TAB_ORDER.indexOf(cleaned as (typeof TAB_ORDER)[number]);
  return found === -1 ? null : found;
}

function getDirection(fromPath: string, toPath: string) {
  const fromIndex = getTabIndex(fromPath);
  const toIndex = getTabIndex(toPath);
  if (fromIndex === null || toIndex === null) return 1;
  if (toIndex === fromIndex) return 0;
  return toIndex > fromIndex ? 1 : -1;
}

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";
  const prevPathRef = useRef(pathname);
  const direction = useMemo(() => getDirection(prevPathRef.current, pathname), [pathname]);

  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (prevPathRef.current === pathname) return;
    prevPathRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    // Start lock when pathname changes
    setIsAnimating(true);
    const t = window.setTimeout(() => setIsAnimating(false), 980);
    return () => window.clearTimeout(t);
  }, [pathname]);

  useEffect(() => {
    if (!isAnimating) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isAnimating]);

  const enteringVariants = {
    initial: (dir: number) => ({
      x: `${dir * 100}%`,
      scale: 0.82,
      borderRadius: 18,
    }),
    animate: (dir: number) => ({
      x: [`${dir * 100}%`, `${dir * 100}%`, "0%", "0%"],
      scale: [0.82, 0.82, 0.82, 1],
      borderRadius: [18, 18, 18, 0],
      transition: {
        duration: 0.98,
        times: [0, 0.2857, 0.7143, 1],
        x: { ease: [0.65, 0, 0.35, 1], duration: 0.98, times: [0, 0.2857, 0.7143, 1] },
        scale: { ease: "easeInOut", duration: 0.98, times: [0, 0.2857, 0.7143, 1] },
        borderRadius: { ease: "easeInOut", duration: 0.98, times: [0, 0.2857, 0.7143, 1] },
      },
    }),
    exit: (dir: number) => ({
      x: ["0%", "0%", `${-dir * 100}%`],
      scale: [1, 0.82, 0.82],
      borderRadius: [0, 18, 18],
      transition: {
        duration: 0.7,
        times: [0, 0.4, 1],
        x: { ease: [0.65, 0, 0.35, 1], duration: 0.7, times: [0, 0.4, 1] },
        scale: { ease: "easeInOut", duration: 0.7, times: [0, 0.4, 1] },
        borderRadius: { ease: "easeInOut", duration: 0.7, times: [0, 0.4, 1] },
      },
    }),
  } as const;

  return (
    <TransitionProvider isTransitioning={isAnimating}>
      <div className="relative w-full bg-surface-container-lowest overflow-x-hidden">
        {/* Interaction lock layer */}
        <div
          className={`fixed inset-0 z-[100] ${isAnimating ? "pointer-events-auto" : "pointer-events-none"}`}
          aria-hidden="true"
        />

        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={pathname}
            className="relative w-full will-change-transform"
            custom={direction || 1}
            variants={enteringVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </TransitionProvider>
  );
}

