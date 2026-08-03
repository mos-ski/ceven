**CEven — Parent/Caregiver v3**

**Business Requirements Document (BRD) & Functional Requirements
Document (FRD)**

**Product:** CEven (Childcare coordination platform) **Module:**
Parent/Caregiver v3 flow ("lean" prototype) **Companion
module:** Existing Crèche-to-Caregiver flow (out of scope here,
referenced for context) **Document version:** 1.1 · August 2026
**Prototype reference:** Parent/Caregiver v3 imported HTML prototype

**How this document is organised:** After the BRD, the FRD is split into
three clearly separated parts:

- **PART 2A — THE PARENT SIDE** (Parent → Caregiver): everything the
  parent does and sends down.

- **PART 2B — THE CAREGIVER SIDE** (Caregiver → Parent): everything
  Aunty Blessing does and reports back up.

- **PART 2C — THE SHARED SYSTEM:** pairing, live sync, chat,
  notifications — the plumbing both sides stand on.

**PART 1 — BUSINESS REQUIREMENTS DOCUMENT (BRD)**

**1.1 Background & Problem Statement**

CEven already serves the crèche-to-caregiver relationship, where a
childcare centre reports to parents. However, a very large share of
childcare in Nigeria (and much of Africa) happens **at home, through an
independent caregiver** — a nanny, house help, or a trusted relative
("Aunty").

Today, coordination between a working parent and this caregiver happens
through phone calls, WhatsApp voice notes, and memory. This creates
recurring, daily friction:

- The parent doesn't know, in real time, whether the children have
  eaten, slept, or taken their medicine.

- The caregiver doesn't have a clear, written plan for the day — what to
  cook, what event is coming, what to pack.

- Money given for market runs is untracked, which breeds mistrust on
  both sides.

- Special events (swimming lessons, birthday parties, hospital visits)
  fail in small ways — a forgotten swim cap, an unwrapped gift — because
  instructions were verbal.

**1.2 Product Vision for This Module**

A **lightweight, two-sided daily coordination app** connecting one
household's parent(s) with their independent caregiver. The design
philosophy, set explicitly during discovery:

**90% of the features in the app must be used on a typical day.**

Features that sounded useful but would not be touched daily in the
Nigerian home context (e.g., chore tracking, structured
learning/"academy" modules, rigid routine builders) were deliberately
removed. What remains is the small set of things a parent and nanny
genuinely exchange every single day: **food, health, money, events, and
a report at the end of the day.**

**1.3 The Two Directions of the Product**

The module is best understood as **two flows meeting in the middle**:

| **Direction** | **Who drives it** | **What travels** | **Purpose** |
|----|----|----|----|
| **Parent → Caregiver** ("the plan goes down") | The Parent | Food timetable, calendar events with get-ready checklists and notes, money approvals | Tell the caregiver clearly what to do so the day and every event run smoothly |
| **Caregiver → Parent** ("the day comes back up") | The Caregiver | Live activity ticks, money requests + receipts, low-stock flags, the end-of-day report (feeding, sleep, diapers, medicine, mood, note, photos) | Give the parent real-time visibility and an accountable record of the day |

**1.4 Business Objectives**

| **\#** | **Objective** | **Direction** | **How the module delivers it** |
|----|----|----|----|
| BO-1 | Give parents daily peace of mind while at work | Caregiver → Parent | Live activity feed + end-of-day report per child |
| BO-2 | Remove ambiguity from the caregiver's day | Parent → Caregiver | Shared food timetable and event prep checklists become her to-do list |
| BO-3 | Build financial trust between parent and caregiver | Both | Request (up) → approval (down) → receipt-backed spending record (up) |
| BO-4 | Make special events run smoothly | Parent → Caregiver | Shared calendar where every event carries a caregiver-assigned "get ready" checklist |
| BO-5 | Extend CEven beyond crèches into home care | Both | New independent-caregiver role and household pairing (invite-code) model |

**1.5 Target Users**

**Primary persona — The Parent ("Mrs. Adeyemi"):** a working Nigerian
parent, on her phone in short bursts during the workday. Two children
(Zara, 4 and Tobi, 18 months). Wants control over the plan and
visibility into the day, with minimal taps.

**Secondary persona — The Independent Caregiver ("Aunty Blessing"):** a
nanny caring for the children at home. May not be highly tech-literate;
needs one obvious screen telling her *what to do next*, simple tick-off
interactions, and an easy way to report back without writing long
messages.

**1.6 Scope**

**In scope (v3 prototype):**

- Household pairing: parent invites caregiver via code; caregiver joins
  with the code.

- **Parent side:** weekly food timetable shared per day or per week;
  shared calendar events with prep checklists and notes; market-money
  approvals; report viewing; activity feed.

- **Caregiver side:** Today screen with tick-off menu, medicine
  reminders, and event prep; money requests with receipts and low-stock
  flags; auto-built daily report with mood, note, and photos.

- Two-way **chat** and live **shared state** (ticks by one side update
  the other instantly).

**Out of scope (v3):**

- Chore/housework tracking (removed by design — not a daily-use
  behaviour in this market).

- Educational/curriculum ("academy") content.

- Crèche flows (already exist in a separate module).

- In-app payments/wallet (approval is recorded; money still moves by
  cash/transfer outside the app).

- Multi-caregiver scheduling, GPS tracking, video monitoring.

**Flagged for a future release:** a lightweight running "shopping needs"
list that feeds the market-money request.

**1.7 Success Metrics**

- ≥ 90% of shipped features used at least once per active day per
  household (the guiding design metric).

- ≥ 80% of active days end with a daily report sent before 8 pm.

- ≥ 70% of market-money requests carry an attached receipt in the
  report.

- Event prep checklists fully completed before event start ≥ 85% of the
  time.

- Parent opens the app ≥ 3× on a working day (morning plan, midday
  check, evening report).

**1.8 Assumptions & Constraints**

- One household ↔ one caregiver pairing in v3 (one active caregiver
  account per family).

- Both users have Android/iOS smartphones with intermittent data; the
  app must be light and legible on small screens.

- Content (menu items, currency ₦, event types) is localised for
  Nigeria.

- Visual design must follow the CEven design system library: warm brown
  palette; Mogra (display), Merriweather, Urbanist, Nunito type; 8-px
  spacing grid; card-based layout consistent with the existing crèche
  caregiver app.

**PART 2A — FRD: THE PARENT SIDE (Parent → Caregiver)**

*This is the parent's app. Its job is to **send the plan down**: what to
cook, what's coming up, what to pack, and whether money is approved —
and to give the parent windows into the day (feed, report) that the
caregiver side sends up.*

**2A.1 Parent App Structure**

Bottom navigation, 4 tabs:

1.  **Home**

2.  **Food Timetable**

3.  **Calendar**

4.  **Chat** (shared feature — specified in Part 2C)

**2A.2 Parent — Home**

A **glanceable summary of right now**, composed of stacked cards:

**FR-P01 · "Up Next" card.** Shows the next item from today's shared
food timetable (e.g., "Lunch — Jollof rice & moi-moi, 12:30 pm") so the
parent always knows what's currently happening or coming.

**FR-P02 · Event prep status card.** For the nearest upcoming calendar
event, shows a live progress count of the caregiver's preparation
checklist (e.g., **"Swimming — 2 of 5 packed"**). This count updates in
real time as the caregiver ticks items (see FR-S03).

**FR-P03 · Market-money approval card.** When the caregiver requests
market money (FR-C10), a card appears with the requested amount (₦) and
reason, and two actions: **Approve** / **Decline**. The decision is
pushed to the caregiver instantly; the eventual spending and receipt
come back inside the daily report.

**FR-P04 · Daily report card.** Once the caregiver sends the daily
report (FR-C22), a summary card appears on Home ("Daily report from
Aunty Blessing — Zara 😊 · Tobi 😴"). Tapping opens the full report.

**FR-P05 · Activity feed.** A reverse-chronological stream of the
caregiver's logged moments through the day (fed Tobi, Zara napped,
medicine given, swim-bag item packed) — passive, real-time visibility
without having to ask.

**2A.3 Parent — Food Timetable**

**FR-P06 · 7-day menu.** The parent maintains a weekly timetable with a
day selector (Mon–Sun). Each day holds meal slots (breakfast, lunch,
snack, dinner) populated with localised Nigerian dishes (e.g., akamu &
akara; jollof rice; eba & egusi).

**FR-P07 · Day view & editing.** Tapping any day shows and edits that
day's meals.

**FR-P08 · Sharing.** Two share actions: **"Share today"** (pushes
today's menu to the caregiver's Today screen) and **"Share whole week"**
(pushes all 7 days). Shared meals become tick-off items on the caregiver
side (FR-C02).

**2A.4 Parent — Shared Calendar (Parent's Lens)**

**FR-P09 · Event creation & list.** The parent creates and views
upcoming events. Prototype seed events: **swimming lesson**, **birthday
party**, **vaccination appointment** — each with date, time, and the
child(ren) involved.

**FR-P10 · Get-ready checklist per event.** The core purpose of the
calendar: each event carries a **preparation checklist assigned to the
caregiver** (e.g., for swimming: pack swimsuit, towel, swim cap, snacks,
change of clothes) plus a free-text note ("Leave home by 3:30, driver
comes at 3:15"). This turns "there's an event" into "here is exactly
what to do so the event goes smoothly."

**FR-P11 · Assignment & progress visibility.** Checklists and notes are
explicitly addressed to the caregiver; the parent sees each event's live
completion state as she ticks (FR-S03).

**2A.5 Parent — Money Decisions**

**FR-P12 · Approve / decline requests.** (Acts on FR-C10.) The parent
approves or declines each market-money request from Home; approved
amounts are later reconciled against receipt-backed spending in the
daily report (FR-C19).

**2A.6 Parent — Reading the Daily Report**

**FR-P13 · Full report view.** From the report card (FR-P04), the parent
opens the complete report: per-child feeding, sleep, diapers, medicine
status, spending with receipt image, running-low items, mood chips,
note, and photos. (The report's contents are produced entirely on the
caregiver side — Part 2B, section 2B.5.)

**PART 2B — FRD: THE CAREGIVER SIDE (Caregiver → Parent)**

*This is Aunty Blessing's app. Its job is to **turn the parent's plan
into a simple tickable day**, and to **send the day back up**: live
activity, money requests with receipts, and the end-of-day report.
Designed for an independent nanny in a home — broader than a crèche
report, and with minimal typing.*

**2B.1 Caregiver App Structure**

Bottom navigation, 4 tabs:

1.  **Today**

2.  **Calendar**

3.  **Daily Report**

4.  **Chat** (shared feature — specified in Part 2C)

**2B.2 Caregiver — Joining the Household**

**FR-C01 · Join via code.** A new caregiver opens the app and enters the
household join code generated by the parent (FR-S01). On success she is
linked to the household and lands on **Today**, already populated with
the children (Zara, 4 · Tobi, 18 months), the shared timetable,
medicines, and events.

**2B.3 Caregiver — Today**

Her operational home screen: everything she must do **today**, as
tickable items. Every tick travels up to the parent instantly.

**FR-C02 · Today's menu checklist.** The shared food timetable for
today, rendered as meal items she ticks off as each meal is
prepared/served. Ticks are timestamped and flow to the parent's activity
feed (FR-P05) and into the daily report (FR-C16).

**FR-C03 · Medicine reminders.** Scheduled medicines per child appear
with time and dosage (e.g., "Tobi — Paracetamol syrup, 5 ml after
lunch"). Marking **Given** (or **Skipped**, with reason) logs it to the
feed and to the report's medicine section (FR-C17).

**FR-C04 · Event prep block.** When an event is upcoming, its
packing/prep checklist appears inline (e.g., the swim-bag list:
swimsuit, towel, swim cap, snacks, change of clothes). Ticking items
updates the parent's prep-status card live (FR-P02 via FR-S03).

**FR-C05 · Greeting & date header** with the children's avatars — one
glance tells her whose day she's running.

**2B.4 Caregiver — Money & Supplies (Caregiver → Parent)**

**FR-C10 · Raise a market-money request.** She requests market money
with an amount (₦) and purpose; the request appears on the parent's Home
for approval (FR-P03) and she sees the resulting status (Approved /
Declined).

**FR-C11 · Record spending with receipt.** After spending, she records
what was spent and attaches a **receipt photo**. This spending record is
embedded automatically in the daily report (FR-C19).

**FR-C12 · Flag low-stock items.** She can flag household/child items
**running low** (e.g., diapers, milk, garri). Flags surface in the daily
report (FR-C20) and naturally justify the next money request.

**2B.5 Caregiver — Daily Report (the flagship Caregiver → Parent
feature)**

Designed specifically for an **independent nanny in a home** — it covers
the household, not just classroom-style care — and **auto-built**, so
Blessing never starts from a blank page.

**FR-C15 · Auto-assembly.** The report drafts itself through the day
from everything logged on Today. Sending it is a review-and-send task,
not a writing task.

**FR-C16 · Per-child care summary.** For each child separately (Zara and
Tobi): **feeding** (meals served, from the ticked menu), **sleep/naps**
(times), and **diapers** (for Tobi, changes/count).

**FR-C17 · Medicine status.** Per child: each scheduled medicine marked
Given/Skipped, pulled from FR-C03.

**FR-C18 · Household coverage.** The elements a crèche report would
never have — because she runs the home, not a classroom:

**FR-C19 · Spending section.** Approved market money, amount spent, and
the attached receipt image (from FR-C11).

**FR-C20 · Running-low list.** Items flagged low in stock (from FR-C12).

**FR-C21 · Mood, note & photos.** She picks a **mood chip per child**
(e.g., 😊 happy, 😌 calm, 😫 fussy, 😴 sleepy), adds an optional short
note about the day, and attaches photos.

**FR-C22 · Send.** One **Send report** action delivers it to the parent;
the parent's Home immediately shows the received-report card (FR-P04).
One report per day per household.

**2B.6 Caregiver — Calendar (Caregiver's Lens)**

**FR-C23 · Same events, caregiver view.** She sees the identical shared
events with the parent's notes; each event's checklist is tickable from
here as well as from Today. Completed events show their finished state.

**PART 2C — FRD: THE SHARED SYSTEM (Both Sides)**

*The plumbing both apps stand on: pairing, one shared source of truth,
chat, and notifications.*

**2C.1 Pairing & Profiles**

**FR-S01 · Parent invite code.** The parent generates a short **join
code** representing the household; children profiles are attached
automatically. Used by the caregiver in FR-C01.

**FR-S02 · Child profiles.** Each child (name, age, photo/avatar) exists
once at household level and is referenced everywhere — timetable,
medicine, prep lists, reports. In the prototype, all per-child data is
duplicated for the two Adeyemi children.

**2C.2 Live Shared State**

**FR-S03 · One record, two lenses.** Prep checklists, menu ticks,
medicine status, and money-request status are **a single shared record
viewed by two roles**, not copies. A tick by the caregiver instantly
changes the parent's counts and cards, and vice-versa. (Demonstrated in
the prototype: ticking swim-bag items as Blessing updates the parent's
"2 of 5 packed" card in real time. A role switcher exists in the
prototype for demo purposes only; in production each user sees only
their own role.)

**2C.3 Chat**

**FR-S04 · Two-way messaging.** A simple 1:1 thread between parent and
caregiver — text with photo attachment — for anything the structured
features don't cover. Deliberately minimal: the timetable, calendar, and
report are meant to absorb most communication, keeping chat for
exceptions.

**2C.4 Notifications (Production Behaviour)**

**FR-S05 · Push notifications.**

- **To the parent:** daily report received; money request raised.

- **To the caregiver:** approval result; newly shared timetable or
  event; medicine time; event-day morning prep reminder.

**PART 3 — NON-FUNCTIONAL REQUIREMENTS & TRACEABILITY**

**3.1 Non-Functional Requirements**

| **ID** | **Requirement** |
|----|----|
| NFR-1 | **Design system compliance:** warm brown CEven palette; Mogra for display headings, Merriweather/Urbanist/Nunito for supporting text; 8-px spacing grid; card-based mobile layout matching the existing crèche caregiver app. |
| NFR-2 | **Simplicity budget:** every screen answers one question; primary actions are single-tap ticks/chips. Target: 90% of features used daily. |
| NFR-3 | **Low-literacy friendliness (caregiver side especially):** icon + emoji support (mood chips), short labels, minimal required typing. |
| NFR-4 | **Performance:** lightweight screens for mid-range Android devices and intermittent connectivity; caregiver logs should queue offline and sync when online (production). |
| NFR-5 | **Localisation:** ₦ currency, Nigerian meal content, en-NG copy tone. |
| NFR-6 | **Privacy:** child data and photos visible only to the paired household; caregiver access revocable by the parent. |

**3.2 Traceability — Business Objective → Features (by side)**

| **Business objective** | **Parent-side features** | **Caregiver-side features** | **Shared** |
|----|----|----|----|
| BO-1 Peace of mind | FR-P04, FR-P05, FR-P13 | FR-C15–C22 | FR-S05 |
| BO-2 Clear caregiver day | FR-P06–P08, FR-P09–P11 | FR-C02–C05 | FR-S03 |
| BO-3 Financial trust | FR-P03, FR-P12 | FR-C10–C12, FR-C19–C20 | — |
| BO-4 Smooth events | FR-P09–P11, FR-P02 | FR-C04, FR-C23 | FR-S03, FR-S05 |
| BO-5 Home-care expansion | FR-S01 (generated by parent) | FR-C01 | FR-S02 |

**3.3 Deferred / Future Considerations**

1.  **Shopping-needs list** — a running low-stock list that pre-fills
    market-money requests (identified during design as the one likely
    missing daily habit).

2.  Multiple caregivers / caregiver handover per household.

3.  Report history & weekly digest for the parent.

4.  Voice-note logging for the caregiver.

5.  In-app money transfer to close the loop on FR-C10–C11.
