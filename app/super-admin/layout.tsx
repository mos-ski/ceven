import { SidebarSA } from "@/components/super-admin/sidebar";
import { TopbarSA } from "@/components/super-admin/topbar";

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50">
      <SidebarSA />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopbarSA />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
