# CEven — Product Requirements Document

## 1. Product Summary

**CEven** is a nursery and crèche management platform designed to help administrators manage every aspect of their early-years childcare business — from enrolling children and tracking daily activities, to managing staff, finances, parent communication, and AI-powered insights.

**Target Market:** Nigerian nursery schools and crèches  
**Currency:** Nigerian Naira (₦)  
**Brand Voice:** Warm, professional, approachable  
**AI Assistant:** "Ada" — a built-in AI copilot that helps administrators with daily briefs, message drafting, anomaly detection, and natural-language queries

---

## 2. What CEven Does

CEven provides a single dashboard where a crèche administrator can:

- **See everything at a glance** — enrollment numbers, attendance, fees, incidents, and AI insights on one screen
- **Manage children** — from enrollment through daily activity logs, health records, payments, and parent contacts
- **Manage staff** — roster, attendance tracking, role-based permissions, and compliance monitoring
- **Run daily operations** — QR-based check-in/check-out, attendance grids, and activity logging
- **Handle finances** — payment tracking, expense management, and invoice oversight
- **Communicate with parents** — in-app messaging with AI-assisted compose and templates
- **Get AI intelligence** — automated flagging of welfare concerns, attendance anomalies, compliance gaps, and financial risks
- **Manage subscriptions** — choose plans, configure billing, and add optional features

---

## 3. Design Language

### Visual Identity
CEven uses a **warm, earth-tone design system** — deep browns, soft tans, cream backgrounds, and gold accents. The aesthetic communicates trust, warmth, and professionalism, appropriate for a childcare environment.

| Element | Treatment |
|---|---|
| Primary brand color | Deep warm brown (`#3B2513`) |
| Accent color | Gold/amber (`#C47B2C`) |
| Background | Warm off-white (`#FFF9F0`) |
| Cards | White with subtle borders and rounded corners |
| Tables | Tan header rows, white body, thin borders |
| Typography | Serif headings (Merriweather), rounded body text (Nunito), sans-serif UI (Urbanist), brand logo (Mogra) |

### Layout Pattern
Every admin screen uses a consistent shell:
- **Left sidebar** (280px) — navigation, support card, user info
- **Top bar** — global search, quick actions, AI assistant shortcut, notifications, logout
- **Content area** — scrollable, padded, warm background

On mobile, the sidebar collapses to a hamburger menu with a dark overlay.

---

## 4. Product Modules

| # | Module | Purpose |
|---|---|---|
| 1 | **Authentication** | Account creation, login, email verification, password recovery |
| 2 | **Dashboard** | Command center with stats, AI brief, payments, enrollments, notifications |
| 3 | **Child Management** | Child roster, individual profiles with 6 detail tabs |
| 4 | **Staff Management** | Staff roster, attendance grid, role and permission management |
| 5 | **Daily Operations** | QR check-in station, daily activity logs |
| 6 | **Finance** | Payment history, expense tracking, invoice management |
| 7 | **Communication** | Parent messaging with AI-assisted compose and templates |
| 8 | **Intelligence** | AI analytics center with health, compliance, and financial insights |
| 9 | **Account & Setup** | Subscription plans, billing, and add-on configuration |

---

## 5. Key Product Concepts

### Ada AI Assistant
Ada is a conversational AI copilot embedded throughout the product. It appears as:
- A **slide-in chat panel** on the Dashboard for quick queries
- A **dedicated sidebar** on the Intelligence page for deeper analysis
- **AI-generated insight cards** across the Dashboard, child profiles, and staff pages
- **AI flags and observations** that surface anomalies and recommend actions

Ada can summarize absences, flag overdue invoices, draft parent messages, identify at-risk children, and answer natural-language questions about the crèche.

### QR Code Check-In System
A physical QR code displayed at reception allows parents and staff to scan in and out. The system provides:
- Real-time scan feed with IN/OUT status
- Attendance grid showing who's present, absent, or pending
- Manual check-in override for exceptions
- Exception logging for late arrivals or early departures

### Health & Welfare Flagging
The AI monitors absence patterns, allergy records, medical notes, and behavioral changes. When something looks wrong, it surfaces flags on:
- The Dashboard (AI Daily Brief)
- Individual child profiles (AI Observations Banner)
- The Intelligence center (Incidents & Flags panel)
- Staff pages (compliance alerts)

### Role-Based Access Control
Administrators can create custom roles (e.g., Caregiver, Admin, Nurse, Marketer) and assign granular permissions across 7 modules: Children & Parent, Finance, Account & Setup, Staff Management, Communication, Intelligence, and Daily Operations.

### Subscription Billing
CEven operates on a SaaS subscription model with 3 tiers and optional add-ons, supporting monthly or yearly billing cycles with 7.5% VAT.

---

## 6. Navigation Structure

The sidebar provides access to 8 modules:

1. **Dashboard** — Overview and command center
2. **Child Management** — Roster and profiles
3. **Staff Management** — Team and permissions
4. **Daily Operations** — Check-in and logs
5. **Finance** — Payments and expenses
6. **Communication** — Parent messaging
7. **Intelligence** — AI analytics
8. **Account & Setup** — Subscription and billing

The top bar provides persistent access to global search, quick actions (Enroll a Child, Add Staff, New Invoice), the AI assistant, notifications, and logout.

---

## 7. Current Status

CEven is an **early-stage prototype / MVP**. The UI is fully designed and built across all 9 modules with consistent visual language and interactive components. However:

- All data is mock/placeholder — no real database or persistent storage
- Authentication is simulated — no real identity provider
- AI features (Ada) use hardcoded responses — no real AI/ML integration
- No payment processing — billing forms are UI-only
- No email/SMS delivery — OTP and notifications are simulated
- No external integrations — social auth, QR scanning, and file uploads are placeholders

---

## 8. User Stories & Acceptance Criteria

### US-1: Admin Accesses the Platform
**As a** crèche administrator,  
**I want to** access CEven from any device,  
**so that** I can manage my crèche from my computer, tablet, or phone.

**Acceptance Criteria:**
- [ ] Admin can log in from desktop, tablet, and mobile devices
- [ ] Sidebar collapses to a hamburger menu on mobile
- [ ] All pages are usable on screens ≥375px wide
- [ ] Tables scroll horizontally on mobile
- [ ] Forms and modals adapt to smaller screens

---

### US-2: Admin Navigates Between Modules
**As a** crèche administrator,  
**I want to** quickly navigate between all modules from the sidebar,  
**so that** I can switch tasks without losing context.

**Acceptance Criteria:**
- [ ] Sidebar shows 8 navigation items: Dashboard, Child Management, Staff Management, Daily Operations, Finance, Communication, Intelligence, Account & Setup
- [ ] Active module is visually highlighted in the sidebar
- [ ] Clicking a navigation item loads the corresponding module
- [ ] Sidebar shows logged-in user name and email at the bottom
- [ ] "Need Support?" card is visible in the sidebar

---

### US-3: Admin Uses Global Search
**As a** crèche administrator,  
**I want to** search across children, staff, invoices, and messages from the top bar,  
**so that** I can find anything quickly without navigating to specific pages.

**Acceptance Criteria:**
- [ ] Global search bar is visible in the top bar
- [ ] Search placeholder reads: "Search..."
- [ ] Search results include matches across all modules

---

### US-4: Admin Uses Quick Actions
**As a** crèche administrator,  
**I want to** access common actions from the top bar,  
**so that** I can perform frequent tasks with one click.

**Acceptance Criteria:**
- [ ] "Quick Actions" dropdown is visible in the top bar
- [ ] Dropdown includes: Enroll a Child, Add Staff, New Invoice
- [ ] Each action navigates to the corresponding feature or opens the relevant form

---

### US-5: Admin Receives Platform Notifications
**As a** crèche administrator,  
**I want to** receive notifications about important events,  
**so that** I don't miss critical updates.

**Acceptance Criteria:**
- [ ] Notification bell icon is visible in the top bar with unread count badge
- [ ] Clicking the bell opens the notification panel
- [ ] Notifications cover 5 types: AI Alert, Incident, Invoice, Message, Payment
- [ ] Notifications can be filtered by category
- [ ] "Mark All as Read" clears unread indicators

---

### US-6: Admin Manages Subscription
**As a** crèche administrator,  
**I want to** choose and manage my subscription plan,  
**so that** I have access to the features my crèche needs.

**Acceptance Criteria:**
- [ ] Account & Setup module provides a 3-step subscription wizard
- [ ] 3 plans are available: Seedling, Nestling Pro, Flourish
- [ ] Admin can choose monthly or yearly billing
- [ ] Admin can add optional add-ons
- [ ] Order summary shows total cost including 7.5% VAT

---

### US-7: Admin Gets AI-Powered Insights
**As a** crèche administrator,  
**I want to** receive AI-generated insights about my crèche,  
**so that** I can make informed decisions faster.

**Acceptance Criteria:**
- [ ] Ada AI assistant is accessible from the Dashboard and Intelligence modules
- [ ] AI Daily Brief on the Dashboard shows at least 3 actionable insights
- [ ] Insights are categorized: Health & Wellness, Finance & Invoice, Creche Performance
- [ ] Each insight has a "Take Action" button
- [ ] Ada chat responds to natural-language queries with relevant (mock) answers

---

## 9. Product Gaps & Future Work

| Category | Gap |
|---|---|
| **Data Layer** | No database, no data persistence, no real CRUD operations |
| **Authentication** | No real OAuth, no JWT, no multi-factor auth, no session expiry |
| **AI/ML** | No real AI integration — all insights and chat responses are hardcoded |
| **Payments** | No payment gateway — no real transaction processing |
| **Communications** | No email/SMS delivery — no real OTP, notifications, or messaging |
| **Integrations** | No QR code generation/scanning, no file upload, no calendar sync |
| **Analytics** | No real reporting engine — no export, no historical trends |
| **Mobile** | Responsive layout is in place but needs testing and refinement |
| **Testing** | No automated tests — no unit, integration, or end-to-end tests |
