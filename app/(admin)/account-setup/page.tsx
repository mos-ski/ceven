"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { HelpTrainingTab } from "@/components/admin/account-setup/help-training-tab";
import { PlansAccessTab } from "@/components/admin/account-setup/plans-access-tab";
import { SettingsTab } from "@/components/admin/account-setup/settings-tab";

function AccountSetupContent() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  if (tab === "help-training") return <HelpTrainingTab />;
  if (tab === "settings") return <SettingsTab />;
  return <PlansAccessTab />;
}

export default function AccountSetupPage() {
  return (
    <Suspense>
      <AccountSetupContent />
    </Suspense>
  );
}
