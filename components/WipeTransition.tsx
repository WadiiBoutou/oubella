"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ROUTES = ["/", "/about", "/services", "/gallery", "/contact"];

function getDirection(from: string, to: string) {
  const a = ROUTES.indexOf(from);
  const b = ROUTES.indexOf(to);
  if (a === -1 || b === -1) return 1;
  return b > a ? 1 : -1;
}

export default function WipeTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname() || "/";

  const [displayChildren, setDisplayChildren] = useState(children);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [direction, setDirection] = useState(1);

  const prevPath = useRef(pathname);
  const isAnimating = useRef(false);

  useEffect(() => {
    if (pathname === prevPath.current) {
      if (!isAnimating.current) setDisplayChildren(children);
      return;
    }

    const dir = getDirection(prevPath.current, pathname);
    setDirection(dir);
    isAnimating.current = true;

    // Step 1: show overlay instantly to block next page flash
    setOverlayVisible(true);

    // Step 2: once covered, swap content underneath
    const swapTimer = setTimeout(() => {
      setDisplayChildren(children);
    }, 420);

    // Step 3: remove overlay after reveal
    const endTimer = setTimeout(() => {
      setOverlayVisible(false);
      isAnimating.current = false;
    }, 840);

    prevPath.current = pathname;

    return () => {
      clearTimeout(swapTimer);
      clearTimeout(endTimer);
    };
  }, [pathname, children]);

  return (
    <>
      <div style={{ position: "relative" }}>{displayChildren}</div>

      <AnimatePresence>
        {overlayVisible && (
          <motion.div
            key={`${pathname}-${direction}`}
            initial={{ x: direction === 1 ? "-100%" : "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: direction === 1 ? "100%" : "-100%" }}
            transition={{ duration: 0.84, ease: [0.77, 0, 0.175, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              background: "var(--color-surface)",
              zIndex: 9999,
              pointerEvents: "none",
              willChange: "transform",
            }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </>
  );
}

