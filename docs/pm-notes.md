# PM Notes — CEven Onboarding & Working Notes

> Compiled from two walkthrough calls held shortly after joining as PM: a V2 dev-sync/status call (Chidiebere Chinweike, Prince Arthur) and a Finance module Figma design review (designer Oluwatosin Timileyin). These are working notes for the PM role, not a formal spec — `docs/PRD-v1.md` remains the authoritative PRD. Where this document adds detail the PRD doesn't have (e.g. the room-fee billing model, the Paystack-only decision), treat it as a supplement; where it conflicts, flag it for confirmation rather than assuming either source wins automatically.

---

## 1. The situation, in one paragraph

CEven is being rebuilt as "V2." A separate dev team (Chidiebere Chinweike on web, Prince Arthur on dev/process, Michael on mobile — currently inactive) is building the real, backend-connected version, gated module-by-module by Figma design review and QA, tracked in Jira. In parallel, I've been building my own frontend-only, AI-generated prototype (Figma → Figma MCP → Claude → code, no backend) — this repo — to pressure-test flows end-to-end faster than the review-gated official process allows, and to hand working frontend code to the dev team to integrate against directly. V1 already shipped with disciplined Jira tickets (user story + acceptance criteria); V2's ticket discipline has slipped, which is part of what I'm here to fix.

## 2. Team & roles

| Person | Role | Notes |
|---|---|---|
| **Me (Moski / Adedamola Adewale)** | PM | Coordinating product/process; personally building the AI-generated frontend prototype; writing/organizing specs and tickets; want to be the one defining use cases before features get built going forward. |
| **Lola** | Business/product stakeholder | Not on either call directly, but decisions are relayed through her — e.g. the no-card-custody decision, Finance Figma feedback. |
| **Oluwatosin Timileyin** | Designer | Owns the Figma designs (Finance module reviewed on this call). Worked from a template/brief she found under-detailed; filled gaps researching comparable products (Bright Wheel, etc.). |
| **Chidiebere Chinweike** | Lead web/full-stack dev | Owns the official V2 build (separate codebase from this repo). |
| **Prince Arthur ("Geniusapc")** | Dev | Focused on process/ticket quality; pushed to restore the V1-style user-story + AC discipline. |
| **Michael** | Mobile dev | Inactive as of the dev-sync call. |
| **Kemi** | Documentation support | Referenced as help for splitting/organizing docs, not a developer. |

## 3. Official V2 build status (as of the dev-sync call)

Modules, matching the PRD's nav groups: Child Management, Staff Management, Daily Operations, Finance, Communication, Intelligence, Account Setup.

- **Child Management** — done (reviewed + implemented).
- **Staff Management & Daily Operations** — UI functional, QA still in progress, tickets not fully closed.
- **Finance** — actively being built; demo was scheduled for the following Wednesday.
- **Communication, Intelligence, Account Setup** — not yet reviewed or built.

Per-module build time on the official team: ~3 days to a week typically, up to two weeks for larger modules. They don't start coding a module until its Figma has been reviewed, because un-reviewed designs change later and cause rework — this is the central process disagreement (see §6).

**My read on this repo's status by comparison:** the gap-analysis audit (`docs/PRD-gap-analysis-2026-06-22.md`) found this prototype's screens are mostly "shell matches the PRD, behavior often missing" — consistent with what you'd expect from a fast frontend-only conversion tool. The value of this repo is fast, accurate UI/flow iteration to hand off — not backend-grade correctness.

## 4. Finance module — design review notes

Covers Billing & Payments, Expenses, Financial Reports.

**Billing & Payments**
- Naming ("Billing & Payments") was questioned on the call but not actually resolved — treat as provisional.
- **Billing model, important:** parent fees are tied to the **room/class** a child is enrolled in (e.g. a fixed room fee like ₦10,000/month) — this is *not* a generic "child subscription." This is distinct from the crèche's own SaaS subscription to the CEven platform (the Seedling/Nestling Pro/Flourish tiers in the PRD). These two billing concepts got conflated mid-call and need to stay conceptually separate in any spec/ticket.
- **Unresolved:** how "add-ons" (extra items/services beyond the room fee) get billed and to whom — flag before building add-on billing.
- The **"Target" stat card is system-calculated** (likely room fees × enrolled children), never user-entered — confirmed explicitly on the call.
- Most of this screen's data is expected to be automated/fetched from elsewhere in the system. The one deliberate manual-entry path is **recording a payment / generating an invoice on behalf of a parent not using the parent app** (the working-parent/guardian edge case).
- A 3-line "collection progress and trend" chart (billed vs invoiced vs collected) was rejected as confusing and simplified to a single line — don't reintroduce the 3-line version.
- "Invoice Tracking" was renamed to "Payment Tracking" (columns: Child, Parent, room/Fee Plan, due payment).

**Expenses**
- Budget figures are set under **Settings → Fee Plans** (noted as still a work-in-progress page).
- Spend on maintenance/equipment/supplies is recorded under **Daily Operations → Inventory & Supplies** and feeds into the Expenses summary — it isn't entered twice.
- Categories referenced: payroll (staff), rent, utilities, supplies, other.

**Financial Reports**
- P&L, revenue breakdown, revenue by room plan, collection efficiency — presented without pushback on the call, unlike Billing & Payments.

## 5. Confirmed product decisions

- **Payments: Paystack only, no in-house card/wallet custody.** This is Lola's explicit decision — the platform must never hold or process card data directly.
- **AI provider for "Ada": not finalized.** "We can use any provider... we just test and see which one performs better." Don't assume a specific LLM vendor when writing specs/tickets.
- **Billing model:** see §4 — room/class-based fee, separate from the platform SaaS subscription.

## 6. Process notes — ticketing & build workflow

- V1 had proper Jira tickets (user story + acceptance criteria each). V2's discipline slipped, causing QA bounce-backs from ambiguous tickets. Restoring this is an active goal.
- **Going-forward ticket format:** write one well-organized master doc, sectioned by module/screen; the dev team "shards" it — extracts each section and attaches it under a parent Jira ticket with sub-tasks — rather than working from one undifferentiated document. **This is the format already used in `docs/tickets/finance-*.md`** (one file per screen: User Story + Acceptance Criteria + Definition of Done) — keep using that structure going forward, since it's directly shardable into their Jira setup.
- The official team is module-gated by design review before any code is written. I pushed back on this given deadline pressure — my alternative is converting all the Figma to working frontend code myself first, so review happens against something clickable rather than static mockups, and findings get fixed on the spot instead of round-tripping between design/dev/business.
- **Caution flag:** some Figma-derived sections were built with no validated real-world use case — Prince Arthur admitted this directly about Compliance & Safety / DBS checks ("the goal is just to get it and improve later"). Don't assume every PRD/Figma-derived section has a confirmed rationale — if a screen's purpose seems unclear or oddly specific, flag it for confirmation instead of building on faith.

## 7. Bugs/UX issues spotted in the official build (live walkthrough)

Logged here because they're easy mistakes to avoid repeating in this prototype too, even though they're a different codebase:
- No OTP fallback if the SMS/OTP doesn't arrive during signup.
- After signup, user is bounced back to login instead of going straight to the dashboard — then immediately hits a login rate-limit from their own first attempts (confusing dead-end on first run).
- Clicking the "Child Management" parent nav item shows a blank page instead of defaulting to its first sub-screen (Children).
- "Children Log" has no empty state.

## 8. Open questions / follow-ups

- [ ] Final name for "Billing & Payments" if it changes.
- [ ] How add-on billing (beyond room fees) actually works and who owns it.
- [ ] Settings → Fee Plans page isn't finished — budget-setting UX there isn't locked.
- [ ] Which AI provider will power "Ada."
- [ ] Real use-case validation for Compliance & Safety (and possibly other Figma-templated sections) — worth a pass before treating their PRD acceptance criteria as settled.
- [ ] Master-doc → sharded-Jira-subtask workflow — confirm this is actually how Prince Arthur's team wants documentation delivered going forward.
