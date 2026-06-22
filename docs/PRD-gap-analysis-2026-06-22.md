# CEven Admin — PRD vs. Built UI: Gap Analysis (2026-06-22)

> Point-in-time audit comparing the codebase against [`PRD-v1.md`](./PRD-v1.md). As the codebase changes, sections of this will go stale — treat it as a snapshot of what was true on 2026-06-22, not a live dashboard. Re-audit before relying on specific claims for screens that have since been touched.

## Context

The PRD (`PRD-v1.md`) specifies 32 screens, a cross-cutting AI persona system ("Ada"), 14 modals, and a global app shell (trial banner, AI panel, etc.) for a crèche ERP. A substantial amount of UI had already been built against earlier screenshot mocks (per prior session memory: "all sections from UI Screenshots/ implemented as of 2026-06-22" — that pass predates this PRD being supplied). This audit checks the built UI against the PRD's actual acceptance criteria — not just whether a nav label exists, but whether the specified behavior is real.

**Audit method:** every PRD screen's acceptance-criteria bullets were checked against the actual component/page code (not just nav structure), since this codebase has a documented history of orphaned/unwired components. Three parallel codebase explorations plus targeted verification reads (topbar AI button, account-setup page, trial-banner grep) confirmed the headline findings directly.

---

## Executive Summary

| Verdict | Count | Screens |
|---|---|---|
| Fully Met | 1 / 32 | Enrolment & Waitlist |
| Partially Met | 24 / 32 | Dashboard, Children, Child Profile, Parents, Rooms & Classes, Staff, Payroll, Leave, Compliance & Safety, Reception/QR, Daily Logs, Health & Incidents, Medication, Inventory, Facilities, Tasks, Billing, Expenses, Financial Reports, Messages, AI Command Center, Analytics, Audit Trail, Notifications, Plans & Access |
| Missing entirely | 7 / 32 | Child Development, Announcements (as a screen), Events Calendar, Reports (core features missing), Settings (Crèche/Fee Plans/Notifications/Roles/AI Persona tabs), Help & Training |

**Three headline findings that matter more than any individual screen gap:**

1. **There is no AI system, only AI-flavored decoration.** The PRD's central differentiator — Ada, an embedded AI persona with a sidebar widget, a persistent 316px chat panel, a daily brief, and contextual banners across 8+ screens — does not exist as a system. The "✦" button in the topbar (`components/admin/topbar.tsx`) has **no `onClick` handler at all** — it's inert. There is no AI panel component anywhere in the codebase, no chat thread, no persona settings. What exists are isolated static text blocks styled to look AI-generated (e.g. "Ada AI Observations" on the child profile, an insight list on the Intelligence page) with no underlying mechanism, no banners on most of the screens the PRD specifies them for (Billing, Daily Logs, Health, Payroll, Leave, Compliance, Inventory, Enrolment), and no way to customize Ada at all.
2. **Settings barely exists.** `/account-setup` (620 lines) is entirely the "Plans & Access" subscription screen. The PRD's other 4 Settings tabs — Crèche config, Fee Plans, Notifications, Roles, AI Persona — are completely absent, not even stubbed. Help & Training is entirely absent too.
3. **Most "partially met" screens follow the same pattern**: the visual shell (stat cards, table, tabs) is built and looks correct, but the *behavioral* acceptance criteria are missing — no real filtering/search (inputs exist with no `onChange` logic), no AI banners, no blocking/validation logic (e.g. Payroll's "Approve & Run" isn't blocked by flagged rows; Leave's approval isn't blocked when no cover is arranged), and several stat-card labels don't match the PRD's specified metrics (e.g. Children's 4th card is "Average Activity Log" instead of "Graduating Soon"; Parents' 4th card is "Average App Rating" instead of "Uncontacted Today").

---

## Section-by-Section Findings

### Dashboard
**Partially met.** All 8 KPI cards, AI brief, quick-actions, overdue-invoices table, and activity feed exist — but stat cards are static (no 30s auto-refresh), no onboarding checklist (8 steps), no AI Risk badge on the invoices table, no color-coding on the activity feed, and the quick-action set substitutes "Raise Incident" for the PRD's "New Log"/"New Invoice" pairing.

### Children & People
- **Children list** — partially met. Table/badges/CTA all present; 4th stat card shows the wrong metric ("Average Activity Log" vs PRD's "Graduating Soon"); search and room/status filters are non-functional (no filtering logic wired to the inputs).
- **Child Profile** — partially met. Hero card, 6 tabs, mood trend, health info, payment history, and contacts all exist. Missing: QR code thumbnail, `CEV-YYYY-NNNN` reference ID format (currently raw `child-1` style IDs), and the entire AI welfare panel (score, mood health score, eating pattern, recommended action).
- **Parents & Guardians** — partially met (the `/parents/[id]` profile + `ParentsTab` list were built this session). Missing vs PRD: AI Risk badge column (High/Medium/Low), 24h rate-limit on "Send App Invite", working search, and the 4th stat card is "Average App Rating" instead of "Uncontacted Today". No standalone `/parents` route exists — it's only reachable via `/children?tab=parents`.
- **Enrolment & Waitlist** — **fully met.** Pipeline Kanban, Waitlist, Trials, and Leavers tabs all match the PRD's acceptance criteria.
- **Child Development** — **missing entirely.** No route, no component. This is a Flourish-tier module with zero implementation (milestones, observations, growth, SEND register).
- **Rooms & Classes** — partially met. Cards show emoji/name/age-range/capacity/enrolled/caregiver, but no status badge (Available/Near Capacity/Full), no waitlist count on full rooms, no "present today" metric, and no click-through detail view.
- **Staff** — partially met. Stat cards and 3 tabs exist, but the 3rd tab is "Role Management" instead of the PRD's "Compliance" (logs submitted vs. expected); the staff grid is a flat table, not the card-grid layout the PRD specifies; compliance is shown via text color, not a visual bar.
- **Payroll** — partially met. Current Month/History/Salary Setup tabs exist, but: no AI anomaly banner, "Approve & Run" is **not actually blocked** by flagged rows (the PRD's core safeguard), PAYE/Pension/Absent-Days columns are missing from the main table, and there's no evidence of payslip auto-send on run.
- **Leave Management** — partially met. Requests/Balances/Calendar tabs exist, but no AI staffing-gap warning, no "Cover Arranged" column or blocking logic for caregiving-role approvals, and only 4 of the PRD's 6 leave types are supported (missing Paternity, Unpaid, Compassionate; has an extra non-PRD "Casual" type).
- **Compliance & Safety** — closest to fully met of the Staff group, but the **Safeguarding tab is entirely missing** (this is a named PRD requirement: DSL/Owner-only, confidentiality banner, add-only, restricted), and there's no "Export Compliance Pack" PDF CTA.

### Daily Operations
All 7 screens (Reception/QR, Daily Logs, Health & Incidents, Medication, Inventory & Supplies, Facilities, Tasks) follow the same pattern: the table/stat-card shell is present, but recurring gaps are:
- **No AI banners anywhere in this section** (compliance banner on Daily Logs, 4-hour parent-notification alert on Health & Incidents, overdue-medication alert, AI reorder suggestion on Inventory, >48h alert on Facilities, overdue-task escalation banner on Tasks) — none of these exist.
- **No auto-generation/escalation logic** — Tasks doesn't auto-create from incidents/overdue-invoices/welfare-flags/missing-checkouts, and doesn't auto-escalate at 24h overdue, despite this being one of the PRD's more specific, testable behaviors.
- Reception/QR has no real-time WebSocket grid, no "Late" (amber) state, no exception-log panel, and filters by "All Rooms/All Users" rather than the PRD's "Children/Staff/All".
- Medication is missing its entire Standing Orders tab (add/edit/delete) and has no explicit "Confirm Administration" action (only a generic kebab menu).
- Inventory is missing the "Estimated Days Left" color-coded column and the "AI Reorder" button.

### Finance
- **Billing & Payments** — partially met. Missing AI insight banner naming high-risk families, the "Bulk Remind" SMS action (with its once/day limit), and an explicit progress bar against the 85% collection target.
- **Expenses** — partially met. Missing the >₦50,000 receipt-required validation, inline Approve/Reject actions on pending rows, and any visual indication that approved expenses are immutable.
- **Financial Reports** — partially met, with the AI narrative card (the PRD's signature "plain English, names real families" requirement) and the Net Result green/red box both apparently missing — recommend a direct read of `financial-reports-tab.tsx` before scoping work here, since the explore agent flagged several sub-items as "structure not confirmed."

### Communication
- **Messages** — partially met. No dedicated compose modal (compose is inline), no SMS-fallback delivery-status indicator, no unread badge in the sidebar.
- **Announcements** — **missing as a screen.** Only a modal (`announcement-modal.tsx`) exists, fired from elsewhere; there's no sent-history view (subject/audience/date/delivery counts) and no SMS+push toggle pair.
- **Events Calendar** — **missing entirely.** No route, no event cards, no RSVP tracking — only a small preview list on the Dashboard.

### Intelligence
- **AI Command Center** — partially met, but missing confidence%, data-source attribution, true category filtering, an always-open chat panel (it's only on this one page, and is breakpoint-gated rather than persistent), and the Seedling-tier locked-gate overlay.
- **Analytics** — partially met. Tabs exist but Attendance is missing room breakdown/trend-vs-last-month, Revenue is missing the monthly-vs-target line, and there's no AI top-3-observations block on Overview.
- **Reports** — **missing its core value**: no 7 standard report cards, no AI Custom Report Builder card, and no Scheduled Reports panel/CTA. What exists is a generated-reports list only.
- **Audit Trail** — closest to fully met; missing only the "Export Log" CSV button.

### Account & Setup
- **Plans & Access** is the only thing here, and it IS implemented (3 plan cards, current-plan styling, add-ons) — but no trial countdown, no Paystack payment flow, and add-on toggles aren't wired to a calculated cost.
- **Settings** (Crèche / Fee Plans / Notifications / Roles / AI Persona) — **entirely missing**, not even a placeholder tab.
- **Help & Training** — **entirely missing.**

### Notifications
Partially met as a dropdown panel (`notification-panel.tsx`) triggered from the topbar bell — there is no full `/notifications` inbox screen, the PRD's 6 color-coded types are reduced to ~3 categories, and there's no unread-count badge on the bell or sidebar.

---

## Cross-Cutting Gaps

### Global Shell (PRD §3.2)
| Spec | Status |
|---|---|
| Trial banner (dismissible countdown) | **Missing** — no trial-related UI anywhere in the shell |
| Sidebar w/ Ada AI widget (live insight count) | Sidebar exists (`sidebar.tsx`), but no Ada widget |
| Topbar (title, plan badge, search, AI toggle, bell, CTA) | Search/bell/CTA exist; **plan badge missing**; the "AI toggle" button has no handler |
| AI Panel (316px, persistent at 1440px+) | **Missing entirely** — no component exists anywhere in the repo |
| Toast (bottom-right, 3s auto-dismiss) | **Missing** — no toast system found |

### Ada AI System (PRD §6)
Verified directly: the topbar's "✦" button (`components/admin/topbar.tsx`) renders with no `onClick`. There is no AI panel, no chat thread, no persona model, no settings UI, and no insight-trigger engine. What exists are one-off static "AI Observations" text blocks on a couple of screens (child profile, intelligence page) styled to look AI-generated but with no underlying system — this is decoration, not the feature the PRD describes.

### Modals (PRD §7 — 14 specified)
| Modal | Status |
|---|---|
| mo-add-child | ✅ `enroll-child-modal.tsx` |
| mo-log-report | ✅ `log-activity-modal.tsx` |
| mo-raise-incident / mo-incident | ✅ `raise-incident-modal.tsx` (covers both) |
| mo-invoice | ✅ `new-invoice-modal.tsx` |
| mo-announcement / mo-announce | ✅ `announcement-modal.tsx` (covers both) |
| mo-qr-exception | ❌ missing (only a button, no modal) |
| mo-manual-checkin | ❌ missing (only a button, no modal) |
| mo-add-task | ❌ missing |
| mo-send-message | ❌ missing (inline compose instead) |
| mo-ai-persona | ❌ missing |
| mo-ai-avatar | ❌ missing |
| mo-report | ❌ missing |

**7 of 14 PRD modals exist; 7 are missing.** The codebase also has ~8 modals not in the PRD at all (success-modal, record-payment-modal, new-expense-modal, add-staff-modal, role-access-modal, customize-quick-actions-modal, etc.) — reasonable scope additions, not concerning, just noted for completeness.

---

## Navigation Structure Deviation

The PRD's sidebar groups Children, Parents, Enrolment & Waitlist, Child Development, **Staff, Payroll, Leave Management, Compliance & Safety**, and Rooms & Classes all under one "CHILDREN & PEOPLE" group (9 flat items). The built app instead splits these into two separate top-level groups — "Child Management" (Children, Enrolment & Waitlist, Caregivers, Rooms & Classes, Parents) and "Staff Management" (Staff, Leaderboard, Payroll, Leave Management, Compliance & Safety) — nesting Payroll/Leave/Compliance as tabs under Staff rather than as peer items. This is a structural choice, not necessarily wrong, but it's a deliberate deviation worth flagging since it affects how discoverable those screens are versus the PRD's IA.

## Extra / Undocumented Features
Two nav items exist in the build with no PRD counterpart at all: **"Caregivers"** (`children?tab=caregivers`, `caregivers-tab.tsx`) and **"Leaderboard"** (under Staff Management). Neither is harmful, but worth confirming with the user whether these are intentional product decisions or scope creep, since the PRD doesn't mention either.

---

## Suggested Next Step

If the goal becomes closing these gaps, the highest-leverage next move is **not** screen-by-screen polish — it's deciding whether to build the cross-cutting Ada AI system and global shell (AI panel, sidebar widget, trial banner, toast) first, since nearly every "Partially Met" screen's biggest single gap is an AI banner/insight that depends on that system existing. Settings and Help & Training are the next-clearest gaps since they're 100% missing rather than partially built. Recommend deciding between these three buckets (AI system, Settings, or screen-level behavioral gaps like broken search/filtering) before starting implementation, rather than defaulting to whichever screen comes up first.
