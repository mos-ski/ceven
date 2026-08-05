import { SidebarV3 } from "@/components/admin-v3/sidebar";
import { TopbarV3 } from "@/components/admin-v3/topbar";
import { SystemAlertWidget } from "@/components/admin-v3/system-alert-widget";

export default function AdminV3Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F5EDD8]">
      <SidebarV3 />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopbarV3 />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      </div>
      <SystemAlertWidget />
    </div>
  );
}
