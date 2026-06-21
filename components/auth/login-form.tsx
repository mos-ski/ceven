"use client";

import { useActionState } from "react";
import Link from "next/link";

import { login } from "@/lib/auth/actions";
import { AuthField } from "@/components/auth/auth-field";
import { PasswordField } from "@/components/auth/password-field";
import { SocialAuthRow } from "@/components/auth/social-auth-row";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

type LoginState = { error?: string };

async function loginAction(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  return login(formData);
}

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, {});

  return (
    <form action={formAction} className="flex w-full flex-col gap-6">
      <div>
        <h1 className="font-[family-name:var(--font-merriweather)] text-[32px] font-bold text-heading">
          Stay Connected 😊
        </h1>
        <p className="mt-1 font-[family-name:var(--font-urbanist)] text-base text-muted-text">
          Good to have you back! Let&apos;s log you in.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <AuthField
          id="email"
          name="email"
          type="email"
          label="Email"
          placeholder="Enter your email address"
          autoComplete="email"
          disabled={isPending}
        />

        <div className="flex flex-col gap-2">
          <PasswordField
            id="password"
            name="password"
            label="Password"
            autoComplete="current-password"
            disabled={isPending}
          />
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 group/field">
              <Checkbox
                name="remember"
                disabled={isPending}
                className="border-checkbox-border data-checked:border-brand-dark data-checked:bg-brand-dark"
              />
              <span className="font-[family-name:var(--font-urbanist)] text-xs text-muted-text">
                Remember Me
              </span>
            </label>
            <Link
              href="/reset-password"
              className="font-[family-name:var(--font-urbanist)] text-xs font-medium text-brand-dark"
            >
              Forgot Password
            </Link>
          </div>
        </div>

        {state.error && (
          <p className="font-[family-name:var(--font-urbanist)] text-sm text-error">
            {state.error}
          </p>
        )}

        <Button
          type="submit"
          loading={isPending}
          className="h-11 w-full border border-button-primary-border bg-button-primary-bg font-[family-name:var(--font-urbanist)] text-sm font-semibold text-white hover:bg-button-primary-bg/90"
        >
          Log in
        </Button>
      </div>

      <div className="flex flex-col items-center gap-4">
        <SocialAuthRow />
        <p className="font-[family-name:var(--font-urbanist)] text-sm text-muted-text">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-medium text-brand-dark">
            Get Started
          </Link>
        </p>
      </div>
    </form>
  );
}
