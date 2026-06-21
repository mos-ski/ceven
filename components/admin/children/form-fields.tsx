"use client";

import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

export function FieldLabel({ children, required }: { children: ReactNode; required?: boolean }) {
  return (
    <label className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">
      {children}
      {required && <span className="ml-0.5 text-[#ef4444]">*</span>}
    </label>
  );
}

export function FieldGroup({ label, required, children }: { label: string; required?: boolean; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <FieldLabel required={required}>{label}</FieldLabel>
      {children}
    </div>
  );
}

export function TextField({
  placeholder,
  type = "text",
  defaultValue,
  icon,
}: {
  placeholder?: string;
  type?: string;
  defaultValue?: string;
  icon?: ReactNode;
}) {
  return (
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="h-[52px] w-full rounded-lg border border-[#d0d5dd] bg-white px-4 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] placeholder:text-[#9ca3af] focus:border-[#c47b2c] focus:outline-none focus:ring-1 focus:ring-[#c47b2c]"
      />
      {icon && (
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#9ca3af]">
          {icon}
        </span>
      )}
    </div>
  );
}

export function SelectField({
  options,
  placeholder,
  defaultValue,
}: {
  options: string[];
  placeholder?: string;
  defaultValue?: string;
}) {
  return (
    <div className="relative">
      <select
        defaultValue={defaultValue ?? ""}
        className="h-[52px] w-full appearance-none rounded-lg border border-[#d0d5dd] bg-white px-4 pr-10 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] focus:border-[#c47b2c] focus:outline-none focus:ring-1 focus:ring-[#c47b2c]"
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-[#6b7280]" />
    </div>
  );
}

export function TextAreaField({ placeholder, rows = 3 }: { placeholder?: string; rows?: number }) {
  return (
    <textarea
      placeholder={placeholder}
      rows={rows}
      className="w-full resize-none rounded-lg border border-[#d0d5dd] bg-white px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] placeholder:text-[#9ca3af] focus:border-[#c47b2c] focus:outline-none focus:ring-1 focus:ring-[#c47b2c]"
    />
  );
}

export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="font-[family-name:var(--font-merriweather)] text-base font-bold text-[#2d1810]">
      {children}
    </h3>
  );
}

export function ModalCheckbox({ label, defaultChecked }: { label: string; defaultChecked?: boolean }) {
  return (
    <label className="flex cursor-pointer items-center gap-2">
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        className="size-4 rounded border-[#d0d5dd] accent-[#c47b2c]"
      />
      <span className="font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">{label}</span>
    </label>
  );
}
