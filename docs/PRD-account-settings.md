# Account & Setup — Product Requirements Document


|                   |                                                                       |
| ----------------- | --------------------------------------------------------------------- |
| **Product**       | CEven — Crèche ERP Operating System                                   |
| **Module**        | Account & Setup (Admin) — Plans & Access · Settings · Help & Training |
| **Document Type** | Product Requirements Document                                         |
| **Version**       | 1.0                                                                   |
| **Status**        | Draft for stakeholder review                                          |
| **Owner**         | Product                                                               |
| **Audience**      | Engineering, Design, QA, Customer Success                             |


---

## 1. Overview

### 1.1 Purpose

Account & Setup is the administrative control centre of CEven. It is where a crèche owner or admin manages three things that don't belong in any day-to-day operational screen:

1. **The crèche's subscription to CEven itself** (Plans & Access) — the commercial relationship between the crèche and the platform, distinct from any money the crèche collects from parents.
2. **How the crèche is configured to run on the platform** (Settings) — branch identity, fee structures, admissions requirements, staff roles and permissions, notification routing, the AI assistant's persona, and third-party integrations.
3. **How staff learn and get help using the product** (Help & Training) — an onboarding checklist, searchable guidance, and an in-app help assistant.

These three areas sit together under one "Account & Setup" navigation group because they share an audience (admins and owners, not caregivers or parents) and a common purpose: getting the platform set up and keeping it running smoothly, rather than doing the day's work.

### 1.2 Goals

- Give owners full visibility and control over their subscription tier, billing cycle, and optional add-ons.
- Let admins self-serve routine configuration (branch details, fee plans, admissions rules, staff roles) without needing engineering or support involvement.
- Make the AI assistant feel owned by the crèche, not bolted on — name, tone, and alert cadence should be configurable.
- Reduce support burden by giving new staff a clear checklist, role-specific guidance, and a conversational help assistant.



### 1.3 Non-Goals

- This module does not manage parent-facing billing or the crèche's own money movement (deposits, payouts, wallet balance) — that lives in the Finance module.
- This is not a public-facing or parent-facing surface. Every screen in this module is admin-only.
- This document does not cover authentication, account creation, or org/multi-branch provisioning — it assumes a crèche account already exists.



### 1.4 Personas


| Persona              | Relationship to this module                                                                                    |
| -------------------- | -------------------------------------------------------------------------------------------------------------- |
| **Owner**            | Ultimate authority over subscription, billing, and role permissions.                                           |
| **Admin / Manager**  | Day-to-day configuration: branch profile, fee plans, admissions, notifications, AI persona.                    |
| **Staff (any role)** | Consumers of Help & Training only; no access to Plans & Access or Settings unless granted by role permissions. |


---



## 2. Information Architecture

Three sections, reachable from a single "Account & Setup" navigation group:

- **Plans & Access** — subscription plan comparison and checkout.
- **Settings** — an 8-tab configuration workspace.
- **Help & Training** — onboarding, guides, FAQ, and AI help chat.

Each section is a self-contained workspace; switching between them does not carry state (e.g., leaving mid-checkout and returning to Plans & Access should be expected to restart the flow, unless a future requirement specifies checkout state should persist).

---



## 3. Plans & Access



### 3.1 Purpose

Lets an owner compare CEven's subscription tiers, change billing cycle, add optional add-ons, and complete checkout for a plan change.

### 3.2 Subscription Tiers


| Plan                                             | Monthly Price | Included                                                                                                  |
| ------------------------------------------------ | ------------- | --------------------------------------------------------------------------------------------------------- |
| **Nuture**                                       | ₦18,500       | Up to 10 children, 2 staff accounts, basic reporting, email support                                       |
| **Nuture Pro** *(current plan for this account)* | ₦45,000       | Up to 35 children, 10 staff accounts, AI reports & insights, priority support, custom branding            |
| **Nuture Max**                                   | ₦85,000       | Unlimited children/staff, advanced AI suite, dedicated support, multi-branch support, custom integrations |


An 8-row feature comparison table (Children Limit, Staff Accounts, AI Reports, Ada AI Assistant, Custom Branding, Priority Support, Multi-Branch, API Access) sits below the plan cards so an owner can compare tiers feature-by-feature without re-reading each card.

### 3.3 Billing Cycle

A Monthly / Quarterly / Yearly toggle controls the price shown on every plan card and inside checkout:


| Cycle     | Discount                       |
| --------- | ------------------------------ |
| Monthly   | —                              |
| Quarterly | 15% off, billed every 3 months |
| Yearly    | 20% off, billed annually       |


When a non-monthly cycle is active, each plan should also show its per-month equivalent price so the discount is easy to evaluate.

### 3.4 Checkout Flow

Selecting a plan opens a checkout flow. The flow has two shapes depending on the plan:

- **Simple plans** (no add-ons available): a 2-step flow — Choose Plan → Plan Period & Payment.
- **Plans with optional add-ons**: a 3-step flow — Choose Plan → Configure Add-ons → Billing & Payment.

A step indicator should always reflect the correct number of steps for the chosen plan, with clear completed/active/upcoming states, and users must be able to go back a step without losing previously entered information.

**Configure Add-ons** (where applicable) offers optional add-ons purchasable alongside the base plan:


| Add-on                  | Price        |
| ----------------------- | ------------ |
| AI Wellness Reports     | ₦1,800/month |
| Custom Branding Package | ₦3,500/month |
| SMS Notifications       | ₦2,000/month |
| Multi-Staff Training    | ₦5,000/month |
| Parent Portal Premium   | ₦2,500/month |


Each add-on toggles independently between "Add to Plan" and "Remove From Plan," and a running order summary should update live as add-ons are toggled. Proceeding with zero add-ons selected must be allowed.

**Billing & Payment** (final step) collects:

- Billing cycle confirmation (same Monthly/Quarterly/Yearly choice, re-confirmable here).
- First payment date ("Due Now") and next payment due date, calculated from the chosen cycle.
- Billing information: crèche name, billing email.
- Card information: cardholder name, card number, expiry, CVV, and an option to save the card for future payments.
- An order summary showing base price, add-ons (if any), VAT, and total, with a clearly labelled "Pay" action showing the exact amount to be charged.



### 3.5 Acceptance Criteria

- All three plan cards show correct pricing for the active billing cycle, recalculated instantly when the cycle changes.
- The current plan is visually distinct and is not a clickable purchase target.
- The checkout flow's step count and labels match the selected plan (2-step for plans without add-ons, 3-step for plans with add-ons).
- The order summary total is always the accurate sum of the selected plan's price (at the selected cycle), plus any selected add-ons, plus VAT — it must never show a stale or generic figure regardless of what was actually selected.
- Completing payment should visibly update which plan is marked "Current Plan" and should show the customer a confirmation of what they purchased, not silently return them to the plan comparison screen.
- Going back a step preserves everything entered on later steps if the user returns forward again.



### 3.6 Known Gaps to Resolve Before Launch

- Checkout does not currently connect to a real payment processor — this needs to be wired to the platform's payment provider before this can go live.
- The order summary total does not currently reflect the actual selected plan and cycle in all cases — this must be fixed so customers are never shown or charged an incorrect amount.
- There is no subscription management view for an already-active plan (no in-app downgrade, cancel, or invoice history) — decide whether this is required for launch or a fast-follow.
- No promo/discount code support, no proration for a mid-cycle plan change, and no trial period handling exist yet — confirm whether any of these are launch requirements.

---



## 4. Settings



### 4.1 Purpose

The crèche's configuration workspace, organized into 8 tabs: **Branch Profile · Notification · Security · Fee Plans · Admissions · Role Access · AI Settings · Other Apps.**

### 4.2 Branch Profile

Editable fields: Creche Name, Email, Phone, Address. A single "Save Changes" action commits all fields at once.

**Requirement:** changes must be validated (e.g., valid email/phone format) before saving, and the user should get clear confirmation once saved.

### 4.3 Notification

Four notification categories, each independently toggle-able for Email and SMS delivery:


| Category           | What it covers                                      |
| ------------------ | --------------------------------------------------- |
| Incident Reports   | Health or safety incidents logged by staff          |
| Billing & Payments | Invoice reminders, failed payments, renewal notices |
| Staff Activity     | New staff invites, role changes, login alerts       |
| Daily Digest       | Daily summary of attendance, meals, and tasks       |


**Business rule:** Incident Reports notifications must never be fully disable-able — at minimum one channel (Email or SMS) should remain mandatory, since this is a safety-critical alert category. This rule needs to be enforced in the UI (e.g., disable the last remaining toggle) rather than left to convention.

### 4.4 Security

Two areas:

- **Password & identity** — ability to change password, and to confirm/update branch name, email, and phone tied to platform login (this should be consolidated with, or clearly differentiated from, Branch Profile in §4.2 to avoid two disconnected copies of the same data).
- **Activity Privacy** — an "Activity Status" toggle controlling whether staff show as "active" to other members.



### 4.5 Fee Plans

The configuration surface for what parents are actually charged — separate from the crèche's own CEven subscription in Section 3.


| Plan                   | Amount   | Cycle    | Applies To     | Status |
| ---------------------- | -------- | -------- | -------------- | ------ |
| Standard Tuition       | ₦85,000  | Termly   | All Rooms      | Active |
| Infant Care            | ₦110,000 | Termly   | Nursery        | Active |
| After-School Extension | ₦15,000  | Monthly  | All Rooms      | Active |
| Annual Registration    | ₦25,000  | Annually | New Enrolments | Draft  |


"Add Plan" should let an admin specify: plan name, amount, billing cycle (Daily/Monthly/Termly/Annually), which room(s) it applies to, and its status (Active/Draft) — all fields must be settable at creation, not defaulted silently.

**Open scope question:** should this tab also host monthly expense-category budgets, so fee planning and expense budgeting live in one combined view? This is called for in earlier product scoping and should be confirmed before this tab is considered complete.

### 4.6 Admissions

Controls which fields appear on the "New Child Enrollment" form, organized by step:


| Step                        | Field                                               | Required?                  |
| --------------------------- | --------------------------------------------------- | -------------------------- |
| Child Information           | Core child details                                  | Always required            |
| Child Information           | Medical History (allergies, conditions, medication) | Optional, admin-toggleable |
| Parent/Guardian Information | Core guardian details                               | Always required            |
| Parent/Guardian Information | Emergency Contact                                   | Optional, admin-toggleable |


Required fields cannot be turned off. Optional fields should be freely toggled on/off per crèche preference. An "Add Form" action should let an admin extend this beyond the two default steps for crèche-specific requirements.

### 4.7 Role Access

A role table with the ability to add new roles and edit existing ones:


| Role           | Description                                                 | Status   |
| -------------- | ----------------------------------------------------------- | -------- |
| Admin          | Full access to every module, billing, and account settings  | Active   |
| Lead Caregiver | Manage children, daily operations, and view staff schedules | Active   |
| Caregiver      | Daily logs, health & incidents, and child profiles only     | Active   |
| Front Desk     | Reception, QR check-in, and parent communication            | Disabled |


Adding or editing a role opens a permissions editor covering 7 permission groups, each independently grantable and (where applicable) expandable into finer sub-permissions:

1. **Children & Parent** — Children, Enrolment & Waitlist, Child Development, Rooms & Classes, Parents
2. **Finance System** — Billing & Payments, Expenses, Financial Reports
3. **Account & Setup** — Plans & Access, Team & Roles, Profile & Preferences
4. **Staff Management** — Staff, Payroll, Leave Management, Compliance & Safety
5. **Communication** — single permission, no sub-items
6. **Intelligence** — Analytics, Reports, Audit Trail
7. **Daily Operations** — Reception/QR, Daily Log, Health & Incidents, Medications, Inventory & Supply, Facility, Task

A "Full Access" shortcut should grant or revoke every group and sub-permission in one action. The role editor should also support inviting an existing staff member directly into the role being created.

**Business rule:** the Owner role must never be able to demote or restrict itself — this safeguard must be enforced at the permission-editing level, not left as a documented convention.

### 4.8 AI Settings (Assistant Persona)

Lets an admin configure the platform's embedded AI assistant ("Ada"):

- **Personality & Tone** — 4 selectable presets: Professional & Warm (default), Casual & Warm, Formal & Precise, Encouraging & Upbeat.
- **Display Gradient** — a small palette of brand-color options for the assistant's visual identity.
- **Alert Frequency** — Real-time (default), Hourly digest, Daily digest, Weekly summary.
- **Feature Controls** — independent toggles for: Predictive Enrolment Insights (default on), Auto-drafted Announcements (default on), Financial Anomaly Detection (default off).

**Requirement:** the assistant's name and tagline should be editable (name capped at a reasonable character limit, e.g. 20 characters), and any tone/gradient change should be visible in a live preview so the admin can confirm the change before saving — neither of these is fully addressed yet and should be closed out before this tab ships.

### 4.9 Other Apps

Third-party integrations available to connect:


| Integration       | Purpose                                             | Status        |
| ----------------- | --------------------------------------------------- | ------------- |
| QuickBooks        | Sync invoices and expenses with accounting software | Connected     |
| Google Calendar   | Sync events and staff schedules                     | Connected     |
| WhatsApp Business | Send announcements and reminders via WhatsApp       | Not Connected |
| Zoom              | Schedule and host virtual parent-teacher meetings   | Not Connected |


**Open scope question:** confirm this is a committed integration roadmap (with real OAuth/connection flows to build) rather than exploratory UI, since it represents new engineering scope beyond the platform's originally scoped feature set.

### 4.10 Acceptance Criteria

- Every tab is independently reachable and clearly indicates which is active.
- Branch Profile, Security, and Notification sections load pre-filled with the crèche's current values and save correctly on submit.
- Fee Plans supports full plan creation (name, amount, cycle, room applicability, status) and reflects new plans immediately.
- Admissions toggles correctly distinguish required (locked) vs. optional (toggleable) fields.
- Role Access supports both creating and editing roles through one consistent permission editor, with the "Full Access" shortcut behaving correctly and the Owner-role safeguard enforced.
- AI Settings changes are saved and reflected wherever the assistant's persona is shown elsewhere in the product.
- Other Apps accurately reflects real connection status once integrations are built, with working Connect/Manage actions.

---



## 5. Help & Training



### 5.1 Purpose

The in-app help centre: an onboarding checklist, FAQ, role-specific guidance, and a conversational AI help assistant.

### 5.2 Setup Progress

A short checklist tracking onboarding milestones, with a completion percentage:


| Step | Milestone              |
| ---- | ---------------------- |
| 1    | Add your first child   |
| 2    | Invite your staff      |
| 3    | Set up rooms & classes |
| 4    | Configure billing plan |


**Requirement:** each step's completion should be driven automatically by the corresponding real action elsewhere in the product (e.g., step 1 completes the moment a child is actually added) rather than requiring manual check-off, so the checklist stays trustworthy as a progress indicator.

### 5.3 Frequently Asked Questions

A single-open accordion of common questions (e.g., "How does QR attendance work," "How to create and send an invoice," "Setting up rooms and classes," "How to log a daily child report"). Every question needs real, complete answer copy before this ships — placeholder or missing answers are not acceptable for launch.

### 5.4 Role-Based Guides

A searchable set of guidance articles, one per role: Crèche Owners, Branch Managers, Receptionist, Caregivers, Finance Staff. Search should filter the list live by title. Selecting a guide opens a full article with an introduction and multiple sections, while keeping the guide list visible for continued browsing.

**Requirement:** article content must be genuine, role-accurate guidance — current placeholder copy needs to be replaced with real instructional content per role before this is customer-facing.

### 5.5 Ask [Assistant] — Help Chat

An embedded chat panel where any staff member can ask free-text questions about how to use the product, with a few suggested prompts to help users get started (e.g., "How do I generate a report for parents," "Which children are at-risk," "Draft an announcement").

**Requirement:** responses should be grounded in real product knowledge (and ideally real account data, e.g. actual attendance/invoice figures) rather than a small fixed set of canned replies — this needs a genuine AI/knowledge-base backing before it can be positioned as a real assistant rather than a demo.

### 5.6 Acceptance Criteria

- Setup Progress percentage always reflects real completed vs. total steps.
- FAQ accordion allows only one item open at a time.
- Guide search filters results live; selecting a guide always opens correctly and the back action returns to the Help & Training home.
- Ask [Assistant] sends on both Enter and button click, displays the full conversation in order, and suggested prompts behave identically to manually typed input.
- All FAQ and guide content is complete, accurate, and role-appropriate before release — no placeholder text in the shipped product.

---



## 6. Cross-Cutting Requirements

- **Permissions:** access to Plans & Access and Settings must be gated by the Role Access permission model defined in Section 4.7 — a role without "Account & Setup" access should not be able to reach these screens at all, not just have actions hidden.
- **Auditability:** changes to fee plans, role permissions, and notification rules should be logged (who changed what, when) given their downstream impact on billing and access control.
- **Data integrity:** every "Save" action across this module must persist reliably and be reflected immediately in the UI — no silent failures, and no changes that only appear to save but revert on reload.
- **Consistency:** branch identity fields should have a single source of truth rather than being editable in more than one place with no synchronization (see Section 4.4).

---



## 7. Open Questions

1. Should Plans & Access checkout be wired to a live payment processor for this release, or is a simulated/demo flow acceptable for an initial launch?
2. Is the 8-tab Settings structure final, or should Fee Plans and expense budgeting be consolidated into one combined tab as earlier scoping suggested?
3. Should the Incident Reports notification always retain at least one mandatory channel, and if so, which (Email, SMS, or admin's choice)?
4. Is "Other Apps" (QuickBooks, Google Calendar, WhatsApp Business, Zoom) committed integration scope for this release, or a placeholder for a later phase?
5. What is the real data/AI backing requirement for the Ask [Assistant] help chat — canned responses, a knowledge-base-grounded model, or full account-data-aware AI?
6. Should Setup Progress checklist items auto-complete based on real user actions, and if so, which specific actions map to which steps?

---

## 8. Success Metrics

- % of new crèche accounts that complete the Setup Progress checklist within their first week.
- % reduction in support tickets related to plan changes, fee plan setup, or role/permission confusion after launch.
- Adoption rate of the Ask [Assistant] help chat (sessions per active admin per month) as a proxy for reduced reliance on human support.
- Checkout completion rate (started → paid) for plan upgrades/downgrades.

