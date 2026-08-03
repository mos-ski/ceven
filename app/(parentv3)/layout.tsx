import { MobileShell } from "@/components/parentv3/mobile-shell";

export default function ParentV3Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MobileShell>{children}</MobileShell>;
}
