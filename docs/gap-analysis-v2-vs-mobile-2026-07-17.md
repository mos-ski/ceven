# Gap Analysis: Creche Admin V2 vs. Parent/Caregiver Apps

**Date:** 2026-07-17 · **Type:** Cross-app parity audit · **Related:** `docs/PRD-gap-analysis-2026-06-22.md` (V2 vs. PRD)

## Why this exists

Creche Admin V2 has grown a lot of data models and modules through feedback since Parent and Caregiver were last touched. Unlike the admin dashboard — which can run v1 and v2 side by side for comparison — Parent and Caregiver are single, live apps with no version cushion. If V2's richer data model (structured incidents, medication schedules, check-in/out events, etc.) ships without a matching consumer surface in the mobile apps, that data has nowhere to go: a caregiver logs an incident that vanishes, a parent never sees whether their child checked in today. This doc identifies exactly where that would happen.

**Method:** three independent inventories (V2 Admin's full module/data model, Parent app's full screen/data model, Caregiver app's full screen/data model), cross-referenced for V2 features whose data has no matching mobile-app screen.

## Comparison table

| V2 Admin has... | Parent app | Caregiver app |
|---|---|---|
| Child check-in/out (Reception/QR) — live status, exceptions | ❌ No screen at all | ✅ Has Attendance (own check-in tool) |
| Incidents — severity, status (Open/Under Review/Resolved), `parentNotified` flag | ❌ Zero incident screen, despite the data model having a `parentNotified` flag | ⚠️ Can log an incident, never sees admin's resolution/follow-up |
| Medication — structured dosage/schedule/status (Scheduled/Administered/Missed) | ⚠️ One-time list at signup only, no ongoing "given today" view | ⚠️ Free-text field in daily report only, no structured schedule |
| Child Development — growth (height/weight over time), milestone achieved/not-achieved | ⚠️ One-time intake form, no ongoing growth chart or milestone tracker | ❌ No growth/milestone fields in Report screen |
| Events Calendar — school events | ❌ No calendar screen exists | — (not expected) |
| Announcements — broadcast by room/child/emergency type | ⚠️ Falls into generic Notifications, loses room targeting/emergency styling | — (not expected) |
| Enrolment & Waitlist — application stage, wait position, trial scheduling | ❌ Can submit an enquiry, never sees status after | — |
| Leaderboard `parentRating` field (implies parents rate caregivers) | ❌ No rating feature anywhere | — |
| Billing/Invoices | ✅ Screen exists, "Pay Now" is a dead stub (separate, lower-severity gap — no payment backend at all yet) | — |
| Daily Log (mood/meals/naps/hygiene) | ✅ Reports screen matches | ✅ Report/Log form matches |

## Priority read

The three gaps that matter most are **check-in/out visibility, incident visibility, and structured medication tracking** — they sit directly under this product's stated value props ("transparency for parents," "accountability for caregivers"). Everything else in V2 not listed here (Payroll, Wallet, Expenses, Inventory, Facilities, Compliance & Safety, Role Management, Analytics, Audit Trail, Account Setup) is correctly internal-admin-only and has no gap.

## Follow-up tickets

Shardable specs for the three priority gaps, following the `docs/tickets/finance-*.md` format:
- `docs/tickets/mobile-parity-01-checkin-checkout-visibility.md`
- `docs/tickets/mobile-parity-02-incident-visibility.md`
- `docs/tickets/mobile-parity-03-medication-tracking.md`
