"use client";

import { useState } from "react";
import { SidebarV1 } from "@/components/admin-v1/sidebar";
import { TopbarV1 } from "@/components/admin-v1/topbar";
import { AIPanelV1 } from "@/components/admin-v1/ai-panel";
import { TrialBannerV1 } from "@/components/admin-v1/trial-banner";

export default function AdminV1Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [aiPanelOpen, setAiPanelOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50">
      <SidebarV1 />
      <div className="flex min-w-0 flex-1 flex-col">
        <TrialBannerV1 />
        <TopbarV1 aiPanelOpen={aiPanelOpen} onToggleAIPanel={() => setAiPanelOpen((v) => !v)} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      </div>
      <AIPanelV1 open={aiPanelOpen} />
    </div>
  );
}
