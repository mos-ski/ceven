"use client";

import { useRef, useState } from "react";

import { cn } from "@/lib/utils";

type OtpInputProps = {
  name: string;
  length?: number;
  disabled?: boolean;
};

export function OtpInput({ name, length = 4, disabled }: OtpInputProps) {
  const [digits, setDigits] = useState<string[]>(Array(length).fill(""));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  function handleChange(index: number, raw: string) {
    const value = raw.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[index] = value;
    setDigits(next);
    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  }

  return (
    <div className="flex gap-4">
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputsRef.current[index] = el;
          }}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          disabled={disabled}
          inputMode="numeric"
          maxLength={1}
          placeholder="-"
          className={cn(
            "size-16 rounded-lg border bg-white text-center font-[family-name:var(--font-merriweather)] text-2xl font-bold text-heading outline-none transition-colors placeholder:text-otp-text",
            "not-placeholder-shown:border-heading/35",
            "focus:border-brand-dark focus:ring-2 focus:ring-brand-dark/15",
            "disabled:cursor-not-allowed disabled:border-input-border disabled:bg-flag-bg/60 disabled:text-muted-text",
            "border-input-border"
          )}
        />
      ))}
      <input type="hidden" name={name} value={digits.join("")} />
    </div>
  );
}
