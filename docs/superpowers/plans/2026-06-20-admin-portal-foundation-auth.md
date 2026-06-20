# CEven Admin Portal — Foundation & Auth Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up the Next.js project shell (design tokens, fonts, route groups) and a fully clickable auth flow (login, password reset, email verification) matching the Figma "Old Admin" screens, landing on a placeholder dashboard inside the real admin shell (sidebar + topbar).

**Architecture:** Next.js 15 App Router + TypeScript, Tailwind v4, shadcn/ui. Two route groups: `(auth)` for the auth screens, `(admin)` for the sidebar/topbar shell. Auth is a stub: a single in-memory mock admin user, a cookie-based session (no hashing, no real email), enforced by `middleware.ts`.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind v4, shadcn/ui, next/font (Google Fonts: Mogra, Merriweather, Urbanist, Nunito).

## Global Constraints

- Scope is Admin Portal only — no Parent or Caregiver portal code (per spec `docs/superpowers/specs/2026-06-20-admin-portal-prototype-design.md`).
- Visual fidelity to Figma is required: use the exact hex values and copy listed in this plan, not approximations.
- No real authentication: no password hashing, no email delivery, no database. Mock admin user + cookie session only.
- No broad automated test suite — per the approved spec, verification is `tsc --noEmit`, `eslint`, `next build`, and manual click-through in the dev server. Every task ends with an explicit manual-verification step instead of a unit test.
- Use non-interactive CLI flags (`--yes`, `-y`) for all scaffolding commands.

---

## File Structure

| File | Responsibility |
|---|---|
| `app/globals.css` | Tailwind import + CSS variable design tokens (colors, matches Figma) |
| `app/layout.tsx` | Root layout, Google Font setup (Mogra, Merriweather, Urbanist, Nunito) |
| `middleware.ts` | Redirects unauthenticated users away from `(admin)`, redirects authenticated users away from `(auth)` |
| `lib/mock-data/admin-user.ts` | The single mock admin user record + credential-check function |
| `lib/auth/session.ts` | Cookie session helpers: `setSession`, `getSession`, `clearSession` |
| `lib/auth/actions.ts` | Server actions: `login`, `requestPasswordReset`, `logout` |
| `components/auth/auth-split-panel.tsx` | Shared two-column layout (form side + illustration side) used by all 3 auth screens |
| `components/auth/login-form.tsx` | Login form (client component) |
| `app/(auth)/layout.tsx` | Wraps auth pages, centers content |
| `app/(auth)/login/page.tsx` | Login screen |
| `components/auth/reset-password-form.tsx` | Password reset form (client component) |
| `app/(auth)/reset-password/page.tsx` | Password reset screen |
| `components/auth/verify-email-form.tsx` | OTP verification form (client component) |
| `app/(auth)/verify-email/page.tsx` | Email verification screen |
| `components/admin/nav-items.ts` | Sidebar nav item data (label, href, icon name) |
| `components/admin/sidebar.tsx` | Sidebar: logo, nav list with active state, support card, profile block |
| `components/admin/topbar.tsx` | Search input, Quick Actions dropdown, AI button, notification bell |
| `app/(admin)/layout.tsx` | Combines Sidebar + Topbar + content area, cream background |
| `app/(admin)/dashboard/page.tsx` | Placeholder dashboard content (filled in by the next plan) |

---

## Task 1: Project Scaffold, Design Tokens, Fonts

**Files:**
- Create: whole Next.js project (via CLI) at repo root
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

**Interfaces:**
- Produces: CSS custom properties consumed by every later component — `--color-sidebar-bg`, `--color-sidebar-active-bg`, `--color-sidebar-active-text`, `--color-sidebar-inactive-text`, `--color-brand-accent`, `--color-content-bg`, `--color-illustration-panel`, `--color-button-primary-bg`, `--color-button-primary-border`, `--color-input-border`, `--color-heading`, `--color-muted-text`. Produces font variables `--font-mogra`, `--font-merriweather`, `--font-urbanist`, `--font-nunito`.

- [x] **Step 1: Scaffold the Next.js app**

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias "@/*" --yes
```

Expected: project files created in repo root (`app/`, `package.json`, `tsconfig.json`, `next.config.ts`, etc.) without prompting.

> **Note (post-implementation):** `create-next-app` rejects directory names with uppercase letters as the npm package name. If running this in a directory named `Ceven` (or similar), pass an explicit lowercase name to avoid it: add `--no-git` to the command above, and if it still fails on the package name, run it once with a throwaway lowercase folder name as an extra arg only to get past the prompt-free package.json `name` field, then fix `package.json`'s `name` field by hand afterward. Do **not** scaffold into a separate temp directory and move files over — doing so re-runs the CLI's own `git init`/initial commit and will silently replace any existing `.git` history in the target directory. If the target directory already has a `.git` (it does here — the spec and plan docs are already committed), scaffold in place and keep the existing `.git`; only edit `package.json`'s `name` field if `create-next-app` complains about it.

- [ ] **Step 2: Initialize shadcn/ui**

```bash
npx shadcn@latest init --yes -b neutral
```

If `-b neutral` is rejected by the installed shadcn CLI version, use `-b base` instead (functionally equivalent base style) — note which one you used in your report.

- [ ] **Step 3: Add the shadcn components this plan needs**

```bash
npx shadcn@latest add button input label checkbox dropdown-menu avatar separator --yes
```

Expected: new files under `components/ui/`.

- [ ] **Step 4: Add design tokens to `app/globals.css`**

Open `app/globals.css` and add this block after the existing `@import "tailwindcss";` / shadcn base layer (keep everything shadcn's init generated; append the block below at the end of the file):

```css
:root {
  --color-sidebar-bg: #3B2513;
  --color-sidebar-active-bg: #4A2F18;
  --color-sidebar-active-text: #FAF2E1;
  --color-sidebar-inactive-text: #6B7280;
  --color-brand-accent: #9A6033;
  --color-content-bg: #FFF9F0;
  --color-illustration-panel: #5B391E;
  --color-button-primary-bg: #E0BFA0;
  --color-button-primary-border: #D4A67F;
  --color-input-border: #CCD2DC;
  --color-heading: #1F2937;
  --color-muted-text: #6B7280;
  --color-otp-text: #858C98;
  --font-mogra: var(--font-mogra-import);
  --font-merriweather: var(--font-merriweather-import);
  --font-urbanist: var(--font-urbanist-import);
  --font-nunito: var(--font-nunito-import);
}

@theme inline {
  --color-sidebar-bg: var(--color-sidebar-bg);
  --color-sidebar-active-bg: var(--color-sidebar-active-bg);
  --color-sidebar-active-text: var(--color-sidebar-active-text);
  --color-sidebar-inactive-text: var(--color-sidebar-inactive-text);
  --color-brand-accent: var(--color-brand-accent);
  --color-content-bg: var(--color-content-bg);
  --color-illustration-panel: var(--color-illustration-panel);
  --color-button-primary-bg: var(--color-button-primary-bg);
  --color-button-primary-border: var(--color-button-primary-border);
  --color-input-border: var(--color-input-border);
  --color-heading: var(--color-heading);
  --color-muted-text: var(--color-muted-text);
  --color-otp-text: var(--color-otp-text);
}
```

This makes classes like `bg-sidebar-bg`, `text-sidebar-active-text`, `border-input-border` available via Tailwind.

- [ ] **Step 5: Wire up Google Fonts in `app/layout.tsx`**

Replace the font imports/usage in `app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { Mogra, Merriweather, Urbanist, Nunito } from "next/font/google";
import "./globals.css";

const mogra = Mogra({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-mogra-import",
});

const merriweather = Merriweather({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-merriweather-import",
});

const urbanist = Urbanist({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-urbanist-import",
});

const nunito = Nunito({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-nunito-import",
});

export const metadata: Metadata = {
  title: "CEven Admin",
  description: "CEven Admin Portal",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${mogra.variable} ${merriweather.variable} ${urbanist.variable} ${nunito.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 6: Verify the build**

```bash
npx tsc --noEmit && npx eslint . && npx next build
```

Expected: all three commands exit 0 with no errors.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js project with shadcn and Figma design tokens"
```

---

## Task 2: Mock Admin User & Session Stub

**Files:**
- Create: `lib/mock-data/admin-user.ts`
- Create: `lib/auth/session.ts`
- Create: `lib/auth/actions.ts`
- Create: `middleware.ts`

**Interfaces:**
- Consumes: nothing (first logic layer).
- Produces: `checkCredentials(email: string, password: string): boolean`, `MOCK_ADMIN_USER: { name: string; email: string; password: string }` from `lib/mock-data/admin-user.ts`. `setSession(): Promise<void>`, `getSession(): Promise<boolean>`, `clearSession(): Promise<void>` from `lib/auth/session.ts`. Server actions `login(formData: FormData): Promise<{ error?: string }>`, `requestPasswordReset(formData: FormData): Promise<{ ok: true }>`, `logout(): Promise<void>` from `lib/auth/actions.ts`.

- [ ] **Step 1: Create the mock admin user**

`lib/mock-data/admin-user.ts`:

```ts
export const MOCK_ADMIN_USER = {
  name: "Ola Olagoke",
  email: "admin@stgregcreche.com",
  password: "password123",
};

export function checkCredentials(email: string, password: string): boolean {
  return (
    email.trim().toLowerCase() === MOCK_ADMIN_USER.email.toLowerCase() &&
    password === MOCK_ADMIN_USER.password
  );
}
```

- [ ] **Step 2: Create the session helpers**

`lib/auth/session.ts`:

```ts
import { cookies } from "next/headers";

const SESSION_COOKIE = "ceven_admin_session";

export async function setSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, "active", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
}

export async function getSession(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value === "active";
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
```

- [ ] **Step 3: Create the server actions**

`lib/auth/actions.ts`:

```ts
"use server";

import { redirect } from "next/navigation";
import { checkCredentials } from "@/lib/mock-data/admin-user";
import { setSession, clearSession } from "@/lib/auth/session";

export async function login(
  formData: FormData
): Promise<{ error?: string }> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!checkCredentials(email, password)) {
    return { error: "Invalid email or password." };
  }

  await setSession();
  redirect("/dashboard");
}

export async function requestPasswordReset(
  formData: FormData
): Promise<{ ok: true }> {
  const email = String(formData.get("email") ?? "");
  redirect(`/verify-email?email=${encodeURIComponent(email)}`);
}

export async function logout(): Promise<void> {
  await clearSession();
  redirect("/login");
}
```

- [ ] **Step 4: Create the auth-guard middleware**

`middleware.ts` (repo root):

```ts
import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "ceven_admin_session";
const AUTH_PATHS = ["/login", "/reset-password", "/verify-email"];

export function middleware(request: NextRequest) {
  const hasSession = request.cookies.get(SESSION_COOKIE)?.value === "active";
  const { pathname } = request.nextUrl;
  const isAuthPath = AUTH_PATHS.some((path) => pathname.startsWith(path));

  if (!hasSession && !isAuthPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (hasSession && isAuthPath) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

- [ ] **Step 5: Verify**

```bash
npx tsc --noEmit && npx eslint .
```

Expected: no errors. (No pages exist yet to manually click through — that starts in Task 3.)

- [ ] **Step 6: Commit**

```bash
git add lib middleware.ts
git commit -m "feat: add mock admin user, cookie session stub, and auth middleware"
```

---

## Task 3: Shared Auth Split-Screen Layout

**Files:**
- Create: `components/auth/auth-split-panel.tsx`

**Interfaces:**
- Consumes: nothing.
- Produces: `AuthSplitPanel` component with props `{ illustrationSide: "left" | "right"; illustrationLogo?: boolean; attribution?: { heading: string; body: string }; children: React.ReactNode }`, used by all 3 auth pages in Tasks 4-6.

There is no real illustration image asset extracted from Figma yet, so the illustration side uses a dark gradient (matching `--color-illustration-panel`) as a faithful color-accurate placeholder for the photo Figma shows. Swapping in a real image later only requires editing this one file.

- [ ] **Step 1: Create the component**

`components/auth/auth-split-panel.tsx`:

```tsx
type AuthSplitPanelProps = {
  illustrationSide: "left" | "right";
  illustrationLogo?: boolean;
  attribution?: { heading: string; body: string };
  children: React.ReactNode;
};

export function AuthSplitPanel({
  illustrationSide,
  illustrationLogo = false,
  attribution,
  children,
}: AuthSplitPanelProps) {
  const illustration = (
    <div className="relative hidden h-full w-full overflow-hidden bg-illustration-panel md:block">
      <div className="absolute inset-0 bg-gradient-to-br from-illustration-panel via-[#4A2C16] to-black/50" />
      {illustrationLogo && (
        <span className="absolute left-10 top-10 font-[family-name:var(--font-mogra)] text-2xl text-white">
          CEven
        </span>
      )}
      {attribution && (
        <div className="absolute bottom-10 left-10 right-10 rounded-xl border border-white/50 bg-white/30 p-6 backdrop-blur-md">
          <p className="font-[family-name:var(--font-nunito)] text-lg font-bold text-white">
            {attribution.heading}
          </p>
          <p className="mt-2 font-[family-name:var(--font-nunito)] text-sm text-white">
            {attribution.body}
          </p>
        </div>
      )}
    </div>
  );

  const form = (
    <div className="flex h-full w-full items-center justify-center bg-white px-8 py-12 md:w-[720px]">
      <div className="w-full max-w-[380px]">{children}</div>
    </div>
  );

  return (
    <div className="flex min-h-screen w-full">
      {illustrationSide === "left" ? (
        <>
          <div className="hidden md:block md:w-[720px]">{illustration}</div>
          {form}
        </>
      ) : (
        <>
          {form}
          <div className="hidden md:block md:w-[720px]">{illustration}</div>
        </>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Create the auth route group layout**

`app/(auth)/layout.tsx`:

```tsx
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
```

- [ ] **Step 3: Verify**

```bash
npx tsc --noEmit && npx eslint .
```

Expected: no errors. (Nothing renders yet — no page imports this component until Task 4.)

- [ ] **Step 4: Commit**

```bash
git add components/auth/auth-split-panel.tsx "app/(auth)/layout.tsx"
git commit -m "feat: add shared auth split-screen layout"
```

---

## Task 4: Login Screen

**Files:**
- Create: `components/auth/login-form.tsx`
- Create: `app/(auth)/login/page.tsx`

**Interfaces:**
- Consumes: `login` from `lib/auth/actions.ts` (Task 2), `AuthSplitPanel` from `components/auth/auth-split-panel.tsx` (Task 3), `Button`/`Input`/`Label`/`Checkbox` from `components/ui/*` (Task 1).
- Produces: `LoginForm` component (no props), rendered at route `/login`.

- [ ] **Step 1: Create the login form**

`components/auth/login-form.tsx`:

```tsx
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
```

- [ ] **Step 2: Create the login page**

`app/(auth)/login/page.tsx`:

```tsx
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
```

- [ ] **Step 3: Verify**

```bash
npx tsc --noEmit && npx eslint . && npx next build
```

Expected: no errors.

- [ ] **Step 4: Manual verification**

```bash
npm run dev
```

Open `http://localhost:3000/login`. Confirm: split layout with the form on the left (white) and a dark gradient panel with the "Welcome back!" frosted card on the right; heading "Stay Connected 😊"; submitting wrong credentials (e.g. `a@a.com` / `wrong`) shows "Invalid email or password." without navigating away.

- [ ] **Step 5: Commit**

```bash
git add components/auth/login-form.tsx "app/(auth)/login/page.tsx"
git commit -m "feat: add login screen"
```

---

## Task 5: Password Reset Screen

**Files:**
- Create: `components/auth/reset-password-form.tsx`
- Create: `app/(auth)/reset-password/page.tsx`

**Interfaces:**
- Consumes: `requestPasswordReset` from `lib/auth/actions.ts` (Task 2), `AuthSplitPanel` from Task 3.
- Produces: `ResetPasswordForm` component (no props), rendered at route `/reset-password`.

- [ ] **Step 1: Create the reset form**

`components/auth/reset-password-form.tsx`:

```tsx
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
```

- [ ] **Step 2: Create the reset password page**

`app/(auth)/reset-password/page.tsx`:

```tsx
import { AuthSplitPanel } from "@/components/auth/auth-split-panel";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export default function ResetPasswordPage() {
  return (
    <AuthSplitPanel illustrationSide="left" illustrationLogo>
      <ResetPasswordForm />
    </AuthSplitPanel>
  );
}
```

- [ ] **Step 3: Verify**

```bash
npx tsc --noEmit && npx eslint . && npx next build
```

Expected: no errors.

- [ ] **Step 4: Manual verification**

With `npm run dev` running, open `http://localhost:3000/reset-password`. Confirm: illustration panel is now on the LEFT with the white "CEven" logo top-left, form on the right with heading "Password Reset". Submitting an email redirects to `/verify-email?email=...` (built in Task 6 — a 404 here is expected until that task is done).

- [ ] **Step 5: Commit**

```bash
git add components/auth/reset-password-form.tsx "app/(auth)/reset-password/page.tsx"
git commit -m "feat: add password reset screen"
```

---

## Task 6: Email Verification Screen

**Files:**
- Create: `components/auth/verify-email-form.tsx`
- Create: `app/(auth)/verify-email/page.tsx`

**Interfaces:**
- Consumes: `AuthSplitPanel` from Task 3.
- Produces: `VerifyEmailForm` component with props `{ email: string }`, rendered at route `/verify-email`.

- [ ] **Step 1: Create the verification form**

`components/auth/verify-email-form.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const RESEND_SECONDS = 66;

export function VerifyEmailForm({ email }: { email: string }) {
  const router = useRouter();
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  function handleDigitChange(index: number, value: string) {
    if (value.length > 1) return;
    const next = [...digits];
    next[index] = value;
    setDigits(next);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-merriweather)] text-[32px] font-bold text-heading">
          Check your Email
        </h1>
        <p className="mt-2 font-[family-name:var(--font-urbanist)] text-base text-muted-text">
          We&apos;ve sent a one time OTP to your email{" "}
          <span className="font-medium text-heading">{email}</span>
        </p>
      </div>

      <div className="flex gap-3">
        {digits.map((digit, index) => (
          <input
            key={index}
            value={digit}
            onChange={(e) => handleDigitChange(index, e.target.value)}
            maxLength={1}
            inputMode="numeric"
            placeholder="-"
            className="h-20 w-20 rounded-lg border border-input-border text-center font-[family-name:var(--font-merriweather)] text-2xl font-bold text-otp-text"
          />
        ))}
      </div>

      <p className="font-[family-name:var(--font-merriweather)] text-sm font-semibold text-sidebar-bg">
        Resend Code in {minutes}:{seconds}
      </p>

      <Button
        type="button"
        onClick={() => router.push("/login")}
        className="h-11 w-full border border-button-primary-border bg-button-primary-bg text-white hover:bg-button-primary-bg/90"
      >
        Continue
      </Button>

      <button
        type="button"
        onClick={() => router.back()}
        className="flex items-center gap-1 font-[family-name:var(--font-urbanist)] text-sm text-heading"
      >
        ← Back
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Create the verification page**

`app/(auth)/verify-email/page.tsx`:

```tsx
import { AuthSplitPanel } from "@/components/auth/auth-split-panel";
import { VerifyEmailForm } from "@/components/auth/verify-email-form";

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;

  return (
    <AuthSplitPanel illustrationSide="left" illustrationLogo>
      <VerifyEmailForm email={email ?? ""} />
    </AuthSplitPanel>
  );
}
```

- [ ] **Step 3: Verify**

```bash
npx tsc --noEmit && npx eslint . && npx next build
```

Expected: no errors.

- [ ] **Step 4: Manual verification**

With `npm run dev` running, go through `/login` → "Forgot Password" → `/reset-password` → submit an email (e.g. `parent@example.com`) → confirm redirect to `/verify-email?email=parent@example.com` showing "Check your Email" with that email bolded, 4 OTP boxes, and a counting-down "Resend Code in 01:05..." timer. Click "Continue" and confirm it navigates to `/login`.

- [ ] **Step 5: Commit**

```bash
git add components/auth/verify-email-form.tsx "app/(auth)/verify-email/page.tsx"
git commit -m "feat: add email verification screen"
```

---

## Task 7: Admin Sidebar

**Files:**
- Create: `components/admin/nav-items.ts`
- Create: `components/admin/sidebar.tsx`

**Interfaces:**
- Consumes: `MOCK_ADMIN_USER` from `lib/mock-data/admin-user.ts` (Task 2).
- Produces: `NAV_ITEMS: NavItem[]` (`NavItem = { label: string; href: string }`) from `components/admin/nav-items.ts`; `Sidebar` component (no props) from `components/admin/sidebar.tsx`, consumed by `app/(admin)/layout.tsx` in Task 8.

- [ ] **Step 1: Create the nav item list**

`components/admin/nav-items.ts`:

```ts
export type NavItem = {
  label: string;
  href: string;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Child Management", href: "/children" },
  { label: "Staff Management", href: "/staff" },
  { label: "Daily Operations", href: "/daily-operations" },
  { label: "Finance", href: "/finance" },
  { label: "Communication", href: "/communication" },
  { label: "Intelligence", href: "/intelligence" },
  { label: "Account & Setup", href: "/account-setup" },
];
```

- [ ] **Step 2: Create the sidebar component**

`components/admin/sidebar.tsx`:

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/components/admin/nav-items";
import { MOCK_ADMIN_USER } from "@/lib/mock-data/admin-user";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-[280px] flex-col justify-between bg-sidebar-bg px-4 py-6">
      <div>
        <div className="mb-8 px-2">
          <span className="font-[family-name:var(--font-mogra)] text-xl text-sidebar-active-text">
            CEven
          </span>
          <span className="ml-2 font-[family-name:var(--font-urbanist)] text-xs text-sidebar-inactive-text">
            Main Admin
          </span>
        </div>

        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-lg px-3 py-2 font-[family-name:var(--font-urbanist)] text-sm ${
                  isActive
                    ? "bg-sidebar-active-bg text-sidebar-active-text"
                    : "text-sidebar-inactive-text hover:text-sidebar-active-text"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="space-y-4">
        <div className="rounded-lg bg-sidebar-active-bg p-4">
          <p className="font-[family-name:var(--font-urbanist)] text-sm font-semibold text-sidebar-active-text">
            Need Support?
          </p>
          <p className="font-[family-name:var(--font-urbanist)] text-xs text-sidebar-inactive-text">
            Get Help
          </p>
        </div>
        <div className="px-2">
          <p className="font-[family-name:var(--font-urbanist)] text-sm font-medium text-sidebar-active-text">
            {MOCK_ADMIN_USER.name}
          </p>
          <p className="font-[family-name:var(--font-urbanist)] text-xs text-sidebar-inactive-text">
            {MOCK_ADMIN_USER.email}
          </p>
        </div>
      </div>
    </aside>
  );
}
```

- [ ] **Step 3: Verify**

```bash
npx tsc --noEmit && npx eslint .
```

Expected: no errors. (Not rendered anywhere yet — that happens in Task 8.)

- [ ] **Step 4: Commit**

```bash
git add components/admin/nav-items.ts components/admin/sidebar.tsx
git commit -m "feat: add admin sidebar"
```

---

## Task 8: Admin Topbar & Shell Layout

**Files:**
- Create: `components/admin/topbar.tsx`
- Create: `app/(admin)/layout.tsx`

**Interfaces:**
- Consumes: `logout` from `lib/auth/actions.ts` (Task 2), `Sidebar` from Task 7, shadcn `Button`/`DropdownMenu*` from `components/ui/*` (Task 1).
- Produces: `Topbar` component (no props); `AdminLayout` wrapping all `(admin)` routes, consumed implicitly by every page in that route group (starting with Task 9's dashboard page).

- [ ] **Step 1: Create the topbar**

`components/admin/topbar.tsx`:

```tsx
"use client";

import { logout } from "@/lib/auth/actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function Topbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-input-border bg-content-bg px-6">
      <input
        type="search"
        placeholder="Search children, parents, staff, invoices..."
        className="h-10 w-full max-w-md rounded-full border border-input-border bg-white px-4 font-[family-name:var(--font-urbanist)] text-sm text-heading placeholder:text-muted-text"
      />

      <div className="flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="h-10 rounded-lg border-input-border bg-white font-[family-name:var(--font-urbanist)] text-sm text-heading"
            >
              Quick Actions ⌄
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Enroll a Child</DropdownMenuItem>
            <DropdownMenuItem>Add Staff</DropdownMenuItem>
            <DropdownMenuItem>New Invoice</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <button
          type="button"
          aria-label="AI assistant"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-heading text-white"
        >
          ✦
        </button>

        <button
          type="button"
          aria-label="Notifications"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-input-border bg-white text-heading"
        >
          🔔
        </button>

        <form action={logout}>
          <button
            type="submit"
            className="font-[family-name:var(--font-urbanist)] text-sm text-muted-text underline"
          >
            Log out
          </button>
        </form>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Create the admin shell layout**

`app/(admin)/layout.tsx`:

```tsx
import { Sidebar } from "@/components/admin/sidebar";
import { Topbar } from "@/components/admin/topbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Topbar />
        <main className="flex-1 overflow-y-auto bg-content-bg p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify**

```bash
npx tsc --noEmit && npx eslint .
```

Expected: no errors. (No page exists under `(admin)` yet — that's Task 9, which is also when this layout becomes visible.)

- [ ] **Step 4: Commit**

```bash
git add components/admin/topbar.tsx "app/(admin)/layout.tsx"
git commit -m "feat: add admin topbar and shell layout"
```

---

## Task 9: Dashboard Placeholder & End-to-End Verification

**Files:**
- Create: `app/(admin)/dashboard/page.tsx`

**Interfaces:**
- Consumes: nothing new — rendered inside `AdminLayout` from Task 8.
- Produces: the `/dashboard` route, which is the redirect target after login (Task 2's `login` action) and the page the full flow lands on. Full dashboard content (stat tiles, AI brief, etc.) is built in a separate future plan per the spec's build order — this page is intentionally a placeholder.

- [ ] **Step 1: Create the placeholder dashboard page**

`app/(admin)/dashboard/page.tsx`:

```tsx
export default function DashboardPage() {
  return (
    <div className="rounded-xl border border-input-border bg-white p-8">
      <h1 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-heading">
        Dashboard
      </h1>
      <p className="mt-2 font-[family-name:var(--font-urbanist)] text-sm text-muted-text">
        Dashboard content is built in the next plan.
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npx tsc --noEmit && npx eslint . && npx next build
```

Expected: all pass with no errors.

- [ ] **Step 3: Full end-to-end manual verification**

```bash
npm run dev
```

Walk through every flow and confirm each item:

1. Visit `http://localhost:3000/` with no cookies set → middleware redirects to `/login`.
2. On `/login`, submit wrong credentials → inline error "Invalid email or password.", stays on `/login`.
3. Submit `admin@stgregcreche.com` / `password123` → redirected to `/dashboard`. Confirm: dark-brown sidebar with 8 nav items, "Dashboard" highlighted; topbar with search input, "Quick Actions" dropdown (opens on click, shows 3 items), AI button, notification bell; placeholder dashboard card in the cream content area.
4. Click "Log out" in the topbar → redirected to `/login`, cookie cleared.
5. Try visiting `http://localhost:3000/dashboard` directly while logged out → redirected to `/login` by middleware.
6. From `/login`, click "Forgot Password" → `/reset-password` (illustration panel now on the left). Submit an email → redirected to `/verify-email?email=...` with that email shown and OTP boxes + countdown visible. Click "Continue" → back at `/login`.

If every item above behaves as described, the foundation and auth flow are complete.

- [ ] **Step 4: Commit**

```bash
git add "app/(admin)/dashboard/page.tsx"
git commit -m "feat: add placeholder dashboard page, complete foundation and auth flow"
```

---

## Plan Self-Review Notes

- **Spec coverage:** Build Order steps 1-2 ("Design tokens + shell layout", "Auth screens") are fully covered by Tasks 1, 3-9 (tokens/fonts in Task 1, shell in Tasks 7-8, auth in Tasks 2-6). Steps 3-10 (Dashboard content onward) are explicitly out of scope for this plan — each becomes its own future plan once its Figma section is pulled in detail.
- **No placeholders:** all code blocks are complete and runnable; the one deliberate stand-in (illustration gradient instead of a real photo asset) is called out explicitly in Task 3, not left vague.
- **Type consistency:** `NavItem` (Task 7) is only used internally to `nav-items.ts`/`sidebar.tsx`. `MOCK_ADMIN_USER` (Task 2) is consumed identically (`.name`, `.email`) in Task 7's sidebar. `login`/`requestPasswordReset`/`logout` signatures in Task 2 match exactly how they're called in Tasks 4-6 and 8.
- **Scope:** single subsystem (Admin Portal foundation + auth), independently testable end-to-end per Task 9 — no further decomposition needed.

## Incident Note (added post-Task-1)

Task 1's first implementer attempt scaffolded into a separate temp directory and moved files into the repo root because `create-next-app` rejected the directory name `Ceven` (uppercase letters aren't valid in an npm package name). That move re-ran the scaffolding tool's own git initialization and **replaced this repo's existing `.git` history**, deleting the commits that held this spec and plan doc. Both docs were restored from the controlling session's own record of their content and recommitted. The note added to Task 1 Step 1 above (fix `package.json`'s `name` field by hand instead of scaffolding elsewhere) exists to prevent this from recurring if Task 1 is ever re-run.
