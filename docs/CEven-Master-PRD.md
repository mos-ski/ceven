# CEven — Master Product Requirements Document

| | |
|---|---|
| **Product** | CEven — Crèche ERP Operating System |
| **Document** | Master Product Requirements Document |
| **Version** | 2.0 |
| **Status** | Active — Living document, maintained by Product |
| **Owner** | Product (Adedamola Adewale) |
| **Platform** | Web application (crèche admin) + companion mobile app (parents) |

### How this document is used

This is the single source of truth for what CEven is and does. Every ticket raised for design or engineering should trace back to a section in this document — a screen, an acceptance criterion, a data rule. Sprint and release scheduling are tracked separately in the issue tracker; this document defines *what* gets built, not *when*. Where this document and a Figma mockup disagree, this document wins — mockups are illustrations of intent, not the spec itself.

---

## 1. Product Overview

### 1.1 Vision

CEven is a world-class, AI-first crèche management ERP built for Nigerian early-years childcare businesses. It replaces paper registers, WhatsApp groups, manual fee tracking, and spreadsheets with a single operating system that runs every aspect of a crèche — from daily child welfare logs, to staff payroll, to regulatory compliance, to parent communication.

### 1.2 Core Value Propositions

- **Everything in one place** — attendance, welfare, billing, staff, and compliance in a single platform.
- **AI-powered operations** — "Ada," the embedded AI assistant, surfaces insights, auto-assigns tasks, and drafts communications before staff know they need them.
- **Built for Nigerian crèches** — Naira-native billing, local compliance frameworks, Paystack-powered payments, SMS-first parent communication.
- **Designed for non-technical operators** — crèche managers and owners, not IT departments.

### 1.3 Product Scope

| | |
|---|---|
| **Platform** | Web admin app, desktop-first at 1440×900px; companion mobile app for parents |
| **Primary users** | Crèche owners, managers, lead caregivers, receptionists, finance staff |
| **Monetisation** | Two distinct revenue streams — see §5 (Billing & Monetization Model) |
| **AI differentiator** | "Ada" — an embedded AI persona generating daily briefs, welfare flags, payment risk scores, and communications |
| **Parent interaction** | Via companion parent app and SMS — parents never access the CEven admin app directly |
| **Currency** | Nigerian Naira (₦), all amounts stored as integers in kobo |
| **Notifications** | In-app, push notifications, and SMS |

---

## 2. User Personas

Five distinct roles interact with CEven. The product must serve each of them without privileging one over another.

### Crèche Manager
**Description:** Day-to-day operational lead. Uses the system daily to manage staff, review AI insights, chase outstanding payments, and handle incidents. The primary power user.
**Goals:** Reduce admin time to focus on children · Catch welfare, compliance, and payment issues before they escalate · Run payroll accurately without calling an accountant.
**Pain points (pre-CEven):** Hours spent on WhatsApp chasing caregivers for daily logs · No visibility on who has paid without calling parents · Compliance expiry dates tracked in a spreadsheet nobody checks.
**Primary screens:** Dashboard, Staff, Payroll, Leave Management, Tasks, Compliance, AI Command Center, Analytics.

### Caregiver / Room Lead
**Description:** Frontline caregiver for a specific room. Submits daily logs, confirms medication, and raises incidents. Typically operates from a tablet in the room.
**Goals:** Submit daily logs quickly without leaving the room · See the day's medication schedule clearly each morning · Flag welfare concerns without paperwork.
**Pain points:** Paper logs go missing or arrive late · No easy way to flag a change in a child's mood · Medication schedule relies on verbal handovers.
**Primary screens:** Daily Logs, Medication, Health & Incidents, Child Profile, Notifications.

### Admin / Receptionist
**Description:** Manages the front desk — check-in/check-out, billing, parent communications, and enquiries. Primary user of the QR check-in station.
**Goals:** Fast, error-free check-in during busy morning drop-off · Send and track invoices without needing a child's full history · Quickly log enquiries and manage the waitlist.
**Pain points:** QR scanner failures with no clear fallback · Parents calling about invoices they can't locate · Enquiries tracked in a physical notebook.
**Primary screens:** Reception / QR, Billing, Parents, Enrolment & Waitlist, Announcements, Messages.

### Owner
**Description:** Reviews financial performance, compliance status, and AI reports. Lower frequency, high-stakes — needs executive clarity.
**Goals:** Know at a glance whether the business is profitable · Ensure compliance is never a legal liability · Have AI flag risks before they become crises.
**Pain points:** No single view of revenue, costs, and outstanding fees · Compliance records scattered across filing cabinets · Learning about incidents days after they happened.
**Primary screens:** Dashboard, Financial Reports, Analytics, Compliance, AI Command Center, Plans & Access.

### Parent
**Description:** Receives daily updates, invoices, and announcements via the companion parent app or SMS. Does not access the CEven admin app.
**Goals:** Know their child is safe every day without calling · Receive invoices and pay digitally · Be notified immediately if anything happens.
**Pain points:** No daily updates unless they call · Invoices arrive as a WhatsApp screenshot · No confirmation their child has been picked up safely.
**Primary screens:** N/A — interacts exclusively via the parent app and SMS notifications triggered from CEven.

---

## 3. Information Architecture & Navigation

CEven uses a persistent left sidebar organised into 7 groups, plus a notifications inbox. An AI panel is available on every screen.

### 3.1 Sidebar Navigation

**OVERVIEW**
- **Dashboard** — KPI overview, AI daily brief, quick actions, live activity feed.

**CHILDREN & PEOPLE**
- **Children** — Enrolled register, search, filter, health flags.
- **Parents** — Parent directory, app adoption tracking, payment risk.
- **Enrolment & Waitlist** — Pipeline kanban, waitlist, trial sessions, leavers.
- **Child Development** — Milestones, observations, growth records, SEND register.
- **Staff** — Directory, QR attendance, log compliance tracking.
- **Payroll** — Monthly payroll run, salary setup, payslip history.
- **Leave Management** — Leave requests, approval flow, balances, calendar.
- **Compliance & Safety** — DBS register, fire drills, food hygiene, risk assessments, safeguarding.
- **Rooms & Classes** — Room cards with live occupancy and capacity.

**DAILY OPERATIONS**
- **Reception / QR** — Live check-in/out grid, QR scanner station, exception log.
- **Daily Logs** — Log compliance dashboard, submission status per child.
- **Health & Incidents** — Incident log, severity triage, parent notification tracking.
- **Medication** — Standing orders schedule, administration confirmation.
- **Inventory & Supplies** — Stock levels, low-stock alerts, equipment register, supply orders.
- **Facilities** — Maintenance requests, cleaning schedule tracker.
- **Tasks** — Task list, AI auto-assignment, priority and overdue tracking.

**FINANCE**
- **Billing & Payments** — Tuition invoicing, collection tracking, AI risk scoring.
- **Expenses** — Operating expense log, budget tracking, receipt management.
- **Financial Reports** — P&L, revenue by room, cost analysis, AI financial narrative.

**COMMUNICATION**
- **Messages** — Direct parent messaging, AI-assisted draft generation.
- **Announcements** — Broadcast to all parents or by specific room.
- **Events Calendar** — Events management, PT meetings, RSVP tracking.

**INTELLIGENCE**
- **AI Command Center** — Full AI insights dashboard, Ada chat, export.
- **Analytics** — Attendance trends, revenue charts, staff performance.
- **Reports** — Standard report generation, AI custom builder, scheduled auto-send.
- **Audit Trail** — Immutable full activity log, CSV export.

**ACCOUNT & SETUP**
- **Plans & Access** — Subscription comparison, plan activation.
- **Help & Training** — Guides, walkthroughs, AI-powered help.
- **Settings** — Crèche config, fee plans & budgets, notifications, user roles, AI persona.

### 3.2 Global Shell — Always Present

| Element | Spec |
|---|---|
| **Trial banner** | Full-width countdown with a "Choose a Plan" CTA. Dismissible. Hidden once a subscription is active. |
| **Sidebar** | Persistent navigation. Ada AI widget showing a live insight count. Active link highlighted. User profile pinned to the bottom. |
| **Topbar** | Screen title and plan badge on the left. Global search in the centre. AI panel toggle, notification bell, and a primary CTA on the right. |
| **AI panel** | Right-hand Ada panel — chat thread, suggested actions, input field. Available from every screen on desktop. |
| **Toast** | Bottom-right confirmation notification, auto-dismisses after 3 seconds. |
| **Modals** | All modals share one shell: title header, scrollable body, Cancel (secondary) and Submit (primary) footer buttons. |

---

## 4. Subscription Tiers & Feature Gating

CEven's own software is sold to crèches on a 3-tier SaaS model with a 14-day free trial. This is distinct from what parents pay the crèche in tuition — see §5. Features above a crèche's current tier show a locked placeholder with an upgrade prompt; they never render broken or empty.

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

## 5. Billing & Monetization Model

CEven has **two structurally separate money flows**, and the product must never conflate them in UI, copy, or data model:

1. **Platform subscription (crèche → CEven).** The crèche pays CEven for the right to use the software, at the tier described in §4. This is billed to the crèche's own payment method and managed entirely under **Plans & Access**.

2. **Tuition fees (parent → crèche).** Parents pay the crèche for childcare. **Tuition is tied to the room/class the child is enrolled in** — each room has a fee plan (e.g. a fixed monthly amount), and a child's invoice is generated from the fee plan of the room they're enrolled in. This is **not** a generic "child subscription," and it is not CEven's revenue — CEven only facilitates the transaction. This flow is what **Billing & Payments**, **Expenses**, and **Financial Reports** are built around.

**Payment processing rule:** CEven never takes custody of parent funds. All tuition payments are processed through a third-party payment gateway (Paystack); CEven does not store card details and does not operate a wallet or balance system on behalf of crèches or parents. This is a hard product constraint, not an implementation detail — no future feature should require CEven to hold money on anyone's behalf.

**Fee Plans** (configured under Settings) define the price for each room/class and any add-on charges (see Open Product Decisions, §13, for the current state of add-on billing). The same Fee Plans configuration also defines the budget envelopes used by the Expenses screen — one configuration surface for all of a crèche's money-in/money-out planning.

**Expense data sourcing:** a crèche's own operating costs (staff payroll, rent, utilities, supplies, maintenance) are tracked under **Expenses**. Spend recorded against equipment, supplies, or orders in **Inventory & Supplies** rolls up automatically into the Expenses totals — it is never entered twice.

---

## 6. Screen-by-Screen Requirements

### 01 — Dashboard
**Screen ID:** `sc-dashboard` · **Plan:** All Plans

**Purpose:** First screen after login. At-a-glance view of the crèche's live operational and financial status.

**User Stories:**
- As a manager, I want to see how many children are present today so I can plan staffing.
- As a manager, I want to see outstanding fees on the dashboard so I can act without navigating away.
- As a manager, I want Ada to surface the 3 most important issues for today.
- As a manager, I want to see recent activity across the crèche in real time.

**Acceptance Criteria:**
- 8 KPI stat cards: Enrolled, Present Today, Absent, Staff on Duty, Outstanding Fees, Open Incidents, Reports Pending, Tasks Overdue.
- Stat cards auto-refresh every 30 seconds.
- AI daily brief card shows Ada's insights generated at 7am with at least 2 actionable insights and CTA buttons.
- Quick-action grid shows 5 buttons: Add Child, QR Station, New Log, New Invoice, View Reports.
- Outstanding invoices table shows the 5 most overdue, with an AI risk badge (High/Medium/Low).
- Activity feed shows the last 10 events across all modules, colour-coded by type, with timestamps.
- An onboarding progress card is shown until all 8 setup steps are complete, then disappears permanently.

**Key Screen Elements:** 8 KPI stat cards (label, value, sub-text, colour-coded accent) · AI daily brief card (Ada branding, live indicator, insight rows with category dot and action button) · Quick-actions grid (5 icon tiles) · Outstanding invoices table with AI Risk badge and Days Overdue in red when >7 · Live activity feed (coloured dot, description, timestamp) · Onboarding checklist card with progress percentage.

---

### 02 — Children
**Screen ID:** `sc-children` · **Plan:** All Plans

**Purpose:** Main enrolment register showing every enrolled child, filterable by room and attendance status.

**User Stories:**
- As a manager, I want to see all enrolled children in one table so I can find any child instantly.
- As a manager, I want to filter by room to see only one class at a time.
- As a caregiver, I want health flags visible in the list so I never overlook an allergy.
- As a manager, I want to see fee status per child to spot payment issues without opening invoices.

**Acceptance Criteria:**
- 4 stat cards: Total Enrolled, Active, New This Month, Graduating Soon.
- Table: child avatar and name, age, room, parent name, attendance status, health flag, fee status, actions.
- Search filters by child name or parent name in real time.
- Room and attendance-status (All/Present/Absent) filters available.
- A red allergy badge appears in the health flag column for any child with allergy records.
- Fee status shown as a badge: Paid (green), Pending (amber), Overdue (red).
- Clicking any row opens the child's full profile.
- "+ Enrol Child" CTA opens the enrolment modal.

**Key Screen Elements:** 4 stat cards · Real-time search bar · Room and status filter dropdowns · Table with avatar, name, age, room, parent name, status badges · Allergy badge · Fee status badge · Row click → child profile.

---

### 03 — Child Profile
**Screen ID:** `sc-child-profile` · **Plan:** All Plans

**Purpose:** Everything about a single child — hero card, 6 content tabs, and an AI welfare panel.

**User Stories:**
- As a caregiver, I want to see a child's health notes, allergies, and medication in one place.
- As a manager, I want to review a child's log history to identify welfare patterns.
- As an admin, I want to see all invoices for a child from their profile.
- As a manager, I want to see Ada's welfare assessment based on recent log data.

**Acceptance Criteria:**
- Profile hero card: child avatar, full name, age, room, child reference ID (format `CEV-YYYY-NNNN`, auto-generated on enrolment), QR code thumbnail.
- Tab navigation: Overview | Daily Logs | Health | Billing | Development | Contacts.
- Overview: 7-day mood trend, today's log card, monthly attendance summary.
- Health: allergy details (allergen, reaction, EpiPen status), medical notes, vaccination status, GP contact.
- Billing: the room/fee plan this child's tuition is generated from, all invoices with status, and payment history.
- Development: milestone summary, recent observations, growth records.
- Contacts: authorised pickup persons with relationship and ID type.
- AI welfare panel: welfare score, mood health score, eating pattern, written assessment, recommended action.

**Key Screen Elements:** Profile hero card (avatar, monospace reference ID, QR thumbnail) · 6-tab bar · 7-day mood trend row · AI welfare section (confidence %, recommended action button) · Allergy cards with severity badge and EpiPen indicator · Contacts with relationship, phone, authorisation status.

---

### 04 — Parents & Guardians
**Screen ID:** `sc-parents` · **Plan:** All Plans

**Purpose:** Parent directory with linked children, app adoption status, payment risk scores, and outreach tracking.

**User Stories:**
- As a manager, I want to see which parents haven't downloaded the app.
- As a manager, I want to see which parents are high payment risk.
- As an admin, I want to send an app invite with one click.

**Acceptance Criteria:**
- 4 stat cards: Registered Parents, App Active count, High Payment Risk, Uncontacted Today.
- Table: parent avatar + name, phone, children linked, balance status, app status, AI Risk badge, Send App Invite action.
- App status: Active (green), Inactive (amber), Not Installed (red).
- AI Risk: High (red), Medium (amber), Low (green).
- "Send App Invite" is limited to once per 24 hours per parent; the action greys out after a send.
- Search filters in real time.
- "+ Add Parent" CTA available.
- Clicking a parent opens their full profile: contact details, linked child(ren) and which room/fee plan each is enrolled under, activity history, and payment history.

**Key Screen Elements:** 4 stat cards · Parent table with app status and AI risk badges · Real-time search · "+ Add Parent" CTA · Parent profile (activity log + payment history tabs).

---

### 05 — Enrolment & Waitlist
**Screen ID:** `sc-enrolment` · **Plan:** All Plans

**Purpose:** Manages the full family journey — enquiry through enrolment and departure.

**User Stories:**
- As a manager, I want to see all enquiries in a pipeline view so I know who to follow up with.
- As an admin, I want to add a family to the waitlist and know exactly how long they've been waiting.
- As a manager, I want to schedule and record trial sessions.
- As a manager, I want to process a child's departure and archive their record.

**Acceptance Criteria:**
- 4 stat cards: Active Enquiries, Waitlisted, Enrolled This Term, Leavers.
- AI conversion prediction banner.
- Pipeline tab: 5-column Kanban — Enquiry Received | Visit Scheduled | Trial Booked | Offer Made | Enrolled, with column count badges.
- Waitlist tab: position, child, room, date added, weeks waiting (red if >8 weeks), sibling-enrolled badge, "Make Offer" action.
- Trials tab: session table with outcome badge.
- Leavers tab: reason, last day, notice adequacy, exit survey, data archive status.
- "+ New Enquiry" CTA opens the enquiry form.

**Key Screen Elements:** 4 stat cards · AI conversion banner · 5-column Kanban with count badges · Waitlist table (colour-coded weeks waiting, sibling badge) · "Make Offer" action · Trials table with outcome badge · Leavers table with notice-adequacy badge.

---

### 06 — Child Development
**Screen ID:** `sc-development` · **Plan:** Flourish

**Purpose:** Tracks developmental progress across 4 domains, stores caregiver observations, records growth, and maintains the confidential SEND register.

**User Stories:**
- As a caregiver, I want to record a developmental observation quickly.
- As a manager, I want to see which children need monitoring or SEND review.
- As a DSL (Designated Safeguarding Lead), I want to add a child to the SEND register and track their support plan.

**Acceptance Criteria:**
- 4 stat cards: On Track, Monitoring, SEND Review (red), Observations This Week.
- AI summary generation banner — generates a termly developmental summary.
- Milestones tab: Child, Age, Room, Motor/Language/Social/Cognitive domain badges, Last Assessed, AI Flag.
- Observations tab: caregiver observation cards with date and category.
- Growth tab: height/weight records, BMI indicator, previous-vs-current comparison.
- SEND tab: visible to Manager/Owner only; confidentiality banner always shown; add-only (no edit or delete).

**Key Screen Elements:** 4 stat cards (SEND Review in red) · AI summary generation button · Milestones table with per-domain badges · Observation cards · Growth table with change indicator · SEND tab (confidentiality banner, restricted, add-only).

---

### 07 — Staff
**Screen ID:** `sc-staff` · **Plan:** All Plans

**Purpose:** Full staff roster with live on-duty status, weekly attendance, and per-caregiver log compliance.

**User Stories:**
- As a manager, I want to see all staff with on-duty status so I know coverage at any moment.
- As a manager, I want to see weekly attendance for each staff member.
- As a manager, I want to see each caregiver's log compliance to hold them accountable.
- As an owner, I want to change a staff member's role without technical help.

**Acceptance Criteria:**
- 4 stat cards: Total Staff, On Duty, Absent, Average Log Compliance.
- Directory tab: grid of staff cards — avatar, name, role badge, room, check-in time, compliance bar.
- Compliance tab: table of logs submitted vs. expected, flagged if below 80%.
- Attendance tab: Mon–Fri grid, tick/cross per day per staff member.
- "+ Add Staff" CTA opens an invite modal.
- Compliance bars render red when below 80%.

**Key Screen Elements:** 4 stat cards · Staff card grid (role badge, room, check-in time, compliance bar) · Colour-coded compliance bars · Flag badge on cards below threshold · 5-column weekly attendance grid.

---

### 08 — Payroll Management
**Screen ID:** `sc-payroll` · **Plan:** All Plans

**Purpose:** Full monthly payroll cycle — gross salary through PAYE tax, 8% pension, absence deductions, and bonuses to net pay. Payroll records are immutable once run.

**User Stories:**
- As a manager, I want to review all staff pay before approving the payroll run.
- As an owner, I want AI to flag anomalies before I commit.
- As a staff member, I want to receive my payslip automatically on payroll run.

**Acceptance Criteria:**
- 4 stat cards: Total Gross, Total Deductions, Net Payroll, Payroll Status.
- AI anomaly banner appears when any row is flagged for review.
- Current Month tab: Staff, Role, Basic, Bonus, Deductions, PAYE, Pension (8%), Absent Days, Net Pay, Status. Flagged rows **must** be resolved before the run can proceed.
- "Approve & Run" is blocked until all review flags are cleared, and requires a confirmation step.
- History tab: past payroll runs with gross/net totals and per-month payslip download.
- Salary Setup tab: staff list with salary, employment type, and bank details masked to the last 4 digits only.
- Payslips are auto-sent to all staff on run.

**Key Screen Elements:** 4 stat cards · AI anomaly banner · Payroll table (bonus in green, deductions in red, net pay bold) · "Review Required" badge on flagged rows · Blocked "Approve & Run" state · History tab with payslip download · Salary setup with permanently masked bank details.

---

### 09 — Leave Management
**Screen ID:** `sc-leave` · **Plan:** All Plans

**Purpose:** Full staff leave cycle — requests, approval/decline, cover tracking, and balance visibility.

**User Stories:**
- As a staff member, I want to request leave without a paper form.
- As a manager, I want to be warned when approving leave would leave a room understaffed.
- As a manager, I want to see all staff leave balances.

**Acceptance Criteria:**
- 4 stat cards: Pending, Currently On Leave, Approved This Month, Average Days Available.
- AI staffing-gap warning when approving leave would leave a room without qualified cover.
- Requests tab: Staff, Leave Type, From, To, Days, Reason, Cover Arranged, Status, with inline Approve/Decline.
- Approval is blocked when Cover Arranged = false for caregiving roles.
- Balances tab: entitlement, taken, remaining, per staff member.
- Calendar tab: monthly view of all leave periods.
- Leave types: Annual, Sick, Maternity, Paternity, Unpaid, Compassionate.

**Key Screen Elements:** 4 stat cards · AI staffing warning banner · Leave requests table with inline approve/decline · Leave type badges · Cover Arranged indicator (green/red) · Leave balances table · Monthly calendar tab.

---

### 10 — Compliance & Safety
**Screen ID:** `sc-compliance` · **Plan:** All Plans

**Purpose:** Regulatory compliance hub — DBS expiry, fire drills, food hygiene, risk assessments, and the DSL-restricted safeguarding log.

**User Stories:**
- As a manager, I want to see which compliance items are overdue before an inspection.
- As a DSL, I want to log child-protection concerns in a confidential, immutable record.
- As a manager, I want to be alerted 60 days before a DBS certificate expires.

**Acceptance Criteria:**
- 4 stat cards: Compliant, Overdue (red), Due This Month, Next Inspection.
- Overdue alert banner listing the specific items at risk.
- 5 tabs: DBS | Fire Drills | Food Hygiene | Risk Assessments | Safeguarding.
- DBS tab: staff, check type, issue date, expiry, masked certificate number, status badge; expired rows show a red badge plus "Renew Now."
- Fire Drills tab: duration, outcome, issues logged; warning shown when the next drill is overdue.
- Food Hygiene tab: temperature log, auto-flagged when readings fall outside safe ranges.
- Risk Assessments tab: area, risk level, controls, last reviewed, next review.
- Safeguarding tab: DSL/Owner access only; add-only (no edit or delete); confidentiality banner always shown.
- "Export Compliance Pack" generates a single PDF for inspections.

**Key Screen Elements:** 4 stat cards (overdue in red) · Overdue items banner · 5-tab structure · DBS table with "Renew Now" on expired rows · Fire drill overdue warning · Auto-flagged food hygiene rows · Safeguarding confidentiality banner · "Export Compliance Pack" CTA.

---

### 11 — Rooms & Classes
**Screen ID:** `sc-rooms` · **Plan:** All Plans

**Purpose:** All active rooms with live occupancy, capacity, and the fee plan tied to each room.

**User Stories:**
- As a manager, I want to see at a glance which rooms are at capacity.
- As a manager, I want to create a new room when we expand.

**Acceptance Criteria:**
- Room cards: emoji/icon, name, age range, capacity, enrolled count, present today, lead caregiver, occupancy %, status badge.
- Status: Available (green), Near Capacity (amber, >85%), Full (red).
- Waitlist count shown on full rooms.
- Each room card shows the fee plan currently assigned to that room (amount and billing frequency).
- "+ Add Room" CTA opens a creation modal, including setting that room's fee plan.
- Clicking a room opens a detail view with its assigned children and staff.

**Key Screen Elements:** Room card grid with live occupancy data · Status badge per room · Waitlist count on full rooms · Fee plan display per room · "+ Add Room" CTA.

---

### 12 — Reception / QR Station
**Screen ID:** `sc-reception` · **Plan:** All Plans

**Purpose:** QR attendance station. Displays the crèche's QR code for parents to scan, and a live grid of every child and staff member's current check-in state.

**User Stories:**
- As a receptionist, I want to see who is currently checked in without searching.
- As a receptionist, I want to manually check in a child when their QR is unavailable.
- As a manager, I want to be alerted immediately for an unauthorised pickup attempt.

**Acceptance Criteria:**
- QR station card: crèche QR code, date, crèche name, download button. The QR token rotates daily.
- Live check-in grid: every child/staff member with state — In (green), Out (dimmed), Late (amber).
- Summary row: Checked In, Checked Out, Absent, Late counts.
- Exception log panel: most recent exceptions — type, person, time, Resolve action.
- "+ Manual Check-In" requires selecting a reason from a predefined list (no free text).
- Filter: Children / Staff / All.
- Grid updates in real time.

**Key Screen Elements:** QR station card with animated scanner line · Check-in grid with colour state per card · Summary stat row · Exception log panel · Children/Staff/All filter.

---

### 13 — Daily Logs
**Screen ID:** `sc-daily-logs` · **Plan:** All Plans

**Purpose:** Compliance dashboard tracking whether every present child has had a daily log submitted.

**User Stories:**
- As a caregiver, I want to submit a daily log in under 2 minutes without leaving the room.
- As a manager, I want to see at a glance which logs are still pending.
- As a manager, I want AI to flag unusual mood patterns in today's logs.

**Acceptance Criteria:**
- 4 stat cards: Submitted, Pending, Compliance %, Average Submit Time.
- AI compliance banner appears when below 80%, naming the pending caregivers.
- Table: Child, Room, Caregiver, Submitted time, Mood emoji, Meals summary, Status badge.
- Status badges: Submitted (green), Pending (amber), AI Flag (navy).
- "Bulk Remind" sends a push notification to caregivers with pending logs.
- Room filter for single-room view.
- Clicking a submitted log opens its detail; clicking a pending row opens a submission modal for that child.

**Key Screen Elements:** 4 stat cards (compliance card colour changes dynamically) · AI flag badge on welfare-flagged rows · Room filter pills · Monospace submitted time · "Bulk Remind" (disabled when nothing is pending).

---

### 14 — Health & Incidents
**Screen ID:** `sc-health` · **Plan:** All Plans

**Purpose:** Logs all child incidents with severity triage and tracks the 4-hour parent-notification window.

**User Stories:**
- As a caregiver, I want to raise an incident quickly even when stressed.
- As a manager, I want to see all open incidents with parent notification status.
- As an owner, I want immediate notification for any High severity incident.

**Acceptance Criteria:**
- 4 stat cards: Open, This Month, Resolved, Parent Notified.
- AI alert banner appears when any open incident has had no parent notification after 4 hours.
- Table: Child, Type, Severity badge, Time, Raised By, Parent Notified (with countdown), Status.
- High-severity rows are visually differentiated with a red left border.
- "+ Raise Incident" CTA opens the incident modal.
- Clicking a row opens the full incident detail with its action timeline.

**Key Screen Elements:** 4 stat cards · Alert banner as the notification deadline approaches · Severity badges (High red, Medium amber, Low green) · Red left-border on high-severity rows · Parent-notification countdown.

---

### 15 — Medication Logs
**Screen ID:** `sc-medication` · **Plan:** All Plans

**Purpose:** Standing medication orders and the daily administration schedule, with auditable confirmation.

**User Stories:**
- As a caregiver, I want to see all medication due today so I don't miss a dose.
- As a manager, I want a record of every administration, with caregiver name and time.

**Acceptance Criteria:**
- Schedule table: Child, Medication, Dose, Frequency, Caregiver, Scheduled Time, Status badge.
- Status: Done (green), Due Soon (amber, with countdown), Overdue (red).
- AI alert appears when medication is overdue.
- "Confirm Administration" action records the confirming caregiver and timestamp.
- Standing Orders tab: add, edit, delete.
- Room filter available.

**Key Screen Elements:** Schedule table with status badges and Confirm action · Overdue medication alert · Room filter · Standing orders management tab.

---

### 16 — Inventory & Supplies
**Screen ID:** `sc-inventory` · **Plan:** All Plans

**Purpose:** Tracks consumable stock and fixed equipment; AI suggests optimised reorder lists.

**User Stories:**
- As a manager, I want to know which supplies are running low before they run out.
- As an admin, I want AI to suggest what to order and from which supplier.
- As a manager, I want to track equipment condition and flag items needing repair.

**Acceptance Criteria:**
- 4 stat cards: Low Stock Alerts (red), Total Items, Monthly Spend, Pending Orders.
- AI reorder suggestion banner.
- Stock tab: Item, Category, Current Stock, Min Level, Unit, Last Restocked, Estimated Days Left, Status — Days Left shown in red if <3, amber if <7.
- "Order Now" button on low-stock rows.
- Equipment tab: item, room, qty, condition badge (Good/Fair/Poor), last serviced, next service due.
- Orders tab: order history with supplier, cost, and status.
- "AI Reorder" generates an AI-optimised reorder list.
- All spend recorded here rolls up automatically into the Expenses screen total — it is never entered twice.

**Key Screen Elements:** 4 stat cards (low stock in red) · AI reorder banner · Colour-coded Days Left · "Order Now" on low-stock rows · Equipment condition badges · "AI Reorder" button.

---

### 17 — Facilities
**Screen ID:** `sc-facilities` · **Plan:** All Plans

**Purpose:** Maintenance request logging and tracking, plus the daily cleaning schedule checklist.

**User Stories:**
- As a caregiver, I want to report a maintenance issue quickly so it doesn't get forgotten.
- As a manager, I want to see all open requests and who is assigned.
- As a manager, I want to track which cleaning tasks have been completed today.

**Acceptance Criteria:**
- 4 stat cards: Open Requests, Resolved This Month, Cleaning Tasks Done Today, Next Service.
- Alert banner for high-priority issues open longer than 48 hours.
- Maintenance tab: Date, Location, Issue, Priority badge, Reported By, Assigned, Status, Resolution Date.
- "+ Maintenance Request" CTA.
- Cleaning tab: tap-to-complete daily checklist showing location and scheduled time, with a green tick and completion time once done.

**Key Screen Elements:** 4 stat cards · High-priority maintenance alert · Maintenance table with Priority badges · "Resolve" action per open request · Tap-to-complete cleaning checklist.

---

### 18 — Tasks & Workflow
**Screen ID:** `sc-tasks` · **Plan:** All Plans

**Purpose:** Manages operational tasks — manual to-dos and AI-auto-assigned tasks triggered by incidents, overdue invoices, and welfare flags.

**User Stories:**
- As a manager, I want to create a task and assign it to a staff member with a due date.
- As a manager, I want AI to automatically create a task when an incident is raised.
- As a manager, I want to see all overdue tasks surfaced prominently.

**Acceptance Criteria:**
- Summary row: total tasks, overdue count, in-progress, AI-escalated.
- AI alert banner appears when overdue tasks exist.
- Table: Title, Assigned To, Due Date, Priority badge, Source badge (Manual/AI Assigned/AI Escalated), Status.
- AI auto-creates tasks when: an incident is raised, an invoice is >7 days overdue, a welfare flag is triggered, or a missing checkout is detected.
- Tasks overdue by more than 24 hours are automatically escalated.
- "+ Add Task" CTA opens a creation modal with staff assignment and due date.

**Key Screen Elements:** Task summary row · AI overdue banner · Tasks table with Priority and Source badges · Status filter · Task creation modal.

---

### 19 — Billing & Payments
**Screen ID:** `sc-billing` · **Plan:** All Plans

**Purpose:** Manages tuition invoicing (see §5 for the underlying billing model), tracks collection against the monthly target, and surfaces AI payment-risk scoring so the manager knows which families to follow up with first.

**User Stories:**
- As a manager, I want to see total collected vs. outstanding this month at a glance.
- As an admin, I want to create a new invoice in under 30 seconds.
- As a manager, I want AI to flag families most likely to default so I can prioritise follow-up calls.
- As a manager, I want to send bulk SMS reminders to all overdue families in one action.

**Acceptance Criteria:**
- 4 stat cards: Collected (current month), Outstanding, Overdue >7 days, Monthly Target.
- **Monthly Target is system-calculated** from active room fee plans and current enrolment — it is never a number staff type in manually.
- A collection-progress trend is shown as a single line tracking amount collected over the month against the target (not a multi-series comparison) — this should read clearly at a glance, not require interpretation.
- AI billing insight banner appears when collection is below target, naming the specific high-risk families.
- Invoices table: Child, Parent, Room/Fee Plan, Amount, Due Date, Days Overdue (red if >7), AI Risk badge, Status.
- "+ New Invoice" CTA opens the invoice modal. This is primarily for staff to generate an invoice or record a payment on behalf of a parent who isn't using the parent app — the expected default is that most invoicing happens automatically from each child's room fee plan.
- "Bulk Remind" sends SMS to all overdue/pending families, limited to once per 24 hours; the button greys out after a send.
- Filter by status: All / Pending / Overdue / Paid.

**Key Screen Elements:** 4 stat cards · Single-line collection trend with target marker · AI insight banner naming high-risk families · Invoice table with AI Risk and Days Overdue columns · "Bulk Remind" (greyed after daily send) · Status filter tabs.

---

### 20 — Expenses
**Screen ID:** `sc-expenses` · **Plan:** All Plans

**Purpose:** Tracks the crèche's own operating expenses against monthly category budgets. This is the crèche's outgoing spend — separate from the tuition parents pay in (§19).

**User Stories:**
- As an admin, I want to log an expense with a receipt so it is properly recorded.
- As a manager, I want to see how much budget remains in each category.
- As an owner, I want to approve or reject pending expenses.

**Acceptance Criteria:**
- 4 stat cards: Monthly Budget, Spent, Remaining, Pending Approval count.
- Budget breakdown by category, shown as spent-vs-budget.
- Expense log: Date, Category, Description, Amount, Paid By, Receipt status, Approval status.
- Categories include at minimum: Payroll, Rent, Utilities, Supplies, and an Other bucket.
- "+ Add Expense" CTA.
- Expenses over ₦50,000 require a receipt — an "Upload Receipt" prompt appears on rows missing one, and the expense cannot be approved without it.
- Pending expenses show inline Approve/Reject actions (manager/owner only).
- Approved expenses are immutable — no edit or delete once approved.
- Monthly budgets per category are configured under Settings (Fee Plans & Budgets), and equipment/supply spend recorded under Inventory & Supplies rolls into this screen's totals automatically.

**Key Screen Elements:** 4 stat cards · Category budget breakdown · Expense table with category badge and approval status · "Upload Receipt" prompt above the threshold · Inline approve/reject for pending rows.

---

### 21 — Financial Reports
**Screen ID:** `sc-financial-reports` · **Plan:** Nestling Pro & Flourish

**Purpose:** Monthly P&L, revenue by room, and cost analysis, with an AI-generated plain-English financial narrative.

**User Stories:**
- As an owner, I want a simple P&L for any month without needing an accountant.
- As a manager, I want to see which rooms generate the most and least revenue.
- As an owner, I want Ada to tell me in plain English what to do to close the month profitably.

**Acceptance Criteria:**
- Month selector, defaulting to the current month.
- P&L tab: Income section (tuition, registration, meals add-on, total) + Expenditure section (payroll, rent, supplies, utilities, maintenance, other, total). Net Result box — green for surplus, red for deficit.
- AI narrative card below the P&L — a plain-English summary naming specific families/actions; it must never state a name or figure not present in the underlying data.
- Revenue tab: by room — potential revenue, collected, outstanding, collection %, colour-coded by percentage.
- Cost Analysis tab: each expense category as a % of total income; payroll ratio highlighted against a 60–70% healthy-range indicator.
- "Export P&L" generates a branded PDF.

**Key Screen Elements:** Month selector · Two-section P&L layout with bold totals · Colour-coded Net Result box · AI narrative card · Revenue-by-room breakdown table · Cost analysis chart · "Export P&L" button.

---

### 22 — Messages
**Screen ID:** `sc-comms` · **Plan:** All Plans

**Purpose:** Direct one-to-one messaging between staff and parents, with AI-assisted draft generation.

**User Stories:**
- As a manager, I want to send a direct message to a parent without leaving the platform.
- As a caregiver, I want AI to draft a welfare message so I don't have to choose the right words.
- As a manager, I want to see all unread message threads in one place.

**Acceptance Criteria:**
- Message thread list: sender, preview, timestamp, unread badge.
- Unread threads are visually distinguished (amber left border).
- "+ New Message" opens a compose modal with parent search.
- An "AI Assist" toggle generates a contextually appropriate draft.
- Messages deliver via in-app push, with SMS fallback.
- Unread count shown as a badge in the sidebar.

**Key Screen Elements:** Thread list with unread indicator · Amber left border on unread threads · Compose modal with parent search and AI Assist toggle · Delivery status indicator (app push / SMS fallback).

---

### 23 — Announcements
**Screen ID:** `sc-announcements` · **Plan:** All Plans

**Purpose:** Broadcast messages to all parents or to a specific room, via SMS and/or in-app push.

**User Stories:**
- As a manager, I want to message all parents at once without copy-pasting into WhatsApp.
- As a manager, I want to target an announcement to one room.
- As a manager, I want to see how many parents received and read each announcement.

**Acceptance Criteria:**
- "+ Announcement" opens a compose modal.
- Audience selector: All Parents or by Room.
- Announcement type dropdown (e.g. holiday closure, general notice).
- SMS and app-push delivery toggles — both can be active simultaneously.
- Sent history shows: subject, audience, date, app delivery count, SMS count.

**Key Screen Elements:** Sent-announcements list with delivery stat badges · Compose modal with audience and delivery toggles · Per-announcement delivery stats.

---

### 24 — Events Calendar
**Screen ID:** `sc-events` · **Plan:** All Plans

**Purpose:** Manages crèche events — parent-teacher meetings, sports days, CPD training days, open days — with invitations and RSVP tracking.

**User Stories:**
- As a manager, I want to schedule a parent-teacher meeting and invite all relevant parents.
- As a manager, I want to see RSVP responses to know expected attendance.
- As a manager, I want to mark a CPD day so staff and parents know the crèche is closed.

**Acceptance Criteria:**
- Upcoming events shown as cards — title, date, time, audience badge, description.
- Each event card has "Send Invitation" and "View RSVPs" actions.
- "+ New Event" CTA opens the event creation modal.
- Audience types: All Parents, All Families, Specific Room, Staff Only.
- RSVP list shows each parent's response (Attending / Not Attending / Maybe) with a count summary.

**Key Screen Elements:** Event cards with audience badge and action buttons · Event creation modal · RSVP list with response badges and count summary.

---

### 25 — AI Command Center
**Screen ID:** `sc-ai-center` · **Plan:** Nestling Pro & Flourish

**Purpose:** Ada's dedicated screen — a full-width intelligence hub spanning health, finance, and staff insights, plus chat and report export.

**User Stories:**
- As a manager, I want to see all AI insights in one place by type and urgency.
- As a manager, I want to ask Ada a question about my crèche data in plain English.
- As an owner, I want to export all AI intelligence as a report PDF.

**Acceptance Criteria:**
- AI insight list: category dot, priority number, headline, confidence %, data sources, CTA button.
- Category filter: All | Health | Finance | Staff.
- Insights sorted by priority (1 = most urgent); CTAs navigate to the relevant screen or trigger a modal action.
- "Refresh AI" triggers on-demand re-analysis (Flourish only).
- "Export AI Report" generates a PDF (Flourish only).
- AI chat panel is open by default on this screen.
- Seedling-tier crèches see a locked-gate overlay rather than this screen.

**Key Screen Elements:** AI insight list with priority, headline, confidence %, and CTA per item · Category filter tabs · "Refresh" and "Export" buttons · AI chat panel open by default · Locked-gate overlay for Seedling.

---

### 26 — Analytics
**Screen ID:** `sc-analytics` · **Plan:** Nestling Pro & Flourish

**Purpose:** Aggregated analytics — attendance patterns, monthly revenue vs. target, staff compliance trends, and AI pattern insights.

**User Stories:**
- As an owner, I want to see attendance trends over 6 months.
- As a manager, I want to see revenue vs. target charted weekly.
- As an owner, I want to see which rooms have the best and worst staff compliance.

**Acceptance Criteria:**
- 4 stat cards: Enrolment, Average Attendance %, Revenue (current month), Open Incidents.
- 4 tabs: Overview | Attendance | Revenue | Staff.
- Overview: summary charts plus AI top-3 performance observations.
- Attendance: weekly bar chart, room breakdown, trend vs. last month.
- Revenue: collected-vs-outstanding stacked bars, monthly-vs-target line.
- Staff: per-caregiver compliance bars, attendance rate summary.

**Key Screen Elements:** 4 stat cards · 4 content tabs · Bar charts for attendance and revenue · Room-by-room breakdown table · AI observations panel per tab · Period selector.

---

### 27 — Reports
**Screen ID:** `sc-reports` · **Plan:** Nestling Pro & Flourish

**Purpose:** Reporting centre — 7 standard one-click reports, an AI custom builder, and scheduled automated delivery.

**User Stories:**
- As an owner, I want a monthly P&L emailed automatically on the 1st of every month.
- As a manager, I want to ask Ada to build a custom report in plain English.
- As a manager, I want a regulatory compliance pack with one click before an inspection.

**Acceptance Criteria:**
- 4 stat cards: Reports Generated, Scheduled Active, Last Export, Data Coverage.
- 2-column layout: Standard Reports (left), Scheduled Reports (right).
- 7 standard report cards: Occupancy Trend, Attendance Pattern, Revenue per Room, Incident Trend, Staff Performance, Regulatory Compliance Pack, Child Development Summary.
- An 8th card: AI Custom Report Builder — a plain-English query produces a PDF.
- Scheduled reports list: name, schedule, recipients, next run date, active toggle.
- "+ Schedule" CTA, with schedule options: Weekly (Monday), Monthly (1st), Monthly (28th), Quarterly, End of Term.

**Key Screen Elements:** 7 standard report cards with "Generate" button · AI Custom Report Builder card · Scheduled reports panel with next-run date · "+ Schedule" CTA · Loading state while a report builds.

---

### 28 — Audit Trail
**Screen ID:** `sc-audit` · **Plan:** All Plans

**Purpose:** A complete, immutable log of every action taken in the system.

**User Stories:**
- As an owner, I want a record of every action in the system for full accountability.
- As a manager, I want to filter the audit log to investigate a specific incident.
- As an owner, I want to export the audit log as CSV for an external audit.

**Acceptance Criteria:**
- Table: Time, User, Role, Action description, Record affected, Method (QR/App/Web/Manual).
- Filters: date range, user, event type.
- "Export Log" generates a CSV.
- Records are never deleted and cannot be edited, by anyone, under any role.
- Audit entries are created automatically for every user action across every module.

**Key Screen Elements:** Full-width audit table · Date range/user/event-type filters · "Export Log" CSV button · Method badge per row.

---

### 29 — Plans & Access
**Screen ID:** `sc-subscription` · **Plan:** All Plans

**Purpose:** Manages the crèche's own subscription to CEven (§4) — plan comparison, payment activation, and the Parent App add-on.

**User Stories:**
- As an owner, I want to compare plan features clearly to choose the right tier.
- As an owner, I want to upgrade and have AI features unlock immediately.
- As a manager, I want to see exactly how many trial days remain.

**Acceptance Criteria:**
- Trial countdown prominently shown, with urgency styling at ≤5 days remaining.
- 3 plan cards: Seedling | Nestling Pro (featured) | Flourish. The current plan has a visually distinct border/state.
- "Choose [Plan]" triggers payment.
- A successful payment activates the new plan immediately — features unlock without a page refresh, and the trial banner disappears.
- Parent Add-On card: ₦2,500/child/month, with a toggle and a live-calculated monthly cost.

**Key Screen Elements:** 3 plan cards (Nestling Pro featured) · Trial countdown with urgency styling · Feature list (✓ green / ✗ muted) · Payment integration · Parent Add-On toggle card.

---

### 30 — Settings
**Screen ID:** `sc-settings` · **Plan:** All Plans

**Purpose:** The crèche's configuration centre.

**User Stories:**
- As a manager, I want to set operating hours so the system knows when check-ins are late.
- As an owner, I want to create and edit fee plans and budgets.
- As a manager, I want to rename and retone Ada to match our crèche's culture.
- As an admin, I want to assign roles to staff members.

**Acceptance Criteria:**
- 5 tabs: Crèche | Fee Plans & Budgets | Notifications | Roles | AI Persona.
- Crèche tab: name, address, phone, capacity, operating hours (per day), late threshold, compliance target %.
- Fee Plans & Budgets tab: a table to add/edit/delete room fee plans (price, billing frequency, room assignment) and monthly expense category budgets, in one place.
- Notifications tab: 4 on/off toggles — QR alerts, daily log, incident, payment reminders. Incident notifications cannot be fully disabled, ever.
- Roles tab: staff list with role assignment. The Owner role cannot self-demote.
- AI Persona tab: name (max 20 characters), tagline, tone (4 options), emoji picker, gradient picker, daily brief time, alert frequency. Changes preview live.
- "Save Changes" stages all edits until explicitly saved.

**Key Screen Elements:** 5-tab structure · Crèche settings form with per-day operating hours · Combined fee-plan/budget table with inline add/edit/delete · Notification toggle pills · Roles table with role dropdowns · AI Persona editor with live preview.

---

### 31 — Notifications
**Screen ID:** `sc-notifications` · **Plan:** All Plans

**Purpose:** In-app inbox for every system notification.

**User Stories:**
- As a manager, I want all notifications in one place so I don't miss alerts.
- As a manager, I want to mark all notifications as read in one action.

**Acceptance Criteria:**
- Notification list: type icon, title, body, timestamp, unread indicator.
- Types are colour-coded: AI Alert (navy), Incident (red), Payment (amber), Check-In (green), Task (amber), Announcement (navy).
- "Mark All Read" CTA.
- Unread notifications are visually distinct from read ones.
- Clicking a notification navigates to the relevant screen or opens the relevant modal.
- An unread-count badge appears in the sidebar and on the topbar bell.

**Key Screen Elements:** Notification list with type-coloured icon badges · Unread/read visual distinction · "Mark All Read" button · Click-through navigation per type.

---

### 32 — Help & Training
**Screen ID:** `sc-help` · **Plan:** All Plans

**Purpose:** In-app help centre — setup guides, walkthroughs, and AI-powered Q&A.

**User Stories:**
- As a new caregiver, I want to learn how to submit a daily log without calling the manager.
- As a manager, I want to search for a feature and get a quick answer.
- As an owner, I want to know how to upgrade my plan from within the app.

**Acceptance Criteria:**
- 8-step onboarding checklist with per-step tick-off.
- Search bar filters help articles.
- Article categories: Getting Started, Children & Logs, Billing, Staff & HR, Compliance, AI Features, Account & Plans.
- "Ask AI" lets any staff member ask Ada free-text questions about the platform.
- Video walkthrough thumbnails for core workflows.

**Key Screen Elements:** Onboarding checklist card · Help search bar · Article category grid · "Ask AI" CTA · Video walkthrough cards.

---

## 7. AI System — Ada

Ada is not a chatbot. She is an embedded intelligence layer woven throughout the product. Every output must be grounded in real crèche data — Ada never fabricates a name, figure, or fact. Her name, tone, emoji, and schedule are fully customisable from Settings. (The underlying AI provider/model is a technical decision made independently of this spec — see §13.)

### 7.1 Where Ada Appears

| Surface | Behaviour |
|---|---|
| **Sidebar AI widget** | Always-on, shows a live insight count and today's headline. Opens the AI panel on click. |
| **Topbar toggle** | Opens/closes the AI panel from any screen. |
| **AI panel** | Ada avatar, chat thread, suggested action chips, input field. Available from every screen. |
| **Dashboard brief card** | Full-width card with Ada's top 3 insights, generated at 7am daily. |
| **Screen banners** | Contextual alerts on Billing, Daily Logs, Health, Payroll, Leave, Compliance, Inventory, and Enrolment. |
| **AI Command Center** | Dedicated screen: all insights by category, chat, export. |
| **Financial Reports** | Plain-English narrative block below the P&L, with named recommendations. |
| **Settings → AI Persona** | Where the manager customises name, tone, emoji, gradient, brief time, and alert frequency. |

### 7.2 AI Insight Triggers

| Category | Trigger | Example Output |
|---|---|---|
| Health | Child has logged low mood 4+ of the last 5 days | "[Child name] has logged low mood 4 days running. Welfare check recommended." → *Initiate Welfare Check* |
| Finance | Invoice overdue >7 days | "[Parent name]'s ₦45K invoice is 10 days overdue. High non-payment risk (87%). Call by Thursday." → *Send Reminder* |
| Finance | Monthly collection tracking below 70% | "April at 67%. To hit 85%, 6 families need follow-up." → *View Overdue* |
| Staff | Caregiver log compliance <70% for 3+ days | "[Caregiver role] compliance dropped to 62% this week." → *View Staff* |
| Staff | 3+ absent days without approved leave | "3 unrecorded absences this month. Payroll will auto-deduct. Confirm before running." → *Review Payroll* |
| Operations | Children still checked in at close of day | "2 children still checked in at 6:45pm. Flagged as missing checkout." → *View Reception* |
| Compliance | DBS expiring within 30 days | "A DBS certificate expires in 28 days. Initiate renewal." → *View DBS Register* |
| Enrolment | Waitlist families showing high engagement | "AI predicts 2 of 3 waitlisted families will convert this term." → *View Waitlist* |

### 7.3 AI Persona Customisation

| Setting | Spec |
|---|---|
| Name | Default "Ada" — max 20 characters |
| Tagline | Short phrase shown in the sidebar widget |
| Tone | 4 options: Professional Warm \| Casual Friendly \| Formal Precise \| Encouraging Upbeat |
| Emoji | Chosen from a grid — shown in sidebar and chat avatar |
| Gradient | 4 preset options for the AI panel header |
| Brief time | When the daily brief is generated — default 07:00 |
| Alert frequency | Minimal \| Balanced \| Proactive — controls non-urgent insight volume |

### 7.4 AI Auto-Task Creation

Ada automatically creates and assigns tasks when:
- An incident is raised → "Notify parent — [incident type]," due in 4 hours.
- An invoice is overdue by 7 days → "Chase payment — [parent name]."
- A welfare flag is triggered → "Welfare check — [child name]."
- A missing checkout is detected at close of day.
- Log compliance drops below 70% → "Follow up with caregivers — [room name]."

### 7.5 AI Plan Gating

| Plan | AI Features |
|---|---|
| All plans | No AI features |
| Nestling Pro | Daily brief, payment risk, welfare alerts, message drafting, financial report narrative |
| Flourish | All Nestling Pro features + AI Command Center, revenue forecasting, staff intelligence, custom report builder, on-demand refresh, AI report export |

---

## 8. Modal Specifications

All modals share one shell: fixed width, capped height with a scrollable body, a sticky title header, and a footer with Cancel (secondary) and Submit (primary) buttons.

| # | Modal | Triggered by | Key Fields |
|---|---|---|---|
| 1 | Add Child | "+ Enrol Child" | First name, last name, DOB, gender, blood type, room (sets fee plan), allergies, parent (search/create) |
| 2 | Log Daily Report | "+ New Log" | Mood emoji, meals (all/half/none), nap duration, toilet/diaper, activity notes, note to parent |
| 3 | Raise Incident | "+ Raise Incident" | Child, incident type, severity (Low/Medium/High), time, description, action taken, witnesses |
| 4 | New Invoice | "+ New Invoice" | Child (search) — fee plan auto-fills from the child's room, due date, discount, note to parent |
| 5 | QR Exception | "Flag Exception" | Person type, person (search), exception type, occurred at, notes |
| 6 | Manual Check-In | "+ Manual Check-In" | Person type, person (search), in/out, time, reason (dropdown only) |
| 7 | Add Task | "+ Add Task" | Title, description, assigned to (staff search), due date/time, priority |
| 8 | New Message | "+ New Message" | To (parent search), subject, body, AI Assist toggle |
| 9 | New Announcement | "+ Announcement" | Audience (all/by room), type, subject, body, SMS toggle, push toggle |
| 10 | AI Persona Editor | Settings → AI Persona | Name, tagline, tone, emoji picker, gradient picker, brief time, alert frequency |
| 11 | Ada Quick View | Ada avatar click | Persona display, quick-action chips, last message |
| 12 | Generate Report | "Generate Report" | Report type, date range, charts toggle, format (PDF/Excel/CSV) |
| 13 | Incident Detail | Incident row click | Read-only incident detail, action timeline, parent-notification status, Resolve action |
| 14 | Announcement Detail | Announcement row click | Read-only detail, delivery stats, re-send action |

---

## 9. Non-Functional Requirements

### 9.1 Performance

| Metric | Target |
|---|---|
| Dashboard load time | <1 second on Nigerian 4G |
| QR scan response | <500ms from scan to confirmation |
| Real-time updates | Attendance grid and activity feed update in <1 second |
| API response | <800ms at p95 |
| Stat card refresh | Every 30 seconds |

### 9.2 Security & Privacy

| Area | Requirement |
|---|---|
| Authentication | Session-based with a lockout after repeated failed attempts |
| Role-based access | All 5 roles enforced server-side on every endpoint |
| Safeguarding & SEND | DSL/Owner and Manager/Owner access respectively; access is audit-logged; records are immutable |
| Sensitive data | Bank accounts, certificate numbers, and pension PINs are always masked (last 4 digits) and encrypted at rest |
| Audit immutability | No update or delete is ever possible on an audit record |
| Payment custody | CEven never stores card details and never holds parent or crèche funds in a wallet — see §5 |

### 9.3 Data Conventions

| Convention | Spec |
|---|---|
| Currency | ₦ — all amounts stored as integers in kobo (₦45,000 = 4,500,000 kobo) |
| Timestamps | Stored in UTC, displayed in West Africa Time (UTC+1) |
| Date format | "Apr 11, 2025" — avoids MM/DD vs. DD/MM ambiguity |
| Child reference ID | `CEV-YYYY-NNNN`, auto-generated on enrolment |

---

## 10. Glossary

| Term | Meaning |
|---|---|
| **Crèche** | The childcare business/customer using CEven (also called a "nursery") |
| **Ada** | CEven's embedded AI persona |
| **Fee Plan** | The price and billing frequency attached to a room/class, used to generate parent tuition invoices |
| **DSL** | Designated Safeguarding Lead — the staff role with access to the confidential safeguarding log |
| **SEND** | Special Educational Needs and Disabilities — the confidential register for children needing additional support |
| **Tier** | The crèche's own CEven subscription level — Seedling, Nestling Pro, or Flourish |

---

## 11. Document History

| Version | Change |
|---|---|
| 1.0 | Original PRD as supplied at project kickoff. |
| 2.0 | Reorganised into this master document; clarified the two distinct money flows (platform subscription vs. room-based tuition) as a dedicated section; corrected the Billing & Payments collection-trend and Monthly Target acceptance criteria; merged Settings' fee-plan and budget configuration into one tab; clarified Inventory & Supplies → Expenses data flow; added a glossary and an open-decisions tracker. |

---

## 12. Open Product Decisions

These are explicitly **not yet finalized** — do not write acceptance criteria elsewhere in this document that assume a specific resolution to any of these without flagging it.

1. **Add-on billing.** Whether parents can be charged for items/services beyond their room's base fee plan (and if so, who configures and bills for them) is undecided.
2. **AI provider.** Which underlying AI/LLM provider powers Ada has not been selected; this PRD defines required behavior and outputs only, independent of vendor.
3. **Fee Plans & Budgets settings tab.** The combined room-fee/expense-budget configuration described in §30 is the target design; it is not yet finalized in detail.
