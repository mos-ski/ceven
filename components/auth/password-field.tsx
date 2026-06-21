"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { cn } from "@/lib/utils";

type PasswordFieldProps = {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  hint?: string;
  showStrength?: boolean;
  error?: string;
  autoComplete?: string;
  disabled?: boolean;
};

function getStrength(value: string): number {
  if (!value) return 0;
  let score = 0;
  if (value.length >= 8) score++;
  if (/[A-Z]/.test(value)) score++;
  if (/[0-9!@#$%^&*]/.test(value)) score++;
  return score;
}

export function PasswordField({
  id,
  name,
  label,
  placeholder = "••••••••",
  hint,
  showStrength,
  error,
  autoComplete,
  disabled,
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState("");
  const strength = showStrength ? getStrength(value) : 0;
  const filled = value.length > 0;

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
      <div
        className={cn(
          "flex h-11 w-full items-center gap-2 rounded-lg border bg-white px-3 transition-colors has-[input:focus]:border-brand-dark has-[input:focus]:ring-2 has-[input:focus]:ring-brand-dark/15",
          disabled
            ? "cursor-not-allowed border-input-border bg-flag-bg/60"
            : error
              ? "border-error"
              : filled
                ? "border-heading/35"
                : "border-input-border"
        )}
      >
        <input
          id={id}
          name={name}
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disabled}
          required
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={cn(
            "flex-1 bg-transparent font-[family-name:var(--font-urbanist)] text-sm outline-none placeholder:text-otp-text disabled:cursor-not-allowed disabled:text-muted-text",
            error ? "text-error" : "text-heading"
          )}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          disabled={disabled}
          className="text-otp-text disabled:cursor-not-allowed disabled:opacity-50"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
        </button>
      </div>
      {hint && (
        <p className="font-[family-name:var(--font-urbanist)] text-xs text-muted-text">
          {hint}
        </p>
      )}
      {showStrength && (
        <div className="flex w-full gap-2.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={cn(
                "h-2 flex-1 rounded-lg",
                i < strength ? "bg-success-text" : "bg-password-meter-neutral/30"
              )}
            />
          ))}
        </div>
      )}
      {error && (
        <p className="font-[family-name:var(--font-urbanist)] text-xs text-error">
          {error}
        </p>
      )}
    </div>
  );
}
