# Caregiver / Parent Mobile App — Design Spec

**Date:** 2026-06-30  
**Source:** Figma file `IybQlrhaxaE6J0jNeMcvIr`, node `1344:15171` ("Caregiver App")  
**Status:** Approved for implementation

---

## 1. Overview

The Caregiver App is a mobile-only companion to the CEven admin platform. It serves two user types — **Caregivers** (room leads) and **Parents** — each selected via a tab toggle at sign-in. In V1 the screens are identical for both roles; role-based content divergence is a future concern.

The app lives inside the existing Next.js project as a new route group `app/(caregiver)/`, with its own mobile-shell layout, auth flow, and bottom-tab navigation. It is completely isolated from the admin shell — no shared layout, no shared navigation.

**Viewport:** 390 × 844 px (iPhone 14 base). The shell is centered on desktop with a fixed max-width of 390 px and full viewport height, giving a "phone in a browser" feel for demos.

---

## 2. Design Tokens

The caregiver app extends the existing `globals.css` token set with the following additions (added to the same `:root` block):

| Token | Value | Use |
|---|---|---|
| `--color-cg-bg` | `#F5F0E8` | App background (cream) |
| `--color-cg-surface` | `#FFFFFF` | Cards, modals |
| `--color-cg-brand` | `#3B2513` | Active nav tab, dark headers, task-status bg |
| `--color-cg-accent` | `#C9956A` | CTA buttons, quick-action icon tints |
| `--color-cg-accent-muted` | `#E0BFA0` | Button bg (matches existing `--color-button-primary-bg`) |
| `--color-cg-onboarding-bg` | `#B07D2A` | Amber overlay on onboarding slides |
| `--color-cg-stat-pink` | `#FCE8F3` | Classroom stat card bg |
| `--color-cg-stat-teal` | `#E4F5F3` | Children stat card bg |
| `--color-cg-quick-action` | `#F5ECD9` | Quick action tile bg |
| `--color-cg-sent-bubble` | `#007AFF` | Sent message bubble |
| `--color-cg-pending-badge` | `#E5E7EB` | Task pending badge bg |

Typography reuses the existing font stack: **Nunito** for body, **Urbanist** for labels/caps, **Merriweather** for large display headings.

---

## 3. Route Structure

```
app/
  (caregiver)/
    layout.tsx                  ← MobileShell wrapper (390px, centered)
    caregiver/
      page.tsx                  ← Redirect: /caregiver → /caregiver/splash
      splash/
        page.tsx                ← Splash screen
      onboarding/
        page.tsx                ← 3-slide onboarding (client component, local state)
      auth/
        page.tsx                ← OTP sign-in (Parents / Caregivers toggle)
        pin/
          page.tsx              ← Setup PIN (first time) / Enter PIN (returning)
      home/
        page.tsx                ← Home dashboard
      children/
        page.tsx                ← Children list (accessed from Home stat card)
      tasks/
        page.tsx                ← Tasks list (Pending / Completed tabs)
      report/
        page.tsx                ← Report tab — opens Log chooser sheet
      chat/
        page.tsx                ← Chat conversation list
        [id]/
          page.tsx              ← Active chat thread
      settings/
        page.tsx                ← Settings (shell)

components/
  caregiver/
    mobile-shell.tsx            ← 390px centred container + status bar
    bottom-nav.tsx              ← 5-tab persistent nav
    otp-input.tsx               ← 6-box OTP + numeric keypad
    pin-input.tsx               ← 6-box PIN input (reusable for setup + entry)
    stat-card.tsx               ← KPI summary tile (icon, label, value)
    quick-action-card.tsx       ← Icon + label action tile
    task-card.tsx               ← Single task row
    child-card.tsx              ← Expandable accordion child row
    log-sheet.tsx               ← Bottom sheet: Log Activity | Log Daily Report
    log-activity-form.tsx       ← Activity tag + description + media upload
    daily-report-card.tsx       ← Full daily report view (mood, meals, naps…)
    chat-list-item.tsx          ← Conversation preview row
    message-bubble.tsx          ← Sent / received chat bubble
```

---

## 4. Screen Specifications

### 4.1 Splash Screen (`/caregiver/splash`)

- Full-screen cream background (`--color-cg-bg`)
- CEven logo (icon + wordmark) vertically and horizontally centred
- No interaction — auto-navigates to `/caregiver/onboarding` after 1.5 s on first visit, or `/caregiver/auth` if onboarding already seen (flag in `localStorage`)

---

### 4.2 Onboarding (`/caregiver/onboarding`)

Three slides. Each slide:
- Full-screen amber-tinted photo background (the same father-and-son image asset from Figma — use a placeholder image for now, replaced with real asset later)
- CEven logo top-left (white/light)
- Heading + subtitle bottom-left (white text, semi-transparent dark scrim below)
- Progress dots (3 dots, active = white, inactive = white/40%)
- **Prev** button (ghost, white outline) — hidden on slide 1
- **Next** / **Get Started** button (filled dark brown) — "Get Started" on last slide
- **Skip** text link below buttons — hidden on last slide

| Slide | Heading | Subtitle |
|---|---|---|
| 1 | Empowering your Parenting Journey | The ultimate tool to support parents and caregivers in raising happy, healthy children. |
| 2 | Stay in Sync with Their Growth | From playtime to learning moments, track your child's growth with ease. |
| 3 | Capture Every Moment | Create memories that last a lifetime with easy-to-use tools to capture and share moments. |

On "Get Started" or "Skip": set `onboardingSeen=true` in `localStorage`, navigate to `/caregiver/auth`.

---

### 4.3 Sign In (`/caregiver/auth`)

- Back arrow top-left
- Heading: "Welcome Caregiver 👋" (or "Welcome Parent 👋" when Parents tab active)
- Subheading: "We've sent a one time OTP to your email/phone number."
- **Role toggle** — pill switcher: `Parents | Caregivers` (Caregivers tab has an icon)
- **OTP label** + 6 individual character boxes (each box shows `–` when empty, digit when filled)
- "Resend Code in 10:00" countdown (counts down from 10 min; becomes "Resend Code" link when expired)
- **Login** CTA button (full-width, `--color-cg-accent-muted` bg)
- Native iOS numeric keypad shown (rendered as a custom numeric pad component on web: digits 1–9, 0, backspace)
- On successful OTP: if first login → `/caregiver/auth/pin` (setup), else `/caregiver/home`

---

### 4.4 Setup / Enter PIN (`/caregiver/auth/pin`)

Rendered as a bottom sheet (modal) over a darkened background.

- Title: "Setup Login PIN" (or "Enter PIN" on returning login)
- Close (×) button top-right
- **New PIN** label + 6-box input
- **Confirm PIN** label + 6-box input (only shown for Setup, not Enter)
- **Set PIN** CTA button (disabled until both fields filled and matching)
- On success: navigate to `/caregiver/home`, set `pinConfigured=true` in `localStorage`

---

### 4.5 Home (`/caregiver/home`)

**Header row:**
- Avatar + "Welcome Back, [Name]" chip (left)
- Bell notification icon (right) — static in V1

**Stat cards (2-column grid):**
- Card 1 — pink bg (`--color-cg-stat-pink`): classroom icon, "Total Classroom(s)", count
- Card 2 — teal bg (`--color-cg-stat-teal`): people icon, "Total Children", count
- Tapping either card navigates to `/caregiver/children`

**Quick Actions section:**
- Label "Quick Actions"
- 3-tile grid (`--color-cg-quick-action` bg each):
  - Log Activity → opens `LogSheet` (set to Activity mode)
  - Log Daily Report → opens `LogSheet` (set to Report mode)
  - Chat → navigates to `/caregiver/chat`

**Bottom Nav** (persistent, all main screens):
- Home (house) · Tasks (clock) · Report (document) · Chat (speech bubble) · Settings (gear)
- Active tab: icon in `--color-cg-brand` circle background; inactive: grey icon + label

---

### 4.6 Children (`/caregiver/children`)

- Back arrow + "Children" heading
- **Classroom filter dropdown** at top ("Total Classroom(s)" label + chevron)
- Accordion list — one row per child:
  - **Collapsed:** child avatar emoji + name + expand chevron
  - **Expanded:** age chip + room chip, "Alerts & Needs" section (info cards per alert), "Parent Contact" row with name + chat icon button
- Tapping the chat icon navigates to `/caregiver/chat/[parentId]`

---

### 4.7 Tasks (`/caregiver/tasks`)

**Header:** avatar chip + name (same as home), bell icon

**Tab switcher:** "Pending Tasks (n)" | "Completed Tasks (n)" — active tab has dark brown pill bg, white text

**Filter:** "Filter by date" link with calendar icon (static in V1)

**Task cards** (list, divider between each):
- Task title (bold)
- Description (2-line truncated, "…")
- Due time (clock icon) · Reminder time (bell icon)
- Status badge: grey "Pending" or green "Completed"

Tapping a task card: in V1 shows a detail bottom sheet (title, description, full times, mark complete button).

---

### 4.8 Report (`/caregiver/report`)

The Report tab does not have its own full-screen page — tapping it from the bottom nav opens the **Log Sheet** (bottom sheet modal) immediately.

**Log Sheet** (modal, renders over whichever screen is active):
- "Log" title + (×) close
- Two list rows: "Log Activity ›" | "Log Daily Report ›"

**Log Activity sub-sheet:**
- "Log Activity" title + (×) close
- Activity Tag\* — select dropdown
- Description\* — textarea ("Add details about the activity…")
- Media upload area — "Tap to upload or drag and drop · PNG, JPG or MP4 (max. 10mb)"
- **Log Activity** CTA button

**Daily Report sub-sheet** (scrollable, full-height):
- Dark brown date header bar ("Friday, 9 January, 2026")
- Color-coded info rows:
  - 💜 Mood — emoji(s) + label(s) (e.g. "Playful Happy")
  - 🍴 Meals — count
  - 🌙 Nap Time — start–end pairs + duration
  - 🚿 Hygiene — urine + poop count
  - ⚠️ Health & Safety — value or "Nil"
  - 💊 Medications — value or "Nil"
  - Photo carousel (labelled "Playtime") + caption text

---

### 4.9 Chat (`/caregiver/chat`)

- Search bar (full-width, rounded, search icon)
- Conversation list grouped by date label
- Each row: avatar (circle, initials fallback) + name + last message preview (truncated) + timestamp
- Tapping a row → `/caregiver/chat/[id]`

---

### 4.10 Active Chat (`/caregiver/chat/[id]`)

- Header: back arrow + avatar + name (centre) + video-call icon (right, static V1)
- "Session Start" label (centered, styled as a system message)
- Message bubbles:
  - **Sent** (right-aligned): blue bg (`--color-cg-sent-bubble`), white text, timestamp + double-tick beneath
  - **Received** (left-aligned): white/light bg, dark text, timestamp beneath
- Typing indicator (three dots bubble, left-aligned) — shown when `isTyping` state true
- Input bar: attachment icon (left) + text field (rounded pill) + send button (dark circle, arrow icon)
- Keyboard pushes input bar up (handled by `dvh` units + `pb-safe` padding)

---

### 4.11 Settings (`/caregiver/settings`)

Shell only in V1:
- Header "Settings"
- Profile section: avatar, name, role badge
- List rows: Edit Profile, Notifications, Change PIN, Help & Support, Log Out
- No interaction implemented; tapping Log Out navigates to `/caregiver/auth`

---

## 5. Navigation & Auth Flow

```
/caregiver (redirect)
  └── first visit → /caregiver/splash → /caregiver/onboarding → /caregiver/auth
  └── returning   → /caregiver/auth → /caregiver/auth/pin → /caregiver/home

/caregiver/home (bottom nav root)
  ├── /caregiver/children          (from stat cards)
  ├── /caregiver/tasks             (bottom nav: Tasks)
  ├── /caregiver/report            (bottom nav: Report → opens Log sheet)
  ├── /caregiver/chat              (bottom nav: Chat)
  │   └── /caregiver/chat/[id]
  └── /caregiver/settings          (bottom nav: Settings)
```

Auth state is managed in `localStorage` only (no server auth in V1 — this is a prototype). Keys used: `cg_onboarding_seen`, `cg_pin_configured`, `cg_user_name`.

---

## 6. Data

All data is static mock data defined in `lib/caregiver/mock-data.ts`. No API calls. Shapes:

```ts
type CaregiverUser = { name: string; role: 'parent' | 'caregiver'; avatarInitials: string }
type Classroom    = { id: string; name: string }
type Child        = { id: string; name: string; age: string; room: string; alerts: Alert[]; parentContact: Contact }
type Task         = { id: string; title: string; description: string; dueTime: string; reminderTime: string; status: 'pending' | 'completed' }
type ChatThread   = { id: string; contact: Contact; lastMessage: string; lastMessageTime: string; messages: Message[] }
type Message      = { id: string; body: string; sentAt: string; direction: 'sent' | 'received' }
type DailyReport  = { date: string; mood: string[]; meals: number; naps: NapEntry[]; hygiene: string; healthSafety: string; medications: string; photos: Photo[] }
```

---

## 7. Component Architecture

### MobileShell (`components/caregiver/mobile-shell.tsx`)
Wraps every caregiver screen. Renders a centred 390 px container with `min-h-dvh`, cream background, and a simulated status bar (time + icons) at the top. On screens narrower than 390 px it goes full-width.

### BottomNav (`components/caregiver/bottom-nav.tsx`)
Fixed to the bottom of the MobileShell. Uses Next.js `usePathname()` to derive the active tab. The Report tab fires a sheet-open callback via a shared context rather than navigating to a page (so it overlays the current screen).

### LogSheetProvider (`components/caregiver/log-sheet-provider.tsx`)
React context + state that controls whether the Log sheet is open and in which mode (`idle | chooser | activity | report`). BottomNav calls `openLog()` when the Report tab is tapped; the sheet renders inside MobileShell above the content.

---

## 8. What Is NOT in V1

- Real authentication / OTP delivery
- Push notifications
- Media upload (UI only — no actual file handling)
- Video call (icon present, no functionality)
- Filter by date (UI only)
- Settings screens beyond the shell
- Parent vs Caregiver role-differentiated content
