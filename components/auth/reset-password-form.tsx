"use client";

import { useActionState } from "react";
import { requestPasswordReset } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
    <form action={formAction} className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-merriweather)] text-[32px] font-bold text-heading">
          Password Reset
        </h1>
        <p className="mt-2 font-[family-name:var(--font-urbanist)] text-base text-muted-text">
          No worries, we&apos;ll send you reset instructions.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email address"
          required
          className="h-11 border-input-border"
        />
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="h-11 w-full border border-button-primary-border bg-button-primary-bg text-white hover:bg-button-primary-bg/90"
      >
        {isPending ? "Sending..." : "Continue"}
      </Button>
    </form>
  );
}
