# CEven Admin — Crèche ERP Operating System
### Product Requirements Document v1.0 · May 2025 · Swayosoo

> **Note:** This is the authoritative external PRD (status: Active — For Development & Design Use), prepared by Kikiope Olukorede. It is distinct from `00-project-overview.md` through `10-ui-component-library.md` in this folder, which are as-built documentation written against an earlier screenshot-driven implementation pass — those describe what exists in the code today; this document describes what the product is supposed to be. Where they conflict, this PRD is the source of truth for future work. A full gap-analysis comparing the two as of 2026-06-22 lives in the project's Claude memory (`missing-screens.md` covers the older screenshot pass; a newer PRD-vs-build audit covers this document).
>
> Re-typed from a corrupted docx→text export (the original had garbled `è`/`·`/`₦`/dash characters throughout); content is faithful to the original, formatting cleaned up.

| Product | CEven Admin Platform |
|---|---|
| **Document** | Product Requirements Document (PRD) |
| **Status** | Active — For Development & Design Use |
| **Prepared by** | Kikiope Olukorede |
| **Platform** | Web Application |

---

## 1. Product Overview

### 1.1 Vision

CEven Admin is a world-class, AI-first crèche management ERP built for Nigerian early-years childcare businesses. It replaces paper registers, WhatsApp groups, manual fee tracking, and spreadsheets with a single operating system that runs every aspect of a crèche — from daily child welfare logs to staff payroll to regulatory compliance.

### 1.2 Core Value Propositions

- **Everything in one place** — attendance, welfare, billing, staff, and compliance in a single platform
- **AI-powered operations** — Ada, the embedded AI assistant, surfaces insights, auto-assigns tasks, and drafts communications before staff know they need them
- **Built for Nigerian crèches** — Naira-native billing, local compliance frameworks, Paystack integration, SMS-first parent communication
- **Designed for non-technical operators** — crèche managers and owners, not IT departments

### 1.3 Product Scope

| | |
|---|---|
| **Platform** | Web application, desktop-first at 1440 × 900px |
| **Primary users** | Crèche owners, managers, lead caregivers, receptionists, finance staff |
| **Monetisation** | SaaS subscription — Seedling / Nestling Pro / Flourish plans |
| **AI differentiator** | "Ada" — embedded AI persona generating daily briefs, welfare flags, payment risk scores, and communications |
| **Parent interaction** | Via companion parent app and SMS — parents do not access CEven Admin directly |
| **Currency** | Nigerian Naira (₦), all amounts stored as integers in kobo |
| **Notifications** | In-app, FCM push notifications, and SMS via Paystack / Termii |

---

## 2. User Personas

Five distinct roles interact with CEven Admin. The product must serve each of them without privileging one over another.

### Crèche Manager
**Description:** Day-to-day operational lead. Uses the system daily to manage staff, review AI insights, chase outstanding payments, and handle incidents. The primary power user.
**Goals:** Reduce admin time to focus on children · Catch welfare, compliance, and payment issues before they escalate · Run payroll accurately without calling an accountant
**Pain Points:** Spends hours on WhatsApp chasing caregivers for daily logs · No visibility on who has paid without calling parents · DBS expiry dates tracked in a spreadsheet nobody checks
**Primary Screens:** Dashboard, Staff, Payroll, Leave Management, Tasks, Compliance, AI Command Center, Analytics

### Caregiver / Room Lead
**Description:** Frontline caregiver for a specific room. Submits daily logs, confirms medication, and raises incidents. Typically operates from a tablet in the room.
**Goals:** Submit daily logs quickly without leaving the room · See their medication schedule clearly each morning · Flag welfare concerns without paperwork
**Pain Points:** Paper logs go missing or arrive late · No easy way to flag a change in a child's mood · Unclear medication schedule — relies on verbal handovers
**Primary Screens:** Daily Logs, Medication, Health & Incidents, Child Profile, Notifications

### Admin / Receptionist
**Description:** Manages front desk — check-in/check-out, billing, parent communications, and enquiries. Primary user of the QR station.
**Goals:** Fast error-free check-in during busy morning drop-off · Send and track invoices without knowing a child's full history · Quickly add enquiries and manage the waitlist
**Pain Points:** QR scanner breaks with no clear fallback · Parent calls asking about invoices she can't locate · All enquiries tracked in a physical notebook
**Primary Screens:** Reception / QR, Billing, Parents, Enrolment & Waitlist, Announcements, Messages

### Owner
**Description:** Reviews financial performance, compliance status, and AI reports. Lower frequency, high-stakes — needs executive clarity.
**Goals:** Know at a glance whether the business is profitable · Ensure compliance is never a legal liability · Have AI flag risks before they become crises
**Pain Points:** No single view of revenue, costs, and outstanding fees · Compliance records scattered across filing cabinets · Finds out about incidents days after they happened
**Primary Screens:** Dashboard, Financial Reports, Analytics, Compliance, AI Command Center, Subscription

### Parent
**Description:** Receives daily updates, invoices, and announcements via the companion parent app or SMS. Does not access CEven Admin directly.
**Goals:** Know their child is safe every day without calling · Receive invoices and pay digitally · Be notified immediately if anything happens
**Pain Points:** No daily updates unless they call · Invoice arrives by WhatsApp as a screenshot · No confirmation their child has been picked up safely
**Primary Screens:** N/A — interacts via parent app and SMS notifications sent from CEven Admin

---

## 3. Information Architecture & Navigation

CEven Admin uses a persistent left sidebar for navigation organised into 7 groups. An AI panel sits on the right of every screen. All screens share the same app shell.

### 3.1 Sidebar Navigation

**OVERVIEW**
- **Dashboard** — KPI overview, AI daily brief, quick actions, live activity feed

**CHILDREN & PEOPLE**
- **Children** — Enrolled register, search, filter, health flags
- **Parents** — Parent directory, app adoption tracking, payment risk
- **Enrolment & Waitlist** — Pipeline kanban, waitlist, trial sessions, leavers
- **Child Development** — Milestones, observations, growth records, SEND register
- **Staff** — Directory, QR attendance, log compliance tracking, role management, leaderboard
- **Leave Management** — Leave requests, approval flow, balances, calendar
- **Compliance & Safety** — DBS register, fire drills, food hygiene, risk assessments, safeguarding
- **Rooms & Classes** — Room cards with live occupancy and capacity

> **Note:** the PRD originally listed Payroll under Children & People. Payroll has been moved to the Finance module — see Finance section below. The current build splits these into separate top-level groups ("Child Management", "Staff Management", and "Finance").

**DAILY OPERATIONS**
- **Reception / QR** — Live check-in/out grid, QR scanner station, exception log
- **Daily Logs** — Log compliance dashboard, submission status per child
- **Health & Incidents** — Incident log, severity triage, parent notification tracking
- **Medication** — Standing orders schedule, administration confirmation
- **Inventory & Supplies** — Stock levels, low-stock alerts, equipment register, supply orders
- **Facilities** — Maintenance requests, cleaning schedule tracker
- **Tasks** — Task list, AI auto-assignment, priority and overdue tracking

**FINANCE**
- **Wallet** — Wallet balance, transactions, deposits, withdrawals
- **Billing & Payments** — Invoice management, collection tracking, AI risk scoring
- **Expenses** — Expense log, budget tracking, receipt management
- **Payroll** — Staff payment list with selectable checkboxes, wallet balance check, payroll history, salary setup with deduction configuration (% or fixed)
- **Financial Reports** — P&L, revenue by room, cost analysis, AI financial narrative

**COMMUNICATION**
- **Messages** — Direct parent messaging, AI-assisted draft generation
- **Announcements** — Broadcast to all parents or by specific room
- **Events Calendar** — Events management, PT meetings, RSVP tracking

**INTELLIGENCE**
- **AI Command Center** — Full AI insights dashboard, Ada chat, export — Nestling Pro+
- **Analytics** — Attendance trends, revenue charts, staff performance
- **Reports** — Standard report generation, AI custom builder, scheduled auto-send
- **Audit Trail** — Immutable full activity log, CSV export

**ACCOUNT & SETUP**
- **Plans & Access** — Subscription comparison, plan activation via Paystack
- **Help & Training** — Guides, walkthroughs, AI-powered help
- **Settings** — Crèche config, fee plans, notifications, user roles, AI persona

### 3.2 Global Shell — Always Present

| Element | Spec |
|---|---|
| **Trial Banner** | Full-width countdown with "Choose a Plan" CTA. Dismissible. Hidden after subscription activates. |
| **Sidebar (236px)** | Persistent navigation. Ada AI widget with live insight count. Active link highlighted. User profile pinned to bottom. |
| **Topbar (54px)** | Screen title and plan badge left. Global search centre. AI panel toggle, notification bell, and primary CTA right. |
| **AI Panel (316px)** | Right-hand Ada panel — chat thread, suggested actions, input. Visible on all screens at 1440px+. |
| **Toast** | Bottom-right confirmation notification. 3-second auto-dismiss. |
| **Modals** | 14 core modals. All share: title header, scrollable body, cancel and submit footer. |

---

## 4. Subscription Tiers & Feature Gating

3-tier SaaS model with a 14-day free trial. Features above the current plan show a locked placeholder with an upgrade prompt — never a broken or empty layout.

| Feature | Seedling ₦9,500/mo | Nestling Pro ₦18,500/mo | Flourish ₦38,500/mo |
|---|---|---|---|
| Children limit | 20 | 60 | Unlimited |
| QR attendance & check-in/out | ✓ | ✓ | ✓ |
| Children records & daily logs | ✓ | ✓ | ✓ |
| Billing, invoices & payments | ✓ | ✓ | ✓ |
| Staff management | ✓ | ✓ | ✓ |
| Payroll management | ✓ | ✓ | ✓ |
| Leave management | ✓ | ✓ | ✓ |
| Compliance & safety register | ✓ | ✓ | ✓ |
| Inventory & facilities | ✓ | ✓ | ✓ |
| Expenses & budget tracking | ✓ | ✓ | ✓ |
| Parent messaging & announcements | ✓ | ✓ | ✓ |
| Events calendar | ✓ | ✓ | ✓ |
| AI daily brief | ✗ | ✓ | ✓ |
| AI payment risk scoring | ✗ | ✓ | ✓ |
| AI welfare alerts | ✗ | ✓ | ✓ |
| AI message drafting | ✗ | ✓ | ✓ |
| Financial reports & P&L | ✗ | ✓ | ✓ |
| Child development module | ✗ | ✗ | ✓ |
| AI Command Center | ✗ | ✗ | ✓ |
| AI revenue forecasting | ✗ | ✗ | ✓ |
| AI staff intelligence | ✗ | ✗ | ✓ |
| AI custom report builder | ✗ | ✗ | ✓ |
| Deep analytics | ✗ | ✗ | ✓ |
| Audit log export | ✓ | ✓ | ✓ |
| Parent app add-on | +₦2,500/child | +₦2,500/child | Included |

---

## 5. Screen-by-Screen Requirements

Each screen covers: purpose, user stories, acceptance criteria, and key screen elements.

### 01 Dashboard
*KPI overview · AI daily brief · Quick actions · Live activity feed*

| Screen ID | sc-dashboard | **Plan** | All Plans |
|---|---|---|---|

**Purpose:** First screen after login. At-a-glance view of the crèche's live operational and financial status — 8 KPI stat cards, an AI daily brief from Ada, quick-action shortcuts, the most overdue invoices, and a live activity feed.

**User Stories:**
- As a manager, I want to see how many children are present today so I can plan staffing.
- As a manager, I want to see outstanding fees on the dashboard so I can act without navigating away.
- As a manager, I want Ada to surface the 3 most important issues for today.
- As a manager, I want to see recent activity across the crèche in real time.

**Acceptance Criteria:**
- 8 KPI stat cards are shown: Enrolled, Present Today, Absent, Staff on Duty, Outstanding Fees, Open Incidents, Reports Pending, Tasks Overdue.
- Stat cards auto-refresh every 30 seconds.
- AI daily brief card shows Ada's insights generated at 7am with at least 2 actionable insights and CTA buttons.
- Quick-action grid shows 5 buttons: Add Child, QR Station, New Log, New Invoice, View Reports.
- Outstanding invoices table shows the 5 most overdue with AI risk badge (High/Medium/Low).
- Activity feed shows the last 10 events across all modules, colour-coded by type, with timestamps.
- Onboarding progress card shown until all 8 setup steps are complete.

**Key Screen Elements:** 8 KPI stat cards (label, value, sub-text, colour-coded top accent) · AI daily brief card (Ada branding, animated live indicator, insight rows with category dot and action button) · Quick-actions grid (5 icon tiles) · Outstanding invoices table with AI Risk badge and Days Overdue in red when >7 · Live activity feed (coloured dot, description, timestamp per row) · Onboarding checklist card with progress percentage

---

### 02 Children
*Enrolled register · Room filter · Health flags · Fee status*

| Screen ID | sc-children | **Plan** | All Plans |
|---|---|---|---|

**Purpose:** Main enrolment register showing all enrolled children. Filters by room and attendance status. Each row shows welfare, attendance, and payment context at a glance.

**User Stories:**
- As a manager, I want to see all enrolled children in one table so I can find any child instantly.
- As a manager, I want to filter by room to see only one class at a time.
- As a caregiver, I want health flags visible in the list so I never overlook an allergy.
- As a manager, I want to see fee status per child to spot payment issues without opening invoices.

**Acceptance Criteria:**
- 4 stat cards: Total Enrolled, Active, New This Month, Graduating Soon.
- Table: child avatar and name, age, room, parent name, attendance status, health flag, fee status, actions.
- Search input filters by child name or parent name in real time.
- Room and status (All/Present/Absent) filters available.
- A red allergy badge appears in the health flag column for any child with allergy records.
- Fee status shown as badge: Paid (green), Pending (amber), Overdue (red).
- Clicking any row opens the child's full profile.
- "+ Enrol Child" CTA opens enrolment modal.

**Key Screen Elements:** 4 stat cards · Real-time search bar · Room and status filter dropdowns · Table with avatar, name, age, room emoji, parent name, status badges · Allergy badge (red) when allergies exist · Fee status badge · Row click → child profile

---

### 03 Child Profile
*Full record · Logs · Health · Billing · Development · AI welfare*

| Screen ID | sc-child-profile | **Plan** | All Plans |
|---|---|---|---|

**Purpose:** Most data-rich screen. Everything about a single child — hero card with QR code, 6 content tabs, and an AI welfare panel.

**User Stories:**
- As a caregiver, I want to see a child's health notes, allergies, and medication in one place.
- As a manager, I want to review a child's log history to identify welfare patterns.
- As an admin, I want to see all invoices for a child from their profile.
- As a manager, I want to see Ada's welfare assessment based on recent log data.

**Acceptance Criteria:**
- Profile hero card: child avatar, full name, age, room, child reference ID, QR code thumbnail.
- Tab navigation: Overview | Daily Logs | Health | Billing | Development | Contacts.
- Overview: 7-day mood trend, today's log card, monthly attendance summary.
- Health: allergy details (allergen, reaction, EpiPen status), medical notes, vaccination status, GP contact.
- Billing: fee plan, all invoices with status and payment history.
- Development: milestone summary, recent observations, growth records.
- Contacts: authorised pickup persons with relationship and ID type.
- AI welfare panel: welfare score, mood health score, eating pattern, assessment, recommended action.

**Key Screen Elements:** Profile hero card (dark gradient, child reference in monospace, QR thumbnail) · 6-tab bar with amber active underline · 7-day mood trend row of colour-coded emoji circles · AI welfare section (gradient background, confidence %, recommended action button) · Allergy cards per allergen with severity badge and EpiPen indicator · Contacts with relationship label, phone, and authorisation status

---

### 04 Billing & Payments
*Invoice management · Collection tracking · AI payment risk*

| Screen ID | sc-billing | **Plan** | All Plans |
|---|---|---|---|

**Purpose:** Manages all tuition invoices, tracks collection rates against the monthly target, and provides AI payment risk scoring so the manager knows which families to follow up first.

**User Stories:**
- As a manager, I want to see total collected vs outstanding this month at a glance.
- As an admin, I want to create a new invoice in under 30 seconds.
- As a manager, I want AI to flag families most likely to default so I can prioritise follow-up calls.
- As a manager, I want to send bulk SMS reminders to all overdue families in one action.

**Acceptance Criteria:**
- 4 stat cards: Collected (current month), Outstanding, Overdue >7 days, Monthly Target.
- Collection progress bar shows % vs 85% default target.
- AI billing insight banner when collection is below target, naming high-risk families.
- Invoices table: Child, Parent, Fee Plan, Amount, Due Date, Days Overdue (red if >7), AI Risk badge, Status.
- + New Invoice CTA opens invoice modal.
- "Bulk Remind" sends SMS to all overdue/pending families — once per day limit.
- Filter by status: All / Pending / Overdue / Paid.

**Key Screen Elements:** 4 stat cards · Collection progress bar with 85% target marker · AI insight banner naming high-risk families · Invoice table with AI Risk and Days Overdue columns · "Bulk Remind" button (greyed after already sent today) · Status filter tabs

---

### 05 Daily Logs
*Log compliance dashboard · Submission status · AI welfare flags*

| Screen ID | sc-daily-logs | **Plan** | All Plans |
|---|---|---|---|

**Purpose:** Compliance dashboard showing whether every present child has had their daily log submitted. Caregivers submit logs; managers chase compliance and catch AI-flagged welfare patterns.

**User Stories:**
- As a caregiver, I want to submit a daily log in under 2 minutes without leaving the room.
- As a manager, I want to see at a glance which logs are still pending.
- As a manager, I want AI to flag unusual mood patterns in today's logs.

**Acceptance Criteria:**
- 4 stat cards: Submitted, Pending, Compliance %, Average Submit Time.
- AI compliance banner when below 80%, naming pending caregivers.
- Table: Child, Room, Caregiver, Submitted time, Mood emoji, Meals summary, Status badge.
- Status badges: Submitted (green), Pending (amber), AI Flag (navy).
- Bulk Remind sends push notification to caregivers with pending logs.
- Room filter for single-room view.
- Clicking a submitted log opens detail. Clicking pending opens submission modal for that child.

**Key Screen Elements:** 4 stat cards (compliance card colour changes dynamically) · AI flag badge on welfare-flagged rows · Room filter pill tabs · Submitted time in monospace · Pending rows show dash in time column · "Bulk Remind" disabled when no pending logs

---

### 06 Staff
*Directory · Weekly attendance · Log compliance · Role management*

| Screen ID | sc-staff | **Plan** | All Plans |
|---|---|---|---|

**Purpose:** Full staff roster with live on-duty status, weekly QR attendance grid, and per-caregiver log compliance. Primary screen for staff membership, inviting new members, and changing roles.

**User Stories:**
- As a manager, I want to see all staff with on-duty status so I know coverage at any moment.
- As a manager, I want to see weekly QR attendance for each staff member.
- As a manager, I want to see each caregiver's log compliance to hold them accountable.
- As an owner, I want to change a staff member's role without technical help.

**Acceptance Criteria:**
- 4 stat cards: Total Staff, On Duty, Absent, Average Log Compliance.
- Tab 1 (Directory): grid of staff cards — avatar, name, role badge, room, check-in time, compliance bar.
- Tab 2 (Compliance): table showing logs submitted vs expected with flag if below 80%.
- Tab 3 (Attendance): Mon–Fri grid, green tick / red cross per day per staff member.
- "+ Add Staff" CTA opens invite modal.
- Log compliance bars turn red when below 80%.

**Key Screen Elements:** 4 stat cards · Staff card grid (2 columns, role badge, room, check-in time, compliance bar) · Compliance bars (green/amber/red by %) · Flag badge on cards below threshold · 5-column weekly attendance grid

---

### 07 Health & Incidents
*Incident log · Severity triage · Parent notification tracking*

| Screen ID | sc-health | **Plan** | All Plans |
|---|---|---|---|

**Purpose:** Logs all child incidents with severity triage. High-severity incidents trigger immediate manager/owner notifications. A 4-hour parent notification countdown tracks whether parents have been informed.

**User Stories:**
- As a caregiver, I want to raise an incident quickly even when stressed.
- As a manager, I want to see all open incidents with parent notification status.
- As an owner, I want immediate notification for any High severity incident.

**Acceptance Criteria:**
- 4 stat cards: Open, This Month, Resolved, Parent Notified.
- AI alert banner when any open incident has no parent notification after 4 hours.
- Table: Child, Type, Severity badge, Time, Raised By, Parent Notified (with countdown), Status.
- High-severity rows visually differentiated with red left border.
- "+ Raise Incident" CTA opens incident modal.
- Clicking a row opens full incident detail with action timeline.

**Key Screen Elements:** 4 stat cards · Alert banner when parent notification deadline approaching · Severity badges (High red, Medium amber, Low green) · High-severity row red left border indicator · Parent notification countdown in table cell

---

### 08 Reception / QR Station
*Live check-in/out grid · QR scanner · Manual override · Exception log*

| Screen ID | sc-reception | **Plan** | All Plans |
|---|---|---|---|

**Purpose:** QR attendance station. Displays crèche QR code for parents to scan. Shows live grid of all children and staff with current check-in state. Handles exceptions and manual override.

**User Stories:**
- As a receptionist, I want to see who is currently checked in without searching.
- As a receptionist, I want to manually check in a child when their QR is unavailable.
- As a manager, I want to be alerted immediately for an unauthorised pickup attempt.

**Acceptance Criteria:**
- QR station card: crèche QR, date, crèche name, download button. Token rotates daily.
- Live check-in grid: all children/staff with state — In (green), Out (dimmed), Late (amber).
- Summary row: Checked In count, Checked Out, Absent, Late.
- Exception log panel: most recent exceptions — type, person, time, Resolve action.
- "+ Manual Check-In" requires selecting a reason from a predefined list.
- Filter: Children / Staff / All.
- Grid updates in real time via WebSocket.

**Key Screen Elements:** Large QR station card (animated scanner line) · Check-in grid (5 cards per row, colour state per card) · Summary stat row above grid · Exception log panel · Children/Staff/All filter

---

### 09 Messages
*Direct parent messaging · AI-assisted drafts*

| Screen ID | sc-comms | **Plan** | All Plans |
|---|---|---|---|

**Purpose:** Direct one-to-one messaging between staff and parents. AI-assisted draft generation means caregivers can generate contextually appropriate messages with one click.

**User Stories:**
- As a manager, I want to send a direct message to a parent without leaving the platform.
- As a caregiver, I want AI to draft a welfare message so I don't have to choose the right words.
- As a manager, I want to see all unread message threads in one place.

**Acceptance Criteria:**
- Message thread list: sender, preview, timestamp, unread badge.
- Unread threads visually distinguished.
- "+ New Message" opens compose modal with parent search.
- AI Assist toggle generates a contextually appropriate draft.
- Messages delivered via in-app push and SMS fallback.
- Unread count shown in sidebar badge.

**Key Screen Elements:** Thread list with unread indicator · Unread threads: amber left border · Compose modal with parent search and AI Assist toggle · Delivery status indicator (app push / SMS fallback)

---

### 10 Announcements
*Broadcast messages · Room targeting · SMS + push delivery*

| Screen ID | sc-announcements | **Plan** | All Plans |
|---|---|---|---|

**Purpose:** Sends broadcast messages to all parents or to a specific room. Supports simultaneous SMS and in-app push delivery. Used for holiday notices, event reminders, policy updates, and emergencies.

**User Stories:**
- As a manager, I want to message all parents at once without copy-pasting into WhatsApp.
- As a manager, I want to target an announcement to one room.
- As a manager, I want to see how many parents received and read each announcement.

**Acceptance Criteria:**
- "+ Announcement" opens compose modal.
- Audience selector: All Parents or by Room.
- Announcement type dropdown (e.g. holiday closure, general notice).
- SMS and app push delivery toggles — both can be active.
- Sent history shows: subject, audience, date, app delivery count, SMS count.

**Key Screen Elements:** Sent announcements list with delivery stat badges · Compose modal with audience and delivery toggles · Delivery stats per announcement

---

### 11 Events Calendar
*Events · RSVP tracking · PT meetings · Staff CPD*

| Screen ID | sc-events | **Plan** | All Plans |
|---|---|---|---|

**Purpose:** Manages all crèche events — parent-teacher meetings, sports days, CPD training days, and open days. Supports invitations and RSVP tracking.

**User Stories:**
- As a manager, I want to schedule a parent-teacher meeting and invite all relevant parents.
- As a manager, I want to see RSVP responses to know attendance numbers.
- As a manager, I want to mark a CPD day so staff and parents know the crèche is closed.

**Acceptance Criteria:**
- Upcoming events as cards — title, date, time, audience badge, description.
- Each event card has "Send Invitation" and "View RSVPs" actions.
- "+ New Event" CTA opens event creation modal.
- Audience types: All Parents, All Families, Specific Room, Staff Only.
- RSVP list shows each parent's response (Attending / Not Attending / Maybe).

**Key Screen Elements:** Event cards with audience badge and action buttons · Event creation modal with audience selector, date/time, description · RSVP list per event with response badges and count summary

---

### 12 Tasks & Workflow
*Task list · AI auto-assignment · Priority triage · Overdue tracking*

| Screen ID | sc-tasks | **Plan** | All Plans |
|---|---|---|---|

**Purpose:** Manages operational tasks — from manual to-dos to AI-auto-assigned tasks triggered by incidents, overdue invoices, and welfare flags.

**User Stories:**
- As a manager, I want to create a task and assign it to a staff member with a due date.
- As a manager, I want AI to automatically create a task when an incident is raised.
- As a manager, I want to see all overdue tasks surfaced prominently.

**Acceptance Criteria:**
- Summary: total tasks, overdue count, in-progress, AI-escalated.
- AI alert banner when overdue tasks exist.
- Table: Title, Assigned To, Due Date, Priority badge, Source badge (Manual/AI Assigned/AI Escalated), Status.
- AI creates tasks automatically when: incident raised, invoice >7 days overdue, welfare flag triggered, missing checkout detected.
- "+ Add Task" CTA opens creation modal.
- Tasks overdue by >24 hours are automatically escalated.

**Key Screen Elements:** Task summary row · AI overdue banner · Tasks table with Priority and Source badges · Status filter · Task creation modal with staff assignment and due date picker

---

### 13 Payroll Management
*Monthly payroll run · PAYE · Pension · Deductions · Payslip history*

| Screen ID | sc-payroll | **Plan** | All Plans |
|---|---|---|---|

**Purpose:** Full monthly payroll cycle — gross salary through PAYE tax, 8% pension, absence deductions, and bonuses to net pay and final run. Payroll records are immutable once run.

**User Stories:**
- As a manager, I want to review all staff pay before approving the payroll run.
- As an owner, I want AI to flag anomalies before I commit.
- As a staff member, I want to receive my payslip automatically on payroll run.

**Acceptance Criteria:**
- 4 stat cards: Total Gross, Total Deductions, Net Payroll, Payroll Status.
- AI anomaly banner when any row is flagged for review.
- Current Month tab: Staff, Role, Basic, Bonus, Deductions, PAYE, Pension (8%), Absent Days, Net Pay, Status. Flagged rows must be resolved before run.
- Approve & Run button blocked until review flags cleared. Requires confirmation step.
- History tab: past payroll runs with gross/net totals and Download Payslips per month.
- Salary Setup tab: staff list with salary, employment type, masked bank details (last 4 digits only).
- Payslips auto-sent to all staff on run.

**Key Screen Elements:** 4 stat cards · AI anomaly banner · Payroll table (bonus in green, deductions in red, net pay bold) · "Review Required" badge on flagged rows · "Approve & Run" blocked when review flags exist · History tab with payslip download · Salary setup (bank details always masked)

---

### 14 Leave Management
*Requests · Approval flow · Cover tracking · Balance register*

| Screen ID | sc-leave | **Plan** | All Plans |
|---|---|---|---|

**Purpose:** Full staff leave cycle — submitting requests, approval/decline, cover tracking, and leave balance visibility. AI warns when approving leave creates a staffing gap.

**User Stories:**
- As a staff member, I want to request leave without a paper form.
- As a manager, I want to be warned when approving leave would leave a room understaffed.
- As a manager, I want to see all staff leave balances.

**Acceptance Criteria:**
- 4 stat cards: Pending, Currently On Leave, Approved This Month, Average Days Available.
- AI staffing gap warning when approving leave would leave a room without qualified cover.
- Requests tab: Staff, Leave Type, From, To, Days, Reason, Cover Arranged, Status, inline Approve/Decline.
- Approve blocked when Cover Arranged = false for caregiving roles.
- Balances tab: entitlement, taken, remaining per staff member.
- Calendar tab: monthly view of all leave periods.
- Leave types: Annual, Sick, Maternity, Paternity, Unpaid, Compassionate.

**Key Screen Elements:** 4 stat cards · AI staffing warning banner · Leave requests table with inline approve/decline · Leave type badges · Cover Arranged indicator (green/red) · Leave balances table · Monthly calendar tab

---

### 15 Compliance & Safety
*DBS · Fire drills · Food hygiene · Risk assessments · Safeguarding*

| Screen ID | sc-compliance | **Plan** | All Plans |
|---|---|---|---|

**Purpose:** Regulatory compliance hub. Tracks DBS expiry, fire drill records, food hygiene logs, risk assessments, and the DSL-restricted child protection log. One-click compliance pack export.

**User Stories:**
- As a manager, I want to see which compliance items are overdue before an inspection.
- As a DSL, I want to log child protection concerns in a confidential, immutable record.
- As a manager, I want to be alerted 60 days before a DBS certificate expires.

**Acceptance Criteria:**
- 4 stat cards: Compliant, Overdue (red), Due This Month, Next Inspection.
- Overdue alert banner listing specific items.
- 5 tabs: DBS | Fire Drills | Food Hygiene | Risk Assessments | Safeguarding.
- DBS: all staff, type, issue date, expiry, masked cert number, status badge. Expired rows: red badge + Renew Now.
- Fire Drills: log with duration, outcome, issues. Warning when next drill overdue.
- Food Hygiene: temperature log, auto-flagged when outside safe ranges.
- Risk Assessments: area, risk level, controls, last reviewed, next review.
- Safeguarding: DSL/Owner only. Add-only — no edit or delete. Confidentiality banner always shown.
- "Export Compliance Pack" generates single PDF for inspections.

**Key Screen Elements:** 4 stat cards (overdue in red) · Overdue items banner · 5-tab structure · DBS table with status badges and "Renew Now" on expired · Fire drill overdue warning · Food hygiene table with auto-flagged rows · Safeguarding (red confidentiality banner, restricted access) · "Export Compliance Pack" CTA

---

### 16 Enrolment & Waitlist
*Enquiry pipeline · Kanban · Waitlist · Trials · Leavers*

| Screen ID | sc-enrolment | **Plan** | All Plans |
|---|---|---|---|

**Purpose:** Manages the full family journey — enquiry through enrolment and departure. Kanban pipeline, waitlist management, trial session tracking, and leaver processing.

**User Stories:**
- As a manager, I want to see all enquiries in a pipeline view so I know who to follow up with.
- As an admin, I want to add a family to the waitlist and know exactly how long they've been waiting.
- As a manager, I want to schedule and record trial sessions.
- As a manager, I want to process a child's departure and archive their record.

**Acceptance Criteria:**
- 4 stat cards: Active Enquiries, Waitlisted, Enrolled This Term, Leavers.
- AI conversion prediction banner.
- Pipeline tab: 5-column Kanban — Enquiry Received | Visit Scheduled | Trial Booked | Offer Made | Enrolled. Column count badges.
- Waitlist tab: position, child, room, date added, weeks waiting (red >8 weeks), sibling enrolled, Make Offer action.
- Trials tab: session table with outcome badge.
- Leavers tab: reason, last day, notice adequacy, exit survey, data archive status.
- "+ New Enquiry" CTA opens enquiry form.

**Key Screen Elements:** 4 stat cards · AI conversion banner · 5-column Kanban with count badges · Waitlist table (weeks waiting colour-coded, sibling badge) · "Make Offer" action per row · Trials table with outcome badge · Leavers table with notice adequacy badge

---

### 17 Child Development
*Milestones · Observations · Growth · SEND register*

| Screen ID | sc-development | **Plan** | Flourish |
|---|---|---|---|

**Purpose:** Tracks developmental progress across 4 domains, stores caregiver observations, records growth, and maintains the confidential SEND register. AI generates termly summaries.

**User Stories:**
- As a caregiver, I want to record a developmental observation quickly.
- As a manager, I want to see which children need monitoring or SEND review.
- As a DSL, I want to add a child to the SEND register and track their support plan.

**Acceptance Criteria:**
- 4 stat cards: On Track, Monitoring, SEND Review (red), Observations This Week.
- AI summary generation banner.
- Milestones tab: Child, Age, Room, Motor, Language, Social, Cognitive badges, Last Assessed, AI Flag.
- Observations tab: caregiver observation cards with date and category.
- Growth tab: height/weight records, BMI indicator, previous vs current.
- SEND tab: Manager/Owner only. Confidentiality banner. Add-only.

**Key Screen Elements:** 4 stat cards (SEND Review in red) · AI summary generation button · Milestones table with per-domain status badges · Observation cards · Growth table with change indicator · SEND tab (confidentiality banner, restricted, add-only)

---

### 18 Inventory & Supplies
*Stock levels · Low-stock alerts · Equipment register · AI reorder*

| Screen ID | sc-inventory | **Plan** | All Plans |
|---|---|---|---|

**Purpose:** Tracks consumable stock and fixed equipment. AI monitors usage and suggests optimised reorder lists when items fall below minimums.

**User Stories:**
- As a manager, I want to know which supplies are running low before they run out.
- As an admin, I want AI to suggest what to order from which supplier.
- As a manager, I want to track equipment condition and flag items needing repair.

**Acceptance Criteria:**
- 4 stat cards: Low Stock Alerts (red), Total Items, Monthly Spend, Pending Orders.
- AI reorder suggestion banner.
- Stock tab: Item, Category, Current Stock, Min Level, Unit, Last Restocked, Estimated Days Left, Status. Days Left red if <3, amber if <7.
- Order Now button on low-stock rows.
- Equipment tab: item, room, qty, condition badge, last serviced, next service due.
- Orders tab: order history with supplier, cost, status.
- "AI Reorder" generates AI-optimised reorder list.

**Key Screen Elements:** 4 stat cards (low stock in red) · AI reorder banner · Stock table with Days Left colour-coded · "Order Now" on low-stock rows · Equipment condition badges (Good/Fair/Poor) · AI Reorder button

---

### 19 Facilities
*Maintenance requests · Priority tracking · Cleaning schedule*

| Screen ID | sc-facilities | **Plan** | All Plans |
|---|---|---|---|

**Purpose:** Manages facility operations — maintenance request logging, tracking, and the daily cleaning schedule checklist.

**User Stories:**
- As a caregiver, I want to report a maintenance issue quickly so it doesn't get forgotten.
- As a manager, I want to see all open requests and who is assigned.
- As a manager, I want to track which cleaning tasks have been completed today.

**Acceptance Criteria:**
- 4 stat cards: Open Requests, Resolved This Month, Cleaning Tasks Done Today, Next Service.
- Alert banner for high-priority issues open >48 hours.
- Maintenance tab: Date, Location, Issue, Priority badge, Reported By, Assigned, Status, Resolution Date.
- "+ Maintenance Request" CTA.
- Cleaning tab: tap-to-complete daily checklist. Each task shows location and scheduled time. Green tick and completion time when done.

**Key Screen Elements:** 4 stat cards · High-priority maintenance alert · Maintenance table with Priority badges · "Resolve" action per open request · Cleaning checklist (tap-to-complete, green when done)

---

### 20 Expenses
*Expense log · Budget tracking · Receipt management · Approval flow*

| Screen ID | sc-expenses | **Plan** | All Plans |
|---|---|---|---|

**Purpose:** Tracks all crèche operating expenses against monthly budget by category. Receipt attachment required for expenses above ₦50,000. Simple manager approval workflow.

**User Stories:**
- As an admin, I want to log an expense with a receipt so it is properly recorded.
- As a manager, I want to see how much budget remains in each category.
- As an owner, I want to approve or reject pending expenses.

**Acceptance Criteria:**
- 4 stat cards: Monthly Budget, Spent, Remaining, Pending Approval count.
- Budget breakdown by category — spent vs budget.
- Expense log: Date, Category, Description, Amount, Paid By, Receipt status, Approval status.
- "+ Add Expense" CTA.
- Expenses >₦50,000 require a receipt — Upload Receipt prompt on relevant rows.
- Pending expenses require manager approval. Inline Approve / Reject actions.
- Approved expenses are immutable.

**Key Screen Elements:** 4 stat cards · Category budget breakdown · Expense table with category badge and approval status · "Upload Receipt" prompt on large expenses · Inline approve/reject actions for pending

---

### 21 Financial Reports
*P&L · Revenue by room · Cost analysis · AI financial narrative*

| Screen ID | sc-financial-reports | **Plan** | Nestling Pro & Flourish |
|---|---|---|---|

**Purpose:** Monthly P&L, revenue by room, and cost analysis. Ada generates a plain-English financial narrative with specific collection recommendations. Exportable as PDF.

**User Stories:**
- As an owner, I want a simple P&L for any month without asking an accountant.
- As a manager, I want to see which rooms generate the most and least revenue.
- As an owner, I want Ada to tell me in plain English what to do to close the month profitably.

**Acceptance Criteria:**
- Month selector defaults to current month.
- P&L tab: Income section (tuition, registration, meals add-on, total) + Expenditure (payroll, rent, supplies, utilities, maintenance, other, total). Net Result box — green for surplus, red for deficit.
- AI narrative card below P&L — plain English from Ada with specific family names and actions. Never fabricates.
- Revenue tab: by room — potential revenue, collected, outstanding, collection %. Colour-coded by %.
- Cost Analysis tab: each category as % of total income. Payroll ratio highlighted with healthy range indicator (60–70%).
- Export P&L CTA generates branded PDF.

**Key Screen Elements:** Month selector · P&L two-section layout with bold totals · Net result box (prominent, colour-coded) · AI narrative card with Ada branding · Revenue breakdown table · Cost analysis bar chart · "Export P&L" button

---

### 22 Analytics
*Attendance trends · Revenue charts · Staff performance · AI insights*

| Screen ID | sc-analytics | **Plan** | Nestling Pro & Flourish |
|---|---|---|---|

**Purpose:** Aggregated analytics — attendance patterns over time, monthly revenue vs target, staff log compliance trends, and AI pattern insights.

**User Stories:**
- As an owner, I want to see attendance trends over 6 months.
- As a manager, I want to see revenue vs target charted weekly.
- As an owner, I want to see which rooms have the best and worst staff compliance.

**Acceptance Criteria:**
- 4 stat cards: Enrolment, Average Attendance %, Revenue (current month), Open Incidents.
- 4 tabs: Overview | Attendance | Revenue | Staff.
- Overview: summary charts and AI top 3 performance observations.
- Attendance: weekly bar chart, room breakdown, trend vs last month.
- Revenue: collected vs outstanding stacked bars, monthly vs target line.
- Staff: per-caregiver compliance bars, attendance rate summary.

**Key Screen Elements:** 4 stat cards · 4 content tabs · Bar charts for attendance and revenue · Room-by-room breakdown table · AI observations panel per tab · Period selector

---

### 23 AI Command Center
*Full AI insights · Ada chat · Category filter · Export*

| Screen ID | sc-ai-center | **Plan** | Nestling Pro & Flourish |
|---|---|---|---|

**Purpose:** Ada's dedicated screen — a full-width intelligence hub with all AI insights across health, finance, and staff. Includes AI chat and report export.

**User Stories:**
- As a manager, I want to see all AI insights in one place by type and urgency.
- As a manager, I want to ask Ada a question about my crèche data in plain English.
- As an owner, I want to export all AI intelligence as a report PDF.

**Acceptance Criteria:**
- AI insight list: category dot, priority number, subject, headline, confidence %, data sources, CTA button.
- Category filter: All | Health | Finance | Staff.
- Insights sorted by priority (1 = most urgent). CTAs navigate to relevant screens or trigger modal actions.
- "AI Refresh" triggers on-demand re-analysis (Flourish only).
- Export AI Report generates PDF (Flourish only).
- AI chat panel always open on this screen.
- Locked-gate overlay for Seedling plan.

**Key Screen Elements:** AI insight list with priority, headline, confidence %, and CTA per item · Category filter tabs · "Refresh" and "Export" buttons · AI chat panel open by default · Locked-gate overlay for Seedling

---

### 24 Reports
*7 standard reports · AI custom builder · Scheduled auto-send*

| Screen ID | sc-reports | **Plan** | Nestling Pro & Flourish |
|---|---|---|---|

**Purpose:** Reporting centre — 7 standard one-click reports, an AI custom builder accepting plain-English queries, and a scheduled reports system for automated periodic delivery.

**User Stories:**
- As an owner, I want a monthly P&L emailed automatically on the 1st of every month.
- As a manager, I want to ask Ada to build a custom report in plain English.
- As a manager, I want a regulatory compliance pack with one click before an inspection.

**Acceptance Criteria:**
- 4 stat cards: Reports Generated, Scheduled Active, Last Export, Data Coverage.
- 2-column layout: Standard Reports (left), Scheduled Reports (right).
- 7 standard report cards: Occupancy Trend, Attendance Pattern, Revenue per Room, Incident Trend, Staff Performance, Regulatory Compliance Pack, Child Development Summary.
- 8th card: AI Custom Report Builder — plain-English query → PDF.
- Scheduled reports: name, schedule, recipients, next run date, active status.
- "+ Schedule" CTA. Schedule options: Weekly (Monday), Monthly (1st), Monthly (28th), Quarterly, End of Term.

**Key Screen Elements:** 7 standard report cards with "Generate" button · AI Custom Report Builder card · Scheduled reports panel with next run date · "+ Schedule" CTA · "Generate" shows loading state while building

---

### 25 Audit Trail
*Immutable full activity log · All user actions · CSV export*

| Screen ID | sc-audit | **Plan** | All Plans |
|---|---|---|---|

**Purpose:** Complete, immutable log of every action — check-ins, log submissions, invoice creation, role changes, settings updates, and more. Cannot be edited or deleted.

**User Stories:**
- As an owner, I want a record of every action in the system for full accountability.
- As a manager, I want to filter the audit log to investigate a specific incident.
- As an owner, I want to export the audit log as CSV for an external audit.

**Acceptance Criteria:**
- Table: Time, User, Role, Action description, Record affected, Method (QR/App/Web/Manual).
- Filters: date range, user, event type.
- "Export Log" generates CSV.
- Records are never deleted and cannot be edited.
- Audit entries are created automatically for all user actions across every module.

**Key Screen Elements:** Full-width audit table · Date range, user, event type filters · "Export Log" CSV button · Method badge per row (QR / App / Web / Manual Override)

---

### 26 Settings
*Crèche config · Fee plans · Notifications · Roles · AI persona*

| Screen ID | sc-settings | **Plan** | All Plans |
|---|---|---|---|

**Purpose:** Crèche configuration centre. 5 tabs: crèche details, fee plan management, notification preferences, user role assignments, and AI persona customisation.

**User Stories:**
- As a manager, I want to set operating hours so the system knows when check-ins are late.
- As an owner, I want to create and edit fee plans.
- As a manager, I want to rename and retone Ada to match our crèche culture.
- As an admin, I want to assign roles to staff members.

**Acceptance Criteria:**
- 5 tabs: Crèche | Fee Plans | Notifications | Roles | AI Persona.
- Crèche: name, address, phone, capacity, operating hours, late threshold, compliance target %.
- Fee Plans: table with add/edit/delete actions.
- Notifications: 4 on/off toggles — QR alerts, daily log, incident, payment reminders. Incident notifications cannot be fully disabled.
- Roles: staff list with role assignment. Owner cannot self-demote.
- AI Persona: name (max 20 chars), tagline, tone (4 options), emoji picker, gradient picker, brief time, alert frequency. Live preview updates in real time.
- "Save Changes" CTA stages all changes until saved.

**Key Screen Elements:** 5-tab structure · Crèche settings form with per-day operating hours · Fee plans table with inline add/edit/delete · Notification on/off pill toggles · Roles table with role dropdowns · AI Persona (name input, tone selector cards, emoji picker, gradient swatches, live preview)

---

### 27 Notifications
*In-app inbox · Unread count · Mark all read*

| Screen ID | sc-notifications | **Plan** | All Plans |
|---|---|---|---|

**Purpose:** In-app notification inbox showing all system notifications — AI alerts, incidents, payment confirmations, check-in events, task assignments.

**User Stories:**
- As a manager, I want all notifications in one place so I don't miss alerts.
- As a manager, I want to mark all notifications as read in one action.

**Acceptance Criteria:**
- Notification list: type icon, title, body, timestamp, unread indicator.
- Types: AI Alert (navy), Incident (red), Payment (amber), Check-In (green), Task (amber), Announcement (navy).
- Mark All Read CTA.
- Unread notifications visually distinct.
- Clicking a notification navigates to the relevant screen or opens the relevant modal.
- Unread count badge in sidebar and topbar bell.

**Key Screen Elements:** Notification list with type-coloured icon badges · Unread vs read visual distinction · "Mark All Read" button · Click-through navigation per notification type

---

### 28 Plans & Access
*Plan comparison · Trial countdown · Paystack activation · Add-ons*

| Screen ID | sc-subscription | **Plan** | All Plans |
|---|---|---|---|

**Purpose:** Plan selection and subscription management. 3-tier comparison, Paystack activation, and Parent Premium Add-On management. Features unlock immediately after payment.

**User Stories:**
- As an owner, I want to compare plan features clearly to choose the right tier.
- As an owner, I want to upgrade and have AI features unlock immediately.
- As a manager, I want to see exactly how many trial days remain.

**Acceptance Criteria:**
- Trial countdown prominently shown.
- 3 plan cards: Seedling | Nestling Pro (featured) | Flourish. Current plan has distinct border and state.
- "Choose [Plan]" triggers Paystack payment widget.
- Successful payment activates plan immediately — features unlock without page refresh. Trial banner hides.
- Parent Add-On card: ₦2,500/child/month, toggle, calculated monthly cost.

**Key Screen Elements:** 3 plan cards (centre card "Nestling Pro" featured) · Trial countdown (urgency styling at ≤5 days) · Feature list (✓ green / ✗ muted) · Paystack integration · Parent Add-On toggle card

---

### 29 Parents & Guardians
*Directory · App adoption · Payment risk · App invite*

| Screen ID | sc-parents | **Plan** | All Plans |
|---|---|---|---|

**Purpose:** Parent directory with linked children, app adoption status, payment risk scores, and outreach tracking.

**User Stories:**
- As a manager, I want to see which parents haven't downloaded the app.
- As a manager, I want to see which parents are high payment risk.
- As an admin, I want to send an app invite with one click.

**Acceptance Criteria:**
- 4 stat cards: Registered Parents, App Active count, High Payment Risk, Uncontacted Today.
- Table: Parent avatar + name, Phone, Children linked, Balance Status, App Status, AI Risk badge, Send App Invite action.
- App Status: Active (green), Inactive (amber), Not Installed (red).
- AI Risk: High (red), Medium (amber), Low (green).
- Send App Invite limited to once per 24 hours per parent.
- Search filters real time.
- "+ Add Parent" CTA.

**Key Screen Elements:** 4 stat cards · Parent table with app status and AI risk badges · "Send App Invite" (greyed out after send within 24h) · Real-time search · "+ Add Parent" CTA

---

### 30 Rooms & Classes
*Room directory · Live occupancy · Capacity management*

| Screen ID | sc-rooms | **Plan** | All Plans |
|---|---|---|---|

**Purpose:** All active rooms with live occupancy — enrolled count, present today, capacity, waitlist count, and lead caregiver.

**User Stories:**
- As a manager, I want to see at a glance which rooms are at capacity.
- As a manager, I want to create a new room when we expand.

**Acceptance Criteria:**
- Room cards: emoji, name, age range, capacity, enrolled, present today, lead caregiver, occupancy %, status badge.
- Status: Available (green), Near Capacity >85% (amber), Full (red).
- Waitlist count shown on full rooms.
- "+ Add Room" CTA opens creation modal.
- Clicking a room opens detail with assigned children and staff.

**Key Screen Elements:** Room card grid with occupancy data · Status badge per room · Waitlist count on full rooms · "+ Add Room" CTA

---

### 31 Medication Logs
*Daily schedule · Administration confirmation · Standing orders*

| Screen ID | sc-medication | **Plan** | All Plans |
|---|---|---|---|

**Purpose:** Standing medication orders and daily administration schedule. Caregivers confirm each dose, creating an auditable record.

**User Stories:**
- As a caregiver, I want to see all medication due today so I don't miss a dose.
- As a manager, I want a record of every administration with caregiver name and time.

**Acceptance Criteria:**
- Schedule table: Child, Medication, Dose, Frequency, Caregiver, Scheduled Time, Status badge.
- Status: Done (green), Due Soon (amber with countdown), Overdue (red).
- AI alert when medication is overdue.
- Confirm Administration action per row — records caregiver and timestamp.
- Standing orders tab: add, edit, delete.
- Room filter.

**Key Screen Elements:** Schedule table with status badges and Confirm action · Overdue medication alert · Room filter · Standing orders management tab

---

### 32 Help & Training
*Guides · Video walkthroughs · AI-powered Q&A*

| Screen ID | sc-help | **Plan** | All Plans |
|---|---|---|---|

**Purpose:** In-app help centre with setup guides, feature walkthroughs, and AI-powered Q&A for the whole team.

**User Stories:**
- As a new caregiver, I want to learn how to submit a daily log without calling the manager.
- As a manager, I want to search for a feature and get a quick answer.
- As an owner, I want to know how to upgrade my plan from within the app.

**Acceptance Criteria:**
- 8-step onboarding checklist with tick-off per step.
- Search bar filters help articles.
- Article categories: Getting Started, Children & Logs, Billing, Staff & HR, Compliance, AI Features, Account & Plans.
- "Ask AI" lets staff ask Ada free-text questions about the platform.
- Video walkthrough thumbnails for core workflows.

**Key Screen Elements:** Onboarding checklist card · Help search bar · Article category grid · "Ask AI" CTA (Ada chat with help context) · Video walkthrough cards

---

## 6. AI System — Ada

Ada is not a chatbot. She is an embedded intelligence layer woven throughout the product. Every output is grounded in real crèche data — Ada never fabricates. Her name, tone, emoji, and schedule are fully customisable from Settings.

### 6.1 Where Ada Appears

| Surface | Behaviour |
|---|---|
| **Sidebar AI widget** | Always-on — shows live insight count and today's headline. Click opens AI panel. |
| **Topbar toggle** | Button to open/close AI panel from any screen. |
| **AI panel (316px right)** | Ada avatar, chat thread, suggested action chips, and input. Visible on all screens at 1440px+. |
| **Dashboard brief card** | Full-width card: Ada's top 3 insights generated at 7am daily. |
| **Screen banners** | Contextual alerts on Billing, Daily Logs, Health, Payroll, Leave, Compliance, Inventory, Enrolment. |
| **AI Command Center** | Dedicated screen: all insights by category, chat, export. |
| **Financial Reports** | AI narrative block below P&L — plain English summary with named recommendations. |
| **Settings → AI Persona** | Manager customises name, tone, emoji, gradient, brief time, alert frequency. |

### 6.2 AI Insight Triggers

| Category | Trigger | Example Output |
|---|---|---|
| **Health** | Child has low mood 4+ of last 5 days | "[Child name] has logged low mood 4 days running. Welfare check recommended." → CTA: Initiate Welfare Check |
| **Finance** | Invoice overdue >7 days | "[Parent name]'s ₦45K invoice is 10 days overdue. High non-payment risk (87%). Call by Thursday." → CTA: Send Reminder |
| **Finance** | Monthly collection tracking below 70% | "April at 67%. To hit 85%, 6 families need follow-up." → CTA: View Overdue |
| **Staff** | Caregiver log compliance <70% for 3+ days | "[Caregiver role] compliance dropped to 62% this week." → CTA: View Staff |
| **Staff** | 3+ absent days without approved leave | "3 unrecorded absences this month. Payroll will auto-deduct. Confirm before running." → CTA: Review Payroll |
| **Operations** | Children still checked in at close of day | "2 children still checked in at 6:45pm. Flagged as missing checkout." → CTA: View Reception |
| **Compliance** | DBS expiring within 30 days | "A DBS certificate expires in 28 days. Initiate renewal." → CTA: View DBS Register |
| **Enrolment** | Waitlist families showing high engagement | "AI predicts 2 of 3 waitlisted families will convert this term." → CTA: View Waitlist |

### 6.3 AI Persona Customisation

| Setting | Spec |
|---|---|
| **Name** | Default "Ada" — max 20 characters |
| **Tagline** | Short phrase shown in sidebar widget |
| **Tone** | 4 options: Professional Warm \| Casual Friendly \| Formal Precise \| Encouraging Upbeat |
| **Emoji** | Chosen from a grid — shown in sidebar and chat avatar |
| **Gradient** | 4 preset options for the AI panel header |
| **Brief time** | When the daily brief is generated — default 07:00 |
| **Alert frequency** | Minimal \| Balanced \| Proactive — controls non-urgent insight volume |

### 6.4 AI Auto-Task Creation

Ada automatically creates and assigns tasks when:
- An incident is raised → task: "Notify parent — [incident type]", due in 4 hours
- An invoice is overdue by 7 days → task: "Chase payment — [parent name]"
- A welfare flag is triggered → task: "Welfare check — [child name]"
- A missing checkout is detected at close of day
- Log compliance drops below 70% → task: "Follow up with caregivers — [room name]"

### 6.5 AI Plan Gating

| Plan | AI Features |
|---|---|
| **All plans** | No AI features |
| **Nestling Pro** | Daily brief, payment risk, welfare alerts, message drafting, financial report narrative |
| **Flourish** | All Nestling Pro features + AI Command Center, revenue forecasting, staff intelligence, custom report builder, on-demand refresh, AI report export |

---

## 7. Modal Specifications

14 core modals share the same shell: 560px wide, max 88vh, scrollable body, sticky title header, footer with Cancel (secondary) and Submit (primary) buttons.

| # | Modal | Triggered by | Key Fields |
|---|---|---|---|
| 1 | mo-add-child | + Enrol Child | First name, last name, DOB, gender, blood type, room, allergies, parent (search/create), fee plan |
| 2 | mo-log-report | + New Log | Mood emoji, breakfast/lunch/snack (all/half/none), nap duration, toilet/diaper, activity notes, note to parent |
| 3 | mo-raise-incident | + Raise Incident | Child, incident type, severity (Low/Medium/High), time, description, action taken, witnesses |
| 4 | mo-invoice | + New Invoice | Child (search), fee plan (auto-fills amount), due date, discount, note to parent |
| 5 | mo-qr-exception | Flag Exception | Person type, person (search), exception type, occurred at, notes |
| 6 | mo-manual-checkin | + Manual Check-In | Person type, person (search), in/out, time, reason (dropdown only — no free text) |
| 7 | mo-add-task | + Add Task | Title, description, assigned to (staff search), due date/time, priority |
| 8 | mo-send-message | + New Message | To (parent search), subject, body, AI Assist toggle |
| 9 | mo-announcement | + Announcement | Audience (all/by room), type, subject, body, SMS toggle, push toggle |
| 10 | mo-ai-persona | Settings AI Persona | Name, tagline, tone, emoji picker, gradient picker, brief time, alert frequency |
| 11 | mo-ai-avatar | Ada avatar click | Persona display, quick action chips, last message |
| 12 | mo-report | Generate Report | Report type, date range, charts toggle, format (PDF/Excel/CSV) |
| 13 | mo-incident | Incident row click | Incident detail (read-only), action timeline, parent notification status, Resolve |
| 14 | mo-announce | Announcement row | Announcement detail (read-only), delivery stats, re-send |

---

## 8. Non-Functional Requirements

### 8.1 Performance

| Metric | Target |
|---|---|
| Dashboard load time | <1 second on Nigerian 4G |
| QR scan response | <500ms from scan to confirmation update |
| Real-time updates | Attendance grid and activity feed via WebSocket — <1 second |
| API response SLA | <800ms at p95 |
| Stat card refresh | Auto every 30 seconds |

### 8.2 Security & Privacy

| Area | Requirement |
|---|---|
| Authentication | JWT with 15-minute lockout after 5 failed attempts |
| Role-based access | 5 roles enforced server-side on every endpoint |
| Safeguarding & SEND | DSL/Owner and Manager/Owner access respectively. Access audit-logged. Records immutable. |
| Sensitive data | Bank accounts, DBS cert numbers, pension PINs — always masked (last 4 digits), encrypted at rest |
| Audit immutability | No DELETE or UPDATE on any audit record — ever |

### 8.3 Data Conventions

| Convention | Spec |
|---|---|
| Currency | ₦ — all amounts as integers in kobo (₦45,000 = 4,500,000 kobo) |
| Timestamps | ISO 8601 UTC stored, displayed in WAT (UTC+1) |
| Date format | "Apr 11, 2025" — avoids MM/DD vs DD/MM ambiguity |
| IDs | UUID v4 for all primary keys |
| Child reference | "CEV-YYYY-NNNN" auto-generated on enrolment |

---

## 9. Sprint Plan Summary

Full user stories, Jira AC, test cases, and velocity tracking are in the PM Dashboard workbook.

| Sprint | Focus | Points | Dates | Key Deliverables |
|---|---|---|---|---|
| 1 | Auth & App Shell | 33 | May 1–14 | Login, trial flow, setup wizard, global shell |
| 2 | Dashboard & Children | 47 | May 15–28 | Dashboard, Children register, Child Profile |
| 3 | QR Attendance | 50 | May 29–Jun 11 | Reception / QR, check-in grid, exceptions, Audit Trail |
| 4 | Daily Logs & Health | 45 | Jun 12–25 | Daily Logs, Health & Incidents, Medication |
| 5 | Billing & Finance | 40 | Jun 26–Jul 9 | Billing, Expenses, Financial Reports |
| 6 | Staff & People ERP | 29 | Jul 10–23 | Staff, Payroll, Leave, Compliance |
| 7 | Communications & Tasks | 34 | Jul 24–Aug 6 | Messages, Announcements, Events, Tasks |
| 8 | AI Command Center | 40 | Aug 7–20 | AI Center, Analytics, Reports |
| 9 | Settings & AI Persona | 27 | Aug 21–Sep 3 | Settings, Notifications, Help & Training |
| 10 | Subscription & Enrolment ERP | 40 | Sep 4–17 | Subscription, Enrolment & Waitlist, Child Development |
| 11 | Inventory, Facilities & QA | 38 | Sep 18–Oct 1 | Inventory, Facilities, Rooms, Parents, full QA |

**Total: 11 sprints · 423 story points · May – October 2025.** Full stories (78), acceptance criteria, 59 test cases, velocity tracker, Definition of Done, and feature matrix are in the PM Dashboard Excel workbook.

---

## 10. Appendix — Related Documents

| Document | Format | Description |
|---|---|---|
| CEven Admin Prototype v3 | HTML | 32-screen interactive prototype — all navigation, modals, and AI panel functional |
| API Specification v2.1 | PDF | 183 endpoints, 26 modules — schemas, auth, enums, WebSocket events, cron jobs |
| PM Dashboard | Excel | 7 sheets: 78 user stories, 59 test cases, sprint plan, Jira AC, velocity tracker, DoD |
| Figma Design Files | Figma | Component library and screen layouts — link TBC |
| Artboard View | HTML | 32 screens side-by-side at 390×844px for design review |
| Individual Screen Files | ZIP | 32 standalone 1440×900px HTML files for design handoff |

---

*CEven Admin · Product Requirements Document · v1.0 · Swayosoo · May 2025 · Confidential*
