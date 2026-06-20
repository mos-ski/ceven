type AuthSplitPanelProps = {
  illustrationSide: "left" | "right";
  illustrationLogo?: boolean;
  attribution?: { heading: string; body: string };
  children: React.ReactNode;
};

export function AuthSplitPanel({
  illustrationSide,
  illustrationLogo = false,
  attribution,
  children,
}: AuthSplitPanelProps) {
  const illustration = (
    <div className="relative hidden h-full w-full overflow-hidden bg-illustration-panel md:block">
      <div className="absolute inset-0 bg-gradient-to-br from-illustration-panel via-[#4A2C16] to-black/50" />
      {illustrationLogo && (
        <span className="absolute left-10 top-10 font-[family-name:var(--font-mogra)] text-2xl text-white">
          CEven
        </span>
      )}
      {attribution && (
        <div className="absolute bottom-10 left-10 right-10 rounded-xl border border-white/50 bg-white/30 p-6 backdrop-blur-md">
          <p className="font-[family-name:var(--font-nunito)] text-lg font-bold text-white">
            {attribution.heading}
          </p>
          <p className="mt-2 font-[family-name:var(--font-nunito)] text-sm text-white">
            {attribution.body}
          </p>
        </div>
      )}
    </div>
  );

  const form = (
    <div className="flex h-full w-full items-center justify-center bg-white px-8 py-12 md:w-[720px]">
      <div className="w-full max-w-[380px]">{children}</div>
    </div>
  );

  return (
    <div className="flex min-h-screen w-full">
      {illustrationSide === "left" ? (
        <>
          <div className="hidden md:block md:w-[720px]">{illustration}</div>
          {form}
        </>
      ) : (
        <>
          {form}
          <div className="hidden md:block md:w-[720px]">{illustration}</div>
        </>
      )}
    </div>
  );
}
