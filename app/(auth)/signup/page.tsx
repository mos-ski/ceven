import { AuthSplitPanel } from "@/components/auth/auth-split-panel";
import { SignupIllustration } from "@/components/auth/illustration-scenes";
import { SignUpForm } from "@/components/auth/signup-form";

export default function SignUpPage() {
  return (
    <AuthSplitPanel illustrationSide="left" illustration={<SignupIllustration />}>
      <SignUpForm />
    </AuthSplitPanel>
  );
}
