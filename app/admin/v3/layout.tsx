import { SidebarV3 } from "@/components/admin-v3/sidebar";
import { TopbarV3 } from "@/components/admin-v3/topbar";
import { SystemAlertWidget } from "@/components/admin-v3/system-alert-widget";
import { TrialBanner } from "@/components/admin-v3/trial-banner";
import { AiPanelProvider } from "@/components/admin-v3/ai-panel-context";
import { AiPanel } from "@/components/admin-v3/ai-panel";

export default function AdminV3Layout({ children }: { children: React.ReactNode }) {
  return (
    <AiPanelProvider>
      <div className="flex h-screen w-full flex-col overflow-hidden bg-[#F5EDD8]">
        <TrialBanner />
        <div className="flex min-h-0 flex-1">
          <SidebarV3 />
          <div className="flex min-w-0 flex-1 flex-col">
            <TopbarV3 />
            <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
          </div>
          <AiPanel />
        </div>
        <SystemAlertWidget />
      </div>
    </AiPanelProvider>
  );
}
