import { AuthSplitPanel } from "@/components/auth/auth-split-panel";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export default function ResetPasswordPage() {
  return (
    <AuthSplitPanel illustrationSide="left" illustrationLogo>
      <ResetPasswordForm />
    </AuthSplitPanel>
  );
}
