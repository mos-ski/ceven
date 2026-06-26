# Billing & Payments

**Type:** Story · **Component:** Finance · **Screen ID:** `sc-billing` · **Plan tier:** All Plans (AI Risk badge / insight banner are Nestling Pro+ only — see Notes)

## Summary
Build the Billing & Payments screen: invoice management, collection-rate tracking against a monthly target, and AI payment-risk scoring so managers know which families to chase first.

## Description
Crèche managers currently have no single view of collected-vs-outstanding fees and no prioritized list of who to follow up with. This screen needs to surface that at a glance, let admins create invoices in under 30 seconds, and (for Nestling Pro+ tenants) flag high-risk families via AI.

**User Stories**
- As a manager, I want to see total collected vs outstanding this month at a glance.
- As an admin, I want to create a new invoice in under 30 seconds.
- As a manager, I want AI to flag families most likely to default so I can prioritise follow-up calls.
- As a manager, I want to send bulk SMS reminders to all overdue families in one action.

## Acceptance Criteria
- [ ] 4 stat cards: **Collected** (current month), **Outstanding**, **Overdue >7 days**, **Monthly Target**.
- [ ] Collection progress bar shows % vs an 85% default target, with the target marked visually.
- [ ] AI billing insight banner appears when collection is below target, naming specific high-risk families (Nestling Pro+ only — show locked-state on Seedling, not a broken/empty banner).
- [ ] Invoices table columns: Child, Parent, Fee Plan, Amount, Due Date, Days Overdue (red text if >7), AI Risk badge (High/Medium/Low), Status.
- [ ] "+ New Invoice" CTA opens the invoice modal (`mo-invoice`: child search, fee plan auto-fills amount, due date, discount, note to parent).
- [ ] "Bulk Remind" sends SMS to all overdue/pending families; limited to once per 24h — button greys out after a send.
- [ ] Status filter: All / Pending / Overdue / Paid.

## Definition of Done
- All ACs above verified in browser at desktop (1440×900) and mobile breakpoints.
- AI Risk badge and insight banner show a locked/upsell state on Seedling-tier accounts rather than being hidden or broken.
- No console errors; search/filter inputs are functionally wired (not decorative).

## Notes / Risks
- Current implementation (`billing-payments-tab.tsx`) has the stat cards and table shell but is missing the AI insight banner, Bulk Remind, and an explicit 85%-target progress bar — see `docs/PRD-gap-analysis-2026-06-22.md`.
- The AI Risk badge/banner content can ship as rule-based logic (e.g. days-overdue + amount thresholds) for v1 — it does not need to wait on the full Ada AI panel/persona system, which is a separate cross-cutting gap.

**Story points:** TBD — PRD sprint plan bundles all 3 Finance screens at 40 pts combined (Sprint 5).
