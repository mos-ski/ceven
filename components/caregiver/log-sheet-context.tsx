"use client";

import { createContext, useContext, useState } from "react";

type LogMode = "idle" | "chooser" | "activity" | "report" | "incident";

type LogSheetContextType = {
  mode: LogMode;
  openLog: () => void;
  openActivity: () => void;
  openReport: () => void;
  openIncident: () => void;
  close: () => void;
};

const LogSheetContext = createContext<LogSheetContextType | null>(null);

export function LogSheetProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<LogMode>("idle");

  return (
    <LogSheetContext.Provider
      value={{
        mode,
        openLog: () => setMode("chooser"),
        openActivity: () => setMode("activity"),
        openReport: () => setMode("report"),
        openIncident: () => setMode("incident"),
        close: () => setMode("idle"),
      }}
    >
      {children}
    </LogSheetContext.Provider>
  );
}

export function useLogSheet(): LogSheetContextType {
  const ctx = useContext(LogSheetContext);
  if (!ctx) throw new Error("useLogSheet must be used inside LogSheetProvider");
  return ctx;
}
