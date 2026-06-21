# Account & Setup — Product Requirements Document

## 1. Purpose

The Account & Setup module manages the creche's subscription to the CEven platform. It provides a 3-step wizard flow for choosing a subscription plan, configuring billing and payment, and selecting optional add-ons.

---

## 2. Screens

### 2.1 Step 1 — Choose Plan

**Page Header:**
- Title: "Plans & Access"
- Subtitle: "Manage your creche subscription and access settings."

**Three Plan Cards:**

| Plan | Price | Target | Key Features |
|---|---|---|---|
| **Seedling** | ₦18,500/month | Small creches getting started | Up to 20 children, 2 staff accounts, basic reporting, email support |
| **Nestling Pro** (Current Plan) | ₦45,000/month | Growing creches | Up to 60 children, 10 staff accounts, AI reports, priority support, custom branding |
| **Flourish** | ₦85,000/month | Large/multi-branch creches | Unlimited children/staff, advanced AI, dedicated support, multi-branch, custom integrations |

**Nestling Pro** is highlighted as the current plan with a tan/amber button. Other plans show "Subscribe" or "Upgrade" outline buttons.

**Feature Comparison Table:**

| Feature | Seedling | Nestling Pro | Flourish |
|---|---|---|---|
| Children Limit | Up to 20 | Up to 60 | Unlimited |
| Staff Accounts | 2 accounts | 10 accounts | Unlimited |
| AI Reports | ✗ | ✓ | ✓ |
| Ada AI Assistant | ✗ | ✓ | ✓ |
| Custom Branding | ✗ | ✓ | ✓ |
| Priority Support | ✗ | ✓ | ✓ |
| Multi-Branch | ✗ | ✗ | ✓ |
| API Access | ✗ | ✗ | ✓ |

---

### 2.2 Step 2 — Plan Period & Payment

**Step Indicator:**
- 1 (Choose Plan — complete) → 2 (Plan Period — active) → 3 (Configure Add-ons — future)

**Back Button:** Circular tan button with left arrow

**Left Panel:**

**Plan Summary Card (tan background):**
- Plan name and price per month

**Billing Cycle Selection (radio buttons):**
- **Monthly:** ₦18,500/month
- **Yearly:** ₦185,000/year

**Payment Dates:**
- First Payment: Due Now
- Next Payment Due: Calculated date

**Billing Information:**
- Creche Name (text input)
- Email Address (text input)

**Card Information:**
- Cardholder Name (text input)
- Card Number (text input, formatted)
- MM/YY (text input)
- CVV (text input, masked)
- "Save card for future payments" checkbox

**Right Panel (360px):**

**Order Summary:**
- Base Price
- VAT (7.5%)
- Total Amount
- "Pay ₦XX,XXX.00" primary button

---

### 2.3 Step 3 — Configure Add-ons

**Step Indicator:** Step 3 active

**Back Button:** Same as Step 2

**Left Panel:**

**Plan Summary Card:** Same as Step 2

**Available Add-ons (5):**

| Add-on | Price | Description |
|---|---|---|
| AI Wellness Reports | ₦1,800/month | AI-powered health analytics |
| Custom Branding Package | ₦3,500/month | Custom logo, colors, theme |
| SMS Notifications | ₦2,000/month | SMS alerts to parents |
| Multi-Staff Training | ₦5,000/month | Staff training modules |
| Parent Portal Premium | ₦2,500/month | Premium parent app features |

Each add-on has a toggle button:
- "Add to Plan" (outline button) when not selected
- "Remove From Plan" (red outline button) when selected

**Right Panel (360px):**

**Order Summary:**
- Add-ons total (with count)
- Base Plan price
- VAT (7.5%)
- Total amount
- "Continue" button (tan/disabled style)

---

## 3. Step Navigation

| Step | Button | Action |
|---|---|---|
| Step 1 | "Subscribe" or "Upgrade" | Advances to Step 2 |
| Step 2 | "Pay ₦XX,XXX.00" | Advances to Step 3 |
| Step 3 | "Complete Setup" | Submits subscription |
| Any Step | Back arrow | Returns to previous step |
| Any Step | Step indicator click | Jumps to that step |

---

## 4. User Actions Summary

| Action | Where | Result |
|---|---|---|
| Select plan | Plan card "Subscribe"/"Upgrade" button | Advances to billing step |
| Choose billing cycle | Radio buttons | Updates order summary |
| Enter billing info | Form inputs | Populates billing details |
| Enter card info | Form inputs | Populates payment details |
| Save card | Checkbox | Persists card for future payments |
| Add add-on | "Add to Plan" button | Adds to order summary |
| Remove add-on | "Remove From Plan" button | Removes from order summary |
| Process payment | "Pay" button | Processes payment (simulated) |
| Complete setup | "Continue" button | Finalizes subscription |

---

## 5. Currency & Tax

| Aspect | Value |
|---|---|
| Currency | Nigerian Naira (₦) |
| VAT Rate | 7.5% |
| Formatting | ₦XX,XXX with comma separators |

---

## 6. User Stories & Acceptance Criteria

### US-1: Admin Views Available Plans
**As a** crèche administrator,  
**I want to** see the available subscription plans with their features and pricing,  
**so that** I can choose the plan that best fits my crèche.

**Acceptance Criteria:**
- [ ] Step 1 shows 3 plan cards: Seedling (₦18,500/month), Nestling Pro (₦45,000/month), Flourish (₦85,000/month)
- [ ] Each card shows: plan name, price, description, feature list, and action button
- [ ] Nestling Pro is highlighted as the "Current Plan"
- [ ] Feature comparison table shows 8 features across all 3 plans with checkmarks and X marks
- [ ] Plans show "Subscribe", "Current Plan", or "Upgrade" buttons as appropriate

---

### US-2: Admin Selects a Subscription Plan
**As a** crèche administrator,  
**I want to** select a subscription plan,  
**so that** I can proceed to configure billing and activate my subscription.

**Acceptance Criteria:**
- [ ] Clicking "Subscribe" or "Upgrade" on a plan card advances to Step 2
- [ ] Step indicator shows progress through the 3-step flow
- [ ] Selected plan is reflected in the Order Summary

---

### US-3: Admin Configures Billing Cycle
**As a** crèche administrator,  
**I want to** choose between monthly and yearly billing,  
**so that** I can select the payment frequency that works for my budget.

**Acceptance Criteria:**
- [ ] Step 2 shows radio buttons for Monthly and Yearly billing
- [ ] Monthly shows price per month (e.g., ₦18,500/month)
- [ ] Yearly shows price per year (e.g., ₦185,000/year)
- [ ] Selecting a billing cycle updates the Order Summary
- [ ] Order Summary shows: Base Price, VAT (7.5%), Total Amount

---

### US-4: Admin Enters Payment Information
**As a** crèche administrator,  
**I want to** enter my billing and card details,  
**so that** I can pay for my subscription.

**Acceptance Criteria:**
- [ ] Billing Information collects: Creche Name, Email Address
- [ ] Card Information collects: Cardholder Name, Card Number, MM/YY, CVV
- [ ] "Save card for future payments" checkbox is available
- [ ] Card number field formats input as the user types
- [ ] CVV field masks the input

---

### US-5: Admin Reviews Order Summary
**As a** crèche administrator,  
**I want to** review my order summary before paying,  
**so that** I can verify the total amount and ensure accuracy.

**Acceptance Criteria:**
- [ ] Order Summary shows: Base Price, VAT (7.5%), Total Amount
- [ ] Total is calculated correctly including VAT
- [ ] "Pay ₦XX,XXX.00" button shows the exact total amount
- [ ] Summary updates when billing cycle or add-ons change

---

### US-6: Admin Adds Add-ons
**As a** crèche administrator,  
**I want to** add optional features to my subscription,  
**so that** I can customize my plan with additional capabilities.

**Acceptance Criteria:**
- [ ] Step 3 shows 5 available add-ons with names and monthly prices
- [ ] Each add-on has "Add to Plan" or "Remove From Plan" toggle button
- [ ] Adding an add-on updates the Order Summary with the new total
- [ ] Removing an add-on removes it from the Order Summary
- [ ] Order Summary shows add-on count, base plan, VAT, and total

---

### US-7: Admin Completes Subscription Setup
**As a** crèche administrator,  
**I want to** complete the subscription setup after configuring everything,  
**so that** my plan is activated and I can start using CEven.

**Acceptance Criteria:**
- [ ] "Continue" button on Step 3 finalizes the subscription
- [ ] Step indicator shows all steps as complete
- [ ] Confirmation is shown after successful setup

---

### US-8: Admin Navigates Between Steps
**As a** crèche administrator,  
**I want to** navigate back and forth between steps in the subscription flow,  
**so that** I can review or change my selections.

**Acceptance Criteria:**
- [ ] Back arrow button returns to the previous step
- [ ] Step indicator allows clicking on any completed step to jump back
- [ ] Data entered in previous steps is preserved when navigating back
- [ ] Step indicator shows completed steps with a different style

- No real payment processing — no gateway integration
- No subscription management — no upgrade, downgrade, or cancel
- No invoice generation for subscription payments
- No payment history for subscriptions
- No trial period support
- No promo or discount code system
- No multi-currency support
- No automatic renewal management
- No subscription pause or resume
- No proration for mid-cycle changes
- No webhooks for payment events
