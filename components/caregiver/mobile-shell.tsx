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
          {/* Page content */}
          <div className="flex min-h-0 flex-1 flex-col">{children}</div>
        </div>
      </div>
    </LogSheetProvider>
  );
}
