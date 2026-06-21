# Dashboard — Product Requirements Document

## 1. Purpose

The Dashboard is the main landing page after login — a command center that gives the administrator a complete overview of the crèche's daily status at a glance. It combines operational stats, AI-generated insights, financial summaries, live activity feeds, and quick actions into a single screen.

---

## 2. Screen Layout

### 2.1 Greeting Banner
A dark brown gradient banner at the top of the page with decorative gold squiggle watermark.

**Left side:**
- Current date (e.g., "Friday, 11 April 2025")
- Welcome message (e.g., "Good morning, Amaka 👋")
- Active status indicator (green dot)

**Right side:**
- **Notification Bell** — shows unread count badge (e.g., "4")
- **"AI Reports" toggle** — opens/closes the AI chat panel
- **"Enroll a Child"** — primary call-to-action button

### 2.2 Quick Actions Bar
Visible only when the AI chat panel is open. A horizontal scrollable row of 6 quick-action buttons:

| Action | Purpose |
|---|---|
| Add Child | Opens the enrollment modal |
| QR Station | Navigates to the QR check-in page |
| New Log | Opens daily activity logging |
| Raise Incident | Opens incident reporting |
| New Invoice | Opens invoice creation |
| View Reports | Navigates to reports |

### 2.3 Stats Grid
Two rows of four stat cards each, showing key operational metrics:

**Row 1 — Operational:**
| Stat | What It Shows |
|---|---|
| Total Enrolled | Number of children currently enrolled, with trend indicator |
| Present Today | Children present via QR check-in |
| Absent | Children absent today |
| Staff on Duty | Staff currently on duty (fraction of total) |

**Row 2 — Financial & Compliance:**
| Stat | What It Shows |
|---|---|
| Outstanding Fees | Total unpaid fees in ₦, with count of pending invoices |
| Open Incidents | Number of open incidents requiring review |
| Reports | Number of reports submitted vs total |
| Tasks Overdue | Number of overdue tasks requiring action |

Each card displays a label, a large value, and a colored trend or status indicator.

### 2.4 Middle Panels (Three-Column Layout)
The middle section adapts based on whether the AI panel is open.

**When AI Panel is Closed (Default):**

| Panel | Content |
|---|---|
| **AI Daily Brief** | AI-generated insight cards with colored indicators, category tags, and "Take Action" buttons |
| **Upcoming Events** | List of upcoming events with date, time, and title |
| **Live Activities** | Real-time feed of recent activity reports with timestamps |

**When AI Panel is Open:**

| Panel | Content |
|---|---|
| **AI Daily Brief** | Same as above |
| **Room Occupancy** | Progress bars showing occupancy per room (present/capacity) |
| *(Live Activities hidden to make space)* | |

### 2.5 Bottom Tables
Two tables displayed side by side:

**Outstanding Payments (wider):**
- Columns: Child, Amount, Due Date, Status (Overdue/Pending), Action
- Each row shows the child's name and class, the outstanding amount in ₦, and a "Reminder" action

**Pending Enrollments (narrower):**
- Columns: Submission, Status, Submitted Date, Action
- Each row shows the child's name and class, enrollment status, and a "View" action

---

## 3. AI Chat Panel ("Ada")

A slide-in panel from the right side of the screen, toggled by the "AI Reports" button.

**Header:**
- Bot avatar (gradient circle with star icon)
- Name: "Ada"
- Status: "Online" (green indicator)
- Close button

**Chat Area:**
- AI messages appear in cream-colored bubbles, left-aligned with bot avatar
- User messages appear in brown bubbles, right-aligned
- Pre-loaded conversation demonstrates Ada's capabilities

**Quick Prompts:**
Three suggestion buttons below the chat:
- "Summarise today's absences"
- "Which invoices are overdue?"
- "Flag welfare concerns"

**Input:**
- Text input: "Ask Ada anything..."
- Send button (dark brown circle)

---

## 4. Notification Panel

A floating overlay anchored to the top-right corner, triggered by the notification bell.

**Header:**
- "Notifications" title
- "New Inbox (4)" badge
- Close button

**Filter Tabs:**
- All, Log Update, Enquiries, Emergency

**Notification Items (5 types):**

| Type | Tag Color | Example |
|---|---|---|
| AI Alert | Grey | "Ada flagged 2 children for follow-up" |
| Incident | Red | "Minor fall reported — Tiger Room" |
| Invoice | Gold | "3 invoices now 7+ days overdue" |
| Message | Amber | "New enquiry from Mrs Adeyemi" |
| Payment | Green | "Payment received — ₦85,000" |

Each notification has a color-coded left border, tag pill, unread indicator dot, title, description, and timestamp.

**Footer:** "Mark All as Read" button

---

## 5. Enroll Child Modal

A full-screen overlay modal for enrolling a new child, triggered by the "Enroll a Child" button.

**Header:** "Add New Child" with subtitle and close button

**Info Callout:** Yellow/amber note explaining required fields and pending enrollment status

**Section 1 — Child's Information:**
- First Name (required)
- Last Name (required)
- Date of Birth (required, date picker)
- Gender (required, dropdown: Male/Female/Other)
- Blood Group (dropdown: A+/A-/B+/B-/AB+/AB-/O+/O-/Unknown)
- Room/Class (required, dropdown: Lion/Tiger/Elephant/Zebra/Giraffe Class)
- Allergies / Medical Notes (textarea)

**Section 2 — Parent/Guardian Info:**
- Full Name (required)
- Email Address (required)
- Phone Number
- Consent checkbox: confirmation of parental consent

**Section 3 — Subscription & Start Date:**
- Subscription Plan (required, dropdown: Monthly ₦40,000 / Termly ₦110,000 / Annual ₦400,000)
- Start Date (required, date picker)

**Footer:** Cancel button, "Enroll Child" primary button

---

## 6. User Actions Summary

| Action | Trigger | Result |
|---|---|---|
| Toggle AI panel | "AI Reports" button | Opens/closes Ada chat panel |
| Enroll a child | "Enroll a Child" button | Opens enrollment modal |
| Open notifications | Bell icon | Opens notification panel |
| Take Action on insight | "Take Action" link | Navigates to relevant module |
| Send payment reminder | "Reminder" link in table | Sends reminder (simulated) |
| View pending enrollment | "View" link in table | Opens enrollment details |
| Quick actions | Quick action buttons | Navigates to relevant feature |
| Chat with Ada | Text input + send | Receives AI response |
| Use quick prompt | Quick prompt button | Sends pre-filled query to Ada |

---

## 7. Gaps & Future Work

- All stats are static — no real-time data updates
- No actual AI integration — daily brief and chat responses are hardcoded
- No real notification delivery — no push, email, or in-app notifications
- Enrollment modal doesn't persist data
- No pagination for tables
- No export functionality for reports
- No calendar integration for events
- No drill-down from stats to detailed views
