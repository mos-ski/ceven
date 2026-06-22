"use client";

import { useState } from "react";

import { logout } from "@/lib/auth/actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import EnrollChildModal from "@/components/dashboard/enroll-child-modal";
import NewInvoiceModal from "@/components/dashboard/new-invoice-modal";
import NotificationPanel from "@/components/dashboard/notification-panel";
import { AddStaffModal } from "@/components/admin/staff/add-staff-modal";

export function Topbar() {
  const [enrollOpen, setEnrollOpen] = useState(false);
  const [addStaffOpen, setAddStaffOpen] = useState(false);
  const [newInvoiceOpen, setNewInvoiceOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  return (
    <header className="flex h-16 items-center justify-between border-b border-input-border bg-content-bg px-4 lg:px-6">
      <input
        type="search"
        placeholder="Search..."
        className="hidden h-10 w-full max-w-md rounded-full border border-input-border bg-white px-4 font-[family-name:var(--font-urbanist)] text-sm text-heading placeholder:text-muted-text sm:block"
      />

      <div className="ml-auto flex items-center gap-2 lg:gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="outline"
                className="hidden h-10 rounded-lg border-input-border bg-white font-[family-name:var(--font-urbanist)] text-sm text-heading lg:flex"
              />
            }
          >
            Quick Actions ⌄
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setEnrollOpen(true)}>Enroll a Child</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setAddStaffOpen(true)}>Add Staff</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setNewInvoiceOpen(true)}>New Invoice</DropdownMenuItem>
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
          onClick={() => setNotificationOpen(true)}
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

      {enrollOpen && <EnrollChildModal onClose={() => setEnrollOpen(false)} />}
      {addStaffOpen && <AddStaffModal onClose={() => setAddStaffOpen(false)} />}
      {newInvoiceOpen && <NewInvoiceModal onClose={() => setNewInvoiceOpen(false)} />}
      {notificationOpen && (
        <div className="fixed right-6 top-16 z-40">
          <NotificationPanel onClose={() => setNotificationOpen(false)} />
        </div>
      )}
    </header>
  );
}
