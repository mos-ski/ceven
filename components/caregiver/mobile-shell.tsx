"use client";

import { LogSheetProvider } from "./log-sheet-context";

const MOBILE_RESET = `
  @media (max-width: 1023px) {
    .cg-shell-outer {
      background: #F5F0E8 !important;
      padding: 0 !important;
      flex-direction: column !important;
      align-items: stretch !important;
      justify-content: flex-start !important;
    }
    .cg-shell-body {
      width: 100% !important;
      height: 100dvh !important;
      border-radius: 0 !important;
      box-shadow: none !important;
      background: transparent !important;
      flex-shrink: 1 !important;
      display: flex !important;
      flex-direction: column !important;
    }
    .cg-shell-screen {
      position: static !important;
      border-radius: 0 !important;
      flex: 1 !important;
    }
    .cg-shell-island, .cg-shell-chrome { display: none !important; }
  }
`;

export function MobileShell({ children }: { children: React.ReactNode }) {
  return (
    <LogSheetProvider>
      <style>{MOBILE_RESET}</style>

      <div className="cg-shell-outer flex min-h-dvh items-center justify-center bg-[#1A1A1A] px-4 py-6">
        {/* Phone outer body */}
        <div
          className="cg-shell-body relative shrink-0"
          style={{
            width: 393,
            height: 852,
            background: "#1C1C1E",
            borderRadius: 52,
            boxShadow: "0 0 0 1.5px #3A3A3C, 0 30px 80px rgba(0,0,0,0.7), inset 0 0 0 2px #2C2C2E",
          }}
        >
          {/* Side buttons — hidden on mobile via .cg-shell-chrome */}
          <div className="cg-shell-chrome">
            <div style={{ position: "absolute", left: -3.5, top: 160, width: 3.5, height: 36, background: "#3A3A3C", borderRadius: "3px 0 0 3px" }} />
            <div style={{ position: "absolute", left: -3.5, top: 208, width: 3.5, height: 36, background: "#3A3A3C", borderRadius: "3px 0 0 3px" }} />
            <div style={{ position: "absolute", right: -3.5, top: 192, width: 3.5, height: 64, background: "#3A3A3C", borderRadius: "0 3px 3px 0" }} />
          </div>

          {/* Screen */}
          <div
            className="cg-shell-screen"
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              right: 12,
              bottom: 12,
              borderRadius: 42,
              background: "#F5F0E8",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Dynamic Island — hidden on mobile */}
            <div
              className="cg-shell-island"
              style={{
                position: "absolute",
                top: 12,
                left: "50%",
                transform: "translateX(-50%)",
                width: 120,
                height: 34,
                background: "#000",
                borderRadius: 20,
                zIndex: 50,
              }}
            />

            {/* Content wrapper */}
            <div
              style={{
                flex: 1,
                minHeight: 0,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                fontFamily: "var(--font-nunito)",
              }}
            >
              {children}
            </div>

            {/* Home indicator — hidden on mobile */}
            <div
              className="cg-shell-chrome"
              style={{
                position: "absolute",
                bottom: 8,
                left: "50%",
                transform: "translateX(-50%)",
                width: 134,
                height: 5,
                background: "rgba(0,0,0,0.2)",
                borderRadius: 3,
              }}
            />
          </div>
        </div>
      </div>
    </LogSheetProvider>
  );
}
