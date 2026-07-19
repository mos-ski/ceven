import { LandingNav } from "@/components/landing/nav";
import { LandingFooter } from "@/components/landing/footer";

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingNav variant="light" />
      <main className="flex-1">{children}</main>
      <LandingFooter />
    </div>
  );
}
