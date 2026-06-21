# Daily Operations — Product Requirements Document

## 1. Purpose

The Daily Operations module handles the day-to-day running of the crèche. It provides two primary views: a Reception QR Station for managing physical check-in/check-out, and a Daily Logs view for tracking activity submissions and reviews.

---

## 2. Screens

The page features a toggle between two views via a pill-shaped switcher in the header.

---

### 2.1 Reception QR Station

A physical check-in/check-out station designed to be displayed on a screen at the crèche reception.

**Action Buttons:**
- "Log Exception" (outline) — for recording late arrivals, early departures, or other anomalies
- "Manual Check-In" (primary) — for manually checking in a child or staff member

**Left Panel (Dark Brown):**
- Creche name: "Udebem Cresh" with "Active" green badge
- QR Code display area (placeholder — intended for scannable QR code)
- Download button and Print button for the QR code
- Help text: "Scan QR code with your phone or enter login code"
- Activity Bar showing real-time counts:
  - CHECK-Ins: 02
  - CHECK-Outs: 00
  - EXCEPTIONS: 00

**Right Panel:**

**Live Scanned Feed:**
- "Live" red badge indicator
- Real-time list of recent check-in/check-out events
- Each row: initials avatar, name, role, time, IN/OUT badge

**Attendance Grid:**
- Filter by All Rooms, All Users
- Search input
- 2×3 grid of color-coded cards per person:
  - **Green border/background** = IN (checked in)
  - **Red border/background** = Absent
  - **Amber border/background** = Pending
- Each card shows: initials, name, class, time

---

### 2.2 Daily Logs

**Stats Row (4 cards):**

| Stat | What It Shows |
|---|---|
| Submitted Today | Number of logs submitted today |
| Pending Review | Logs awaiting review |
| Incidents Logged | Incidents reported today |
| Media Uploaded | Photos and videos uploaded today |

**Daily Logs Table:**

| Column | Content |
|---|---|
| Child | Child's name |
| Activity Type | Type of log (Morning Report, Incident Report, Photo Upload, Medical Note, etc.) |
| Room | Room assignment |
| Time | Time the log was submitted |
| Logged By | Staff member who created the log |
| Status | Submitted (green) or Pending (amber) badge |
| Action | Three-dot menu |

**Filters:**
- Date filter
- Room filter
- Search by child name

---

## 3. User Actions Summary

| Action | Where | Result |
|---|---|---|
| Log Exception | QR Station buttons | Opens exception logging form |
| Manual Check-In | QR Station buttons | Opens manual check-in form |
| Download QR | QR Station panel | Downloads QR code image |
| Print QR | QR Station panel | Opens print dialog for QR code |
| Filter attendance | Attendance Grid toolbar | Filters grid by room or user |
| Search attendance | Attendance Grid toolbar | Searches by name |
| Filter daily logs | Daily Logs toolbar | Filters by date or room |
| View log details | Log table row menu | Opens log detail view |

---

## 4. QR Code System

The QR code system is designed for physical deployment at the crèche reception:

- A QR code is displayed on a screen at the entrance
- Parents and staff scan the code with their phones to check in/out
- The system records the scan event and updates the attendance grid in real time
- Manual check-in is available as a fallback for exceptions
- Exceptions can be logged for unusual circumstances (late arrivals, early departures, etc.)

---

## 5. User Stories & Acceptance Criteria

### US-1: Admin Displays QR Code at Reception
**As a** crèche administrator,  
**I want to** display a QR code at the reception for parents and staff to scan,  
**so that** check-in and check-out can be tracked automatically.

**Acceptance Criteria:**
- [ ] QR Station view shows a large QR code display area
- [ ] Creche name and "Active" status badge are visible
- [ ] Download button allows saving the QR code as an image
- [ ] Print button opens the print dialog for the QR code
- [ ] Help text reads: "Scan QR code with your phone or enter login code"
- [ ] Activity bar shows real-time counts: CHECK-Ins, CHECK-Outs, EXCEPTIONS

---

### US-2: Admin Views Live Scan Feed
**As a** crèche administrator,  
**I want to** see a real-time feed of check-in/check-out scans,  
**so that** I can monitor who has arrived and who hasn't.

**Acceptance Criteria:**
- [ ] Live Scanned Feed panel shows "Live" red badge indicator
- [ ] Feed displays recent scan events with: initials avatar, name, role, time, IN/OUT badge
- [ ] IN status shown in green, OUT status shown in red
- [ ] Feed updates in real time as scans occur

---

### US-3: Admin Views Attendance Grid
**As a** crèche administrator,  
**I want to** see a color-coded attendance grid of all children and staff,  
**so that** I can quickly identify who is present, absent, or pending.

**Acceptance Criteria:**
- [ ] Attendance Grid shows color-coded cards per person
- [ ] Green border/background = IN (checked in)
- [ ] Red border/background = Absent
- [ ] Amber border/background = Pending
- [ ] Each card shows: initials, name, class, time
- [ ] Grid supports filtering by Room and User
- [ ] Grid supports search by name

---

### US-4: Admin Logs an Exception
**As a** crèche administrator,  
**I want to** log an exception for a late arrival or early departure,  
**so that** attendance records remain accurate.

**Acceptance Criteria:**
- [ ] "Log Exception" button is available in the QR Station view
- [ ] Clicking it opens an exception logging form
- [ ] Form captures: person, exception type, reason, timestamp
- [ ] Exception is recorded and reflected in the activity bar count

---

### US-5: Admin Performs Manual Check-In
**As a** crèche administrator,  
**I want to** manually check in a child or staff member,  
**so that** I can handle cases where QR scanning isn't possible.

**Acceptance Criteria:**
- [ ] "Manual Check-In" button is available in the QR Station view
- [ ] Clicking it opens a manual check-in form
- [ ] Form allows selecting the person and marking IN or OUT
- [ ] Manual check-in is reflected in the live feed and attendance grid

---

### US-6: Admin Views Daily Logs
**As a** crèche administrator,  
**I want to** see all activity logs submitted today,  
**so that** I can review what has been recorded and identify gaps.

**Acceptance Criteria:**
- [ ] Daily Logs view shows 4 stat cards: Submitted Today, Pending Review, Incidents Logged, Media Uploaded
- [ ] Daily Logs table shows: Child, Activity Type, Room, Time, Logged By, Status, Action
- [ ] Status shows as badge: Submitted (green) or Pending (amber)
- [ ] Table supports filtering by Date and Room
- [ ] Table supports search by child name

---

### US-7: Admin Switches Between QR Station and Daily Logs
**As a** crèche administrator,  
**I want to** toggle between the QR Station and Daily Logs views,  
**so that** I can access both features from the same page.

**Acceptance Criteria:**
- [ ] Pill-shaped toggle in the header switches between "Reception QR Station" and "Daily Logs"
- [ ] Active view is visually highlighted
- [ ] Switching views preserves any applied filters

- No actual QR code generation or scanning
- No real-time attendance tracking
- No mobile app for parent check-in
- No exception approval/rejection workflow
- No log review/approval system
- No media upload functionality
- No reporting on daily operations trends
- No notification system for exceptions
- No export of daily logs
- No calendar integration
