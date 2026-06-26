# CEven — Sprint Plan

| | |
|---|---|
| **Sprint** | Sprint 4 |
| **Duration** | 1 week (2026-06-30 → 2026-07-04) |
| **Focus** | Dashboard (PRD-compliance pass) + AI Command Center + AI Panel Foundation |
| **Sprint Goal** | Bring the Dashboard to full PRD compliance and ship the AI Command Center with the persistent AI panel, insight engine, and plan-gated export. |
| **Plan Tier Context** | Dashboard is All Plans. AI Command Center is Nestling Pro+ only (Seedling sees a locked gate). AI panel is global shell (All Plans for the panel; AI content gated per §7.5). |

---

## Sprint Goal

By end of this sprint, a manager logging into CEven should see a fully live Dashboard with auto-refreshing KPIs, an onboarding checklist, AI risk badges, colour-coded activity feed, and correct quick actions — and should be able to navigate to a complete AI Command Center with filterable insights, confidence scoring, chat, and plan-gated export. The persistent AI panel (316px, right-hand) should be wired into the global shell so it is available on every screen at 1440px+.

---

## Tickets

---

### TICKET-001: Dashboard — Full PRD Compliance

**Type:** Story · **Component:** Dashboard · **Screen ID:** `sc-dashboard` · **Plan tier:** All Plans (AI Risk badge is Nestling Pro+ only)

#### Summary
Bring the Dashboard to full PRD compliance by making KPIs live with auto-refresh, adding an 8-step onboarding checklist, wiring AI risk badges onto the outstanding invoices table, colour-coding the activity feed, and correcting the quick-action grid to match the PRD spec.

#### User Stories
- As a manager, I want the Dashboard KPIs to update automatically so I always see the current state of my crèche without refreshing.
- As a manager, I want a subtle visual indicator when data refreshes so I know the numbers are current.
- As a new crèche owner, I want to see my setup progress on the Dashboard so I know what steps I still need to complete.
- As a returning manager, I want the onboarding checklist to disappear once setup is complete so it doesn't clutter my view.
- As a manager, I want to see which overdue families are at highest risk of non-payment so I can prioritise follow-up calls.
- As a Seedling-tier manager, I want to see a locked/upsell state for the AI badge rather than a broken or missing element.
- As a manager, I want to see what type each activity is (health, finance, staff, etc.) by its colour so I can scan the feed quickly.
- As a manager, I want one-click access to the most common actions from the Dashboard so I don't have to navigate the sidebar.

#### Acceptance Criteria
- [ ] 8 stat cards read from typed data fixtures, not hardcoded constants.
- [ ] Stat cards auto-refresh every 30 seconds.
- [ ] A subtle pulse/fade animation fires on each card when values change.
- [ ] A "Last updated: HH:mm" timestamp is visible below the stats row.
- [ ] An onboarding progress card appears when any of the 8 setup steps are incomplete, showing a progress bar with percentage and a list of 8 steps:
  1. Add your first child
  2. Set up rooms & classes
  3. Add staff members
  4. Configure fee plans
  5. Set up parent contacts
  6. Complete crèche profile (Settings)
  7. Log first daily report
  8. Send first announcement
- [ ] Each onboarding step shows a checkmark (completed) or an actionable CTA linking to the relevant screen/modal.
- [ ] When all 8 steps are complete, the onboarding card disappears permanently (persisted in localStorage).
- [ ] Card is dismissible (X button) — dismissed state also persisted.
- [ ] Outstanding invoices table includes an "AI Risk" column with badges: High (red), Medium (amber), Low (green) — rule-based (days overdue >7 = High, >3 = Medium, else Low).
- [ ] Days Overdue text turns red when >7 days.
- [ ] On Seedling-tier accounts, the AI Risk column shows a locked icon with upgrade tooltip.
- [ ] Table shows the 5 most overdue invoices as per PRD.
- [ ] Activity feed items have a coloured dot mapped by event type: Health = red, Finance = green, Staff = blue, Compliance = amber, Operations = grey, Enrolment = purple.
- [ ] A type label appears next to or below the event description.
- [ ] Timestamps are relative (e.g. "2 min ago", "1 hour ago") and update every 60 seconds.
- [ ] Feed shows the last 10 events across all modules and is scrollable when content overflows.
- [ ] Quick-action grid shows exactly 5 buttons: Add Child, QR Station, New Log, New Invoice, View Reports.
- [ ] Each quick action navigates to the correct destination or opens the correct modal:
  - Add Child → opens enrolment modal
  - QR Station → navigates to Reception/QR screen
  - New Log → opens log daily report modal
  - New Invoice → opens new invoice modal
  - View Reports → navigates to Reports screen
- [ ] Quick-action grid is responsive: 5 tiles in a row at 1440px, wrapping at smaller viewports.
- [ ] All elements render correctly at both 1440px and 768px breakpoints.
- [ ] No console errors or memory leaks from uncleaned intervals.

#### Sub Tasks
1. **Live KPIs** — Create an auto-refresh hook that re-fetches data on a timer and returns `{ data, lastUpdated, isRefreshing }`. Define a dashboard stats function returning typed KPI data (enrolled, present, absent, staff on duty, outstanding fees, open incidents, reports pending, tasks overdue). Replace static constants with hook output. Add pulse animation on value change. Add "Last updated" footer.
2. **Onboarding Checklist** — Define 8 onboarding steps as typed constants. Create an `OnboardingChecklist` component. Implement completion tracking via localStorage. Wire each step CTA to the correct navigation action. Add progress bar with percentage. Integrate into dashboard page with conditional rendering.
3. **AI Risk Badge** — Create a risk badge utility function. Create an `AiRiskBadge` component with High/Medium/Low/locked variants. Add the AI Risk column to the outstanding invoices table. Apply red text to days overdue >7. Gate behind plan tier.
4. **Activity Feed** — Define an event type union type and colour map. Create typed mock activity feed data with varied event types. Update the activity feed section to render coloured dots and type labels. Implement a relative time formatting utility. Add scroll behaviour.
5. **Quick Actions** — Update the quick actions array to match the PRD's 5 actions. Wire each button to the correct modal or navigation. Update icons, labels, and hover/active styles. Verify responsive layout.
6. **Integration & QA** — Integrate all sub-components into the dashboard page. Verify at 1440px and 768px. Test auto-refresh interval cleanup on unmount. Test onboarding persistence across reloads.

#### Definition of Done
- All ACs verified in browser at desktop (1440×900) and tablet (768×1024).
- Stat cards auto-refresh every 30 seconds with pulse animation.
- Onboarding checklist persists across reloads and disappears when complete.
- AI Risk badges render correctly with plan-tier gating.
- Activity feed has distinct colours per event type with relative timestamps.
- All 5 quick actions navigate to the correct destination.
- No console errors; intervals cleaned up on unmount.

#### Notes / Risks
- All data is mock for v1 — no real API. The hook and data functions should be structured so swapping to real fetches later is trivial.
- Since Settings may not be built yet, the "Complete crèche profile" step CTA should navigate to the Settings screen with a coming-soon state if the tab doesn't exist.
- The `AiRiskBadge` component will be reused in the AI Command Center and future Billing screen.
- Activity feed structure should accommodate a future real-time source (WebSocket or polling).
- Reference: `docs/PRD-gap-analysis-2026-06-22.md` — Dashboard section.

**Story points:** 18

---

### TICKET-002: AI Command Center — Full Build with AI Panel & Insight Engine

**Type:** Story · **Component:** Intelligence + Global Shell · **Screen ID:** `sc-ai-center` + cross-cutting AI panel · **Plan tier:** Nestling Pro & Flourish (AI panel shell is All Plans; AI content gated per §7.5)

#### Summary
Build the AI Command Center screen with filterable insights, confidence scoring, data-source attribution, and plan-gated export — plus the persistent 316px AI panel (chat, suggested actions, input) wired into the global shell on every screen, a rule-based insight trigger engine, and the sidebar Ada widget.

#### User Stories
- As a manager, I want to see all AI insights in one place sorted by urgency so I can act on the most critical issues first.
- As a manager, I want to filter insights by category (Health, Finance, Staff) so I can focus on one domain at a time.
- As a manager, I want to see Ada's confidence level on each insight so I know how certain the analysis is.
- As a manager, I want to ask Ada a question about my crèche data in plain English from any screen.
- As a manager, I want Ada to suggest relevant actions based on the current screen context.
- As a manager, I want the AI panel to be toggleable so I can reclaim screen space when I don't need it.
- As a manager, I want Ada to automatically surface insights based on real patterns in my data so I don't have to dig for problems.
- As a manager, I want to see at a glance how many new AI insights there are today from the sidebar.
- As an owner on Flourish, I want to refresh Ada's analysis on demand and export all insights as a PDF report.
- As a Seedling-tier manager, I want to see a locked-gate overlay rather than a broken/empty AI screen.

#### Acceptance Criteria

**AI Panel (Global Shell):**
- [ ] A 316px-wide panel renders on the right side of the layout at 1440px+ on every admin screen.
- [ ] The panel contains: Ada avatar + name header, chat message thread, suggested action chips, and a text input field with send button.
- [ ] The panel is toggled open/closed via the topbar "✦" AI button (currently inert — wire the `onClick`).
- [ ] Panel open/close state is persisted in `localStorage`.
- [ ] On screens <1440px, the panel renders as a slide-over overlay (not inline).
- [ ] Chat thread scrolls independently from the main page content.
- [ ] Suggested action chips change based on the current route (context-aware).
- [ ] Typing a message and pressing Enter/Send appends it to the thread and triggers a mock Ada response.
- [ ] The panel is integrated into the admin layout so it appears on every admin screen.

**Sidebar Ada Widget:**
- [ ] An Ada widget is pinned to the bottom of the sidebar (above the user profile).
- [ ] The widget shows: Ada avatar/emoji, a live insight count badge (number), and today's top headline (truncated to 1 line).
- [ ] Clicking the widget opens the AI panel.
- [ ] The insight count badge pulses when count > 0.
- [ ] The widget is hidden on mobile sidebar (collapsed state).
- [ ] The headline is sourced from the insight engine — the top-priority insight's headline.

**Insight Trigger Engine (Rule-Based):**
- [ ] An `InsightEngine` module evaluates mock data and produces typed `AiInsight[]` objects.
- [ ] Each insight has: id, category (health/finance/staff/operations/compliance/enrolment), priority (1-10), headline, body, confidence %, data sources (array of strings), trigger rule description, CTA label, CTA route.
- [ ] Engine implements at least 6 trigger rules from PRD §7.2:
  1. Child low mood 4+ of last 5 days → Health alert
  2. Invoice overdue >7 days → Finance alert
  3. Monthly collection below 70% → Finance alert
  4. Caregiver log compliance <70% for 3+ days → Staff alert
  5. 3+ unrecorded absences → Staff alert
  6. DBS expiring within 30 days → Compliance alert
- [ ] Insights are sorted by priority (1 = most urgent).
- [ ] Confidence % is calculated per rule.
- [ ] Data sources reference specific mock records (child names, invoice IDs, staff names).
- [ ] The AI Command Center tab and Dashboard brief card consume this engine's output.

**AI Command Center Screen:**
- [ ] Dedicated AI Command Center screen accessible from the Intelligence sidebar group.
- [ ] AI insight list with: category dot (colour-coded), priority number (1 = most urgent), headline, confidence %, data sources, CTA button.
- [ ] Category filter tabs: All | Health | Finance | Staff — clicking filters the list.
- [ ] Insights sorted by priority (ascending) by default.
- [ ] Each insight CTA navigates to the relevant screen or triggers a modal action.
- [ ] 4 summary stat cards at the top: Total Insights, Health Alerts, Finance Alerts, Staff Alerts — derived from insight data.
- [ ] "Refresh AI" button triggers on-demand re-analysis — enabled on Flourish only, shows locked state on Nestling Pro.
- [ ] "Export AI Report" button generates a PDF — enabled on Flourish only, shows locked state on Nestling Pro.
- [ ] AI chat panel is open by default when navigating to this screen.
- [ ] Seedling-tier crèches see a locked-gate overlay covering the entire screen with an upgrade prompt.

#### Sub Tasks
1. **AI Panel Component** — Create the main panel component with header, chat thread, chips, and input. Create individual message bubbles (user vs Ada). Create clickable suggestion chips. Implement a hook for open/close state persisted in localStorage.
2. **Topbar AI Toggle** — Wire the topbar "✦" button `onClick` to toggle the panel (fix the inert button).
3. **Layout Integration** — Integrate the panel into the admin layout — flex layout with main content + panel. Add responsive behaviour: inline at 1440px+, slide-over overlay below 1440px.
4. **Context-Aware Chips** — Define route-based suggested chips (Dashboard → "View overdue invoices", "Check attendance"; Finance → "Send bulk reminder", "View P&L"; etc.).
5. **Mock Chat** — Wire input to the mock Ada response system for simulated replies.
6. **Sidebar Widget** — Create the sidebar Ada widget component. Add to the sidebar pinned at the bottom. Source insight count and headline from the insight engine. Wire click to toggle AI panel. Add pulse animation. Hide on mobile.
7. **Insight Engine** — Create the insight engine module with typed `AiInsight` interface. Implement `generateInsights(children, invoices, staff, compliance)` with 6+ trigger rules from PRD §7.2. Add confidence % calculation. Create mock insight seed data that triggers multiple rules.
8. **AI Command Center Tab** — Create the AI Command Center screen component. Build insight list with category dot, priority badge, headline, confidence %, source chips, CTA. Implement category filter tabs with state management. Sort by priority. Add 4 stat cards derived from insight data. Wire insight CTAs to navigation. Integrate as new tab in the Intelligence screen.
9. **Locked Gate** — Build the Seedling-tier locked-gate overlay — full-screen with Ada branding and "Upgrade to unlock" CTA. Wire plan-tier check from mock user data.
10. **Export & Refresh** — Implement refresh handler with loading spinner (2s mock delay), insight list update, success toast. Implement export handler using `window.print()` with a print stylesheet for v1. Create a locked button component for plan-gated actions. Add loading states and toasts.
11. **Dashboard Brief Integration** — Wire the insight engine output to the Dashboard brief card (top 3 insights) so both screens share the same data source.
12. **QA** — Verify all ACs at 1440px. Test panel toggle, chat, filter, locked states. Test on Flourish, Nestling Pro, and Seedling tiers. No console errors.

#### Definition of Done
- AI panel renders on every admin screen at 1440px+ and is toggled by the topbar button.
- Chat thread is scrollable, mock Ada responses appear on send.
- Sidebar widget shows insight count and headline, opens panel on click.
- At least 6 distinct trigger rules produce insights with all required fields.
- AI Command Center shows filterable, priority-sorted insights with confidence % and data sources.
- Category filtering works correctly.
- "Refresh AI" and "Export AI Report" show correct plan gating (Flourish only).
- AI chat panel opens by default on the AI Command Center screen.
- Seedling-tier shows locked-gate overlay; Nestling Pro+ shows full screen.
- Dashboard brief card consumes the same insight engine output.
- No console errors; no layout shift.

#### Notes / Risks
- This is the single most cross-cutting ticket in the sprint — the AI panel unblocks future AI banners on every screen (Billing, Daily Logs, Health, Payroll, Leave, Compliance, Inventory, Enrolment).
- All AI content is rule-based/mock for v1 — no real AI API. The typed `AiInsight` interface is the data contract a real backend will populate later.
- PDF export uses `window.print()` for v1 — no new bundle dependency. A real PDF library can be added later.
- Mock data must be seeded specifically to trigger each of the 6+ insight rules at least once.
- The insight engine is the single source of truth for all AI content across the app (Command Center, Dashboard brief, sidebar widget).
- Reference: `docs/PRD-gap-analysis-2026-06-22.md` — Intelligence section + Global Shell section. `docs/CEven-Master-PRD.md` §7 (AI System — Ada).

**Story points:** 34

---

## Sprint Summary

| Ticket | Title | Points |
|---|---|---|
| TICKET-001 | Dashboard — Full PRD Compliance | 18 |
| TICKET-002 | AI Command Center — Full Build with AI Panel & Insight Engine | 34 |
| | **Total** | **52** |

## Suggested Execution Order

```
Week Layout (5 working days):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Day 1 (Mon)  │ TICKET-001 sub-tasks 1-2 (Live KPIs + Onboarding)
Day 2 (Tue)  │ TICKET-001 sub-tasks 3-6 (Risk Badge + Feed + Quick Actions + QA)
Day 3 (Wed)  │ TICKET-002 sub-tasks 1-5 (AI Panel + Topbar + Layout + Chips + Chat)
Day 4 (Thu)  │ TICKET-002 sub-tasks 6-9 (Widget + Insight Engine + Command Center + Gate)
Day 5 (Fri)  │ TICKET-002 sub-tasks 10-12 (Export/Refresh + Dashboard Brief + QA)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Sprint Risks & Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| TICKET-002 is 34 points — large for a single ticket | High | Break into sub-tasks with clear checkpoints; if AI Panel (sub-tasks 1-5) slips, defer sidebar widget and export to next sprint |
| PDF export may need a print stylesheet to look correct | Medium | Use `window.print()` with a `@media print` CSS block — no new dependency |
| Mock data may not trigger all 6 insight rules convincingly | Low | Seed the mock data specifically to trigger each rule at least once |
| Settings screen may not be built yet — onboarding step 6 CTA has no destination | Low | Navigate to Settings screen with a "Coming Soon" toast if the tab doesn't exist |
