import { AuthSplitPanel } from "@/components/auth/auth-split-panel";
import { SimpleIllustration } from "@/components/auth/illustration-scenes";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export default function ResetPasswordPage() {
  return (
    <AuthSplitPanel illustrationSide="left" illustration={<SimpleIllustration />}>
      <ResetPasswordForm />
    </AuthSplitPanel>
  );
}
