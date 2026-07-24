import { MeSidebar } from "@/components/me/sidebar";
import { MeTopbar } from "@/components/me/topbar";

export default function MeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F9F5F0]">
      <MeSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <MeTopbar />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
