# Account & Setup Module - PRD

## 1. Overview

The Account & Setup module manages subscription plans, billing, and add-on configuration for the creche. It implements a 3-step wizard flow: choose a plan, configure billing period and payment, and select optional add-ons.

**Route:** `/account-setup`
**File:** `app/(admin)/account-setup/page.tsx` (618 lines, client component)

---

## 2. 3-Step Wizard Flow

### Step Indicator

Visual progress indicator showing:
- Step 1: Choose Plan (active/completed)
- Step 2: Plan Period & Payment (active/completed)
- Step 3: Configure Add-ons (active/completed)

---

## 3. Step 1 — Choose Plan

### 3.1 Plan Cards (3 tiers)

#### Seedling Plan

| Attribute | Value |
|---|---|
| Price | ₦18,500/month |
| Target | Small creches |
| Badge | None |

**Features:**
- Up to 20 children
- Up to 2 staff accounts
- Basic reporting
- Email support

#### Nestling Pro Plan (Highlighted — Current Plan)

| Attribute | Value |
|---|---|
| Price | ₦45,000/month |
| Target | Growing creches |
| Badge | "Current Plan" |

**Features:**
- Up to 60 children
- Up to 10 staff accounts
- AI-powered reports
- Priority support
- Custom branding

#### Flourish Plan

| Attribute | Value |
|---|---|
| Price | ₦85,000/month |
| Target | Large/multi-branch creches |
| Badge | None |

**Features:**
- Unlimited children
- Unlimited staff accounts
- Advanced AI capabilities
- Dedicated support
- Multi-branch management
- Custom integrations

### 3.2 Feature Comparison Table

| Feature | Seedling | Nestling Pro | Flourish |
|---|---|---|---|
| Children Limit | 20 | 60 | Unlimited |
| Staff Accounts | 2 | 10 | Unlimited |
| AI Reports | — | ✓ | ✓ |
| Ada AI | — | ✓ | ✓ |
| Custom Branding | — | ✓ | ✓ |
| Priority Support | — | ✓ | ✓ |
| Multi-Branch | — | — | ✓ |
| API Access | — | — | ✓ |

---

## 4. Step 2 — Plan Period & Payment

### 4.1 Billing Cycle Selector

| Option | Description |
|---|---|
| Monthly | Pay monthly |
| Yearly | Pay annually (discount) |

### 4.2 Order Summary Card

| Line Item | Amount |
|---|---|
| Base Price (Nestling Pro) | ₦45,000 |
| VAT (7.5%) | ₦3,375 |
| **Total** | **₦48,375** |

### 4.3 Billing Information

| Field | Type |
|---|---|
| Creche Name | Text input (pre-filled) |
| Email | Email input (pre-filled) |

### 4.4 Card Information

| Field | Type |
|---|---|
| Cardholder Name | Text input |
| Card Number | Text input (formatted) |
| Expiry (MM/YY) | Text input |
| CVV | Text input (masked) |

### 4.5 Actions

| Option | Description |
|---|---|
| Save card for future payments | Checkbox |

---

## 5. Step 3 — Configure Add-ons

### 5.1 Available Add-ons

| Add-on | Price | Description |
|---|---|---|
| AI Wellness Reports | ₦1,800/month | AI-powered health analytics |
| Custom Branding Package | ₦3,500/month | Custom logo, colors, theme |
| SMS Notifications | ₦2,000/month | SMS alerts to parents |
| Multi-Staff Training | ₦5,000/month | Staff training modules |
| Parent Portal Premium | ₦2,500/month | Premium parent app features |

### 5.2 Add-on Selection

Each add-on has:
- Toggle/checkbox for selection
- Price display
- Description

### 5.3 Order Summary (Updated)

| Line Item | Amount |
|---|---|
| Nestling Pro (Monthly) | ₦45,000 |
| Custom Branding Package | ₦3,500 |
| VAT (7.5%) | ₦3,637.50 |
| **Total** | **₦52,137.50** |

---

## 6. Data Model

### 6.1 Implicit Models

```typescript
type SubscriptionPlan = {
  id: string;
  name: "Seedling" | "Nestling Pro" | "Flourish";
  monthlyPrice: number;
  childrenLimit: number | "unlimited";
  staffLimit: number | "unlimited";
  features: string[];
  isCurrentPlan: boolean;
};

type BillingCycle = "monthly" | "yearly";

type AddOn = {
  id: string;
  name: string;
  monthlyPrice: number;
  description: string;
  isSelected: boolean;
};

type OrderSummary = {
  plan: SubscriptionPlan;
  billingCycle: BillingCycle;
  addOns: AddOn[];
  subtotal: number;
  vat: number;
  total: number;
};

type PaymentMethod = {
  cardholderName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  saveCard: boolean;
};
```

---

## 7. Currency & Tax

| Aspect | Value |
|---|---|
| Currency | Nigerian Naira (₦) |
| VAT Rate | 7.5% |
| Formatting | ₦XX,XXX with comma separators |

---

## 8. Navigation

| Step | Button | Action |
|---|---|---|
| Step 1 | "Continue" | Advances to Step 2 |
| Step 2 | "Continue" | Advances to Step 3 |
| Step 3 | "Complete Setup" | Submits subscription |
| Any Step | "Back" | Returns to previous step |
| Any Step | Step indicator click | Jumps to that step |

---

## 9. Gaps & Future Work

- No real payment processing (no Paystack, Stripe, etc.)
- No subscription management (upgrade, downgrade, cancel)
- No invoice generation
- No payment history for subscription
- No trial period support
- No promo/discount code system
- No multi-currency support
- No automatic renewal
- No subscription pause/resume
- No proration for mid-cycle changes
- No webhooks for payment events
