# Check-In/Check-Out Visibility (Parent App)

**Type:** Story · **Component:** Parent App (cross-referenced against Admin V2 Daily Operations → Reception/QR) · **Screen ID:** TBD · **Plan tier:** All Plans

## Summary
Give parents a real-time view of when their child was checked in or out of the creche. This is one of the product's headline value props ("transparency for parents") and currently has zero mobile-app surface, even though the admin dashboard has had a live Reception/QR feed for a while.

## Background / Why
Per `docs/gap-analysis-v2-vs-mobile-2026-07-17.md`: Admin V2's Daily Operations → Reception/QR (`app/admin/v2/daily-operations/page.tsx`) tracks live check-in/out status (IN/OUT/Absent/Pending + timestamp) via QR scan at the front desk, plus exception logging (late pickup, unauthorized pickup, no ID, QR offline). The Caregiver app has the operational side of this (Attendance screen, `app/(caregiver)/caregiver/attendance/page.tsx`) but the Parent app has no corresponding screen at all — a parent currently has no way to know their child arrived or left today short of asking the caregiver directly in chat.

## User Stories
- As a parent, I want to know the moment my child is checked in or out, so I have peace of mind without needing to ask.
- As a parent, I want to see today's check-in/out history for my child (e.g. arrival time, departure time, who picked them up if different from usual).
- As a parent, I want to be notified if an exception occurs (e.g. an unauthorized pickup attempt) involving my child.

## Acceptance Criteria
- [ ] Parent Home screen (or a new dedicated card) shows today's check-in/out status for each of the parent's children: "Checked in at 8:03am" / "Checked out at 4:15pm" / "Not checked in yet."
- [ ] A push-style notification fires (surfaced in `/parent/notifications`) at the moment a check-in or check-out event happens for the parent's child.
- [ ] If an exception is logged against the parent's child (e.g. unauthorized pickup attempt), the parent receives a distinctly-styled, high-priority notification.
- [ ] Historical check-in/out log is viewable per child (at minimum: today + past 7 days), consistent with the pattern already used in `/parent/reports`.
- [ ] Data model mirrors the admin side's status values (`IN`, `OUT`, `Absent`, `Pending`) and exception types already defined in `daily-operations.ts` mock data — reuse those types/values rather than inventing new ones, so a future backend integration doesn't need two schemas.

## Definition of Done
- Verified in browser at mobile breakpoint (390px).
- Mock data added to `lib/parent/mock-data.ts` mirrors the same check-in/out event shape used in `lib/mock-data/daily-operations.ts`, not a redesigned one.
- No console errors; the notification and history views are wired to real (mock) data, not decorative.

## Notes / Risks
- This repo is frontend-only (no backend) — build as a clickable mock-data reference matching the real check-in/out flow shape; the actual real-time push (QR scan → parent notification) is a backend/integration concern for the official dev team.
- Consider whether this belongs on the Home feed, a new "Attendance" tab, or folded into Notifications — worth a quick design check before building, since it's a new IA surface not previously scoped in the Parent PRD.

**Story points:** TBD
