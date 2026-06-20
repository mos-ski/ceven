"use client";

import { useActionState } from "react";
import Link from "next/link";
import { login } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
    <form action={formAction} className="space-y-6">
      <div className="text-center">
        <span className="font-[family-name:var(--font-mogra)] text-2xl text-sidebar-bg">
          CEven
        </span>
      </div>

      <div>
        <h1 className="font-[family-name:var(--font-merriweather)] text-[32px] font-bold text-heading">
          Stay Connected 😊
        </h1>
        <p className="mt-2 font-[family-name:var(--font-urbanist)] text-base text-muted-text">
          Good to have you back! Let&apos;s log you in.
        </p>
      </div>

      {state.error && (
        <p className="font-[family-name:var(--font-urbanist)] text-sm text-red-600">
          {state.error}
        </p>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Label</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email address"
          required
          className="h-11 border-input-border"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          required
          className="h-11 border-input-border"
        />
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 font-[family-name:var(--font-urbanist)] text-xs text-muted-text">
          <Checkbox name="remember" />
          Remember Me
        </label>
        <Link
          href="/reset-password"
          className="font-[family-name:var(--font-urbanist)] text-xs text-sidebar-bg"
        >
          Forgot Password
        </Link>
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="h-11 w-full border border-button-primary-border bg-button-primary-bg text-white hover:bg-button-primary-bg/90"
      >
        {isPending ? "Logging in..." : "Log in"}
      </Button>
    </form>
  );
}
