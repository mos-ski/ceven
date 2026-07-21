# Creche Admin (v2) — Field-Level Gap Table vs. Parent App & Caregiver App (v1)

**Date:** 2026-07-03
**Prepared for:** CEven product & engineering team

## How to read this table

Every row is a module, page, or data point that exists in the new Creche Admin (v2). The last two columns show whether that same data point has a place to come from in the **live Parent App (v1)** and **live Caregiver App (v1)**.

**Status key:**
- ✅ **Exists & connected** — the app has this and it reaches the admin record.
- ⚠️ **Exists, not connected** — the app has a matching screen/field, but it doesn't save or doesn't reach the admin record (prototype-stage wiring gap).
- ❌ **Missing** — no screen or field for this exists in that app at all.
- **N/A** — this is admin/staff-internal data; there's no reason a parent or caregiver would supply it.

---

## Module: Children & People

| Page / Feature | Data Point | Parent App (v1) | Caregiver App (v1) | Notes |
|---|---|---|---|---|
| Child record | Name, gender, DOB, photo | ⚠️ Exists, not connected | N/A | Parent's "Add Child" step collects this; never reused elsewhere |
| Child record | Room / class assignment | N/A | N/A | Admin-assigned |
| Child record | Fee status | N/A | N/A | Derived from Finance module |
| Health Status tab | Blood group | ⚠️ Exists, not connected | N/A | Collected in parent's child health step |
| Health Status tab | Allergies | ⚠️ Exists, not connected | N/A | Collected in parent's child health step |
| Health Status tab | Chronic conditions | ⚠️ Exists, not connected | N/A | Collected in parent's child health step |
| Health Status tab | Medications (name/dosage/schedule) | ⚠️ Exists, not connected | N/A | Collected in parent's child health step |
| Health Status tab | Medical notes / paediatrician info | ⚠️ Exists, not connected | N/A | Collected in parent's child health step |
| Health Status tab | Prescriptions & medical documents (upload) | ❌ Missing | N/A | Only a generic profile photo upload exists on parent side |
| Health Status tab | Height / weight / growth log | ❌ Missing | ❌ Missing | No growth-entry screen on either app |
| Development & Behaviour tab | Milestones | ⚠️ Exists, not connected | ❌ Missing | Parent's onboarding collects a version of this once; caregiver has no ongoing milestone-logging screen |
| Development & Behaviour tab | Photo gallery | ❌ Missing (parent can only view gallery, not add) | ❌ Missing | No upload capability on either app |
| Contact tab | Authorized pickup persons (name/relationship/phone/email) | ❌ Missing | N/A | No self-service list management on parent side |
| Contact tab | Authorized pickup persons — photo ID | ❌ Missing | N/A | Not modeled anywhere |
| Activity Log tab | Daily mood/meal/nap/hygiene entries | N/A (view only, read side) | ⚠️ Exists, not connected | Caregiver's log forms exist but don't persist |
| Activity Log tab | Caregiver notes | N/A | ⚠️ Exists, not connected | Same form, same issue |
| Payment History | Invoice/payment ledger | N/A (read side only) | N/A | Populated from Finance module |
| Parents & Guardians | Parent contact info | ⚠️ Exists, not connected | N/A | Parent profile edit screen exists but doesn't persist |
| Parents & Guardians | App install/adoption status | ❌ Missing | N/A | No telemetry captured from parent app |
| Parents & Guardians | "Average app rating" stat | ❌ Missing | N/A | Placeholder metric — no rating feature exists anywhere |
| Parents & Guardians | "Active in-app" engagement stat | ❌ Missing | N/A | No usage/engagement tracking exists |
| Enrolment & Waitlist | Enquiry details (child, parent, preferred room) | ⚠️ Exists, not connected | N/A | Overlaps with parent's creche-browsing "Enrol Now" flow |
| Enrolment & Waitlist | "Info Requested" follow-up response | ❌ Missing | N/A | No parent-facing screen to answer an info request |
| Rooms & Classes | Room capacity / assignment | N/A | N/A | Admin-only |
| Child Development (standalone module) | Milestones, observations, growth, SEND register | ❌ Missing | ❌ Missing | Whole module doesn't exist in either app (also missing in admin itself per PRD audit) |

---

## Module: Staff Management

| Page / Feature | Data Point | Parent App (v1) | Caregiver App (v1) | Notes |
|---|---|---|---|---|
| Staff record | Name, email, phone, role | N/A | N/A | Admin-entered at hiring |
| Staff onboarding | ID document upload | N/A | ❌ Missing | No self-service upload screen for caregiver's own ID |
| Staff onboarding | Work history / experience document | N/A | ❌ Missing | Same — admin-entered only |
| Staff onboarding | Bank details (account, pension, tax) | N/A | ❌ Missing | No self-service payroll-info screen |
| Staff profile | Emergency contact | N/A | ❌ Missing | Caregiver can't self-report their own emergency contact |
| Staff profile | Compliance documents (DBS/background check, First Aid cert, contract) | N/A | ❌ Missing | Renewal/upload is entirely admin-managed |
| Payroll | Salary, deductions, payslips | N/A | ❌ Missing | No caregiver-facing payslip view at all |
| Leave Management | Leave request (type, dates, reason) | N/A | ❌ Missing | Admin has a review screen; no caregiver submission screen exists |
| Compliance & Safety | Food hygiene logs, fire drills, risk assessments | N/A | N/A | Inspector/admin-entered |
| Staff Leaderboard | "Parent rating" per caregiver | N/A | ❌ Missing | No mechanism anywhere for a parent to rate a caregiver |
| Staff Leaderboard | Attendance score, incidents logged | N/A | ⚠️ Exists, not connected | Would be derived from caregiver's own attendance/incident screens, which don't persist yet |

---

## Module: Daily Operations

| Page / Feature | Data Point | Parent App (v1) | Caregiver App (v1) | Notes |
|---|---|---|---|---|
| Reception / QR check-in | Child check-in/check-out timestamp | N/A | ⚠️ Exists, not connected | Caregiver's attendance screen is a manual status toggle, not a real check-in flow, and doesn't persist |
| Reception / QR check-in | Manual override + reason | N/A | N/A | Admin/front-desk only |
| Reception / QR check-in | Exception log: "unauthorized pickup," "no ID presented" | ❌ Missing | N/A | Presupposes the authorized-pickup-persons + photo ID feature, which doesn't exist |
| Daily Logs | Mood, meal, nap, hygiene, note per child per day | N/A | ⚠️ Exists, not connected | Same caregiver form issue as above |
| Daily Logs | Submission/compliance tracking | N/A | ⚠️ Exists, not connected | Can't be real until logs actually persist |
| Health & Incidents | Incident report (type, severity, description, action taken) | N/A | ⚠️ Exists, not connected | Caregiver incident form exists, doesn't save |
| Health & Incidents | "Parent notified" flag | N/A | N/A | Admin/staff-set only |
| Health & Incidents | Parent acknowledgment / reply | ❌ Missing | N/A | No way for a parent to confirm they've seen an incident |
| Medication | Scheduled dose + administration confirmation | N/A | ⚠️ Exists, not connected | Caregiver has a free-text "medications" note, not tied to a specific order, and it doesn't persist |
| Medication | Parent consent / standing authorization | ❌ Missing | N/A | No consent-capture screen anywhere |
| Inventory & Supplies | Stock levels, reorder | N/A | N/A | Admin-only |
| Facilities | Maintenance requests/logs | N/A | N/A | Admin-only |
| Tasks | Task assignment & completion | N/A | ⚠️ Exists, not connected | Caregiver can mark tasks complete in-session, but it resets on reload |

---

## Module: Finance

| Page / Feature | Data Point | Parent App (v1) | Caregiver App (v1) | Notes |
|---|---|---|---|---|
| Billing & Payments | Invoice list / status | N/A (read side) | N/A (read side) | Both apps display invoices read-only |
| Billing & Payments | Online payment ("Pay Now") | ⚠️ Exists, not connected | ⚠️ Exists, not connected | Button present in both apps, no working payment flow behind it |
| Expenses | Expense entries/approvals | N/A | N/A | Admin/staff-only |
| Financial Reports | Revenue/collection reports | N/A | N/A | Admin-only |
| Wallet | Creche operator wallet (deposits, payouts, bank linkage) | N/A | N/A | Not a parent-facing concept |
| Wallet | Parent-facing balance / prepaid wallet | ❌ Missing | N/A | Concept doesn't exist in either app or in admin's own data model |

---

## Module: Communication

| Page / Feature | Data Point | Parent App (v1) | Caregiver App (v1) | Notes |
|---|---|---|---|---|
| Messages / Chat | Send/receive message | ⚠️ Exists, not connected | ⚠️ Exists, not connected | Both apps have working chat UIs, but they're local simulations with scripted replies, not a real connection to admin/each other |
| Announcements | Recipient count / view count | N/A (read side) | N/A | Aggregate-only on admin side already |
| Announcements | Per-parent read receipt | ❌ Missing | N/A | Not modeled on either side |
| Announcements | Parent reply / comment | ⚠️ Exists, not connected | N/A | Comment box on parent's daily-report screen doesn't actually send |
| Events Calendar | Event listing | ❌ Missing | ❌ Missing | No events screen in either app |
| Events Calendar | RSVP | ❌ Missing | ❌ Missing | Doesn't exist anywhere, including in admin itself |

---

## Module: Intelligence (AI & Analytics)

| Page / Feature | Data Point | Parent App (v1) | Caregiver App (v1) | Notes |
|---|---|---|---|---|
| Analytics | Attendance trends | N/A | N/A | Derived from Daily Operations data once that's connected |
| Analytics | "Avg. response time" metric | ❌ Missing | ❌ Missing | Would require message-thread timestamps neither app currently tracks/reports |
| Analytics | Room engagement score | ❌ Missing | ❌ Missing | No underlying activity data feeds this yet |
| AI Command Center / Reports | AI-generated insights | N/A | N/A | Depends on upstream data (logs, attendance, billing) being real first |
| Audit Trail | Action history | N/A | N/A | Admin/system-internal |

---

## Module: Account & Setup

| Page / Feature | Data Point | Parent App (v1) | Caregiver App (v1) | Notes |
|---|---|---|---|---|
| Admission Form config | Required-field configuration (medical history, emergency contact, etc.) | ⚠️ Exists, not connected | N/A | Admin defines the schema; no parent-facing form actually reads it |
| Settings (creche config, fee plans, notification rules, roles, AI persona) | — | N/A | N/A | Fully admin-internal; not applicable to parent/caregiver |
| Plans & Access | Subscription/billing plan | N/A | N/A | Admin-only |

---

## Module: Notifications

| Page / Feature | Data Point | Parent App (v1) | Caregiver App (v1) | Notes |
|---|---|---|---|---|
| Notification feed | Notification list | N/A (read side) | N/A (read side) | Both apps display a notification list read-only |
| Notification feed | Mark as read / unread state | ❌ Missing | ❌ Missing | Neither app supports marking notifications read |

---

## Summary Counts

| Status | Approx. row count |
|---|---|
| ✅ Exists & connected | 0 |
| ⚠️ Exists, not connected (wiring gap) | 20 |
| ❌ Missing entirely (design gap) | 24 |
| N/A (admin-internal, correctly no parent/caregiver counterpart) | 25 |

**Headline takeaway:** not one data point in this table is currently "fully connected" end-to-end — every single feature that should flow from a parent or caregiver into Creche Admin is either **not captured yet** or **captured but not wired through**. The fastest path to making Creche Admin v2's data real is closing the ⚠️ "exists, not connected" rows first (child health data, daily logs, incident reports, chat, payments), since those require no new screens — only connecting what's already been built.
