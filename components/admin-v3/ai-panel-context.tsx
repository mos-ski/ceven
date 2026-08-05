"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type AiPanelContextValue = {
  open: boolean;
  pinned: boolean;
  toggle: () => void;
  close: () => void;
  togglePin: () => void;
};

const AiPanelContext = createContext<AiPanelContextValue | null>(null);

export function AiPanelProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);

  const value: AiPanelContextValue = {
    open,
    pinned,
    toggle: () => setOpen((v) => !v),
    close: () => {
      if (!pinned) setOpen(false);
    },
    togglePin: () => {
      setPinned((v) => !v);
      setOpen(true);
    },
  };

  return <AiPanelContext.Provider value={value}>{children}</AiPanelContext.Provider>;
}

export function useAiPanel() {
  const ctx = useContext(AiPanelContext);
  if (!ctx) throw new Error("useAiPanel must be used inside AiPanelProvider");
  return ctx;
}
