import { AuthSplitPanel } from "@/components/auth/auth-split-panel";
import { LoginIllustration } from "@/components/auth/illustration-scenes";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <AuthSplitPanel illustrationSide="right" illustration={<LoginIllustration />}>
      <LoginForm />
    </AuthSplitPanel>
  );
}
