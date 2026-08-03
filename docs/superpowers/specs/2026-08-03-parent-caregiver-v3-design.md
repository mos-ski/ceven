# Parent/Caregiver v3 Design Spec

Date: 2026-08-03
Status: Draft for review
Source references:
- `/Users/theoneglobal/Downloads/New Version for caregiver to Parent.docx`
- `/Users/theoneglobal/Downloads/CEven Home.html`
- Existing repo ticket: `docs/tickets/independent-caregiver-01-invite-flow.md`

## Product Frame

Parent/Caregiver v3 is the CEven home-care experience for a parent and a parent-invited caregiver. It extends the existing parent and caregiver apps beyond creche-only coordination, while keeping the public product language simple: Parent/Caregiver v3.

The implementation may still use `independent caregiver` as an internal relationship type because this caregiver is not attached to a creche workspace. That internal name should not dominate the user-facing copy.

## Core Principle

The module should focus on what is used on a normal day:

- The parent sends the plan down: food timetable, event prep, notes, approvals.
- The caregiver sends the day back up: check-ins, ticks, medicine, spending, photos, low-stock items, and the daily report.
- The system keeps one shared household record so both sides see the same truth.

Features outside daily use, such as tutor/learning workflows and formal caregiver workspace setup, are out of scope for this first v3 build.

## Users

Parent:
Usually a working parent checking the app in short bursts. The parent wants to know what is happening at home without constant calls or WhatsApp back-and-forth.

Caregiver:
A parent-invited home caregiver, nanny, house help, or trusted relative. She needs a simple operational screen that says what to do next, lets her tick things off, and helps her send a clean daily report.

## Current Repo Baseline

The repo already includes the first pairing slice:

- Parent child profile can invite a caregiver with name and phone.
- Invite links are single-use and expiring in mock local storage.
- Caregiver can open `/caregiver/invite/[code]`.
- Caregiver can verify the invite with the prototype OTP and accept it.
- Accepted relationships can appear in the caregiver app as family-linked children.

Parent/Caregiver v3 should build on this existing invite foundation instead of replacing it.

## Scope For First Build

### Parent Side

Add a Parent/Caregiver v3 home-care surface for the parent with:

- Home summary: caregiver duty state, next meal, next event prep count, money request status, latest daily report, and activity feed.
- Food timetable: 7-day plan with meal slots and a share action for today or the week.
- Family calendar: shared events with caregiver-facing get-ready checklists and notes.
- Money approvals: approve or decline caregiver market-money requests.
- Daily report view: read the report generated from caregiver activity.
- Chat: one simple thread between parent and caregiver.

### Caregiver Side

Add a Parent/Caregiver v3 caregiver surface with:

- Join/welcome handoff after accepting an invite.
- Today screen: check in/out, child cards, today's menu checklist, medicine reminders, event prep checklist, market list, and quick log actions.
- Daily report: auto-built from completed actions with mood chips, notes, photos, spending, receipt placeholder, and low-stock items.
- Calendar: the caregiver view of the same shared events and prep lists.
- Chat: one simple thread with the parent.
- Emergency action: a clearly separated SOS flow that alerts the parent in the prototype state.

### Shared System

Use one shared mock data/state layer for:

- Household pairing.
- Children attached to the household.
- Meal ticks.
- Medicine status.
- Event prep checklist status.
- Money request status.
- Market list.
- Activity feed.
- Daily report status.
- Chat messages.

This shared layer can be mock/local-storage-backed for the prototype, but should be typed and structured so real backend data can replace it later.

## Out Of Scope

- Tutor/Learning user type from the HTML artifact.
- Caregiver-created workspaces or business setup.
- Creche staff scheduling.
- In-app payments or wallet transfers.
- Background checks or identity verification beyond invite phone OTP.
- Multi-caregiver household scheduling.
- GPS tracking or video monitoring.

## Naming And Routes

User-facing name: Parent/Caregiver v3.

Recommended route shape:

- Parent v3 entry: `/parent/v3`
- Parent child profile can keep its current invite UI and add a link into v3 once a relationship exists.
- Caregiver v3 entry: `/caregiver/v3`
- Invite acceptance can continue to use `/caregiver/invite/[code]`, then route accepted users into `/caregiver/v3`.

Internal names may use:

- `independentCaregiverRelationship`
- `parentCaregiverV3`
- `householdCare`

Avoid product-facing labels like "independent caregiver module" unless the context is technical/admin.

## UX Direction

Use the current CEven design system:

- Fonts: Mogra, Merriweather, Urbanist.
- Backgrounds: warm off-white such as `#FFF9F0` and caregiver app warm surfaces.
- Brand brown as the main action color.
- 8px radius for core controls and cards where possible.
- Mobile-first, dense enough for repeated daily use.

The caregiver side should be more operational than decorative. The Today screen must answer: "What do I need to do now?"

The parent side should be glanceable. Parent Home must answer: "Is everything okay, and what needs my decision?"

## Interaction Model

Caregiver actions should immediately update parent-facing state:

- Ticking a meal adds activity and updates the daily report draft.
- Marking medicine given or skipped updates activity and report status.
- Ticking event prep updates the parent event progress card.
- Requesting market money creates an approval card for the parent.
- Adding low-stock items updates the shared market list.
- Sending the daily report creates the report card on parent Home.
- Pressing emergency creates a prominent alert in parent Home.

Parent actions should immediately update caregiver-facing state:

- Sharing a menu populates caregiver Today.
- Creating or editing an event updates caregiver Calendar and Today.
- Approving or declining money changes caregiver request status.
- Sending chat messages appears in the caregiver thread.

## Data Shape

Create a focused mock domain model with these entities:

- Household: id, parent profile, caregiver profile, children.
- Child: id, name, age, avatar/initials, health notes.
- MealPlanDay: date/day, meals.
- MealItem: id, child scope, meal type, name, time, notes, status.
- CalendarEvent: id, child ids, title, date/time, location, note, prep items.
- PrepItem: id, label, done, completedAt.
- MedicineReminder: id, child id, name, dosage, time, status, skippedReason.
- MarketRequest: id, amount, reason, status, receipt/spending summary.
- MarketListItem: id, label, addedBy, status.
- ActivityItem: id, timestamp, category, text, actor.
- DailyReport: id, date, child summaries, medicine summary, spending, low-stock items, mood, note, photos, sent state.
- ChatMessage: id, sender, text, timestamp.

## Error And Empty States

- No accepted relationship: parent sees invite CTA; caregiver sees join flow.
- Expired or used invite: existing clear problem states remain.
- No timetable shared: caregiver Today shows an empty plan with a prompt to ask parent.
- No money request: parent Home does not show approval card.
- No report sent: parent Home shows "auto-building" or no report card depending on relationship state.
- Offline/mock sync: show optimistic local updates; do not simulate complex failure handling in v3 prototype.

## Testing And Verification

Minimum verification for implementation:

- Parent invite creates a relationship and caregiver acceptance routes into v3.
- Caregiver meal/prep/medicine ticks update parent Home or activity feed.
- Parent money approval updates caregiver state.
- Caregiver daily report sends and appears for parent.
- Emergency action appears on parent Home.
- Parent and caregiver routes render at mobile width without overlap.
- `npm run build` passes.
- Targeted lint passes for touched files, with known unrelated lint debt left untouched.

## Later Product Decisions

- Whether `/parent/v3` should become the default parent home later.
- Whether parent/caregiver chat should reuse existing chat pages or use v3-specific lightweight screens first.
- Production rules for SOS escalation beyond the prototype parent alert.
