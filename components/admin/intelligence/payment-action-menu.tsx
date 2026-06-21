"use client";

import { MoreVertical } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
  family: string;
  onAction?: (action: string, family: string) => void;
};

const ACTIONS = ["Record Payment", "Send Reminder", "View History", "Contact Parent"] as const;

// Figma: node 10707:23123 "staff action modal" — row action menu used on
// Outstanding Payments rows in the AI Command Center and Reports tab.
export function PaymentActionMenu({ family, onAction }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            className="text-[#6b7280] hover:text-[#2d1810]"
            aria-label={`Actions for ${family}`}
          />
        }
      >
        <MoreVertical className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-[184px] rounded-xl border border-[#e6ebf3] bg-[#fefefe] p-2 font-[family-name:var(--font-nunito)] shadow-[0px_4px_12px_rgba(0,0,0,0.1)]"
      >
        {ACTIONS.map((action) => (
          <DropdownMenuItem
            key={action}
            onClick={() => onAction?.(action, family)}
            className="rounded-lg px-3 py-2.5 text-sm font-semibold text-[#3b2513] focus:bg-[#faf2e1] focus:text-[#3b2513]"
          >
            {action}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
