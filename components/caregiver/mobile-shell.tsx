"use client";

import { LogSheetProvider } from "./log-sheet-context";

export function MobileShell({ children }: { children: React.ReactNode }) {
  return (
    <LogSheetProvider>
      <div className="flex min-h-dvh items-center justify-center bg-gray-200">
        <div
          className="relative flex h-dvh w-full max-w-[390px] flex-col overflow-hidden bg-cg-bg"
          style={{ fontFamily: "var(--font-nunito)" }}
        >
          {/* Simulated status bar */}
          <div className="flex shrink-0 items-center justify-between px-6 pt-3 pb-1">
            <span className="text-xs font-semibold text-[#1a1a1a]">9:41</span>
            <div className="flex items-center gap-1">
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                <rect x="0" y="4" width="3" height="8" rx="1" fill="#1a1a1a" />
                <rect x="4.5" y="2.5" width="3" height="9.5" rx="1" fill="#1a1a1a" />
                <rect x="9" y="1" width="3" height="11" rx="1" fill="#1a1a1a" />
                <rect x="13.5" y="0" width="2.5" height="12" rx="1" fill="#1a1a1a" />
              </svg>
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                <rect x="1" y="1" width="12" height="10" rx="2" stroke="#1a1a1a" strokeWidth="1.5" />
                <rect x="13.5" y="3.5" width="2" height="5" rx="1" fill="#1a1a1a" />
                <rect x="2.5" y="2.5" width="8" height="7" rx="1" fill="#1a1a1a" />
              </svg>
            </div>
          </div>

          {/* Page content */}
          <div className="flex min-h-0 flex-1 flex-col">{children}</div>
        </div>
      </div>
    </LogSheetProvider>
  );
}
