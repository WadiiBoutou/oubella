"use client";

import { createContext, useContext } from "react";

type TransitionContextValue = {
  isTransitioning: boolean;
};

const TransitionContext = createContext<TransitionContextValue>({ isTransitioning: false });

export function TransitionProvider({
  isTransitioning,
  children,
}: {
  isTransitioning: boolean;
  children: React.ReactNode;
}) {
  return (
    <TransitionContext.Provider value={{ isTransitioning }}>
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  return useContext(TransitionContext);
}

