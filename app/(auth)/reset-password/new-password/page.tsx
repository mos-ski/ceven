import { AuthSplitPanel } from "@/components/auth/auth-split-panel";
import { SimpleIllustration } from "@/components/auth/illustration-scenes";
import { NewPasswordForm } from "@/components/auth/new-password-form";

export default function NewPasswordPage() {
  return (
    <AuthSplitPanel illustrationSide="left" illustration={<SimpleIllustration />}>
      <NewPasswordForm />
    </AuthSplitPanel>
  );
}
