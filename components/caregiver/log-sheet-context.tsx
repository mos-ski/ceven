"use client";

import { createContext, useContext, useState } from "react";
import { mockIncidents, type Incident } from "@/lib/caregiver/mock-data";

type LogMode = "idle" | "chooser" | "activity" | "report" | "viewReport" | "incident";

type NewIncident = {
  child: string;
  severity: "Minor" | "Moderate" | "Severe";
  description: string;
  action: string;
  parentNotified: boolean;
};

type LogSheetContextType = {
  mode: LogMode;
  openLog: () => void;
  openActivity: () => void;
  openReport: () => void;
  openViewReport: () => void;
  openIncident: () => void;
  close: () => void;
  incidents: Incident[];
  logIncident: (entry: NewIncident) => void;
};

const LogSheetContext = createContext<LogSheetContextType | null>(null);

export function LogSheetProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<LogMode>("idle");
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);

  function logIncident(entry: NewIncident) {
    const now = new Date();
    const newIncident: Incident = {
      id: `inc-${Date.now()}`,
      title: `${entry.severity} incident`,
      description: entry.description,
      child: entry.child,
      severity: entry.severity.toLowerCase() as Incident["severity"],
      time: now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      date: now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      action: entry.action || "No action recorded yet.",
      status: "Open",
      parentNotified: entry.parentNotified,
    };
    setIncidents((prev) => [newIncident, ...prev]);
  }

  return (
    <LogSheetContext.Provider
      value={{
        mode,
        openLog: () => setMode("chooser"),
        openActivity: () => setMode("activity"),
        openReport: () => setMode("report"),
        openViewReport: () => setMode("viewReport"),
        openIncident: () => setMode("incident"),
        close: () => setMode("idle"),
        incidents,
        logIncident,
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
