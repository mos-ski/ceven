import { Suspense } from "react";
import { Sidebar } from "@/components/admin/sidebar";
import { Topbar } from "@/components/admin/topbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Suspense fallback={<div className="hidden w-[232px] shrink-0 bg-white lg:block" />}>
        <Sidebar />
      </Suspense>
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="flex-1 overflow-y-auto bg-content-bg p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
