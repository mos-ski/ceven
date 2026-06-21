"use client";

import { useActionState } from "react";
import Link from "next/link";

import { signup } from "@/lib/auth/actions";
import { AuthField } from "@/components/auth/auth-field";
import { PasswordField } from "@/components/auth/password-field";
import { SocialAuthRow } from "@/components/auth/social-auth-row";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

type SignupState = { error?: string };

async function signupAction(
  _prevState: SignupState,
  formData: FormData
): Promise<SignupState> {
  return signup(formData);
}

export function SignUpForm() {
  const [state, formAction, isPending] = useActionState(signupAction, {});

  return (
    <form action={formAction} className="flex w-full flex-col gap-6">
      <div>
        <h1 className="font-[family-name:var(--font-merriweather)] text-[32px] font-bold text-heading">
          Welcome to CEven 👋
        </h1>
        <p className="mt-1 font-[family-name:var(--font-urbanist)] text-base text-muted-text">
          We support your business with our easy-to use and completely secure
          solution.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <AuthField
          id="crecheName"
          name="crecheName"
          label="Creche Name"
          placeholder="Enter creche name"
          disabled={isPending}
        />
        <AuthField
          id="email"
          name="email"
          type="email"
          label="Email Address"
          placeholder="Enter your official email address"
          autoComplete="email"
          disabled={isPending}
        />
        <PasswordField
          id="password"
          name="password"
          label="Password"
          hint="Must contain 1 uppercase letter, 1 number or symbol, min. 8 characters."
          showStrength
          autoComplete="new-password"
          disabled={isPending}
        />
        <PasswordField
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          autoComplete="new-password"
          disabled={isPending}
        />

        {state.error && (
          <p className="font-[family-name:var(--font-urbanist)] text-sm text-error">
            {state.error}
          </p>
        )}

        <label className="flex items-start gap-2 group/field">
          <Checkbox
            name="terms"
            required
            disabled={isPending}
            className="mt-0.5 border-checkbox-border data-checked:border-brand-dark data-checked:bg-brand-dark"
          />
          <span className="font-[family-name:var(--font-urbanist)] text-xs text-muted-text">
            By signing up you acknowledge and agree to CEven{" "}
            <span className="font-medium text-brand-dark">Terms of Service</span>{" "}
            and{" "}
            <span className="font-medium text-brand-dark">Privacy Policy</span>
          </span>
        </label>

        <Button
          type="submit"
          loading={isPending}
          className="h-11 w-full border border-button-primary-border bg-button-primary-bg font-[family-name:var(--font-urbanist)] text-sm font-semibold text-white hover:bg-button-primary-bg/90"
        >
          Get Started
        </Button>
      </div>

      <div className="flex flex-col items-center gap-4">
        <SocialAuthRow />
        <p className="font-[family-name:var(--font-urbanist)] text-sm text-muted-text">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-brand-dark">
            Log in
          </Link>
        </p>
      </div>
    </form>
  );
}
