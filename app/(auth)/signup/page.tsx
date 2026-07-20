import { AuthSplitPanel } from "@/components/auth/auth-split-panel";
import { SignupIllustration } from "@/components/auth/illustration-scenes";
import { SignUpForm } from "@/components/auth/signup-form";

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;

  return (
    <AuthSplitPanel illustrationSide="left" illustration={<SignupIllustration />}>
      <SignUpForm defaultEmail={email} />
    </AuthSplitPanel>
  );
}
