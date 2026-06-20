import { AuthSplitPanel } from "@/components/auth/auth-split-panel";
import { VerifyEmailForm } from "@/components/auth/verify-email-form";

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;

  return (
    <AuthSplitPanel illustrationSide="left" illustrationLogo>
      <VerifyEmailForm email={email ?? ""} />
    </AuthSplitPanel>
  );
}
