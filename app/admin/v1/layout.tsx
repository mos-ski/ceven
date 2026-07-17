"use client";

import { SidebarV1 } from "@/components/admin-v1/sidebar";
import { TopbarV1 } from "@/components/admin-v1/topbar";

export default function AdminV1Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      <SidebarV1 />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopbarV1 />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
