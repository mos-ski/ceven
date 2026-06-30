import { MobileShell } from "@/components/caregiver/mobile-shell";

export default function CaregiverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MobileShell>{children}</MobileShell>;
}
