import { ProgressBar } from "./progress-bar";

interface QuestionShellProps {
  heading: string;
  subtext?: string;
  current: number;
  total: number;
  onBack?: () => void;
  children: React.ReactNode;
  inline?: boolean;
}

export function QuestionShell({
  heading,
  subtext,
  current,
  total,
  onBack,
  children,
  inline = false,
}: QuestionShellProps) {
  const inner = (
    <div className="w-full max-w-[560px]">
      <h1 className="text-center font-[family-name:var(--font-merriweather)] text-[28px] font-bold leading-tight text-heading sm:text-[34px]">
        {heading}
      </h1>
      <div className="mt-6 flex justify-center">
        <ProgressBar current={current} total={total} />
      </div>
      {subtext && (
        <p className="mt-4 text-center font-[family-name:var(--font-urbanist)] text-base text-muted-text">
          {subtext}
        </p>
      )}
      <div className="mt-8">{children}</div>
      {onBack && (
        <div className="mt-8 text-center">
          <button
            onClick={onBack}
            className="font-[family-name:var(--font-urbanist)] text-sm font-medium text-brand-dark"
          >
            ‹ Back
          </button>
        </div>
      )}
    </div>
  );

  if (inline) {
    return <div className="flex w-full flex-col items-center py-10 px-6">{inner}</div>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#faf2e1] px-6 py-14">
      {inner}
    </div>
  );
}
