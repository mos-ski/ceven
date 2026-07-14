"use client";

const MOBILE_RESET = `
  @media (max-width: 1023px) {
    .p-shell-outer {
      background: #F5F0E8 !important;
      padding: 0 !important;
      flex-direction: column !important;
      align-items: stretch !important;
      justify-content: flex-start !important;
    }
    .p-shell-body {
      width: 100% !important;
      height: 100dvh !important;
      border-radius: 0 !important;
      box-shadow: none !important;
      background: transparent !important;
      flex-shrink: 1 !important;
      display: flex !important;
      flex-direction: column !important;
    }
    .p-shell-screen {
      position: static !important;
      border-radius: 0 !important;
      flex: 1 !important;
    }
    .p-shell-island, .p-shell-chrome { display: none !important; }
    .p-shell-content { padding-top: 0 !important; }
    .p-shell-status { display: none !important; }
  }
`;

export function MobileShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{MOBILE_RESET}</style>

      <div className="p-shell-outer flex min-h-dvh items-center justify-center bg-[#1A1A1A] px-4 py-6">
        {/* Phone outer body */}
        <div
          className="p-shell-body relative shrink-0"
          style={{
            width: 393,
            height: 852,
            background: "#1C1C1E",
            borderRadius: 52,
            boxShadow: "0 0 0 1.5px #3A3A3C, 0 30px 80px rgba(0,0,0,0.7), inset 0 0 0 2px #2C2C2E",
          }}
        >
          {/* Side buttons — hidden on mobile via .p-shell-chrome */}
          <div className="p-shell-chrome">
            <div style={{ position: "absolute", left: -3.5, top: 160, width: 3.5, height: 36, background: "#3A3A3C", borderRadius: "3px 0 0 3px" }} />
            <div style={{ position: "absolute", left: -3.5, top: 208, width: 3.5, height: 36, background: "#3A3A3C", borderRadius: "3px 0 0 3px" }} />
            <div style={{ position: "absolute", right: -3.5, top: 192, width: 3.5, height: 64, background: "#3A3A3C", borderRadius: "0 3px 3px 0" }} />
          </div>

          {/* Screen */}
          <div
            className="p-shell-screen"
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
              className="p-shell-island"
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

            <div
              className="p-shell-status"
              style={{
                position: "absolute",
                top: 18,
                left: 28,
                right: 28,
                zIndex: 45,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                color: "#111",
                fontFamily: "var(--font-nunito)",
                fontSize: 12,
                fontWeight: 800,
                pointerEvents: "none",
              }}
            >
              <span>9:41</span>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 15, height: 10, border: "1.6px solid #111", borderRadius: 3, display: "inline-block", position: "relative" }}>
                  <span style={{ position: "absolute", inset: 2, borderRadius: 1.5, background: "#111" }} />
                </span>
              </div>
            </div>

            {/* Content wrapper */}
            <div
              className="p-shell-content"
              style={{
                flex: 1,
                minHeight: 0,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                fontFamily: "var(--font-nunito)",
                paddingTop: 52,
              }}
            >
              {children}
            </div>

            {/* Home indicator — hidden on mobile */}
            <div
              className="p-shell-chrome"
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
    </>
  );
}
