import { AuthSplitPanel } from "@/components/auth/auth-split-panel";
import { SimpleIllustration } from "@/components/auth/illustration-scenes";
import { OtpForm } from "@/components/auth/otp-form";

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;

  return (
    <AuthSplitPanel illustrationSide="left" illustration={<SimpleIllustration />}>
      <OtpForm email={email ?? ""} nextHref="/login" />
    </AuthSplitPanel>
  );
}
