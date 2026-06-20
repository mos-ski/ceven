import { AuthSplitPanel } from "@/components/auth/auth-split-panel";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <AuthSplitPanel
      illustrationSide="right"
      attribution={{
        heading: "Welcome back!",
        body: "Sign in to manage parent requests and keep your creche running smoothly.",
      }}
    >
      <LoginForm />
    </AuthSplitPanel>
  );
}
