import { cn } from "@/lib/utils";

type AuthFieldProps = {
  id: string;
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  error?: string;
  defaultValue?: string;
  autoComplete?: string;
  disabled?: boolean;
};

export function AuthField({
  id,
  name,
  label,
  type = "text",
  placeholder,
  error,
  defaultValue,
  autoComplete,
  disabled,
}: AuthFieldProps) {
  return (
    <div className="flex w-full flex-col gap-1">
      <label
        htmlFor={id}
        className={cn(
          "font-[family-name:var(--font-urbanist)] text-sm font-medium",
          disabled ? "text-muted-text" : error ? "text-error" : "text-heading"
        )}
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        autoComplete={autoComplete}
        disabled={disabled}
        required
        className={cn(
          "h-11 w-full rounded-lg border bg-white px-3 font-[family-name:var(--font-urbanist)] text-sm outline-none transition-colors placeholder:text-otp-text",
          !error && "not-placeholder-shown:border-heading/35",
          "focus:border-brand-dark focus:ring-2 focus:ring-brand-dark/15",
          "disabled:cursor-not-allowed disabled:border-input-border disabled:bg-flag-bg/60 disabled:text-muted-text disabled:placeholder:text-muted-text/70",
          error ? "border-error text-error" : "border-input-border text-heading"
        )}
      />
      {error && (
        <p className="font-[family-name:var(--font-urbanist)] text-xs text-error">
          {error}
        </p>
      )}
    </div>
  );
}
