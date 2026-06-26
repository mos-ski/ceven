# CEven — Wallet System PRD

| | |
|---|---|
| **Product** | CEven — Crèche ERP Operating System |
| **Feature** | Wallet System (Finance Module) |
| **Document** | Product Requirements Document |
| **Version** | 1.0 |
| **Status** | Draft |
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

Before a crèche can use the wallet, the **Owner** must complete a one-time onboarding flow. This is triggered when any user first navigates to the Wallet screen or clicks a wallet-related action.

### 3.1 Onboarding Flow (3-Step Wizard)

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
| Bank Name | Yes | Dropdown of Nigerian banks (Paystack bank list) |
| Account Number | Yes | 10-digit; triggers Paystack account name fetch on blur |
| Account Name | Yes (auto) | Auto-fetched from Paystack after account number + bank are entered |
| Account Type | Yes (auto) | Savings / Current — auto-fetched |

- **Name Matching Rule:** After auto-fetch, the system checks for ≥50% string resemblance between the fetched account name and the crèche profile name (fuzzy match). If it fails, a warning banner appears: *"The account name does not match your crèche name. Withdrawals to personal accounts require CEven support approval."* The user can still proceed but the account is flagged as "personal" in the system.

**Step 3 — OTP Verification**
| Field | Required | Notes |
|---|---|---|
| OTP | Yes | 6-digit code sent to the Owner's registered phone number via Paystack |

- On successful OTP verification, the wallet is activated.
- If the Owner abandons mid-flow, the wallet shows a persistent **"Complete Setup"** banner on subsequent visits. The wizard resumes from the last incomplete step.

### 3.2 Onboarding States

| State | Behaviour |
|---|---|
| **Not Started** | Wallet screen shows a full-page onboarding prompt with a "Get Started" CTA. |
| **In Progress** | Banner shows current step (e.g. "Step 2 of 3 — Bank Details"). Wizard resumes from last step. |
| **Completed** | Wallet is fully active. Onboarding prompt never reappears. |
| **Failed / Rejected** | If OTP fails or Paystack rejects the account, show error with "Retry" CTA. |

---

## 4. Wallet Screen (`sc-wallet`)

### 4.1 Layout

The Wallet is a dedicated screen within the Finance module, positioned above the existing Billing & Payments / Expenses / Financial Reports tabs.

```
┌─────────────────────────────────────────────────────────────┐
│  WALLET                                                     │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Balance Card                                        │   │
│  │  Available Balance: ₦1,245,000.00                    │   │
│  │  Pending In: ₦85,000  │  Pending Out: ₦120,000      │   │
│  │  [Deposit]  [Withdraw]                               │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐        │
│  │ Total In     │ │ Total Out    │ │ Net Flow      │        │
│  │ ₦2,450,000   │ │ ₦1,205,000   │ │ +₦1,245,000   │        │
│  │ This Month   │ │ This Month   │ │ This Month    │        │
│  └──────────────┘ └──────────────┘ └──────────────┘        │
│                                                             │
│  Transaction History                                        │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Filters: [All ▾] [Category ▾] [Date Range] [Search] │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │ Date │ Type │ Category │ Description │ Amount │ Status│  │
│  │ ...  │ ...  │ ...      │ ...         │ ...    │ ...   │  │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Bank Account                                         │   │
│  │ GTBank — ••••4567  (Business Account)                │   │
│  │ Account Name: Greg Creche Limited                     │   │
│  │ [Update Bank Details]                                │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### 4.2 Balance Card

| Element | Spec |
|---|---|
| **Available Balance** | Real-time balance (credits - debits). Displayed in ₦ with commas. |
| **Pending In** | Sum of deposits awaiting Paystack settlement (T+1). Shown as informational. |
| **Pending Out** | Sum of withdrawal requests approved but not yet processed by Paystack. |
| **Deposit CTA** | Opens deposit flow (see §5.1). |
| **Withdraw CTA** | Opens withdrawal flow (see §5.2). |

### 4.3 Summary Stat Cards (3)

| Card | Calculation |
|---|---|
| **Total In** | Sum of all credited deposits for the current calendar month. |
| **Total Out** | Sum of all debited withdrawals for the current calendar month. |
| **Net Flow** | Total In minus Total Out for the current calendar month. Green if positive, red if negative. |

### 4.4 Transaction History Table

| Column | Description |
|---|---|
| **Date & Time** | Format: `DD MMM YYYY, HH:mm` |
| **Type** | Badge: Credit (green) / Debit (red) |
| **Category** | Sub-category badge (see §6) |
| **Description** | Human-readable: e.g. "Payment from Mrs. Okafor — Tuition (September)" |
| **Amount** | ₦ amount with + (credit) or - (debit) prefix |
| **Status** | Completed (green) / Pending (amber) / Failed (red) |
| **Actions** | Kebab menu: View Details, Download Receipt |

**Filters:**
- Type filter: All / Credit / Debit
- Category filter: All / Tuition / Admission Fee / Payroll / Rent / Supplies / Utilities / Refund / Other
- Date range picker
- Search by description or transaction reference

**Pagination:** 20 transactions per page.

### 4.5 Bank Account Card

| Element | Spec |
|---|---|
| **Bank Name** | Displayed (e.g. "GTBank") |
| **Account Number** | Masked (e.g. "••••4567") |
| **Account Name** | Full name as verified |
| **Account Type Badge** | Business Account (green) / Personal Account (amber) |
| **Update CTA** | Opens bank details update flow (see §5.3) |

---

## 5. Wallet Actions

### 5.1 Deposit Flow

Deposits are **automated** — the admin does not manually initiate them. When a parent pays an invoice via Paystack, the wallet is auto-credited.

**However**, the deposit flow is triggered in two places:

1. **From the Wallet screen** — "Deposit" CTA opens a modal that shows:
   - A message: *"Deposits are automatic. When a parent pays an invoice via Paystack, funds are credited to your wallet automatically."*
   - A CTA: "Go to Billing" → navigates to Billing & Payments screen.
   - No manual deposit entry form (offline deposits are bookkeeping, not wallet).

2. **From the Dashboard quick actions or Billing screen** — when a parent makes a Paystack payment, the wallet is credited automatically in the background.

**Auto-Credit Logic:**
- When an invoice status changes to "Paid" via Paystack, the wallet is credited with the invoice amount minus Paystack transaction fee.
- The transaction is logged with: date, amount, fee deducted, net amount, parent name, invoice reference, category = "Tuition" (or "Admission Fee" if applicable).
- Pending balance updates immediately; available balance updates after Paystack settlement (T+1).

### 5.2 Withdrawal Flow

Admins can request withdrawals. The flow:

**Step 1 — Enter Amount**
- Admin enters the withdrawal amount in ₦.
- Minimum balance check: withdrawal cannot reduce the available balance below ₦1,000.
- If insufficient funds, show: *"Insufficient balance. Available: ₦X,XXX"*
- Show the Paystack transaction fee for this amount (if applicable).

**Step 2 — Select Destination**
- Dropdown shows the registered primary bank account.
- If the account is a Personal Account, show a notice: *"This is a personal account. Business accounts are recommended for withdrawals."*
- Admin confirms the destination account.

**Step 3 — Review & Confirm**
- Summary: Amount, Destination (masked account number), Fee, Net amount to be received.
- Admin enters a note/reason (optional).
- "Confirm Withdrawal" button → submits the withdrawal request.

**Post-Submission:**
- The withdrawal is logged as a pending debit in the transaction history.
- The owner receives a notification (in-app + optional SMS) with the withdrawal details.
- The owner can approve or reject from the notification or the Wallet screen.
- On approval: Paystack Transfer is initiated. Status changes to "Processing" → "Completed" (or "Failed" if Paystack rejects).
- On rejection: Status changes to "Rejected" with the owner's rejection reason.

### 5.3 Update Bank Details Flow

The owner can update the registered bank account at any time.

**Step 1 — Enter New Details**
| Field | Required | Notes |
|---|---|---|
| Bank Name | Yes | Dropdown of Nigerian banks |
| Account Number | Yes | 10-digit; triggers auto-fetch |
| Account Name | Yes (auto) | Auto-fetched from Paystack |
| RC Number | No | If business account |

**Step 2 — Name Matching**
- System checks ≥50% resemblance between fetched account name and crèche profile name.
- If match passes: proceed to Step 3.
- If match fails: warning banner — *"Account name does not match crèche name. This account will be flagged as personal. Business account updates are recommended."* User can proceed or go back.

**Step 3 — OTP Verification**
- 6-digit OTP sent to the Owner's registered phone.
- On success: bank details are updated. Old account is retained in transaction history for reference.

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
2. Owner receives in-app notification (and optional SMS) with request details.
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
- The dashboard shows: *"Transfer request sent"* on submission, *"Transfer completed"* on success. No T+1 terminology exposed to the user.

---

## 9. Dashboard Integration

The Wallet does **not** appear as a KPI card on the main Dashboard. However:

- The **Finance stat cards** on the Dashboard should include wallet balance as a reference point (or link to the Wallet screen).
- The Wallet screen is accessible from the Finance sidebar group, positioned above the existing tabs.

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
| **Owner abandons onboarding** | Wallet shows "Complete Setup" banner. Wizard resumes from last step. |
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

- [ ] Wallet screen is accessible from the Finance sidebar group.
- [ ] Onboarding wizard (3 steps) blocks wallet access until completed.
- [ ] Onboarding wizard resumes from last step if abandoned.
- [ ] Balance card shows available balance, pending in, pending out.
- [ ] Deposit CTA explains automated flow and links to Billing.
- [ ] Withdrawal flow: amount entry → destination selection → review & confirm.
- [ ] Minimum balance of ₦1,000 enforced on withdrawals.
- [ ] Withdrawal requests send notification to Owner for approval.
- [ ] Owner can approve/reject from notification or Wallet screen.
- [ ] Rejected withdrawals show the rejection reason.
- [ ] Expired withdrawals (48h) auto-expire and notify admin.
- [ ] Bank account details card shows masked account number, name, type badge.
- [ ] Bank update flow: enter details → name match check → OTP verification.
- [ ] ≥50% name resemblance check between account name and crèche profile.
- [ ] Personal account flag triggers Super Admin review hold.
- [ ] Transaction history table with filters (type, category, date, search).
- [ ] Transactions show: date, type badge, category, description, amount, status.
- [ ] Pagination at 20 transactions per page.
- [ ] 3 summary stat cards: Total In, Total Out, Net Flow (current month).
- [ ] Paystack fees auto-deducted and logged on each transaction.
- [ ] All wallet actions logged to the Audit Trail.
- [ ] OTP verification for onboarding and bank detail updates.
- [ ] 3-attempt OTP lockout with 15-minute cooldown.
- [ ] Responsive at 1440px and 768px.
- [ ] No console errors.

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
