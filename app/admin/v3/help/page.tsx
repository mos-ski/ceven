import { HelpTrainingTab } from "@/components/admin/account-setup/help-training-tab";

export default function HelpV3Page() {
 return (
  <div className="flex flex-col gap-5">
   <div>
    <h1 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2D1810]">
     Help &amp; Training
    </h1>
    <p className="mt-1 text-sm text-[#2D1810]/50">
     Role-based guides and articles to get your team up to speed.
    </p>
   </div>

   <HelpTrainingTab />
  </div>
 );
}
