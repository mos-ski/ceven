# Enrollment flow, Enrollments list, and Transaction History

## Context

Comparing the prototype against screenshots of the live CEven app surfaced three functional gaps:

1. The creche detail page's "Enrol Now" opens a generic "share medical conditions" inquiry modal — the live app runs a real three-step enrollment wizard (pick child → pick room → age-validated details form → success).
2. The prototype tracks a single application (`/parent/application`, status timeline + next steps) — the live app shows an **Enrollments list**: multiple per-child records with Pending/Active/Cancelled status chips and a per-record "Withdraw Child" action.
3. The live app has a **Transaction History** screen; the prototype has none.

This spec fills all three. It follows the App Store compliance stance already shipped (commit `f9fe31d`): the app never initiates a payment — Transaction History is a display-only ledger of tuition payments recorded outside the app, with no subscription rows.

## Goals

- Real enrollment wizard on the creche detail page: select child profile → select room → enrollment details with age validation → success modal linking to the Enrollments list.
- Enrollments list screen with search, status chips, withdraw action, and a details view that includes a status timeline.
- Display-only Transaction History screen.
- Navigation wiring: Settings gains "Enrollments" and "Payment History" rows; the home dashboard's "Application/Waitlist" tile becomes "Enrollments"; the success modal's "View Enrollments" button links to the list.

## Out of scope

- Editing child profiles (the "Edit complete profile" button is a visual stub).
- Multi-child data anywhere outside the new enrollment screens — the rest of the parent app keeps using `mockChild`.
- Any payment initiation, Pay Now, or purchase flow (compliance).
- Admin-side enrollment management.
- The existing "Billing History" settings row/screen — untouched.

## Data layer

Three new modules in `lib/shared/`, following the established pattern there (localStorage via `sharedGetList`/`sharedSet`, mock seed on first read, `addNotification` on state changes):

### `lib/shared/enrollment-children.ts`

Three mock child profiles with varied ages so room age-validation demonstrably passes and fails:

- Zain Adewale — male, ~6 months old
- Philip Adewale (nickname "Bobo") — male, ~2 years old
- Joy Adewale (nickname "Jay") — female, ~6 years old

Each: `id`, `name`, `nickname?`, `gender`, `birthDate` (ISO), `avatarInitials`. Helpers: `getEnrollmentChildren()`, `getAgeInMonths(birthDate)`, `formatAge(months)` (e.g. "6 Months", "2 Years", "6y 5m").

### `lib/shared/enrollments.ts`

`Enrollment`: `id`, `childId`, `childName`, `childGender`, `ageAtEnrollmentMonths`, `crecheId`, `crecheName`, `location`, `roomId`, `roomName`, `status: "pending" | "active" | "cancelled"`, `startDate?`, `notes?`, `submittedAt`, `statusHistory: { status, timestamp, note? }[]`.

Functions: `getEnrollments()`, `createEnrollment(input)` (status starts `pending`, seeds history, fires a notification), `withdrawEnrollment(id)` (status → `cancelled`, appends history entry, fires a notification).

Seed data: three records covering all three statuses (e.g. Zain pending, Joy active, Philip active) at "Aorthar Creche"-style creches drawn from the existing `mockCreches`.

### `lib/shared/transactions.ts`

`Transaction`: `id`, `title`, `reference`, `amount` (number, ₦), `date` (display string), `status: "successful"`, `method` (e.g. "Bank Transfer", "Recorded by admin").

One function: `getTransactions()`. **No write functions** — nothing in the app can create a payment. Seed: 2–3 tuition payments.

## Screens & flows

### Enrollment wizard (modify `app/(parent)/parent/creche/[id]/page.tsx`)

"Enrol Now" opens a bottom-sheet wizard (replacing the current `AdditionalInfoModal`), three steps:

1. **Select Child Profile** — heading "Select Child Profile"; a card per child: avatar initials circle, name, nickname (small, under name), "{gender} · Age: {formatted age}", and an outlined "Edit complete profile" stub button. Selecting highlights the card (accent border). Footer button "Select Room" (disabled until a child is chosen).
2. **Select Room** — the creche's existing `rooms` list: name, age range, spots-available chip. Selecting highlights. Footer button "Continue".
3. **Enrollment Details** — heading "Enrollment Details"; optional "Preferred Start Date" (date input) and "Additional Notes" (textarea). **Age validation:** parse the chosen room's `ageRange` string; if the child's age in months falls outside it, show a red banner — "Child is too young for this room. Room age range is {range}. Child is {age} old." (or "too old") — and disable "Enroll Child". When valid, "Enroll Child" calls `createEnrollment` and shows the success modal.

Success modal: green check, "Successful", "Enrollment Successful! Your child has been enrolled in the creche.", primary button **View Enrollments** → `/parent/enrollments`, plus a close (×).

Back navigation inside the sheet returns to the previous step; closing the sheet resets it.

`ageRange` parsing must handle the formats present in `mockCreches` ("6-12 months", "1-2 years", "3-5 years", "1-3 years", "3-4 years") by normalizing both bounds to months. Unparseable ranges fail open (no validation error).

### Enrollments list (`app/(parent)/parent/enrollments/page.tsx` — new)

Brown header with back button + search field ("Search by first and last names."), then "Your Children Enrollment" heading and a card per record: avatar initials, child name, creche name, status chip (Pending amber / Active green / Cancelled red), "{gender} · Age At Enrollment: {formatted}", location row, "Starts: {date or N/A}", and an outlined **Withdraw Child** button (hidden for cancelled records). Withdraw asks an inline confirm (two-tap: button becomes "Tap again to confirm" briefly) then flips the record to Cancelled in place. Search filters by child name, case-insensitive.

Tapping a card (outside the withdraw button) opens a **details bottom sheet**: the card's fields plus the record's status timeline (dot-and-line list of `statusHistory` entries with dates and notes) — this is the piece retained from the old application screen.

### Replaces the old application screen

- Delete `app/(parent)/parent/application/page.tsx` and `lib/shared/application.ts` (check for other importers first; migrate or delete stale references).
- Home dashboard tile "Application/Waitlist" (`app/(parent)/parent/home/page.tsx`) becomes **Enrollments** → `/parent/enrollments` (same `FileText` icon, `isNew` badge).

### Transaction History (`app/(parent)/parent/settings/payments/page.tsx` — new)

Header "Transaction History" with back button; "({n}) Transactions" count line; a card per transaction: brand icon circle, title, reference (small gray), bold ₦ amount, date line, green "Successful" chip. View-only — no buttons that create or modify anything.

### Settings wiring (`app/(parent)/parent/settings/page.tsx`)

Add two rows to `SETTINGS_ROWS`:
- **Enrollments** (GraduationCap icon) → `/parent/enrollments`, placed after "Find Creche"
- **Payment History** (Receipt icon) → `/parent/settings/payments`, placed after "Billing History"

## Error handling / edge cases

- Age validation fails open on unparseable age ranges.
- Withdraw on an already-cancelled record: button hidden, no path to double-withdraw.
- Empty states: enrollments list ("No enrollments yet — find a creche to get started" linking to `/parent/creche`); search with no matches ("No children match your search"); transactions ("No transactions yet").
- localStorage unavailable: modules already no-op safely via the shared storage helpers.

## Verification

No test framework in this repo. Per feature: `npx tsc --noEmit`, then manual dev-server walkthrough — full wizard happy path, an age-validation failure (Zain into a "3-5 years" room), withdraw flow, search filter, details timeline, transaction list render, settings/home tile navigation.
