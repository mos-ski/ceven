# QR-based attendance flow

## Context

This is the design behind a real gap raised in the July 17 dev-sync call: nobody had defined how QR-based attendance should actually work, for either child attendance (parent-driven drop-off/pickup) or staff attendance (caregiver sign-in/sign-out). The existing codebase already has a placeholder for this — `app/admin/v2/daily-operations/page.tsx` has a `"qr"` view with copy like "Scan QR code with your phone or enter login code," a live scanned feed, and an attendance grid — but none of it is backed by real logic. The parent app's attendance page (`app/(parent)/parent/attendance/page.tsx`) is currently read-only history; the caregiver app's attendance page (`app/(caregiver)/caregiver/attendance/page.tsx`) is a manual tap-to-cycle roster. Neither has any QR/scan mechanism today.

This spec defines the flow so it can be demoed to the team and prototyped in this repo (frontend-only, no backend — same convention as the rest of this codebase).

## Goals

- Define one attendance mechanism that works for both parents (child drop-off/pickup) and caregivers (staff sign-in/sign-out), reusing the same underlying code and scan action.
- Keep it simple enough for a small creche to run day-to-day: one code, not one per person.
- Preserve a safety net — manual entry always available if scanning isn't possible, for both roles.
- Enforce authorized-pickup safety without blocking legitimate one-off pickups by people who aren't in the app (drivers, grandparents, etc.).

## Out of scope

- Real backend/API implementation — this repo is a frontend-only prototype; the flow will be prototyped with local/mock state, same as everything else in this codebase.
- Break/temporary-departure tracking during a caregiver's shift — just start-of-day sign-in and end-of-day sign-out.
- Geofencing or GPS-based validation of where a scan happens — out of scope for this pass.
- A dedicated `types/room.ts` or room CRUD system — rooms remain a string field as they are today.

## Core model

- **One QR code per creche**, not one per child or per staff member. The admin generates it; it carries no per-person identity — just "this is creche X, valid today."
- Alongside the QR, the admin's screen also shows an **8-digit numeric code** with the same validity, for manual entry when scanning isn't possible (camera broken, code smudged, etc.).
- The code **auto-rotates daily** (fixed rollover time, e.g. midnight). The admin can also **force-regenerate** it at any time, e.g. if they suspect it's been shared outside the creche.
- Admin's choice whether to display it on a screen at the entrance or print it out — the design doesn't mandate either.
- Both parents and caregivers scan the **same code**, each using their own logged-in app (parent app or caregiver app respectively). The app never needs to distinguish "a parent's code" from "a staff code" — it already knows who's scanning from their login, and looks up what action applies to that person.

## Parent flow (drop-off & pickup)

1. Parent opens the app, taps **"Scan attendance code."**
2. Camera opens; they scan the venue QR, or tap **"Enter code instead"** to type the 8-digit fallback.
3. App validates: is this a valid, current code for a creche where this parent has at least one enrolled child?
4. App shows a **child picker** — every child this parent has enrolled at that creche, each labeled with their current state for today (e.g. "Not yet dropped off," "Checked in since 8:05 AM"). The parent selects which child(ren) this scan applies to right now. This naturally handles mixed states — e.g. one child already dropped off by a co-parent, another not — since the parent only acts on what's relevant to them at that moment.
5. For each selected child, the app logs the opposite of their current state: not checked in → **drop-off** (check-in, timestamped); checked in → **pickup** (check-out, timestamped, recording who picked up).
6. **Pickup-specific check:** if the scanning parent isn't on that child's authorized pickup list, the action still completes but is flagged as an exception, and the other parent/guardian and admin are notified. (Matches the existing "unauthorized pickup" concept already present in the mock incident/report data.)

### Alternate one-off pickup (no CEven account)

For a driver, grandparent, or anyone else picking up who isn't a registered app user:

1. The primary parent generates a **short-lived one-time code** in their app, tied to a named person and today's date.
2. They share it with that person however they like (WhatsApp, SMS, verbally).
3. That person shows or tells the code to a staff member at the creche — no app, no scanning required on their end.
4. Staff enters the code into the caregiver app, which confirms the named person and logs the pickup under their name, same as any other pickup event.

## Caregiver/staff flow (sign-in & sign-out)

1. Caregiver opens the caregiver app, taps **"Scan attendance code"** — same action pattern as the parent app.
2. Scans the venue QR, or enters the 8-digit fallback.
3. App checks their current state for today: not signed in → logs **sign-in**; already signed in → logs **sign-out**. No manual in/out selection — the same toggle logic as the parent flow, just applied to the caregiver's own attendance record instead of a child's.
4. This is start/end of shift only — no break or mid-day departure tracking in this pass.

### Manual fallback stays

The caregiver app's existing manual roster screen (tap a child to cycle Present → Late → Absent) is **not removed**. It remains the fallback for when a parent forgets to scan or the scanning system is down. Manual entries are visibly labeled "Manual" in the record, distinct from "QR verified" entries, so there's always a clear audit trail of how each attendance record was created.

## Admin flow

1. A dedicated **attendance code screen** in admin v2 — extending the existing placeholder `"qr"` view in `daily-operations` — displays today's QR code and 8-digit fallback, sized to work on a screen or in a printout.
2. The code **auto-rotates daily**; the admin can also **force-regenerate** at any time.
3. Admin (or a caregiver) can **manually verify a one-off alternate-pickup code**: enter it, confirm the named person, complete the pickup under that name.
4. The existing "Live Scanned Feed" and "Attendance Grid" mockups in `daily-operations` become the real live view of scan activity — check-ins/check-outs as they happen, with exceptions (unauthorized pickup, expired code, etc.) surfaced inline rather than in a separate place.

## Exceptions & edge cases

| Situation | Behavior |
|---|---|
| Scanning parent not on child's authorized pickup list | Pickup still completes, flagged as an exception, other parent/guardian + admin notified |
| Expired code (yesterday's) or code for wrong creche | Clear error; prompt to re-scan or check the current displayed code |
| Camera/scanner unavailable | 8-digit manual entry always available, for both parents and caregivers |
| Parent's children in mixed states (one dropped off, one not) | Child picker shows each child's current state individually; parent acts only on what applies |
| One-off pickup by someone with no CEven account | Handled via the one-time code + staff manual verification flow above, not by scanning |

## Data model notes (for the prototyping pass)

New concepts needed on top of what already exists in `lib/mock-data/*` and `lib/caregiver/mock-data.ts`:

- A per-creche **attendance code** record: the current QR/8-digit value pair, its valid-from/valid-until window, and a way to force-regenerate it.
- A **one-time alternate-pickup code** record: named person, child(ren) it applies to, valid date, consumed/unconsumed state.
- Attendance events (both child and staff) need a **source** field distinguishing `"qr"` from `"manual"`, so the existing history views can show which is which.
- Existing `AttendanceEvent` (parent) and `AttendanceRecord` (caregiver) types already carry most of the needed fields (check-in/out time, pickedUpBy, exception) — this mostly extends rather than replaces them.

## Open items for the implementation pass

- Exact screen/component structure for the parent and caregiver "scan" actions (new pages vs. modals) — left to the implementation plan.
- Visual design of the admin's attendance code display screen — left to the implementation plan, following existing admin v2 patterns.
- Whether the child picker defaults to "all selected" or "none selected" when opened — a small UX call left to the implementation plan/frontend-design.
