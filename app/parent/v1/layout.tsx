import { MobileShell } from "@/components/parent/mobile-shell";

export default function ParentV1Layout({ children }: { children: React.ReactNode }) {
  return <MobileShell>{children}</MobileShell>;
}
