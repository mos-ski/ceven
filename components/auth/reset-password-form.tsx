"use client";

import { useActionState } from "react";

import { requestPasswordReset } from "@/lib/auth/actions";
import { AuthField } from "@/components/auth/auth-field";
import { Button } from "@/components/ui/button";

type ResetState = Record<string, never>;

async function resetAction(
  _prevState: ResetState,
  formData: FormData
): Promise<ResetState> {
  await requestPasswordReset(formData);
  return {};
}

export function ResetPasswordForm() {
  const [, formAction, isPending] = useActionState(resetAction, {});

  return (
    <form action={formAction} className="flex w-full flex-col gap-8">
      <div>
        <h1 className="font-[family-name:var(--font-merriweather)] text-[32px] font-bold text-heading">
          Password Reset
        </h1>
        <p className="mt-1 font-[family-name:var(--font-urbanist)] text-base text-muted-text">
          No worries, we&apos;ll send you reset instructions.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <AuthField
          id="email"
          name="email"
          type="email"
          label="Email Address"
          placeholder="Enter your email address"
          autoComplete="email"
          disabled={isPending}
        />

        <Button
          type="submit"
          loading={isPending}
          className="h-11 w-full border border-button-primary-border bg-button-primary-bg font-[family-name:var(--font-urbanist)] text-sm font-semibold text-white hover:bg-button-primary-bg/90"
        >
          Continue
        </Button>
      </div>
    </form>
  );
}
