"use client";
import React, { useRef } from "react";
import {
  useMotionValueEvent,
  useScroll,
  motion,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { cn } from "@/lib/utils";
import TextReveal from "@/components/TextReveal";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode;
    backgroundColor?: string;
    isLight?: boolean;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Offset the breakpoint by 0.5 so the transition happens exactly midpoint between descriptions
    const cardsBreakpoints = content.map((_, index) => (index + 0.5) / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0,
    );
    setActiveCard(closestBreakpointIndex);
  });

  return (
    <motion.div
      animate={{
        backgroundColor:
          content[activeCard].backgroundColor ?? "var(--color-rich-carbon)",
      }}
      className="relative min-h-screen"
      ref={ref}
      style={{
        transitionDuration: "0.8s",
      }}
    >
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-4 sm:px-6 md:px-12 lg:flex-row lg:items-stretch lg:gap-10 xl:gap-10">
        <div className="relative w-full min-w-0 flex-[1_1_48%] pt-2 lg:pt-12">
          <div className="max-w-xl text-start">
            {content.map((item, index) => (
              <div
                key={item.title + index}
                className="flex min-h-[78vh] flex-col justify-center text-start border-b border-white/15 pb-10 pt-10 last:border-b-0 lg:h-screen lg:min-h-0 lg:border-b-0 lg:pb-0 lg:pt-0"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                  className="mb-0"
                >
                  <TextReveal key={activeCard === index ? "active" : "inactive"}>
                    <h2
                      className={cn(
                        "text-3xl font-headline font-bold mb-0 text-start leading-tight sm:text-4xl md:text-5xl",
                        content[activeCard].isLight ? "text-rich-carbon" : "text-white"
                      )}
                    >
                      {item.title}
                    </h2>
                  </TextReveal>
                </motion.div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                  className={cn(
                    "mt-4 max-w-md text-base leading-relaxed font-body sm:mt-6 sm:text-lg",
                    content[activeCard].isLight ? "text-rich-carbon/80" : "text-white/80"
                  )}
                >
                  {item.description}
                </motion.p>

                {/* Mobile/tablet flow: non-sticky content after each description (desc -> image). */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeCard === index ? 1 : 0.75 }}
                  className="mt-6 overflow-hidden rounded-sm border border-white/15 bg-black/10 shadow-xl lg:hidden"
                >
                  <div className="flex h-[min(42vh,300px)] w-full items-center justify-center sm:h-[min(45vh,380px)]">
                    {item.content ?? null}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative hidden min-w-0 flex-[1_1_52%] lg:block">
          <motion.div
            style={{
              opacity: useTransform(
                scrollYProgress,
                [(cardLength - 0.6) / cardLength, (cardLength - 0.45) / cardLength],
                [1, 0]
              ),
            }}
            className={cn(
              "sticky top-[17.5vh] z-[1] h-[65vh] w-full max-w-full overflow-hidden transition-all duration-700",
              contentClassName
            )}
          >
            <div className="relative h-full min-h-[65vh] w-full">
              <AnimatePresence mode="sync" initial={false}>
                <motion.div
                  key={activeCard}
                  initial={{ opacity: 0, scale: 0.96, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.03, y: -8 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 0.61, 0.36, 1],
                  }}
                  className="absolute inset-0 flex items-center justify-center lg:justify-start"
                >
                  {content[activeCard].content ?? null}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
