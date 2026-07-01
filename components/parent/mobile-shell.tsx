"use client";

export function MobileShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-gray-200">
      <div
        className="relative flex h-dvh w-full max-w-[390px] flex-col overflow-hidden bg-cg-bg"
        style={{ fontFamily: "var(--font-nunito)" }}
      >
        <div className="flex min-h-0 flex-1 flex-col">{children}</div>
      </div>
    </div>
  );
}
