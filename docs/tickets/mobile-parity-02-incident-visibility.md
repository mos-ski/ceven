# Incident Visibility (Parent + Caregiver Apps)

**Type:** Story · **Component:** Parent App, Caregiver App (cross-referenced against Admin V2 Daily Operations → Health & Incidents) · **Screen ID:** TBD · **Plan tier:** All Plans

## Summary
Close the loop on incidents so parents can actually see what admin's data model already assumes they see, and so caregivers know what happened to an incident after they log it.

## Background / Why
Per `docs/gap-analysis-v2-vs-mobile-2026-07-17.md`: Admin V2's `Incident` type (`lib/mock-data/daily-operations.ts`) already includes a `parentNotified: boolean` field — the data model assumes parents get notified, but the **Parent app has no incident screen at all**. Separately, the **Caregiver app can log an incident** (`app/(caregiver)/caregiver/incidents/page.tsx` → `IncidentForm`) but that submission currently just closes the sheet with no persistence — the caregiver never sees the admin's severity triage, status changes (Open → Under Review → Resolved), or actions taken after the fact.

## User Stories
- As a parent, I want to see an incident report about my child (what happened, severity, what action was taken), not just find out informally.
- As a parent, I want to be able to acknowledge an incident report so the creche knows I've seen it.
- As a caregiver, I want to see what happened to an incident after I log it — was it reviewed, resolved, escalated — so I know it wasn't dropped.

## Acceptance Criteria — Parent App
- [ ] New Incidents screen (or incident cards surfaced via `/parent/notifications` + a child-profile tab) shows: type, severity (Minor/Moderate/Severe), time, status, actions taken, and any additional note — matching field names from the admin `Incident` type.
- [ ] An incident only appears to the parent once `parentNotified` is true (mirrors admin's existing flag — don't surface incidents the creche hasn't chosen to notify on yet).
- [ ] Severe incidents trigger a distinct high-priority notification style, consistent with the exception-notification pattern in `mobile-parity-01`.
- [ ] Parent can mark an incident as acknowledged (simple "Seen" action, mock-persisted).

## Acceptance Criteria — Caregiver App
- [ ] Incidents list (`app/(caregiver)/caregiver/incidents/page.tsx`) shows a status badge per incident (Open/Under Review/Resolved) reflecting admin's current triage state, not just the caregiver's own submission.
- [ ] Tapping an incident the caregiver logged shows any actions taken / follow-up notes admin has since added.
- [ ] `IncidentForm` submission actually appends to the shared incident list (mock-persisted) instead of only showing a local success toast with no lasting effect.

## Definition of Done
- Verified in browser at mobile breakpoint (390px) on both apps.
- Both apps read from a shared incident mock-data shape (reuse/extend `lib/mock-data/daily-operations.ts`'s `Incident` type rather than each app inventing its own).
- No console errors; acknowledge/status actions are wired to (mock) state, not decorative.

## Notes / Risks
- This repo is frontend-only — build as a clickable mock-data reference; real admin-to-parent notification delivery and caregiver-to-admin status sync are backend/integration concerns for the official dev team.
- Worth flagging to Lola/product: should *every* incident be parent-visible once notified, or only above a severity threshold? The `parentNotified` flag suggests per-incident admin discretion already exists — the parent screen should respect that, not bypass it.

**Story points:** TBD
