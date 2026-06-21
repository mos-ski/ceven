"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { resetPassword } from "@/lib/auth/actions";
import { PasswordField } from "@/components/auth/password-field";
import { Button } from "@/components/ui/button";

type ResetState = { error?: string };

async function resetPasswordAction(
  _prevState: ResetState,
  formData: FormData
): Promise<ResetState> {
  return resetPassword(formData);
}

export function NewPasswordForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(resetPasswordAction, {});

  return (
    <form action={formAction} className="flex w-full flex-col items-center gap-8">
      <div className="flex w-full flex-col gap-1">
        <h1 className="font-[family-name:var(--font-merriweather)] text-[32px] font-bold text-heading">
          Password Reset
        </h1>
        <p className="font-[family-name:var(--font-urbanist)] text-base text-muted-text">
          Set your new password to complete the reset.
        </p>
      </div>

      <div className="flex w-full flex-col gap-4">
        <PasswordField
          id="password"
          name="password"
          label="New Password"
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
      </div>

      {state.error && (
        <p className="w-full font-[family-name:var(--font-urbanist)] text-sm text-error">
          {state.error}
        </p>
      )}

      <Button
        type="submit"
        loading={isPending}
        className="h-11 w-full border border-button-primary-border bg-button-primary-bg font-[family-name:var(--font-urbanist)] text-sm font-semibold text-white hover:bg-button-primary-bg/90"
      >
        Reset password
      </Button>

      <button
        type="button"
        onClick={() => router.back()}
        disabled={isPending}
        className="flex items-center gap-2 font-[family-name:var(--font-urbanist)] text-sm font-medium text-heading disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ArrowLeft className="size-5" />
        Back
      </button>
    </form>
  );
}
