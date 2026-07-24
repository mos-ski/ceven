# ceven.app/me Account Portal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the full `ceven.app/me` parent account portal — a real responsive web section (not the mobile app's phone-frame shell) covering all 9 sections from the App Store compliance strategy doc, including a genuine plan-comparison + mock checkout flow for Membership.

**Architecture:** A new top-level route group `app/me/` with its own sidebar+topbar layout (modeled on `components/admin/sidebar.tsx`'s structure but restyled in the app's `cg-*` brand tokens). No auth — every page reads `mockParentUser`/`PARENT_MEMBERSHIP` directly. A shared `PaymentFlowModal` component (method-select → processing → success) powers Membership, School Fees, and Acceptance Fees, since they all need the same "here's how a mock payment completes" UX.

**Tech Stack:** Next.js 16 App Router, React, Tailwind CSS v4 (`cg-*` design tokens), lucide-react icons.

## Global Constraints

- No real backend, no real payment processing, no real auth — this is a frontend-only prototype (per `CLAUDE.md`/`AGENTS.md`).
- `app/me/**` pages are NOT wrapped in `MobileShell` — this is a genuine responsive desktop web section, distinct from the phone-frame mobile app.
- Reuse existing data as-is: `mockParentUser`, `PARENT_MEMBERSHIP` (`lib/parent/mock-data.ts`), `mockFees`, `mockParentChildren` (same file), `getTransactions()` (`lib/shared/transactions.ts`). New mock data (plans, payment methods, acceptance fees) goes in a new `lib/me/mock-data.ts`.
- Membership's "Upgrade" flips `PARENT_MEMBERSHIP.status` to `"active"` by mutating the imported object directly (`PARENT_MEMBERSHIP.status = "active"`), the same pattern already used for `SPECIAL_REQUEST_TRIAL` in `lib/parent/mock-data.ts` — this is a plain mutable module-level object, not React state, so every other place in the app that reads `PARENT_MEMBERSHIP.status` picks up the change on its next render.
- Verify with `npx tsc --noEmit` after each task (no test framework in this repo) plus a manual dev-server check.
- No 10th "Security" route — folded into the Family Profiles page as its own section.

---

### Task 1: Data layer for the portal

**Files:**
- Create: `lib/me/mock-data.ts`

**Interfaces:**
- Produces: `PlanId`, `Plan`, `PLANS`, `PaymentMethod`, `MOCK_PAYMENT_METHODS`, `AcceptanceFee`, `MOCK_ACCEPTANCE_FEES` — consumed by Tasks 3–6 and 9.

- [ ] **Step 1: Create the file**

```ts
import { mockParentChildren } from "@/lib/parent/mock-data";

export type PlanId = "free" | "premium_family";

export type Plan = {
  id: PlanId;
  name: string;
  price: string;
  period: string;
  features: string[];
  highlight: boolean;
};

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: "₦0",
    period: "forever",
    features: ["5 AI queries per day", "Basic daily summaries", "Standard support"],
    highlight: false,
  },
  {
    id: "premium_family",
    name: "Premium Family",
    price: "₦2,500",
    period: "per month",
    features: [
      "Unlimited AI queries",
      "Advanced health insights",
      "Weekly trend analysis",
      "Additional family members",
      "Priority support",
      "Early feature access",
    ],
    highlight: true,
  },
];

export type PaymentMethodType = "card" | "bank" | "ussd";

export type PaymentMethod = {
  id: string;
  type: PaymentMethodType;
  label: string;
  detail: string;
  isDefault: boolean;
};

export const MOCK_PAYMENT_METHODS: PaymentMethod[] = [
  { id: "pm-1", type: "card", label: "Visa •••• 4242", detail: "Expires 08/28", isDefault: true },
  { id: "pm-2", type: "bank", label: "GTBank •••• 6021", detail: "Account ending 6021", isDefault: false },
];

export type AcceptanceFee = {
  id: string;
  childId: string;
  childName: string;
  amount: number;
  status: "paid" | "pending";
  dueDate: string;
};

export const MOCK_ACCEPTANCE_FEES: AcceptanceFee[] = [
  { id: "af-1", childId: mockParentChildren[0].id, childName: mockParentChildren[0].name, amount: 15000, status: "paid", dueDate: "2025-09-01" },
  { id: "af-2", childId: mockParentChildren[1].id, childName: mockParentChildren[1].name, amount: 15000, status: "pending", dueDate: "2026-08-15" },
];
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add lib/me/mock-data.ts
git commit -m "Add mock data layer for the ceven.app/me account portal"
```

---

### Task 2: Portal shell — sidebar, topbar, layout, Overview page

**Files:**
- Create: `components/me/sidebar.tsx`
- Create: `components/me/topbar.tsx`
- Create: `app/me/layout.tsx`
- Create: `app/me/page.tsx`

**Interfaces:**
- Consumes: `mockParentUser` (`@/lib/parent/mock-data`), `PARENT_MEMBERSHIP` (same), `mockFees` (same), `MOCK_ACCEPTANCE_FEES` (`@/lib/me/mock-data`, Task 1).
- Produces: the `/me` route tree's shell — every later task's page renders inside this layout. `NAV_ITEMS` (exported from `components/me/sidebar.tsx`) is the single source of truth for the 9 section links; later tasks do not redefine it.

- [ ] **Step 1: Create the sidebar**

```tsx
// components/me/sidebar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid, CreditCard, FileText, Receipt, ScrollText, Wallet, Users, Car, Menu, X,
} from "lucide-react";

export const NAV_ITEMS = [
  { label: "Overview", href: "/me", icon: LayoutGrid },
  { label: "Membership", href: "/me/membership", icon: CreditCard },
  { label: "School Fees", href: "/me/fees", icon: FileText },
  { label: "Acceptance Fees", href: "/me/acceptance-fees", icon: FileText },
  { label: "Payment History", href: "/me/payment-history", icon: Receipt },
  { label: "Receipts", href: "/me/receipts", icon: ScrollText },
  { label: "Payment Methods", href: "/me/payment-methods", icon: Wallet },
  { label: "Family", href: "/me/family", icon: Users },
  { label: "Pickups", href: "/me/pickups", icon: Car },
] as const;

export function MeSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-lg bg-cg-brand text-white lg:hidden"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[240px] shrink-0 flex-col gap-6 bg-white pt-6 shadow-sm transition-transform duration-200 lg:static lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5">
          <span className="font-[family-name:var(--font-mogra-import)] text-xl text-cg-brand">CEven</span>
          <button
            onClick={() => setMobileOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-md text-gray-400 hover:text-cg-brand lg:hidden"
            aria-label="Close menu"
          >
            <X size={16} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3">
          {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
            const isActive = href === "/me" ? pathname === "/me" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                  isActive ? "bg-cg-brand text-white" : "text-gray-500 hover:text-cg-brand"
                }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 pb-5">
          <Link
            href="/parent/home"
            className="block rounded-lg border border-gray-100 px-3 py-2.5 text-center text-xs font-semibold text-gray-500 hover:text-cg-brand"
          >
            ← Back to app
          </Link>
        </div>
      </aside>
    </>
  );
}
```

- [ ] **Step 2: Create the topbar**

```tsx
// components/me/topbar.tsx
"use client";

import { mockParentUser } from "@/lib/parent/mock-data";

export function MeTopbar() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-gray-100 bg-white px-6 pl-20 lg:pl-6">
      <p className="text-sm font-semibold text-gray-800">Account Portal</p>
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-xs font-semibold text-gray-800">{mockParentUser.name}</p>
          <p className="text-[10px] text-gray-400">{mockParentUser.role === "parent" ? "Parent Account" : mockParentUser.role}</p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cg-brand text-xs font-bold text-white">
          {mockParentUser.avatarInitials}
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 3: Create the layout**

```tsx
// app/me/layout.tsx
import { MeSidebar } from "@/components/me/sidebar";
import { MeTopbar } from "@/components/me/topbar";

export default function MeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F9F5F0]">
      <MeSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <MeTopbar />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create the Overview page**

```tsx
// app/me/page.tsx
"use client";

import Link from "next/link";
import { CheckCircle2, Clock } from "lucide-react";
import { PARENT_MEMBERSHIP, mockFees } from "@/lib/parent/mock-data";
import { MOCK_ACCEPTANCE_FEES } from "@/lib/me/mock-data";
import { NAV_ITEMS } from "@/components/me/sidebar";

export default function MeOverviewPage() {
  const isActive = PARENT_MEMBERSHIP.status === "active";
  const outstandingFees = mockFees.filter((f) => f.status !== "paid").length;
  const outstandingAcceptance = MOCK_ACCEPTANCE_FEES.filter((f) => f.status === "pending").length;
  const totalOutstanding = outstandingFees + outstandingAcceptance;

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Account Overview</h1>

      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="mb-2 flex items-center gap-2">
            {isActive ? (
              <CheckCircle2 size={18} className="text-emerald-500" />
            ) : (
              <Clock size={18} className="text-amber-500" />
            )}
            <p className="text-sm font-semibold text-gray-800">Membership Status</p>
          </div>
          <p className="text-lg font-bold text-gray-800">{isActive ? "Premium Family — Active" : "Trial ended"}</p>
          <Link href="/me/membership" className="mt-2 inline-block text-xs font-semibold text-cg-brand underline underline-offset-2">
            Manage membership
          </Link>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="mb-2 text-sm font-semibold text-gray-800">Outstanding Payments</p>
          <p className="text-lg font-bold text-gray-800">{totalOutstanding} item{totalOutstanding === 1 ? "" : "s"}</p>
          <Link href="/me/fees" className="mt-2 inline-block text-xs font-semibold text-cg-brand underline underline-offset-2">
            View fees
          </Link>
        </div>
      </div>

      <p className="mb-3 text-sm font-semibold text-gray-600">Quick Links</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {NAV_ITEMS.filter((item) => item.href !== "/me").map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex flex-col items-center gap-2 rounded-2xl bg-white py-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <Icon size={22} className="text-cg-brand" />
            <span className="text-xs font-medium text-gray-700">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 6: Manual verification**

Start the dev server, navigate to `/me`. Confirm: sidebar shows all 9 links with "Overview" active, topbar shows "James Miller" + avatar, membership status card reads "Trial ended", outstanding payments count is non-zero, quick-links grid has 8 tiles (all except Overview), and shrinking the viewport below `lg` collapses the sidebar behind a hamburger button.

- [ ] **Step 7: Commit**

```bash
git add components/me/sidebar.tsx components/me/topbar.tsx app/me/layout.tsx app/me/page.tsx
git commit -m "Add ceven.app/me portal shell (sidebar, topbar, layout, overview)"
```

---

### Task 3: Shared PaymentFlowModal

**Files:**
- Create: `components/me/payment-flow-modal.tsx`

**Interfaces:**
- Consumes: `MOCK_PAYMENT_METHODS` (`@/lib/me/mock-data`, Task 1).
- Produces: `PaymentFlowModal({ title: string; amount: string; description: string; onClose: () => void; onSuccess: () => void })` — a fixed-position modal (method select → processing → success). Tasks 4–6 import this exact component.

- [ ] **Step 1: Create the component**

```tsx
// components/me/payment-flow-modal.tsx
"use client";

import { useState } from "react";
import { CreditCard, Landmark, Smartphone, X, CheckCircle2 } from "lucide-react";
import { MOCK_PAYMENT_METHODS, type PaymentMethodType } from "@/lib/me/mock-data";

const TYPE_ICON: Record<PaymentMethodType, typeof CreditCard> = {
  card: CreditCard,
  bank: Landmark,
  ussd: Smartphone,
};

type Step = "select" | "processing" | "success";

export function PaymentFlowModal({
  title,
  amount,
  description,
  onClose,
  onSuccess,
}: {
  title: string;
  amount: string;
  description: string;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [step, setStep] = useState<Step>("select");
  const [selectedId, setSelectedId] = useState(MOCK_PAYMENT_METHODS.find((m) => m.isDefault)?.id ?? MOCK_PAYMENT_METHODS[0]?.id);

  function handlePay() {
    setStep("processing");
    setTimeout(() => {
      setStep("success");
    }, 1400);
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-[420px] rounded-2xl bg-white p-6 shadow-xl">
        {step === "select" && (
          <>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-bold text-gray-800">{title}</h2>
              <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                <X size={16} className="text-gray-600" />
              </button>
            </div>

            <div className="mb-4 rounded-xl bg-[#F9F5EE] p-4">
              <p className="text-xs text-gray-500">{description}</p>
              <p className="mt-1 text-xl font-bold text-cg-brand">{amount}</p>
            </div>

            <p className="mb-2 text-xs font-semibold text-gray-500">Payment Method</p>
            <div className="mb-4 flex flex-col gap-2">
              {MOCK_PAYMENT_METHODS.map((m) => {
                const Icon = TYPE_ICON[m.type];
                const selected = m.id === selectedId;
                return (
                  <button
                    key={m.id}
                    onClick={() => setSelectedId(m.id)}
                    className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors ${
                      selected ? "border-cg-brand bg-cg-brand/5" : "border-gray-100"
                    }`}
                  >
                    <Icon size={18} className="text-cg-brand" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-800">{m.label}</p>
                      <p className="text-[11px] text-gray-400">{m.detail}</p>
                    </div>
                    <div className={`h-4 w-4 rounded-full border-2 ${selected ? "border-cg-brand bg-cg-brand" : "border-gray-300"}`} />
                  </button>
                );
              })}
            </div>

            <button
              onClick={handlePay}
              disabled={!selectedId}
              className="w-full rounded-xl bg-cg-brand py-3 text-sm font-semibold text-white disabled:opacity-40"
            >
              Pay {amount}
            </button>
          </>
        )}

        {step === "processing" && (
          <div className="flex flex-col items-center py-10">
            <svg className="mb-4 h-8 w-8 animate-spin text-cg-brand" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="15 45" />
            </svg>
            <p className="text-sm font-semibold text-gray-700">Processing payment...</p>
          </div>
        )}

        {step === "success" && (
          <div className="flex flex-col items-center py-6 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
              <CheckCircle2 size={36} className="text-green-500" />
            </div>
            <h2 className="mb-1 text-lg font-bold text-gray-800">Payment Successful</h2>
            <p className="mb-6 text-sm text-gray-500">{description} — {amount}</p>
            <button
              onClick={() => { onSuccess(); onClose(); }}
              className="w-full rounded-xl bg-cg-brand py-3 text-sm font-semibold text-white"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors (component isn't imported anywhere yet, so this just validates the file).

- [ ] **Step 3: Commit**

```bash
git add components/me/payment-flow-modal.tsx
git commit -m "Add shared PaymentFlowModal for the account portal"
```

---

### Task 4: Membership page

**Files:**
- Create: `app/me/membership/page.tsx`

**Interfaces:**
- Consumes: `PLANS` (`@/lib/me/mock-data`, Task 1), `PaymentFlowModal` (`@/components/me/payment-flow-modal`, Task 3), `PARENT_MEMBERSHIP` (`@/lib/parent/mock-data`).
- Produces: route `/me/membership` — the page the mobile app's `MembershipGateSheet`/`TrialGateBanner` "Manage" links point to.

- [ ] **Step 1: Create the page**

```tsx
// app/me/membership/page.tsx
"use client";

import { useState } from "react";
import { Crown, CheckCircle2, X } from "lucide-react";
import { PARENT_MEMBERSHIP } from "@/lib/parent/mock-data";
import { PLANS, type PlanId } from "@/lib/me/mock-data";
import { PaymentFlowModal } from "@/components/me/payment-flow-modal";

function CancelConfirmModal({ onClose, onConfirm }: { onClose: () => void; onConfirm: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-[380px] rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-800">Cancel Membership</h2>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
            <X size={16} className="text-gray-600" />
          </button>
        </div>
        <p className="mb-5 text-sm text-gray-600">
          You&apos;ll lose access to Premium Family features at the end of your current billing period. This can&apos;t be undone.
        </p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-600">
            Keep Membership
          </button>
          <button onClick={onConfirm} className="flex-1 rounded-xl bg-red-500 py-3 text-sm font-semibold text-white">
            Cancel It
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MembershipPage() {
  const [, setTick] = useState(0);
  const [payingPlan, setPayingPlan] = useState<PlanId | null>(null);
  const [showCancel, setShowCancel] = useState(false);

  const isActive = PARENT_MEMBERSHIP.status === "active";
  const currentPlan = PLANS.find((p) => p.id === (isActive ? "premium_family" : "free"))!;

  function handleUpgrade(planId: PlanId) {
    if (planId === "free" || isActive) return;
    setPayingPlan(planId);
  }

  function handlePaymentSuccess() {
    PARENT_MEMBERSHIP.status = "active";
    setTick((n) => n + 1);
  }

  function handleCancelConfirm() {
    PARENT_MEMBERSHIP.status = "trial_ended";
    setShowCancel(false);
    setTick((n) => n + 1);
  }

  const paidPlan = PLANS.find((p) => p.id === payingPlan);

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-1 text-2xl font-bold text-gray-800">Membership</h1>
      <p className="mb-6 text-sm text-gray-500">Manage your CEven plan and billing.</p>

      <div className="mb-8 rounded-2xl bg-gradient-to-br from-cg-brand to-[#8B5E3C] p-5 text-white shadow-md">
        <p className="text-xs text-white/70">Current Plan</p>
        <p className="text-lg font-bold">{currentPlan.name}</p>
        <p className="mt-1 text-xs text-white/70">
          {isActive ? `${currentPlan.price} ${currentPlan.period}` : "Trial ended — some family features are unavailable"}
        </p>
        {isActive && (
          <button
            onClick={() => setShowCancel(true)}
            className="mt-3 rounded-lg bg-white/15 px-3 py-1.5 text-xs font-semibold text-white"
          >
            Cancel Membership
          </button>
        )}
      </div>

      <p className="mb-3 text-sm font-semibold text-gray-600">Plans</p>
      <div className="grid gap-4 sm:grid-cols-2">
        {PLANS.map((plan) => {
          const isCurrent = plan.id === currentPlan.id;
          return (
            <div
              key={plan.id}
              className={`rounded-2xl p-5 ${plan.highlight ? "bg-[#3B2513] text-white shadow-lg" : "border border-gray-100 bg-white"}`}
            >
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {plan.highlight && <Crown size={16} className="text-amber-400" />}
                  <span className={`text-base font-bold ${plan.highlight ? "text-white" : "text-gray-800"}`}>{plan.name}</span>
                </div>
                {isCurrent && (
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${plan.highlight ? "bg-white/20 text-white" : "bg-emerald-100 text-emerald-700"}`}>
                    Current
                  </span>
                )}
              </div>

              <div className="mb-3 flex items-baseline gap-1">
                <span className={`text-2xl font-bold ${plan.highlight ? "text-amber-400" : "text-cg-brand"}`}>{plan.price}</span>
                <span className={`text-xs ${plan.highlight ? "text-white/60" : "text-gray-400"}`}>{plan.period}</span>
              </div>

              <ul className="mb-4 space-y-1.5">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-2">
                    <CheckCircle2 size={13} className={plan.highlight ? "text-amber-400 shrink-0" : "text-green-500 shrink-0"} />
                    <span className={`text-xs ${plan.highlight ? "text-white/80" : "text-gray-600"}`}>{feat}</span>
                  </li>
                ))}
              </ul>

              {!isCurrent && plan.id !== "free" && (
                <button
                  onClick={() => handleUpgrade(plan.id)}
                  className="w-full rounded-xl bg-amber-400 py-2.5 text-sm font-semibold text-[#3B2513]"
                >
                  Upgrade
                </button>
              )}
            </div>
          );
        })}
      </div>

      {paidPlan && (
        <PaymentFlowModal
          title="Upgrade Membership"
          amount={`${paidPlan.price}/mo`}
          description={`${paidPlan.name} membership`}
          onClose={() => setPayingPlan(null)}
          onSuccess={handlePaymentSuccess}
        />
      )}

      {showCancel && (
        <CancelConfirmModal onClose={() => setShowCancel(false)} onConfirm={handleCancelConfirm} />
      )}
    </div>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Manual verification**

Navigate to `/me/membership`. Confirm: current plan card shows "Free" / "Trial ended" initially, two plan cards render (Free, Premium Family with amber highlight), clicking "Upgrade" opens `PaymentFlowModal`, selecting a method and paying shows the processing spinner then success, clicking "Done" closes the modal and the current-plan card now shows "Premium Family" / active with a "Cancel Membership" button. Clicking that opens the confirm dialog; confirming reverts to the free/trial-ended state.

- [ ] **Step 4: Commit**

```bash
git add app/me/membership/page.tsx
git commit -m "Add Membership page with plan comparison and mock checkout"
```

---

### Task 5: School Fees page

**Files:**
- Create: `app/me/fees/page.tsx`

**Interfaces:**
- Consumes: `mockFees` (`@/lib/parent/mock-data`), `PaymentFlowModal` (Task 3).
- Produces: route `/me/fees`.

- [ ] **Step 1: Create the page**

```tsx
// app/me/fees/page.tsx
"use client";

import { useState } from "react";
import { FileText } from "lucide-react";
import { mockFees, type FeeInvoice } from "@/lib/parent/mock-data";
import { PaymentFlowModal } from "@/components/me/payment-flow-modal";

const STATUS_STYLES: Record<FeeInvoice["status"], string> = {
  paid: "bg-green-100 text-green-700",
  pending: "bg-amber-100 text-amber-700",
  overdue: "bg-red-100 text-red-700",
};

export default function SchoolFeesPage() {
  const [payingFee, setPayingFee] = useState<FeeInvoice | null>(null);
  const [paidIds, setPaidIds] = useState<string[]>([]);

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-1 text-2xl font-bold text-gray-800">School Fees</h1>
      <p className="mb-6 text-sm text-gray-500">Tuition and term invoices for your children.</p>

      <div className="flex flex-col gap-3">
        {mockFees.map((fee) => {
          const isPaid = fee.status === "paid" || paidIds.includes(fee.id);
          return (
            <div key={fee.id} className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cg-quick-action">
                  <FileText size={18} className="text-cg-accent" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{fee.term}</p>
                  <p className="text-xs text-gray-400">Due {fee.dueDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-gray-800">{fee.amount}</span>
                <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold capitalize ${STATUS_STYLES[isPaid ? "paid" : fee.status]}`}>
                  {isPaid ? "paid" : fee.status}
                </span>
                {!isPaid && (
                  <button
                    onClick={() => setPayingFee(fee)}
                    className="rounded-lg bg-cg-brand px-3 py-1.5 text-xs font-semibold text-white"
                  >
                    Pay Now
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {payingFee && (
        <PaymentFlowModal
          title="Pay School Fee"
          amount={payingFee.amount}
          description={payingFee.term}
          onClose={() => setPayingFee(null)}
          onSuccess={() => setPaidIds((prev) => [...prev, payingFee.id])}
        />
      )}
    </div>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors. Note: `FeeInvoice.amount` is typed as `string` (e.g. `"₦45,000"`) in `lib/parent/mock-data.ts` — `PaymentFlowModal`'s `amount` prop is also a `string`, so this passes through directly with no formatting needed.

- [ ] **Step 3: Manual verification**

Navigate to `/me/fees`. Confirm: invoices render with correct status colors, "Pay Now" only shows on non-paid invoices, paying one flips its badge to "paid" and removes the button.

- [ ] **Step 4: Commit**

```bash
git add app/me/fees/page.tsx
git commit -m "Add School Fees page to the account portal"
```

---

### Task 6: Acceptance Fees page

**Files:**
- Create: `app/me/acceptance-fees/page.tsx`

**Interfaces:**
- Consumes: `MOCK_ACCEPTANCE_FEES` (`@/lib/me/mock-data`, Task 1), `PaymentFlowModal` (Task 3).
- Produces: route `/me/acceptance-fees`.

- [ ] **Step 1: Create the page**

```tsx
// app/me/acceptance-fees/page.tsx
"use client";

import { useState } from "react";
import { UserRound } from "lucide-react";
import { MOCK_ACCEPTANCE_FEES, type AcceptanceFee } from "@/lib/me/mock-data";
import { PaymentFlowModal } from "@/components/me/payment-flow-modal";

export default function AcceptanceFeesPage() {
  const [payingFee, setPayingFee] = useState<AcceptanceFee | null>(null);
  const [paidIds, setPaidIds] = useState<string[]>([]);

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-1 text-2xl font-bold text-gray-800">Acceptance Fees</h1>
      <p className="mb-6 text-sm text-gray-500">One-time enrollment fees per child.</p>

      <div className="flex flex-col gap-3">
        {MOCK_ACCEPTANCE_FEES.map((fee) => {
          const isPaid = fee.status === "paid" || paidIds.includes(fee.id);
          return (
            <div key={fee.id} className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cg-quick-action">
                  <UserRound size={18} className="text-cg-accent" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{fee.childName}</p>
                  <p className="text-xs text-gray-400">Due {fee.dueDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-gray-800">₦{fee.amount.toLocaleString()}</span>
                <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold capitalize ${
                  isPaid ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                }`}>
                  {isPaid ? "paid" : "pending"}
                </span>
                {!isPaid && (
                  <button
                    onClick={() => setPayingFee(fee)}
                    className="rounded-lg bg-cg-brand px-3 py-1.5 text-xs font-semibold text-white"
                  >
                    Pay Now
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {payingFee && (
        <PaymentFlowModal
          title="Pay Acceptance Fee"
          amount={`₦${payingFee.amount.toLocaleString()}`}
          description={`${payingFee.childName} — Acceptance Fee`}
          onClose={() => setPayingFee(null)}
          onSuccess={() => setPaidIds((prev) => [...prev, payingFee.id])}
        />
      )}
    </div>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Manual verification**

Navigate to `/me/acceptance-fees`. Confirm: one paid, one pending fee render correctly; paying the pending one flips it to paid.

- [ ] **Step 4: Commit**

```bash
git add app/me/acceptance-fees/page.tsx
git commit -m "Add Acceptance Fees page to the account portal"
```

---

### Task 7: Payment History page

**Files:**
- Create: `app/me/payment-history/page.tsx`

**Interfaces:**
- Consumes: `getTransactions()` (`@/lib/shared/transactions`).
- Produces: route `/me/payment-history`.

- [ ] **Step 1: Create the page**

```tsx
// app/me/payment-history/page.tsx
"use client";

import { useMemo, useState } from "react";
import { Receipt as ReceiptIcon } from "lucide-react";
import { getTransactions } from "@/lib/shared/transactions";

export default function PaymentHistoryPage() {
  const transactions = getTransactions();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return transactions;
    const q = query.trim().toLowerCase();
    return transactions.filter((t) => t.title.toLowerCase().includes(q));
  }, [transactions, query]);

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-1 text-2xl font-bold text-gray-800">Payment History</h1>
      <p className="mb-4 text-sm text-gray-500">({transactions.length}) Transactions</p>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by child or term..."
        className="mb-4 w-full rounded-xl border border-gray-100 bg-white px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 shadow-sm focus:border-cg-brand focus:outline-none"
      />

      {filtered.length > 0 ? (
        <div className="flex flex-col gap-3">
          {filtered.map((txn) => (
            <div key={txn.id} className="rounded-2xl bg-white p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cg-quick-action">
                  <ReceiptIcon size={16} className="text-cg-brand" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-800">{txn.title}</p>
                  <p className="mt-0.5 truncate text-xs text-gray-400">{txn.reference}</p>
                </div>
                <div className="text-right">
                  <p className="text-base font-bold text-gray-800">₦{txn.amount.toLocaleString()}</p>
                  <p className="text-xs text-gray-400">{txn.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="py-16 text-center text-sm text-gray-400">No transactions match your search.</p>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Manual verification**

Navigate to `/me/payment-history`. Confirm: 3 transactions render, searching by a child name (e.g. "Joy") filters to matching rows, clearing the search shows all again.

- [ ] **Step 4: Commit**

```bash
git add app/me/payment-history/page.tsx
git commit -m "Add Payment History page to the account portal"
```

---

### Task 8: Receipts page

**Files:**
- Create: `app/me/receipts/page.tsx`

**Interfaces:**
- Consumes: `getTransactions()` (`@/lib/shared/transactions`).
- Produces: route `/me/receipts`.

- [ ] **Step 1: Create the page**

```tsx
// app/me/receipts/page.tsx
"use client";

import { Download, FileStack } from "lucide-react";
import { getTransactions } from "@/lib/shared/transactions";

export default function ReceiptsPage() {
  const receipts = getTransactions();

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-1 text-2xl font-bold text-gray-800">Receipts</h1>
      <p className="mb-6 text-sm text-gray-500">Download a receipt for any completed payment.</p>

      {receipts.length > 0 ? (
        <div className="flex flex-col gap-3">
          {receipts.map((txn) => (
            <div key={txn.id} className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cg-quick-action">
                  <FileStack size={18} className="text-cg-brand" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{txn.title}</p>
                  <p className="text-xs text-gray-400">{txn.date} · ₦{txn.amount.toLocaleString()}</p>
                </div>
              </div>
              <button className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:border-cg-brand hover:text-cg-brand">
                <Download size={14} />
                Download
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="py-16 text-center text-sm text-gray-400">No receipts yet.</p>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Manual verification**

Navigate to `/me/receipts`. Confirm: 3 receipts render with a "Download" button each (visual stub — no need to verify a file downloads).

- [ ] **Step 4: Commit**

```bash
git add app/me/receipts/page.tsx
git commit -m "Add Receipts page to the account portal"
```

---

### Task 9: Payment Methods page

**Files:**
- Create: `app/me/payment-methods/page.tsx`

**Interfaces:**
- Consumes: `MOCK_PAYMENT_METHODS`, `PaymentMethod`, `PaymentMethodType` (`@/lib/me/mock-data`, Task 1).
- Produces: route `/me/payment-methods`.

- [ ] **Step 1: Create the page**

```tsx
// app/me/payment-methods/page.tsx
"use client";

import { useState } from "react";
import { CreditCard, Landmark, Smartphone, Plus, X, Star } from "lucide-react";
import { MOCK_PAYMENT_METHODS, type PaymentMethod, type PaymentMethodType } from "@/lib/me/mock-data";

const TYPE_ICON: Record<PaymentMethodType, typeof CreditCard> = {
  card: CreditCard,
  bank: Landmark,
  ussd: Smartphone,
};

function AddMethodModal({ onClose, onAdd }: { onClose: () => void; onAdd: (m: PaymentMethod) => void }) {
  const [type, setType] = useState<PaymentMethodType>("card");
  const [label, setLabel] = useState("");
  const [detail, setDetail] = useState("");

  const isValid = label.trim() && detail.trim();

  function handleAdd() {
    if (!isValid) return;
    onAdd({ id: `pm-${Date.now()}`, type, label: label.trim(), detail: detail.trim(), isDefault: false });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-[420px] rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-800">Add Payment Method</h2>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
            <X size={16} className="text-gray-600" />
          </button>
        </div>

        <div className="mb-3 flex gap-2">
          {(["card", "bank", "ussd"] as PaymentMethodType[]).map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`flex-1 rounded-xl border-2 py-2 text-xs font-medium capitalize transition-colors ${
                type === t ? "border-cg-brand bg-cg-brand/5 text-cg-brand" : "border-gray-100 text-gray-500"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mb-3">
          <label className="mb-1 block text-xs font-semibold text-gray-500">Label</label>
          <input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="e.g. Mastercard •••• 1234"
            className="w-full rounded-xl border border-gray-100 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-cg-brand focus:outline-none"
          />
        </div>

        <div className="mb-5">
          <label className="mb-1 block text-xs font-semibold text-gray-500">Detail</label>
          <input
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            placeholder="e.g. Expires 11/29"
            className="w-full rounded-xl border border-gray-100 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-cg-brand focus:outline-none"
          />
        </div>

        <button
          onClick={handleAdd}
          disabled={!isValid}
          className="w-full rounded-xl bg-cg-brand py-3 text-sm font-semibold text-white disabled:opacity-40"
        >
          Add Method
        </button>
      </div>
    </div>
  );
}

export default function PaymentMethodsPage() {
  const [methods, setMethods] = useState<PaymentMethod[]>(MOCK_PAYMENT_METHODS);
  const [showAdd, setShowAdd] = useState(false);

  function setDefault(id: string) {
    setMethods((prev) => prev.map((m) => ({ ...m, isDefault: m.id === id })));
  }

  function remove(id: string) {
    setMethods((prev) => prev.filter((m) => m.id !== id));
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-1 text-2xl font-bold text-gray-800">Payment Methods</h1>
      <p className="mb-6 text-sm text-gray-500">Manage the cards and accounts used for payments.</p>

      <div className="mb-4 flex flex-col gap-3">
        {methods.map((m) => {
          const Icon = TYPE_ICON[m.type];
          return (
            <div key={m.id} className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cg-quick-action">
                  <Icon size={18} className="text-cg-brand" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-semibold text-gray-800">{m.label}</p>
                    {m.isDefault && (
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold text-emerald-700">Default</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400">{m.detail}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!m.isDefault && (
                  <button
                    onClick={() => setDefault(m.id)}
                    className="flex items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs font-medium text-gray-500 hover:border-cg-brand hover:text-cg-brand"
                  >
                    <Star size={12} />
                    Set default
                  </button>
                )}
                <button
                  onClick={() => remove(m.id)}
                  className="rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs font-medium text-red-500 hover:border-red-300"
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}

        {methods.length === 0 && (
          <p className="py-8 text-center text-sm text-gray-400">No payment methods yet.</p>
        )}
      </div>

      <button
        onClick={() => setShowAdd(true)}
        className="flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-300 py-4 text-sm font-semibold text-cg-brand w-full"
      >
        <Plus size={16} />
        Add Payment Method
      </button>

      {showAdd && (
        <AddMethodModal onClose={() => setShowAdd(false)} onAdd={(m) => setMethods((prev) => [...prev, m])} />
      )}
    </div>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Manual verification**

Navigate to `/me/payment-methods`. Confirm: 2 seeded methods render, one marked "Default"; "Set default" on the other flips which one shows the badge; "Add Payment Method" opens the modal, filling both fields and submitting appends a new card to the list; "Remove" deletes a method.

- [ ] **Step 4: Commit**

```bash
git add app/me/payment-methods/page.tsx
git commit -m "Add Payment Methods page to the account portal"
```

---

### Task 10: Family Profiles + Security page

**Files:**
- Create: `app/me/family/page.tsx`

**Interfaces:**
- Consumes: none beyond local mock data (mirrors the family-member shape already used in `app/(parent)/parent/settings/profile/page.tsx`, redefined locally here since that file is mobile-width and not exported for reuse).
- Produces: route `/me/family`.

- [ ] **Step 1: Create the page**

```tsx
// app/me/family/page.tsx
"use client";

import { useState } from "react";
import { Shield, Plus, X, Check, Mail, Phone, Lock } from "lucide-react";

type FamilyMember = {
  id: string;
  name: string;
  initials: string;
  role: string;
  email: string;
  phone: string;
  isOwner: boolean;
  color: string;
};

const FAMILY: FamilyMember[] = [
  { id: "p1", name: "James Miller", initials: "JM", role: "Father", email: "james@email.com", phone: "+234 801 234 5678", isOwner: true, color: "#7A4C29" },
  { id: "p2", name: "Sarah Miller", initials: "SM", role: "Mother", email: "sarah@email.com", phone: "+234 802 345 6789", isOwner: false, color: "#D4A67F" },
  { id: "p3", name: "Grace", initials: "GR", role: "Nanny", email: "grace@email.com", phone: "+234 803 456 7890", isOwner: false, color: "#059669" },
];

function InviteModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-[420px] rounded-2xl bg-white p-6 shadow-xl">
        {sent ? (
          <div className="flex flex-col items-center py-6 text-center">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
              <Check size={24} className="text-emerald-500" />
            </div>
            <p className="text-sm font-bold text-gray-800">Invitation Sent!</p>
            <button onClick={onClose} className="mt-6 w-full rounded-xl bg-cg-brand py-3 text-sm font-semibold text-white">Done</button>
          </div>
        ) : (
          <>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-bold text-gray-800">Invite Family Member</h2>
              <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                <X size={16} className="text-gray-600" />
              </button>
            </div>
            <div className="mb-3">
              <label className="mb-1 block text-xs font-semibold text-gray-500">Email or Phone</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email or phone number" className="w-full rounded-xl border border-gray-100 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-cg-brand focus:outline-none" />
            </div>
            <div className="mb-5">
              <label className="mb-1 block text-xs font-semibold text-gray-500">Role</label>
              <div className="grid grid-cols-3 gap-2">
                {["Mother", "Nanny", "Sibling"].map((r) => (
                  <button key={r} onClick={() => setRole(r)} className={`rounded-xl border-2 py-2 text-xs font-medium transition-colors ${role === r ? "border-cg-brand bg-cg-brand/5 text-cg-brand" : "border-gray-100 text-gray-500"}`}>{r}</button>
                ))}
              </div>
            </div>
            <button
              onClick={() => email.trim() && role && setSent(true)}
              disabled={!email.trim() || !role}
              className="w-full rounded-xl bg-cg-brand py-3 text-sm font-semibold text-white disabled:opacity-40"
            >
              Send Invitation
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function SecuritySection() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [saved, setSaved] = useState(false);

  const isValid = current.trim() && next.trim().length >= 8 && next === confirm;

  function handleSave() {
    if (!isValid) return;
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    setCurrent(""); setNext(""); setConfirm("");
  }

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <Lock size={16} className="text-cg-brand" />
        <p className="text-sm font-semibold text-gray-800">Security — Change Password</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <input type="password" value={current} onChange={(e) => setCurrent(e.target.value)} placeholder="Current password" className="rounded-xl border border-gray-100 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-cg-brand focus:outline-none" />
        <input type="password" value={next} onChange={(e) => setNext(e.target.value)} placeholder="New password (8+ chars)" className="rounded-xl border border-gray-100 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-cg-brand focus:outline-none" />
        <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Confirm new password" className="rounded-xl border border-gray-100 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-cg-brand focus:outline-none" />
      </div>
      <button
        onClick={handleSave}
        disabled={!isValid}
        className="mt-3 rounded-xl bg-cg-brand px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-40"
      >
        {saved ? "Password Updated!" : "Update Password"}
      </button>
    </div>
  );
}

export default function FamilyPage() {
  const [showInvite, setShowInvite] = useState(false);

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-1 text-2xl font-bold text-gray-800">Family</h1>
      <p className="mb-6 text-sm text-gray-500">Manage who has access to your child&apos;s care, and your account security.</p>

      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {FAMILY.map((member) => (
          <div key={member.id} className="flex flex-col items-center gap-2 rounded-2xl bg-white p-4 shadow-sm">
            <div className="relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl text-lg font-bold text-white" style={{ backgroundColor: member.color }}>
                {member.initials}
              </div>
              {member.isOwner && (
                <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-cg-brand ring-2 ring-white">
                  <Shield size={10} className="text-white" />
                </div>
              )}
            </div>
            <p className="text-sm font-semibold text-gray-800">{member.name}</p>
            <p className="text-xs text-gray-400">{member.role}</p>
            <div className="mt-1 flex flex-col items-center gap-0.5 text-[11px] text-gray-400">
              <span className="flex items-center gap-1"><Mail size={10} />{member.email}</span>
              <span className="flex items-center gap-1"><Phone size={10} />{member.phone}</span>
            </div>
          </div>
        ))}

        <button
          onClick={() => setShowInvite(true)}
          className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-4"
        >
          <Plus size={22} className="text-gray-400" />
          <p className="text-xs font-semibold text-gray-500">Invite Family</p>
        </button>
      </div>

      <SecuritySection />

      {showInvite && <InviteModal onClose={() => setShowInvite(false)} />}
    </div>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Manual verification**

Navigate to `/me/family`. Confirm: 3 family member cards render plus an "Invite Family" tile; inviting opens the modal, filling email + role and submitting shows "Invitation Sent!"; the Security section below accepts a current + matching new password (8+ chars) and shows "Password Updated!" briefly.

- [ ] **Step 4: Commit**

```bash
git add app/me/family/page.tsx
git commit -m "Add Family Profiles + Security page to the account portal"
```

---

### Task 11: Authorized Pickups page

**Files:**
- Create: `app/me/pickups/page.tsx`

**Interfaces:**
- Consumes: none beyond local mock data (mirrors `app/(parent)/parent/settings/pickups/page.tsx`'s `PickupPerson` shape, redefined locally since that file is mobile-width and not exported for reuse).
- Produces: route `/me/pickups`.

- [ ] **Step 1: Create the page**

```tsx
// app/me/pickups/page.tsx
"use client";

import { useState } from "react";
import { Phone, ShieldCheck, Plus, X, Check } from "lucide-react";

type PickupPerson = {
  id: string;
  name: string;
  initials: string;
  role: string;
  phone: string;
  color: string;
  verified: boolean;
};

const INITIAL_PICKUPS: PickupPerson[] = [
  { id: "d1", name: "Mr Chidi", initials: "CH", role: "Driver", phone: "+234 805 678 9012", color: "#6366F1", verified: true },
  { id: "n1", name: "Aunty Grace", initials: "AG", role: "Nanny", phone: "+234 803 456 7890", color: "#059669", verified: true },
  { id: "g1", name: "Grandma Rose", initials: "GR", role: "Grandparent", phone: "+234 806 789 0123", color: "#D4A67F", verified: false },
];

function AddPickupModal({ onClose, onAdd }: { onClose: () => void; onAdd: (p: PickupPerson) => void }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");

  const isValid = name.trim() && role && phone.trim();

  function handleAdd() {
    if (!isValid) return;
    onAdd({
      id: `p-${Date.now()}`,
      name: name.trim(),
      initials: name.trim().split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase(),
      role,
      phone: phone.trim(),
      color: "#6366F1",
      verified: false,
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-[420px] rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-800">Add Pickup Person</h2>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
            <X size={16} className="text-gray-600" />
          </button>
        </div>

        <div className="mb-3">
          <label className="mb-1 block text-xs font-semibold text-gray-500">Full Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Mrs Adekunle" className="w-full rounded-xl border border-gray-100 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-cg-brand focus:outline-none" />
        </div>

        <div className="mb-3">
          <label className="mb-1 block text-xs font-semibold text-gray-500">Role</label>
          <div className="flex flex-wrap gap-2">
            {["Driver", "Nanny", "Grandparent", "Uncle/Aunt", "Family Friend"].map((r) => (
              <button key={r} onClick={() => setRole(r)} className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${role === r ? "border-cg-brand bg-cg-brand/5 text-cg-brand" : "border-gray-200 text-gray-500"}`}>{r}</button>
            ))}
          </div>
        </div>

        <div className="mb-5">
          <label className="mb-1 block text-xs font-semibold text-gray-500">Phone Number</label>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+234 ..." className="w-full rounded-xl border border-gray-100 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-cg-brand focus:outline-none" />
        </div>

        <button onClick={handleAdd} disabled={!isValid} className="w-full rounded-xl bg-cg-brand py-3 text-sm font-semibold text-white disabled:opacity-40">
          Add Person
        </button>
      </div>
    </div>
  );
}

export default function PickupsPage() {
  const [pickups, setPickups] = useState<PickupPerson[]>(INITIAL_PICKUPS);
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-1 text-2xl font-bold text-gray-800">Authorized Pickups</h1>
      <p className="mb-6 text-sm text-gray-500">People authorized to pick up or drop off your child.</p>

      <div className="mb-4 flex flex-col gap-3">
        {pickups.map((person) => (
          <div key={person.id} className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white" style={{ backgroundColor: person.color }}>
                {person.initials}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-semibold text-gray-800">{person.name}</p>
                  {person.verified && (
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-100">
                      <Check size={10} className="text-emerald-600" />
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400">{person.role} · {person.phone}</p>
              </div>
            </div>
            <a href={`tel:${person.phone}`} className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50">
              <Phone size={15} className="text-blue-500" />
            </a>
          </div>
        ))}
      </div>

      <button
        onClick={() => setShowAdd(true)}
        className="mb-6 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 py-4 text-sm font-medium text-gray-500 hover:bg-gray-100"
      >
        <Plus size={18} />
        Add Pickup Person
      </button>

      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <div className="mb-2 flex items-center gap-2">
          <ShieldCheck size={16} className="text-cg-brand" />
          <p className="text-sm font-semibold text-gray-800">How verification works</p>
        </div>
        <p className="text-xs text-gray-500">
          Each authorized person is verified by the creche at drop-off/pickup. Only verified checkmark holders have been confirmed.
        </p>
      </div>

      {showAdd && (
        <AddPickupModal onClose={() => setShowAdd(false)} onAdd={(p) => setPickups((prev) => [...prev, p])} />
      )}
    </div>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Manual verification**

Navigate to `/me/pickups`. Confirm: 3 pickup people render (2 verified), "Add Pickup Person" opens the modal, filling name/role/phone and submitting appends a new unverified entry.

- [ ] **Step 4: Commit**

```bash
git add app/me/pickups/page.tsx
git commit -m "Add Authorized Pickups page to the account portal"
```

---

### Task 12: Full-portal integration check

**Files:**
- No new files — this task is verification only.

**Interfaces:**
- Consumes: every route and component from Tasks 1–11.

- [ ] **Step 1: Full build**

Run: `npm run build`
Expected: exit code 0, and the build output lists all 9 `/me/*` routes plus `/me` itself as compiled routes.

- [ ] **Step 2: Cross-portal walkthrough**

With the dev server running, click through the sidebar to all 9 sections in order, confirming each renders without console errors and the active-link highlight tracks the current page.

- [ ] **Step 3: Membership ↔ mobile app cross-check**

With `PARENT_MEMBERSHIP.status` at its default (`"trial_ended"`), open `/parent/cevenai` in the mobile app route (`app/(parent)/parent/cevenai/page.tsx`) in one tab and confirm the trial-message-limit gate is reachable as before. In `/me/membership`, complete the mock upgrade flow. Without a full page reload, navigate back to `/parent/cevenai` (client-side nav) and confirm the app now treats the membership as active (no gate banner appears even past the message limit) — this proves `PARENT_MEMBERSHIP` is genuinely shared module state across the mobile app and the portal, not two disconnected copies.

- [ ] **Step 4: Responsive check**

Resize the viewport below the `lg` breakpoint on `/me`. Confirm the sidebar collapses behind the hamburger button and the layout doesn't horizontally overflow.

- [ ] **Step 5: Commit** (only if Step 3 or 4 surfaced a fix)

If everything passed with no changes needed, no commit is required for this task — the plan is complete. If a cross-check step failed, fix the specific issue, re-run the affected step, then:

```bash
git add -A
git commit -m "Fix cross-portal integration issue found during final verification"
```

---

## Self-Review Notes

- **Spec coverage:** all 9 sections from the design (Overview, Membership, School Fees, Acceptance Fees, Payment History, Receipts, Payment Methods, Family, Pickups) map to Tasks 2 and 4–11; Security is folded into Task 10 per the spec's explicit call-out; the shared payment flow (Task 3) is used by Tasks 4–6 exactly as specced; no-auth direct landing is satisfied by Task 2's layout having no auth check.
- **Placeholder scan:** none — every task ships complete file contents.
- **Type consistency:** `PaymentFlowModal`'s props (`title`, `amount`, `description`, `onClose`, `onSuccess`) are identical across its Task 3 definition and all three call sites (Tasks 4–6). `NAV_ITEMS` is defined once in Task 2 and only ever imported (Task 2's own Overview page, Task 12's walkthrough) — no later task redefines it.
- **Mutation pattern:** `PARENT_MEMBERSHIP.status` is mutated directly (matching the existing `SPECIAL_REQUEST_TRIAL` convention already in the codebase), confirmed testable end-to-end in Task 12 Step 3.
