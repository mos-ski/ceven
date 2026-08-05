import { PageHeader } from "@/components/ui/page-header";
import { HelpTrainingTab } from "@/components/admin/account-setup/help-training-tab";

export default function HelpV3Page() {
  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Help & Training"
        description="Role-based guides and articles to get your team up to speed."
      />
      <HelpTrainingTab showTitle={false} />
    </div>
  );
}
