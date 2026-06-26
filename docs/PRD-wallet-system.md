# CEven — Wallet System PRD

| | |
|---|---|
| **Product** | CEven — Crèche ERP Operating System |
| **Feature** | Wallet System (Finance Module) |
| **Document** | Product Requirements Document |
| **Version** | 1.1 |
| **Status** | Active |
| **Owner** | Product (Adedamola Adewale) |
| **Screen ID** | `sc-wallet` |
| **Plan tier** | All Plans |

---

## 1. Overview

### 1.1 Purpose

The Wallet is CEven's operational bank account ledger — a single, real-time view of a crèche's money flowing in and out via Paystack. It replaces the need for crèche owners to check their bank app separately; every tuition payment received, every payroll payout, every expense withdrawal is visible in one place with full audit traceability.

### 1.2 Core Value Proposition

- **Single source of truth** — all crèche cash flow in one ledger, powered by Paystack.
- **Automated reconciliation** — parent invoices paid via Paystack auto-credit the wallet; no manual data entry.
- **Controlled withdrawals** — admins can request payouts, but the owner approves. Withdrawals only go to the registered business bank account.
- **Full audit trail** — every transaction is immutable and logged, satisfying compliance requirements.

### 1.3 What This Is Not

- This is **not** a replacement for the Expenses or Billing modules. The Wallet sits above them as a payment layer.
- This is **not** an internal bookkeeping ledger for offline cash. Offline transactions are recorded separately in the existing bookkeeping flow.
- This is **not** a multi-wallet system. One wallet per crèche.

---

## 2. User Stories

### As a Crèche Owner
- I want to see my crèche's real-time balance so I know exactly how much operational money I have.
- I want to see every deposit and withdrawal with timestamps so I can audit cash flow at any time.
- I want to approve or reject withdrawal requests from my admin team so I maintain financial control.
- I want to register my business bank account so payouts go to the right place.
- I want to receive alerts when large transactions occur so I'm never caught off guard.

### As a Crèche Admin
- I want to see the wallet balance on my Dashboard so I know our financial position without navigating away.
- I want to request a withdrawal to our registered bank account so I can pay staff, rent, and suppliers.
- I want to see a full transaction history so I can reconcile what I've deposited or withdrawn.
- I want to filter transactions by type, date, or category so I can find specific entries quickly.

### As a CEven Super Admin
- I want to override the business-account-only rule for crèches that don't have a business account, so they can still use the wallet feature.

---

## 3. Wallet Onboarding (KYC/KYB)

Before a crèche can use the wallet, the **Owner** must complete a one-time onboarding flow. This is triggered when any user first navigates to the Wallet screen.

### 3.1 Onboarding States

The wallet has three distinct states, persisted in `localStorage`:

| State | Behaviour |
|---|---|
| **Empty (Not Started)** | Wallet screen shows a dashed-border empty state card with wallet icon, description, and "Get Started" CTA. |
| **In Progress (Wizard)** | 3-step modal wizard opens. Can be closed via X button (returns to empty state). |
| **Completed** | Wallet is fully active. Onboarding never reappears. State saved to `localStorage` under key `ceven-wallet-onboarding`. |

### 3.2 Empty State Screen

When onboarding has not been started, the Finance page shows:

```
┌─────────────────────────────────────────────────────────────┐
│  Finance                                                     │
│                                                             │
│  ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐  │
│  │  ╭─────╮                                               │  │
│  │  │  💳  │  Set Up Your Wallet                          │  │
│  │  ╰─────╯  Your wallet lets you track all money        │  │
│  │            flowing in and out of your crèche.          │  │
│  │            Deposits are automatic when parents pay     │  │
│  │            invoices via Paystack.                      │  │
│  │                                                       │  │
│  │            [+ Get Started]                             │  │
│  │            Takes about 2 minutes to complete           │  │
│  └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘  │
└─────────────────────────────────────────────────────────────┘
```

- Dashed border (`border-dashed`)
- Centred layout with wallet icon, heading, description, and "Get Started" CTA
- Clicking "Get Started" opens the onboarding wizard

### 3.3 Onboarding Wizard (3-Step Modal)

The wizard is a fixed modal with a close (X) button in the header. Closing returns to the empty state.

**Step 1 — Business Information**
| Field | Required | Notes |
|---|---|---|
| Business Name | Yes | Auto-filled from crèche profile; editable |
| RC Number (Optional) | No | If available; skipped if personal account |
| Business Type | Yes | Radio: Business Account / Personal Account |
| BVN | Yes | 11-digit; validated on entry |

**Step 2 — Bank Account Details**
| Field | Required | Notes |
|---|---|---|
| Bank Name | Yes | Dropdown of Nigerian banks (25 banks supported) |
| Account Number | Yes | 10-digit; triggers Paystack account name fetch on blur |
| Account Name | Yes (auto) | Auto-fetched from Paystack after account number + bank are entered |
| Account Type | Yes (auto) | Savings / Current — auto-fetched |

- **Name Matching Rule:** After auto-fetch, the system checks for ≥50% string resemblance between the fetched account name and the crèche profile name (fuzzy match). If it fails, a warning banner appears: *"The account name does not match your crèche name. Withdrawals to personal accounts require CEven support approval."* The user can still proceed but the account is flagged as "personal" in the system.
- **Matching indicator:** Green success banner when names match, amber warning when they don't.

**Step 3 — OTP Verification**
| Field | Required | Notes |
|---|---|---|
| OTP | Yes | 6-digit code sent to the Owner's registered phone number via Paystack |

- Three states within Step 3: "Send OTP" → "Enter OTP" → "Verified ✓"
- On successful OTP verification, wallet is activated and state saved to `localStorage`.
- Resend OTP option available.

### 3.4 Onboarding Flow Diagram

```
                    ┌──────────────────────┐
                    │  User clicks "Wallet" │
                    │  in Finance sidebar   │
                    └──────────┬───────────┘
                               │
                    ┌──────────▼───────────┐
                    │  Check localStorage   │
                    │  ceven-wallet-        │
                    │  onboarding           │
                    └──────────┬───────────┘
                               │
                ┌──────────────┼──────────────┐
                │              │              │
        ┌───────▼──────┐ ┌────▼─────┐ ┌──────▼──────┐
        │   "empty"    │ │ "wizard" │ │  "complete"  │
        │  (not set)   │ │(partial) │ │   (set)      │
        └───────┬──────┘ └────┬─────┘ └──────┬──────┘
                │              │              │
        ┌───────▼──────┐ ┌────▼─────┐ ┌──────▼──────┐
        │  Empty State │ │  Resume  │ │   Wallet    │
        │  "Get        │ │  Wizard  │ │   Screen    │
        │  Started"    │ │  at last │ │   (full)    │
        └───────┬──────┘ │  step    │ └─────────────┘
                │         └────┬─────┘
                │              │
        ┌───────▼──────┐      │
        │  Click "Get  │      │
        │  Started"    │      │
        └───────┬──────┘      │
                │              │
        ┌───────▼──────────────▼──────┐
        │     STEP 1: Business Info   │
        │  Business Name, RC, Type,   │
        │  BVN                        │
        └──────────────┬──────────────┘
                       │
              [Continue] [X Close → Empty]
                       │
        ┌──────────────▼──────────────┐
        │    STEP 2: Bank Details     │
        │  Bank, Account Number,      │
        │  Auto-fetch name,           │
        │  ≥50% name match check      │
        └──────────────┬──────────────┘
                       │
              [Continue] [Back] [X Close → Empty]
                       │
        ┌──────────────▼──────────────┐
        │    STEP 3: OTP Verify       │
        │  Send OTP → Enter OTP →     │
        │  Verify                     │
        └──────────────┬──────────────┘
                       │
                    [Verify]
                       │
        ┌──────────────▼──────────────┐
        │     ✅ Wallet Activated!    │
        │  Save to localStorage       │
        │  → Navigate to Wallet       │
        └──────────────┬──────────────┘
                       │
              [Go to Wallet]
                       │
        ┌──────────────▼──────────────┐
        │      WALLET SCREEN          │
        │  Balance, Stats, Txns,      │
        │  Bank Account               │
        └─────────────────────────────┘
```

---

## 4. Wallet Screen (`sc-wallet`)

### 4.1 Navigation & Layout

The Wallet is the **default view** of the Finance module. It is NOT a tab — it is the full Finance page when no sub-tab is active.

- **Sidebar:** "Wallet" is the first item under Finance group. Clicking it navigates to `/finance` (no query param).
- **Other finance sections** (Billing & Payments, Expenses, Financial Reports) are separate sidebar items that navigate to `/finance?tab=billing-payments`, etc.
- **No tab bar** on the page — navigation is handled entirely via the sidebar.
- **Page title:** Each view shows its own title ("Wallet", "Billing & Payments", "Expenses", "Financial Reports").

```
┌─────────────────────────────────────────────────────────────┐
│  WALLET                                                     │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Balance Card (dark gradient)                        │   │
│  │  💳 Wallet Balance                                   │   │
│  │  ₦1,245,000                                          │   │
│  │  Pending In: ₦85,000  │  Pending Out: ₦120,000      │   │
│  │  [Withdraw]  [Deposit]                               │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐        │
│  │ Total In     │ │ Total Out    │ │ Net Flow      │        │
│  │ ₦2,450,000   │ │ ₦1,205,000   │ │ +₦1,245,000   │        │
│  │ This Month   │ │ This Month   │ │ This Month    │        │
│  └──────────────┘ └──────────────┘ └──────────────┘        │
│                                                             │
│  Pending Approvals (if any)                                 │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ ₦85,000 → GTBank ••••4567  [Approve] [Reject]       │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
│  Transaction History                                        │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Filters: [All Types ▾] [All Categories ▾] [Search]  │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │ Date │ Type │ Category │ Description │ Amount │ Stat │  │
│  │ ...  │ ...  │ ...      │ ...         │ ...    │ ...  │  │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
│  Bank Account                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ GTBank — ••••4567  (Business)                        │   │
│  │ Account Name: Greg Creche Limited  [Update]          │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### 4.2 Balance Card

| Element | Spec |
|---|---|
| **Style** | Dark gradient background (`from-[#3b2513] to-[#5b391e]`), white text |
| **Available Balance** | Real-time balance (credits - debits). Displayed in ₦ with commas. Large Merriweather font. |
| **Pending In** | Sum of deposits awaiting Paystack settlement (T+1). Shown as informational. |
| **Pending Out** | Sum of withdrawal requests approved but not yet processed by Paystack. |
| **Withdraw CTA** | Light button with arrow icon. Opens withdrawal flow (see §5.2). |
| **Deposit CTA** | Semi-transparent button with arrow icon. Opens deposit info modal (see §5.1). |

### 4.3 Summary Stat Cards (3)

| Card | Calculation |
|---|---|
| **Total In** | Sum of all credited deposits for the current calendar month. |
| **Total Out** | Sum of all debited withdrawals for the current calendar month. |
| **Net Flow** | Total In minus Total Out for the current calendar month. Green if positive, red if negative. |

### 4.4 Pending Approvals Section

- Only visible when there are withdrawals with status "Pending Approval".
- Amber background with warning styling.
- Shows each pending withdrawal with: amount, destination bank/account, requester name, timestamp.
- Approve (green) and Reject (red) buttons for each request.

### 4.5 Transaction History Table

| Column | Description |
|---|---|
| **Date & Time** | Format: `DD MMM YYYY, HH:mm` |
| **Type** | Badge: Credit (green, `#009061`) / Debit (red, `#cd3030`) with arrow icon |
| **Category** | Sub-category text |
| **Description** | Human-readable: e.g. "Payment from Mrs. Okafor — September Tuition" |
| **Amount** | ₦ amount with + (credit) or - (debit) prefix, colour-coded |
| **Status** | Completed (green) / Pending (amber) / Failed (red) / Rejected (red) / Expired (grey) |
| **Actions** | "Details" link |

**Filters:**
- Type dropdown: All Types / Credit / Debit
- Category dropdown: All Categories / Tuition / Admission Fee / Payroll / Rent / Supplies / Utilities / Refund / Other
- Search input with search icon

**Responsive:**
- Desktop (≥1024px): Full table layout
- Mobile (<1024px): Card-based layout with type badge, amount, description, and metadata

### 4.6 Bank Account Card

| Element | Spec |
|---|---|
| **Bank Name** | Displayed (e.g. "Guaranty Trust Bank") |
| **Account Number** | Masked (e.g. "••••4567") |
| **Account Name** | Full name as verified |
| **Account Type Badge** | Business Account (green `#009061`) / Personal Account (amber `#cc8000`) |
| **Update CTA** | "Update" link — opens bank details update flow (see §5.3) |

---

## 5. Wallet Actions

### 5.1 Deposit Flow

Deposits are **automated** — the admin does not manually initiate them. When a parent pays an invoice via Paystack, the wallet is auto-credited.

**Deposit Info Modal:**

Clicking the "Deposit" button opens a modal showing:

1. **Header:** "Deposit Funds" with green info banner explaining auto-credit.
2. **Paystack Account Details:**
   - Bank: Wema Bank
   - Account Name: Swayosoo/Sway Creche
   - Account Number: 8012345678
   - **Copy Account Number** button with clipboard icon (shows green checkmark on copy)
3. **Info bullets:**
   - Deposits are credited automatically via Paystack
   - Settlement takes T+1 (typically next business day)
   - Transaction fee is auto-deducted per deposit
4. **Footer:** "Done" button to close

**Auto-Credit Logic:**
- When an invoice status changes to "Paid" via Paystack, the wallet is credited with the invoice amount minus Paystack transaction fee.
- The transaction is logged with: date, amount, fee deducted, net amount, parent name, invoice reference, category = "Tuition" (or "Admission Fee" if applicable).
- Pending balance updates immediately; available balance updates after Paystack settlement (T+1).

### 5.2 Withdrawal Flow

Admins can request withdrawals. The flow is a 3-step modal:

**Step 1 — Enter Amount**
- Available balance displayed at the top.
- Admin enters the withdrawal amount in ₦.
- Minimum balance check: withdrawal cannot reduce the available balance below ₦1,000.
- If insufficient funds: red error text *"Insufficient balance. Available: ₦X,XXX"*
- If below minimum: red error text *"Minimum balance of ₦1,000 must be maintained."*
- Payout account card showing registered bank details with account type badge.
- Optional note/reason input.
- "Continue" button (disabled until valid).

**Step 2 — Review & Confirm**
- Summary card with: amount, destination bank + masked account, account name, remaining balance after withdrawal, note (if provided).
- Info text: "This withdrawal will be sent to the owner for approval."
- "Back" and "Confirm Withdrawal" buttons.
- Loading state during confirmation.

**Step 3 — Success**
- Green checkmark icon.
- "Withdrawal Request Sent" heading.
- Confirmation message with amount.
- "Done" button closes modal.

**Post-Submission:**
- The withdrawal is logged as a pending debit in the transaction history.
- The owner receives an in-app notification with the withdrawal details.
- The owner can approve or reject from the notification or the Pending Approvals section on the Wallet screen.
- On approval: Paystack Transfer is initiated. Status changes to "Processing" → "Completed" (or "Failed" if Paystack rejects).
- On rejection: Status changes to "Rejected" with the owner's rejection reason.

### 5.3 Update Bank Details Flow

The owner can update the registered bank account at any time. The flow is a 3-step modal:

**Step 1 — Enter New Details**
| Field | Required | Notes |
|---|---|---|
| Current Account | Display | Shows existing bank details (read-only) |
| New Bank Name | Yes | Dropdown of 25 Nigerian banks |
| New Account Number | Yes | 10-digit; triggers auto-fetch on blur |
| Account Name | Yes (auto) | Auto-fetched from Paystack |

- Loading spinner during account name fetch.
- Green success banner when name matches crèche profile.
- Amber warning banner when name doesn't match (flagged as personal).

**Step 2 — OTP Verification**
- 6-digit OTP input with spaced characters.
- "Verify & Update" button.
- "Resend OTP" link.

**Step 3 — Success**
- Green checkmark icon.
- "Bank Account Updated" heading.
- Confirmation with new bank and masked account number.
- "Done" button closes modal.

---

## 6. Transaction Categories

### Deposits (Credits)

| Category | Trigger |
|---|---|
| **Tuition** | Parent pays a tuition invoice via Paystack |
| **Admission Fee** | Parent pays an admission/enrolment fee via Paystack |
| **External Funding** | Manual record of funds received outside Paystack (e.g. grants, donations) — available to Super Admin or Owner only |

### Withdrawals (Debits)

| Category | Trigger |
|---|---|
| **Payroll** | Staff salary payment via wallet |
| **Rent** | Crèche facility rent payment |
| **Supplies** | Purchase of supplies, equipment, consumables |
| **Utilities** | Electricity, water, internet, etc. |
| **Refund** | Refund to a parent (tied to an invoice) |
| **Other** | Any withdrawal not fitting the above categories |

---

## 7. Approval System

### 7.1 Roles & Permissions

| Role | Can Request Withdrawal | Can Approve Withdrawal | Can Update Bank Details |
|---|---|---|---|
| **Owner** | Yes | Auto-approved (own requests) | Yes |
| **Admin** | Yes | No (sends to Owner for approval) | No |
| **Caregiver** | No | No | No |
| **CEven Super Admin** | N/A | Can override to allow personal-account withdrawals | Can assist with onboarding |

### 7.2 Approval Flow

1. Admin submits withdrawal request → status = **"Pending Approval"**.
2. Owner receives in-app notification with request details.
3. Owner can:
   - **Approve** → status = **"Processing"** → Paystack Transfer initiated.
   - **Reject** → status = **"Rejected"** → Admin notified with rejection reason.
4. If unactioned for 48 hours, the request expires and status = **"Expired"**.

### 7.3 Business Account Rule

- The payout account **must** be a registered business account that matches the crèche name (≥50% resemblance).
- If the account is flagged as "Personal" (name mismatch), the system warns the admin: *"Withdrawals to personal accounts require CEven support approval."*
- In this case, the withdrawal is held in **"Pending Review"** status until CEven Super Admin approves it externally (offline process — not in-app).

---

## 8. Paystack Integration

### 8.1 Deposit Integration

| Parameter | Spec |
|---|---|
| **Trigger** | Invoice marked as "Paid" via Paystack |
| **Credit** | Invoice amount minus Paystack fee |
| **Settlement** | T+1 (Paystack default) |
| **Pending Balance** | Updates immediately on payment confirmation |
| **Available Balance** | Updates after settlement (T+1) |
| **Fee Handling** | Paystack fee is auto-deducted and logged as a line item on the transaction |

### 8.2 Withdrawal Integration

| Parameter | Spec |
|---|---|
| **API** | Paystack Transfer API |
| **Trigger** | Owner approves withdrawal request |
| **Destination** | Registered primary bank account |
| **Processing** | 1-24 hours (Paystack SLA) |
| **Status Updates** | Processing → Completed / Failed |
| **Failure Handling** | Funds returned to wallet; admin and owner notified; status = "Failed" with reason |

### 8.3 Account Verification

| Parameter | Spec |
|---|---|
| **API** | Paystack Bank Account Verification (name fetch) |
| **Trigger** | Admin enters account number + bank, on blur |
| **Output** | Account name, account type |
| **Name Matching** | ≥50% string resemblance to crèche profile name |

### 8.4 Settlement & Balance Display

- **Pending In** = sum of Paystack payments received but not yet settled (T+1).
- **Pending Out** = sum of approved withdrawals awaiting Paystack transfer completion.
- **Available Balance** = settled balance (can be withdrawn).
- The wallet shows: *"Transfer request sent"* on submission, *"Transfer completed"* on success. No T+1 terminology exposed to the user.

---

## 9. Navigation & Information Architecture

### 9.1 Sidebar Structure

```
Finance (CreditCard icon)
├── Wallet              → /finance          (default view)
├── Billing & Payments  → /finance?tab=billing-payments
├── Expenses            → /finance?tab=expenses
└── Financial Reports   → /finance?tab=financial-reports
```

- "Wallet" uses `router.push()` (not a Link) to force navigation even when already on `/finance`.
- Other items use Next.js `<Link>` with query params.
- Active state highlighting: the current sub-item gets dark background + light text.

### 9.2 Page Routing

| URL | View |
|---|---|
| `/finance` | Wallet (empty state or full wallet) |
| `/finance?tab=billing-payments` | Billing & Payments |
| `/finance?tab=expenses` | Expenses |
| `/finance?tab=financial-reports` | Financial Reports |

### 9.3 localStorage Persistence

| Key | Value | Purpose |
|---|---|---|
| `ceven-wallet-onboarding` | `"complete"` | Tracks whether onboarding has been completed. Once set, wallet always shows directly. |

---

## 10. Plan Tier Gating

| Tier | Wallet Access |
|---|---|
| **Seedling** | ✅ Full wallet access (deposits, withdrawals, transaction history) |
| **Nestling Pro** | ✅ Full wallet access |
| **Flourish** | ✅ Full wallet access |

The wallet is available on **All Plans** — it is a core financial feature, not a premium AI feature.

---

## 11. Security & Compliance

| Requirement | Implementation |
|---|---|
| **OTP Verification** | Required for wallet onboarding and bank detail updates. 6-digit code via Paystack. |
| **Name Matching** | ≥50% resemblance check between bank account name and crèche profile name. |
| **Role-Based Access** | Only Owner can approve withdrawals and update bank details. Admins can only request. |
| **Audit Trail** | Every wallet transaction (deposit, withdrawal, approval, rejection, bank update) is logged immutably in the Audit Trail module. |
| **No Personal Accounts for Withdrawals** | Default rule: payouts only to business accounts. Personal accounts require Super Admin override. |
| **Minimum Balance** | ₦1,000 floor — withdrawals cannot reduce balance below this. |
| **Transaction Fee Logging** | Paystack fees are auto-deducted and logged as separate line items for transparency. |

---

## 12. Edge Cases & Error Handling

| Scenario | Behaviour |
|---|---|
| **Insufficient balance** | Withdrawal blocked. Show: *"Insufficient balance. Available: ₦X,XXX"* |
| **Below minimum balance** | Withdrawal blocked. Show: *"Minimum balance of ₦1,000 must be maintained."* |
| **Paystack payment fails** | Wallet not credited. Invoice status remains "Pending". User notified. |
| **Paystack transfer fails** | Funds returned to wallet. Status = "Failed". Admin and Owner notified with reason. |
| **Owner rejects withdrawal** | Status = "Rejected". Admin notified with rejection reason. |
| **Withdrawal expires (48h unactioned)** | Status = "Expired". Funds remain in wallet. Admin notified. |
| **Bank account name mismatch** | Warning banner. Account flagged as "Personal". Withdrawals held for Super Admin review. |
| **OTP fails 3 times** | Lock wallet actions for 15 minutes. Show: *"Too many attempts. Try again in 15 minutes."* |
| **Paystack outage** | Wallet shows cached balance. Deposits/withdrawals show "Pending" with a note: *"Payments may take longer to process. We'll notify you when complete."* |

---

## 13. Notifications

| Event | Recipient | Channel | Message |
|---|---|---|---|
| Deposit credited | Owner, Admin | In-app | *"₦X,XXX deposited into wallet from [Parent Name] — Tuition"* |
| Withdrawal requested | Owner | In-app + SMS | *"New withdrawal request: ₦X,XXX to [Bank] ••••XXXX. Approve or reject."* |
| Withdrawal approved | Admin | In-app | *"Your withdrawal of ₦X,XXX has been approved and is being processed."* |
| Withdrawal rejected | Admin | In-app | *"Your withdrawal of ₦X,XXX was rejected. Reason: [reason]"* |
| Withdrawal completed | Owner, Admin | In-app | *"₦X,XXX transfer completed to [Bank] ••••XXXX"* |
| Withdrawal failed | Owner, Admin | In-app | *"₦X,XXX transfer failed. Reason: [reason]. Funds returned to wallet."* |
| Low balance warning | Owner | In-app | *"Wallet balance is below ₦10,000. Consider making a deposit."* |
| Bank details updated | Owner | In-app | *"Bank account updated to [Bank] ••••XXXX"* |

---

## 14. Acceptance Criteria (Screen-Level)

### Wallet Empty State
- [ ] Empty state shows when `localStorage` key `ceven-wallet-onboarding` is not set.
- [ ] Empty state has dashed border, wallet icon, heading, description, and "Get Started" button.
- [ ] "Get Started" opens the onboarding wizard.

### Onboarding Wizard
- [ ] Wizard is a fixed modal with close (X) button.
- [ ] Close button returns to empty state.
- [ ] Step indicator shows 3 steps with checkmarks for completed steps.
- [ ] Step 1: Business Name, RC Number, Account Type, BVN fields.
- [ ] Step 2: Bank dropdown, account number with auto-fetch, name match indicator.
- [ ] Step 3: OTP send, enter, verify flow.
- [ ] ≥50% name match check with green/amber feedback.
- [ ] On completion, saves to `localStorage` and shows wallet.
- [ ] "Back" button navigates between steps.

### Wallet Screen
- [ ] "Wallet" page title displayed.
- [ ] Balance card with dark gradient, available balance, pending in/out.
- [ ] Withdraw button opens withdrawal modal.
- [ ] Deposit button opens deposit info modal.
- [ ] 3 stat cards: Total In, Total Out, Net Flow.
- [ ] Pending approvals section (visible when pending withdrawals exist).
- [ ] Approve and Reject buttons on pending withdrawals.
- [ ] Transaction history with type/category/search filters.
- [ ] Desktop table and mobile card layout.
- [ ] Bank account card with masked number, type badge, update link.

### Deposit Modal
- [ ] Shows Paystack account details (bank, name, number).
- [ ] Copy account number button with checkmark confirmation.
- [ ] Info bullets about auto-credit and settlement.
- [ ] "Done" button closes modal.

### Withdrawal Modal
- [ ] Step 1: Amount input with balance validation (min ₦1,000).
- [ ] Step 2: Review summary with destination, amount, remaining balance.
- [ ] Step 3: Success confirmation.
- [ ] Back button on each step.
- [ ] Loading states during confirmation.

### Bank Update Modal
- [ ] Shows current account details.
- [ ] Bank dropdown and account number input with auto-fetch.
- [ ] Name match indicator (green/amber).
- [ ] OTP verification step.
- [ ] Success confirmation.

### Navigation
- [ ] "Wallet" in sidebar navigates to `/finance`.
- [ ] Billing/Expenses/Reports in sidebar navigate with `?tab=` param.
- [ ] Wallet only shows when no tab param is active.
- [ ] Other finance sections only show when their tab param is active.
- [ ] No tab bar on the page — sidebar handles all navigation.

### Responsive
- [ ] Layout works at 1440px, 1024px, and 768px.
- [ ] Transaction history switches to card layout on mobile.
- [ ] All modals are scrollable on small screens.

---

## 15. Dependencies

| Dependency | Status | Impact |
|---|---|---|
| Paystack SDK / API integration | Required | Core — deposits, withdrawals, account verification all depend on Paystack |
| Crèche profile data (business name) | Required | Used for name-matching rule |
| Invoice/Billing module | Required | Triggers auto-credit on payment |
| Owner phone number (for OTP) | Required | Must be captured during crèche setup |
| Audit Trail module | Required | All transactions logged here |

---

## 16. Future Enhancements (Out of Scope for v1)

- Multiple wallets per crèche (e.g. "Operations", "Salary", "Petty Cash").
- Scheduled/recurring withdrawals (e.g. monthly payroll auto-withdrawal).
- Wallet-to-wallet transfers between crèches (for multi-branch owners).
- Real-time Paystack webhooks for instant balance updates (instead of T+1 polling).
- Budget allocation per category with spending limits.
- Export transaction history as CSV/PDF.
- Paystack virtual account numbers for direct bank transfers into wallet.
