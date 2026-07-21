# Parent home screen: quick-actions dashboard

## Context

The parent app's Home screen currently doubles as both the landing screen and the Moments/Special-Requests feed itself — a tab switcher inline on Home shows either the photo/update feed ("Moments") or a task list ("Special Requests"), with a floating "+" button to create a new special request. This is inconsistent with the caregiver app, whose Home is a pure dashboard: a couple of stat cards plus a grid of "Quick Actions" tiles (Scan Code, Log Activity, Log Report, Attendance, Fees, Gallery, Medication, Incidents, Growth, Ratings, Events, Announce), each navigating to its own dedicated screen.

This spec redesigns the parent Home to match that dashboard pattern: Moments and Special Requests become their own dedicated screens reached via tiles, alongside tiles for every other parent-facing feature that already has a dedicated page.

## Goals

- Home becomes a pure dashboard: header, the existing scan/check-in banners, then a grid of quick-action tiles grouped into labeled sections — no inline feed content.
- Every parent feature that already has its own route gets a tile. The two features that don't yet have a dedicated route (Moments, Special Requests) get one built as part of this work.
- Preserve the two time-sensitive banners (Scan attendance code, today's check-in status) exactly as they are today, above the tile sections.
- Remove the now-redundant header kids icon, since "Manage Kids" becomes a tile.

## Out of scope

- Changing the bottom navigation bar (Home, CEvenAI, Report, Chat, Settings stays as-is).
- Changing the content or behavior of any of the 11 already-existing feature screens the new tiles link to — this is purely about adding an entry point from Home.
- Redesigning the Moments feed's or Special Requests list's own internal UI/behavior — they're relocated to their own screens with their existing content and logic, not redesigned.

## Design

### Header

Simplifies to: avatar + "Welcome Back, {name}" on the left, notification bell on the right. The kids-management icon that previously sat next to the bell is removed (superseded by the "Manage Kids" tile below).

### Top banners (unchanged)

Directly below the header, in the same order and styling as today:
1. "Scan attendance code" — brown CTA banner, links to `/parent/scan`.
2. Today's check-in status — green banner showing whether the child has checked in today, links to `/parent/attendance`.

### Quick-action tile grid

Below the banners, a "Quick Actions" heading followed by four labeled sections, each a 3-column grid of tiles (icon + label, matching the caregiver app's `QuickActionCard` visual style — square tile, icon in a circle, label beneath, optional "New" badge):

**My Family**
- Manage Kids → `/parent/children`
- Moments → `/parent/moments` (new)
- Gallery → `/parent/gallery`

**Health & Care**
- Growth → `/parent/child/growth`
- Medication → `/parent/medication`
- Incidents → `/parent/incidents`
- Rate Caregiver → `/parent/rate-caregiver`

**Creche Life**
- Attendance → `/parent/attendance`
- Special Requests → `/parent/special-requests` (new)
- Events → `/parent/events`
- Announcements → `/parent/announcements`

**Enrollment & Billing**
- Application/Waitlist → `/parent/application`
- Fees → `/parent/fees`

### New screen: Moments (`/parent/moments`)

Extracted as-is from the current Home page's "Moments" tab content (the feed of photo/video posts with tag, caption, poster, time-ago, comment/save actions). Gets its own header (back button + "Moments" title), keeps the same feed rendering and the floating "+" only if Moments itself has a create action today — it does not (only Special Requests does), so no floating button here.

### New screen: Special Requests (`/parent/special-requests`)

Extracted as-is from the current Home page's "Special Requests" tab content (the task list, `CreateTaskModal`, `TaskDetailsModal`, and the floating "+" button that opens the create-task modal). This screen owns all of that state and UI going forward; Home no longer references tasks at all.

## Data/state notes

- No new data models — this is a navigation/layout change. `INITIAL_TASKS`, task CRUD handlers (`handleCreateTask`), and modal components (`CreateTaskModal`, `TaskDetailsModal`) move from `app/(parent)/parent/home/page.tsx` to the new `app/(parent)/parent/special-requests/page.tsx`.
- The Moments feed data (`mockFeedPosts` et al.) and its rendering move from Home to the new `app/(parent)/parent/moments/page.tsx`.
- Home's own state shrinks to just what the banners need (child/attendance mock data already in use).

## Open items for the implementation pass

- Exact icon choice per tile — left to the implementation plan, picking from `lucide-react` to match each feature's existing icon usage elsewhere in the app where one already exists (e.g., reuse whatever icon `/parent/fees`, `/parent/gallery`, etc. use in their own headers, for visual consistency).
- Whether any tiles warrant a "New" badge — left to the implementation plan; at minimum, mirror which of the 13 features already show a "New" badge elsewhere in the app today (several of the 9 recently-built features currently show "New" badges on their own screens or nav entries).
