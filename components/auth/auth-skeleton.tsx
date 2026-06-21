export function AuthSkeleton() {
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden md:block md:w-[720px] bg-illustration-panel/40 animate-pulse" />
      <div className="flex w-full flex-1 items-center justify-center bg-white px-8 py-12 md:w-[720px]">
        <div className="flex w-full max-w-[383px] animate-pulse flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="h-9 w-3/4 rounded-md bg-flag-bg" />
            <div className="h-4 w-full rounded-md bg-flag-bg/70" />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <div className="h-4 w-16 rounded bg-flag-bg/70" />
              <div className="h-11 w-full rounded-lg bg-flag-bg" />
            </div>
            <div className="flex flex-col gap-1">
              <div className="h-4 w-16 rounded bg-flag-bg/70" />
              <div className="h-11 w-full rounded-lg bg-flag-bg" />
            </div>
            <div className="h-11 w-full rounded-lg bg-flag-bg/80" />
          </div>
        </div>
      </div>
    </div>
  );
}
