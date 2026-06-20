"use client";

import { logout } from "@/lib/auth/actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function Topbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-input-border bg-content-bg px-6">
      <input
        type="search"
        placeholder="Search children, parents, staff, invoices..."
        className="h-10 w-full max-w-md rounded-full border border-input-border bg-white px-4 font-[family-name:var(--font-urbanist)] text-sm text-heading placeholder:text-muted-text"
      />

      <div className="flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="outline"
                className="h-10 rounded-lg border-input-border bg-white font-[family-name:var(--font-urbanist)] text-sm text-heading"
              />
            }
          >
            Quick Actions ⌄
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Enroll a Child</DropdownMenuItem>
            <DropdownMenuItem>Add Staff</DropdownMenuItem>
            <DropdownMenuItem>New Invoice</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <button
          type="button"
          aria-label="AI assistant"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-heading text-white"
        >
          ✦
        </button>

        <button
          type="button"
          aria-label="Notifications"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-input-border bg-white text-heading"
        >
          🔔
        </button>

        <form action={logout}>
          <button
            type="submit"
            className="font-[family-name:var(--font-urbanist)] text-sm text-muted-text underline"
          >
            Log out
          </button>
        </form>
      </div>
    </header>
  );
}
