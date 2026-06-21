type AuthSplitPanelProps = {
  illustrationSide: "left" | "right";
  illustration: React.ReactNode;
  children: React.ReactNode;
};

export function AuthSplitPanel({
  illustrationSide,
  illustration,
  children,
}: AuthSplitPanelProps) {
  const illustrationPanel = (
    <div className="hidden md:block md:w-[720px]">{illustration}</div>
  );
  const formPanel = (
    <div className="flex w-full flex-1 items-center justify-center bg-white px-8 py-12 md:w-[720px]">
      <div className="w-full max-w-[383px]">{children}</div>
    </div>
  );
  return (
    <div className="flex min-h-screen w-full">
      {illustrationSide === "left" ? (
        <>
          {illustrationPanel}
          {formPanel}
        </>
      ) : (
        <>
          {formPanel}
          {illustrationPanel}
        </>
      )}
    </div>
  );
}
