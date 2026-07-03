"use client";

import { LogSheetProvider } from "./log-sheet-context";

export function MobileShell({ children }: { children: React.ReactNode }) {
  return (
    <LogSheetProvider>
      <div className="flex min-h-dvh items-center justify-center bg-[#1A1A1A] px-4 py-6">
        {/* Phone outer body */}
        <div
          className="relative flex flex-col"
          style={{
            width: 393,
            height: 852,
            background: "#1C1C1E",
            borderRadius: 52,
            boxShadow:
              "0 0 0 1.5px #3A3A3C, 0 30px 80px rgba(0,0,0,0.7), inset 0 0 0 2px #2C2C2E",
          }}
        >
          {/* Volume up */}
          <div className="absolute" style={{ left: -3.5, top: 160, width: 3.5, height: 36, background: "#3A3A3C", borderRadius: "3px 0 0 3px" }} />
          {/* Volume down */}
          <div className="absolute" style={{ left: -3.5, top: 208, width: 3.5, height: 36, background: "#3A3A3C", borderRadius: "3px 0 0 3px" }} />
          {/* Power */}
          <div className="absolute" style={{ right: -3.5, top: 192, width: 3.5, height: 64, background: "#3A3A3C", borderRadius: "0 3px 3px 0" }} />

          {/* Screen inset */}
          <div
            className="relative flex flex-1 flex-col overflow-hidden"
            style={{ margin: 12, borderRadius: 42, background: "#F5F0E8" }}
          >
            {/* Dynamic Island */}
            <div
              className="absolute left-1/2 z-50 -translate-x-1/2"
              style={{ top: 12, width: 120, height: 34, background: "#000", borderRadius: 20 }}
            />

            {/* App content */}
            <div className="flex flex-1 flex-col overflow-hidden" style={{ fontFamily: "var(--font-nunito)" }}>
              {children}
            </div>

            {/* Home indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
              <div style={{ width: 134, height: 5, background: "rgba(0,0,0,0.2)", borderRadius: 3 }} />
            </div>
          </div>
        </div>
      </div>
    </LogSheetProvider>
  );
}
