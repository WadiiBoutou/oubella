"use client";
import React, { useRef } from "react";
import { useMotionValueEvent, useScroll, motion, useTransform } from "framer-motion";
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
        backgroundColor: content[activeCard].backgroundColor || "#0D0D0D",
      }}
      className="relative flex justify-center space-x-10 min-h-screen"
      ref={ref}
      style={{
        transitionDuration: "0.8s",
      }}
    >
      <div className="relative flex items-start px-4 w-full md:w-1/2">
        <div className="max-w-xl w-full mx-auto md:ml-0 md:mr-auto pl-0 md:pl-20 text-start">
          {content.map((item, index) => (
            <div key={item.title + index} className="h-screen flex flex-col justify-center text-start">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="mb-0"
              >
                <TextReveal key={activeCard === index ? 'active' : 'inactive'}>
                  <h2
                    className={cn(
                      "text-4xl md:text-5xl font-headline font-bold mb-0 text-start leading-tight",
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
                  "text-lg mt-6 max-w-sm leading-relaxed font-body",
                  content[activeCard].isLight ? "text-rich-carbon/80" : "text-white/80"
                )}
              >
                {item.description}
              </motion.p>
            </div>
          ))}
        </div>
      </div>
      <div className="hidden lg:block w-1/2 relative">
        <motion.div
          style={{
            opacity: useTransform(
              scrollYProgress,
              [(cardLength - 0.6) / cardLength, (cardLength - 0.45) / cardLength],
              [1, 0]
            )
          }}
          className={cn(
            "sticky top-[17.5vh] h-[65vh] w-full max-w-2xl flex items-center justify-center transition-all duration-700 mr-20",
            contentClassName
          )}
        >
          {content[activeCard].content ?? null}
        </motion.div>
      </div>
    </motion.div>
  );
};
