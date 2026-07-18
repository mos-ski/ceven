# Structured Medication Tracking (Parent + Caregiver Apps)

**Type:** Story · **Component:** Parent App, Caregiver App (cross-referenced against Admin V2 Daily Operations → Medication) · **Screen ID:** TBD · **Plan tier:** All Plans

## Summary
Replace the current free-text/one-time medication fields in both mobile apps with a structured schedule that mirrors admin V2's medication model — so a caregiver has an actual checklist to administer against, and a parent can see whether today's doses were given.

## Background / Why
Per `docs/gap-analysis-v2-vs-mobile-2026-07-17.md`: Admin V2's `MedicationEntry` (`lib/mock-data/daily-operations.ts`) is fully structured — `medication`, `dosage`, `frequency`, `scheduledTime`, `administeredBy`, `status` (Scheduled/Administered/Missed), `note`, `history[]`. Neither mobile app matches this:
- **Parent app** only captures medication as a one-time list during child health setup (`app/(parent)/parent/child/health/page.tsx`) — no ongoing view of whether today's doses were actually given.
- **Caregiver app** only has a single free-text field inside the daily report (`LogReportForm`) — no schedule, no dosage, no per-dose status to check off.

## User Stories
- As a caregiver, I want a checklist of medications due today per child (name, dosage, scheduled time), so I don't rely on memory or a parent's free-text note.
- As a caregiver, I want to mark each scheduled dose as Administered or Missed, with an optional note.
- As a parent, I want to see whether my child's medication was given today, and when, without having to ask.

## Acceptance Criteria — Caregiver App
- [ ] New (or expanded) Medication view listing today's scheduled doses per assigned child: medication, dosage, scheduled time, status (Scheduled/Administered/Missed).
- [ ] Caregiver can mark a dose Administered (auto-fills `administeredBy` + timestamp) or Missed (requires a note).
- [ ] Medication schedule data originates from the parent's health-setup intake (`medications[]` already captured in `lib/parent/mock-data.ts`'s health form) rather than being re-entered by the caregiver — the caregiver is confirming administration against a parent-authored schedule, not authoring the schedule itself.

## Acceptance Criteria — Parent App
- [ ] Child profile or daily report view shows today's medication doses and their status (Administered at [time] by [caregiver] / Missed / Scheduled), reusing the same structured data the caregiver is checking off.
- [ ] Historical view (past 7 days) of medication administration, consistent with the pattern in `mobile-parity-01`'s check-in/out history.

## Definition of Done
- Verified in browser at mobile breakpoint (390px) on both apps.
- Both apps read/write the same structured `MedicationEntry`-shaped mock data — no duplicate, divergent medication models between the two apps.
- No console errors; Administered/Missed actions are wired to (mock) state, not decorative.

## Notes / Risks
- This repo is frontend-only — build as a clickable mock-data reference; real scheduling logic (recurring doses, reminders) and parent-to-caregiver data sync are backend/integration concerns for the official dev team.
- The parent app's existing health-setup form already models 4 schedule types (Daily, Specific Days, Every X Hours/Days, As Needed) — reuse that schedule model when generating "today's due doses" rather than designing a second one.

**Story points:** TBD
