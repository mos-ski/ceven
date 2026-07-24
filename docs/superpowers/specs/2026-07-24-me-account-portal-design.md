# ceven.app/me — Parent Account Portal

## Context

The parent mobile app's compliance strategy (`docs/strategy/parent-membership-account-rework-2026-07-24.md`) moves all subscription, billing, and pricing UI out of the iOS app and into an external web portal at `ceven.app/me`. The mobile app's "Manage Account" already links there (`app/(parent)/parent/settings/account/page.tsx`), but the portal itself doesn't exist yet. This spec builds it.

This is the one surface in the whole product where pricing, "Upgrade," and checkout UI are meant to exist — the doc explicitly bans that language and those flows from the mobile app specifically so they can live here instead, outside Apple's App Store review scope.

## Goals

- A real, responsive web portal at `app/me/` (not wrapped in the mobile app's phone-frame shell) covering all 9 sections from the strategy doc's "Web Portal" navigation list.
- Membership gets a genuine plan-comparison + mock checkout flow — the actual reason this portal exists.
- No login screen: landing on any `/me/*` route reads the existing mock parent/membership data directly, already "signed in," matching the doc's "seamless token handoff" intent without building an auth flow that has nothing real to protect.
- Reuse existing mock data modules wherever they already model the right thing (fees, children, transactions) rather than duplicating them.

## Out of scope

- Real payment processing, real authentication/SSO/token handoff.
- PDF generation for receipts (a "Download" button exists but doesn't produce a real file).
- Any change to the mobile app's own screens — only the portal is new.
- A 10th "Security" route — folded into the Family page as a section instead (see below).

## Architecture

New route group `app/me/` at the top level (sibling to `(parent)`, `(landing)`, `(caregiver)`), with its own `layout.tsx`:

- **Sidebar** (`components/me/sidebar.tsx`): persistent left nav, 9 links (Overview, Membership, School Fees, Acceptance Fees, Payment History, Receipts, Payment Methods, Family, Pickups), modeled on `components/admin/sidebar.tsx`'s structure (icon + label rows, active-state highlight) but restyled in CEven's warm brand palette (`cg-brand` etc.) rather than the admin dashboard's palette.
- **Topbar** (`components/me/topbar.tsx`): parent avatar + name (from `mockParentUser`), a "Back to app" link (`/parent/home`).
- Content area renders each route's page to the right of the sidebar. Responsive: sidebar collapses to a top drawer under a breakpoint (same collapsing pattern as the admin dashboard already uses).

No auth check anywhere in this route group — every page just imports and reads `mockParentUser` / `PARENT_MEMBERSHIP` directly.

## Data layer

New file `lib/me/mock-data.ts` for data that doesn't exist yet:

```ts
export type PlanId = "free" | "premium_family";
export type Plan = {
  id: PlanId;
  name: string;
  price: string;          // e.g. "₦2,500"
  period: string;         // e.g. "per month"
  features: string[];
  highlight: boolean;
};
export const PLANS: Plan[];

export type PaymentMethod = {
  id: string;
  type: "card" | "bank" | "ussd";
  label: string;          // e.g. "Visa •••• 4242"
  isDefault: boolean;
};
export const MOCK_PAYMENT_METHODS: PaymentMethod[];

export type AcceptanceFee = {
  id: string;
  childId: string;
  childName: string;
  amount: number;
  status: "paid" | "pending";
  dueDate: string;
};
export const MOCK_ACCEPTANCE_FEES: AcceptanceFee[];
```

Reused as-is: `mockParentUser`, `PARENT_MEMBERSHIP` (`lib/parent/mock-data.ts`), `mockFees` (same file), `mockParentChildren` (same file), `getTransactions` (`lib/shared/transactions.ts`).

## Sections

### 1. Overview (`/me`)
Plan status card (current plan, renewal date, status badge), outstanding-fees summary (sum of unpaid `mockFees` + `MOCK_ACCEPTANCE_FEES`), and a 3x3 (or similar) grid of quick links to the other 8 sections.

### 2. Membership (`/me/membership`)
Current plan card at top. Below it, `PLANS` rendered as comparison cards (Free vs. Premium Family: price, period, feature list, highlight styling on the paid plan) — this is the page the mobile app's gated features link to. Selecting the paid plan opens a mock checkout: payment-method selection (card/bank/USSD, from `MOCK_PAYMENT_METHODS` plus an "add new" option) → a brief "Processing..." state → a success screen that flips `PARENT_MEMBERSHIP.status` to `"active"` for the rest of the session. A "Cancel Membership" action (only shown when already on the paid plan) asks for a one-tap confirm, then reverts status to `"trial_ended"`.

### 3. School Fees (`/me/fees`)
`mockFees` rendered as an invoice list (term, amount, due date, status). Unpaid invoices get a real "Pay Now" — legitimate here since it's a real-world childcare payment, not a digital subscription purchase — reusing the same mock payment-method-select → processing → success flow as Membership, parameterized by amount/description instead of a plan.

### 4. Acceptance Fees (`/me/acceptance-fees`)
`MOCK_ACCEPTANCE_FEES` rendered per child (using `mockParentChildren` for names/avatars), same pay flow as School Fees for pending ones.

### 5. Payment History (`/me/payment-history`)
`getTransactions()` as a full list, with a child/date filter control (data already carries enough fields to filter; UI is a couple of dropdowns).

### 6. Receipts (`/me/receipts`)
The paid subset of transactions (from Payment History + paid School/Acceptance fees), each row with a "Download" button that's a visual stub (no real file produced).

### 7. Payment Methods (`/me/payment-methods`)
`MOCK_PAYMENT_METHODS` as a card list; "Add payment method" opens a form (card number/expiry, or bank/USSD equivalent per type) that appends a mock entry; "Remove" with confirm; "Set as default" toggle.

### 8. Family Profiles (`/me/family`)
Desktop-width equivalent of the mobile Netflix-grid screen (`app/(parent)/parent/settings/profile/page.tsx`) — same family member data and invite/edit sheets, reflowed for a wide viewport (grid can show more columns, detail panel can be a side panel instead of a bottom sheet). Includes a **Security** section on the same page (change-password form, reusing the mobile change-password screen's fields) rather than a separate route.

### 9. Authorized Pickups (`/me/pickups`)
Desktop-width equivalent of `app/(parent)/parent/settings/pickups/page.tsx` — same data, reflowed layout (list/table instead of stacked mobile cards).

## Error handling / edge cases

- No payment amount or plan ever actually charges anything; the mock checkout always "succeeds" after its processing delay.
- Membership status changes (`PARENT_MEMBERSHIP.status`) are in-memory only for the session — a refresh resets to `"trial_ended"`, matching how the rest of the app already treats this flag (no persistence layer exists for it today).
- Empty states: no payment methods yet, no transactions yet, no acceptance fees yet — each section gets a simple empty-state message.

## Verification

No test framework in this repo. `npx tsc --noEmit`, then a manual dev-server walkthrough of all 9 sections plus: the Membership upgrade flow end-to-end (flips status to active, gated mobile-app features should then unblock), a School Fees payment, adding/removing a payment method, and the responsive sidebar collapse at a mobile viewport width.
