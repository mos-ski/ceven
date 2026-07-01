import { MobileShell } from "@/components/parent/mobile-shell";

export default function ParentLayout({ children }: { children: React.ReactNode }) {
  return <MobileShell>{children}</MobileShell>;
}
