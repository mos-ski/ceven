import { MobileShell } from "@/components/caregivev3/mobile-shell";

export default function CaregiverV3Layout({
 children,
}: {
 children: React.ReactNode;
}) {
 return <MobileShell>{children}</MobileShell>;
}
