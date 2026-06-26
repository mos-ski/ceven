# Financial Reports

**Type:** Story · **Component:** Finance · **Screen ID:** `sc-financial-reports` · **Plan tier:** Nestling Pro & Flourish only (entire screen gated — Seedling sees locked overlay)

## Summary
Build the Financial Reports screen: monthly P&L, revenue-by-room breakdown, cost analysis, and an AI-generated plain-English financial narrative.

## Description
Owners need a P&L they can read without an accountant, visibility into which rooms are profitable, and a narrative summary from Ada that recommends specific, named actions — never fabricated.

**User Stories**
- As an owner, I want a simple P&L for any month without asking an accountant.
- As a manager, I want to see which rooms generate the most and least revenue.
- As an owner, I want Ada to tell me in plain English what to do to close the month profitably.

## Acceptance Criteria
- [ ] Month selector, defaults to current month.
- [ ] **P&L tab**: Income section (tuition, registration, meals add-on, total) + Expenditure section (payroll, rent, supplies, utilities, maintenance, other, total). Net Result box — green for surplus, red for deficit.
- [ ] AI narrative card below the P&L — plain-English summary from Ada naming specific families/actions; must never fabricate a name or number not present in the underlying data.
- [ ] **Revenue tab**: by room — potential revenue, collected, outstanding, collection %, colour-coded by %.
- [ ] **Cost Analysis tab**: each expense category as % of total income; payroll ratio highlighted against a 60–70% healthy-range indicator.
- [ ] "Export P&L" CTA generates a branded PDF.
- [ ] Entire screen shows a locked-gate overlay (not a broken/empty page) for Seedling-tier accounts.

## Definition of Done
- All three tabs (P&L, Revenue, Cost Analysis) render with real calculated figures from underlying billing/expense data, not static mock numbers.
- AI narrative is grounded in actual data for the selected month (no hardcoded family names).
- PDF export produces a usable, branded document.
- Seedling-tier accounts see the locked overlay, confirmed via a test account on that plan.

## Notes / Risks
- Current implementation (`financial-reports-tab.tsx`) has an unclear structure per the gap audit — several sub-items (Net Result box, AI narrative, revenue-by-room) were flagged as "not confirmed" rather than verified missing. **Recommend a direct code read before estimating this ticket**, since it may be closer to or further from done than the other two.
- AI narrative content can launch as a templated/rule-based summary (filling in real numbers/names) ahead of the full Ada persona system — same dependency note as Ticket 1.

**Story points:** TBD.
