"use client";

import { mockParentUser } from "@/lib/parent/mock-data";

export function MeTopbar() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-gray-100 bg-white px-6 pl-20 lg:pl-6">
      <p className="text-sm font-semibold text-gray-800">Account Portal</p>
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-xs font-semibold text-gray-800">{mockParentUser.name}</p>
          <p className="text-[10px] text-gray-400">{mockParentUser.role === "parent" ? "Parent Account" : mockParentUser.role}</p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cg-brand text-xs font-bold text-white">
          {mockParentUser.avatarInitials}
        </div>
      </div>
    </header>
  );
}
