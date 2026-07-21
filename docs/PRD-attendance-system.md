# CEven — Attendance System PRD

| | |
|---|---|
| **Product** | CEven — Crèche ERP Operating System |
| **Feature** | QR-Based Attendance (Daily Operations Module) |
| **Document** | Product Requirements Document |
| **Version** | 1.0 |
| **Status** | Draft |
| **Owner** | Product (Adedamola Adewale) |
| **Screen ID** | `sc-daily-operations`, `sc-parent-attendance`, `sc-caregiver-attendance` |
| **Plan tier** | All Plans |

---

## 1. Overview

### 1.1 Purpose

Right now, a crèche's daily attendance — who dropped off which child, who picked them up, which staff member showed up for their shift — is either tracked on paper or lives entirely in a staff member's memory. This PRD defines CEven's attendance system: a single QR code (with a manual fallback code) displayed at the crèche, that parents and staff both scan with their own phones to log attendance automatically, with no separate hardware and no per-person cards to issue or lose.

This completes the Reception QR Station already defined in the Daily Operations module — the code display, live scan feed, and attendance grid already exist as a shell; this PRD defines the mechanism that actually drives them.

### 1.2 Core Value Proposition

- **One code, everyone uses it** — a single QR code (and 8-digit fallback) per crèche, not one per child or staff member. Nothing to print per person, nothing to reissue when a child leaves or a new one joins.
- **The app knows who's scanning** — parents and staff scan with their own logged-in app. CEven identifies the person and figures out the correct action (drop-off vs. pickup, sign-in vs. sign-out) automatically — no mode selection required.
- **Safety without friction** — pickups are checked against each child's authorized pickup list, and a parent can still authorize a one-off pickup by someone without the app (a driver, a grandparent) without compromising that check.
- **Never blocked by a broken scanner** — every scan action has a manual-entry fallback, and every parent/staff action has an admin-side manual override.

### 1.3 What This Is Not

- This is **not** a per-person ID system. No individual QR codes are issued to children or staff — the code identifies the crèche, not the person.
- This is **not** a biometric or geofenced system. It does not verify physical presence beyond "this person scanned this crèche's current code."
- This is **not** a shift-scheduling or payroll-hours system. It logs sign-in/sign-out timestamps; it does not calculate hours worked, overtime, or wages.
- This is **not** a replacement for the existing manual check-in — that stays as the fallback for both parents and staff.

---

## 2. User Stories

### As a Parent/Guardian
- I want to scan a single code at drop-off so my child's arrival is logged without anyone at the front desk having to do anything.
- I want to select exactly which of my children a scan applies to, since I don't always drop off or pick up all of them together.
- I want the app to know automatically whether I'm dropping off or picking up, so I never have to pick the wrong option.
- I want to be flagged (not silently blocked) if I try to pick up a child I'm not on the authorized list for, so mistakes get caught without turning into a standoff at the door.
- I want to authorize someone else — a driver, a grandparent — to pick up my child for me today, even if they don't have the app.
- I want a manual code I can type in if my camera won't scan.

### As a Caregiver/Staff Member
- I want to scan the same code to sign in when I arrive and sign out when I leave, without a separate system for staff attendance.
- I want the app to know automatically whether I'm signing in or signing out.
- I want to still be able to manually mark a child present/absent on my roster if a parent forgets to scan.
- I want to manually verify a parent's one-time pickup code for someone who doesn't have the app.

### As a Crèche Admin/Owner
- I want to display one code at reception — on a screen or printed — that works for every parent and every staff member.
- I want that code to refresh automatically every day, and to be able to force a new one immediately if I think it's been shared outside the crèche.
- I want a live view of who's checked in, checked out, or flagged as an exception, at any moment.
- I want every attendance record to clearly show whether it came from a scan or a manual entry, so I can see where the gaps are.

---

## 3. Attendance Code Generation

### 3.1 Code Properties

| Property | Spec |
|---|---|
| **Scope** | One active code per crèche. Not per child, not per staff member. |
| **Formats** | A scannable QR code, plus an 8-digit numeric code with identical validity — the numeric code is the fallback when scanning isn't possible. |
| **Rotation** | Auto-rotates daily at a fixed rollover time (default: midnight). |
| **Manual regeneration** | The admin can force-regenerate the code at any time (e.g. if it's suspected to have leaked outside the crèche). Regenerating immediately invalidates the previous code. |
| **Display** | Admin's choice — shown on a screen at the entrance (Reception QR Station) and/or printed. The system does not require either. |

### 3.2 Reception QR Station (Admin-Facing)

Extends the existing Reception QR Station screen in Daily Operations:

```
┌─────────────────────────────────────────────────────────────┐
│  Udebem Crèche  [Active]          [Log Exception] [Manual +] │
│                                                               │
│  ┌───────────────────────┐   Live Scanned Feed  ● Live      │
│  │                       │   ┌─────────────────────────────┐ │
│  │     [ QR CODE ]       │   │ AO  Ada Okafor   Parent  IN │ │
│  │                       │   │ CN  Chidi N.     Staff   IN │ │
│  │   Backup code: 4471   │   │ ...                          │ │
│  │       8823            │   └─────────────────────────────┘ │
│  │                       │                                   │
│  │  [Download] [Print]   │   Attendance Grid                 │
│  │  Refreshes daily ·    │   [All Rooms ▾] [All Users ▾] 🔍  │
│  │  [Regenerate now]     │   ┌────┐ ┌────┐ ┌────┐            │
│  │                       │   │ IN │ │ IN │ │PEND│  ...       │
│  │  Scan with your phone │   └────┘ └────┘ └────┘            │
│  │  or enter the code    │                                   │
│  └───────────────────────┘                                   │
│  CHECK-Ins: 12  CHECK-Outs: 3  EXCEPTIONS: 1                 │
└─────────────────────────────────────────────────────────────┘
```

- The **Live Scanned Feed** and **Attendance Grid** are the existing shell components, now driven by real scan events from both the parent and caregiver apps.
- **"Regenerate now"** is new — forces immediate code rotation, with a confirmation prompt ("Anyone with the current code will no longer be able to use it. Continue?").
- Exceptions (unauthorized pickup attempts, expired-code scans) appear in the feed and increment the **EXCEPTIONS** counter, same as today's exception logging.

---

## 4. Parent Flow — Drop-off & Pickup

### 4.1 Scan Flow

1. Parent opens the CEven app, taps **"Scan attendance code."**
2. Camera opens. They scan the crèche's QR code, or tap **"Enter code instead"** to type the 8-digit fallback.
3. The app validates the code is current and belongs to a crèche where this parent has at least one enrolled child.
4. The app presents a **child selector**.
5. For each child the parent selects, the app logs the opposite of that child's current state for today.
6. On pickup, the authorized-pickup check runs (see §4.3).

```
┌─────────────────────────────────┐
│  Who are you signing in/out?    │
│                                  │
│  ☑ Ada  · Not yet dropped off    │
│  ☑ Tomiwa · Not yet dropped off  │
│  ☐ Zainab · Checked in 8:05 AM   │
│                                  │
│         [ Confirm ]              │
└─────────────────────────────────┘
```

- Each child is shown with their current state so the parent can see, at a glance, who still needs action and who's already been handled (e.g. by a co-parent earlier that morning).
- Selecting a child who is **not checked in** logs a **drop-off** (check-in, timestamped).
- Selecting a child who **is checked in** logs a **pickup** (check-out, timestamped, recording who picked up).

### 4.2 Authorized Pickup Check

- Every pickup checks whether the scanning parent/guardian is on that child's authorized pickup list.
- If they are **not** on the list, the pickup still completes (a legitimate parent should never be physically blocked at the door), but it is immediately flagged as an exception: the crèche admin and the child's other listed parent/guardian are notified.

### 4.3 Alternate One-Off Pickup (No CEven Account)

For a driver, grandparent, or anyone else who doesn't use the app:

1. The primary parent generates a **one-time code** in their app, tied to a named person and today's date only.
2. They share the code with that person however they like (WhatsApp, SMS, verbally).
3. That person shows or states the code to a staff member at the crèche — they don't need the app or a smartphone at all.
4. Staff enters the code into their app, which confirms the named person and logs the pickup under their name, exactly like any other pickup event.
5. The code is single-use — once consumed, it cannot be reused, and it expires automatically at the end of the day it was issued for.

---

## 5. Caregiver/Staff Flow — Sign-in & Sign-out

### 5.1 Scan Flow

1. Caregiver opens the CEven staff app, taps **"Scan attendance code."**
2. Scans the crèche's QR code, or enters the 8-digit fallback.
3. The app checks their current state for today: not signed in → logs **sign-in**; already signed in → logs **sign-out**.
4. This covers start and end of shift only — it is not a break or mid-day movement tracker.

### 5.2 Manual Roster (Unchanged, Retained as Fallback)

The existing manual roster screen — where a caregiver taps a child to cycle Present → Late → Absent — is retained without changes. It's the fallback whenever a parent forgets to scan or the code isn't available. Every attendance record is labeled either **"QR verified"** or **"Manual"**, so there's a visible audit trail of how each entry was created.

---

## 6. Roles & Permissions

| Role | Scan to log own attendance | Verify one-time pickup code | Regenerate crèche code | Manual roster override |
|---|---|---|---|---|
| **Parent/Guardian** | Yes (drop-off/pickup for their children) | No | No | No |
| **Caregiver** | Yes (sign-in/sign-out) | Yes | No | Yes |
| **Admin** | N/A | Yes | Yes | Yes |
| **Owner** | N/A | Yes | Yes | Yes |

---

## 7. Notifications

| Event | Recipient | Message |
|---|---|---|
| Child dropped off | Other parent/guardian | *"[Child] was checked in at [Crèche] at [time]."* |
| Child picked up | Other parent/guardian | *"[Child] was picked up from [Crèche] at [time] by [Name]."* |
| Unauthorized pickup attempt | Admin, other parent/guardian | *"[Name] scanned to pick up [Child] but isn't on the authorized pickup list. Pickup was logged as an exception."* |
| One-time pickup code used | Primary parent | *"[Name] used your one-time code to pick up [Child] at [time]."* |
| Staff signed in / signed out | Admin | Reflected in the Reception QR Station live feed; no push notification by default. |
| Crèche code regenerated | Admin (confirmation only) | *"Attendance code regenerated. The previous code is now invalid."* |

---

## 8. Navigation & Information Architecture

| Surface | Location |
|---|---|
| Admin — code display, live feed, attendance grid | Daily Operations → Reception QR Station (existing screen, extended) |
| Parent — scan action | New "Scan attendance code" entry point from the Parent app home screen |
| Parent — one-time pickup code generation | Parent app → Child profile → "Authorize a pickup" |
| Caregiver — scan action | New "Scan attendance code" entry point from the Caregiver app home screen |
| Caregiver — manual roster (existing) | Caregiver app → Attendance (unchanged) |
| Caregiver — verify one-time pickup code | Caregiver app → Attendance → "Enter pickup code" |

---

## 9. Plan Tier Gating

| Tier | Attendance System Access |
|---|---|
| **Seedling** | ✅ Full access |
| **Nestling Pro** | ✅ Full access |
| **Flourish** | ✅ Full access |

Attendance tracking is core, day-one functionality for every crèche on CEven — it is available on **All Plans**, not gated as a premium feature.

---

## 10. Security & Compliance

| Requirement | Implementation |
|---|---|
| **Code scope** | Code identifies the crèche only — never encodes a specific child's or staff member's identity. |
| **Daily rotation** | Automatic rotation limits how long a leaked code remains usable. |
| **Manual regeneration** | Admin can invalidate the current code on demand. |
| **Authorized pickup enforcement** | Every pickup is checked against the child's authorized list; mismatches are flagged, never silently allowed or silently blocked. |
| **One-time pickup codes** | Single-use, expire at end-of-day, tied to a specific named person and child — cannot be reused or shared onward for a different pickup. |
| **Audit trail** | Every attendance event (QR-verified or manual) is logged with timestamp, actor, and method, visible in the Reception QR Station and each child's/staff member's history. |

---

## 11. Edge Cases & Error Handling

| Scenario | Behavior |
|---|---|
| Scanned code is yesterday's (expired) | Clear error message; prompt to re-scan the currently displayed code. |
| Scanned code belongs to a different crèche | Error message; scan rejected. |
| Camera/scanner unavailable | 8-digit manual entry always available, for both parent and caregiver apps. |
| Parent has children in mixed states (one already dropped off by a co-parent, one not) | Child selector shows each child's current state individually; parent only acts on what applies to them. |
| Pickup by someone not on the authorized list | Pickup completes, flagged as an exception, other parent/guardian and admin notified. |
| One-time pickup code already used, or expired | Rejected with a clear message; staff prompted to verify the person's identity through another means or contact the primary parent. |
| Parent forgets to scan entirely | Caregiver can log the child manually via the existing roster screen, marked "Manual" in the record. |

---

## 12. Acceptance Criteria (Screen-Level)

### Reception QR Station (Admin)
- [ ] Displays the current QR code and 8-digit backup code.
- [ ] Code auto-rotates daily at a fixed time.
- [ ] "Regenerate now" forces immediate rotation with a confirmation prompt.
- [ ] Live Scanned Feed reflects real scan events from parent and caregiver apps.
- [ ] Attendance Grid reflects current check-in/out state per child and staff member.
- [ ] Exceptions (unauthorized pickup, expired code) appear in the feed and increment the exception count.

### Parent App
- [ ] "Scan attendance code" entry point is available from the home screen.
- [ ] Scanning opens the camera; a manual 8-digit entry option is always visible.
- [ ] After a valid scan, the child selector shows every enrolled child at that crèche with their current state.
- [ ] Confirming logs a drop-off or pickup per selected child, based on their individual current state.
- [ ] An unauthorized pickup attempt still completes but is flagged and triggers notifications.
- [ ] Parent can generate a one-time pickup code for a named person, valid for the current day only.

### Caregiver App
- [ ] "Scan attendance code" entry point is available from the home screen.
- [ ] Scanning logs sign-in or sign-out automatically based on current state.
- [ ] Existing manual roster screen (Present/Late/Absent) is unchanged and available as a fallback.
- [ ] Caregiver can enter and verify a parent's one-time pickup code, logging the pickup under the named person.
- [ ] Every attendance record is labeled "QR verified" or "Manual."

---

## 13. Dependencies

| Dependency | Status | Impact |
|---|---|---|
| Parent app child enrollment data | Required | Determines which children appear in a parent's selector at a given crèche |
| Child authorized pickup list | Required | Drives the pickup authorization check |
| Daily Operations / Reception QR Station shell | Required | This PRD extends the existing screen rather than replacing it |
| Push notification system | Required | Drives drop-off/pickup/exception notifications to parents and admin |

---

## 14. Future Enhancements (Out of Scope for v1)

- Per-room codes, in addition to (or instead of) one code per crèche.
- Break or mid-shift departure/return tracking for staff.
- Geofencing or location verification of where a scan takes place.
- Analytics on attendance patterns (persistent lateness, no-shows) beyond the raw log.
- Multi-entrance support (more than one active code per crèche at once).
