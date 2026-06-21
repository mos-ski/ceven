"use client";

import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { REPORT_RECIPIENT_OPTIONS } from "@/lib/mock-data/intelligence";

type Props = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

// Figma: node 10707:23129 "SEVERITY" — recipient scope selector used for
// report recipients and broadcast/announcement audience selection.
export function RecipientScopeMenu({ value, onChange, className }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            className={`h-[52px] w-full justify-between rounded-xl border-[#e6ebf3] bg-white px-4 font-[family-name:var(--font-urbanist)] text-sm text-[#1f2937] ${className ?? ""}`}
          />
        }
      >
        {value}
        <ChevronDown className="size-4 text-[#6b7280]" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[var(--anchor-width)] rounded-xl bg-white p-2 font-[family-name:var(--font-urbanist)] shadow-md">
        {REPORT_RECIPIENT_OPTIONS.map((option) => (
          <DropdownMenuItem
            key={option}
            onClick={() => onChange(option)}
            className="rounded-lg px-4 py-2.5 text-sm font-medium text-[#1f2937] focus:bg-[#faf2e1] focus:text-[#1f2937]"
          >
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
