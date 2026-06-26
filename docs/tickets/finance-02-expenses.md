# Expenses

**Type:** Story · **Component:** Finance · **Screen ID:** `sc-expenses` · **Plan tier:** All Plans

## Summary
Build the Expenses screen: expense logging against monthly category budgets, receipt enforcement above ₦50,000, and a manager approval workflow.

## Description
Admins need to log operating expenses with receipts, managers need visibility into remaining budget per category, and owners need to approve/reject pending spend before it's final.

**User Stories**
- As an admin, I want to log an expense with a receipt so it is properly recorded.
- As a manager, I want to see how much budget remains in each category.
- As an owner, I want to approve or reject pending expenses.

## Acceptance Criteria
- [ ] 4 stat cards: **Monthly Budget**, **Spent**, **Remaining**, **Pending Approval** count.
- [ ] Budget breakdown by category, shown as spent-vs-budget (e.g. bar or progress per category).
- [ ] Expense log table: Date, Category, Description, Amount, Paid By, Receipt status, Approval status.
- [ ] "+ Add Expense" CTA opens the new-expense modal.
- [ ] Expenses **>₦50,000** require a receipt — show an "Upload Receipt" prompt on rows missing one; cannot reach "Approved" without it.
- [ ] Pending expenses show inline **Approve** / **Reject** actions (manager/owner only).
- [ ] Approved expenses are immutable — no edit/delete actions available once approved.

## Definition of Done
- Receipt-required validation actually blocks approval for expenses over the ₦50,000 threshold (not just a visual prompt).
- Approve/Reject are wired to real state changes, not decorative buttons.
- Approved rows are confirmed immutable (no stray edit/delete affordance in the UI).

## Notes / Risks
- Current implementation (`expenses-tab.tsx`) has stat cards and category breakdown but no inline approve/reject, no receipt-threshold validation, and no visible "immutable once approved" treatment — see `docs/PRD-gap-analysis-2026-06-22.md`.
- No AI element is specified for this screen in the PRD — confirmed out of scope here.

**Story points:** TBD.
