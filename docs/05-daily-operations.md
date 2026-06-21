# Daily Operations Module - PRD

## 1. Overview

The Daily Operations module handles the day-to-day activities of the creche, providing two primary views: a Reception QR Station for check-in/check-out management and a Daily Logs view for tracking activity submissions and reviews.

**Route:** `/daily-operations`
**File:** `app/(admin)/daily-operations/page.tsx` (388 lines, client component)

---

## 2. Dual View Layout

The page presents two views accessible via tab navigation:

---

### 2.1 Reception QR Station

**Purpose:** Physical check-in/check-out station using QR codes

#### 2.1.1 QR Code Display

| Element | Description |
|---|---|
| QR Code | Large placeholder QR code image |
| Download Button | Download QR code as image |
| Print Button | Print QR code |
| Creche Name | "Udebem Cresh" |
| Status Badge | "Active" (green) |

#### 2.1.2 Activity Bar

| Metric | Value |
|---|---|
| CHECK-INs | 02 |
| CHECK-OUTs | 00 |
| EXCEPTIONS | 00 |

#### 2.1.3 Live Scanned Feed

Real-time feed showing recent check-in/check-out events:

| Element | Description |
|---|---|
| Staff/Child Name | Person who scanned |
| Action | IN (green) or OUT (red) |
| Timestamp | Time of scan |
| Status | Success/Pending |

#### 2.1.4 Attendance Grid

Color-coded cards showing attendance status per room/child:

| Color | Status |
|---|---|
| Green | IN (checked in) |
| Red | Absent |
| Amber | Pending |

**Filters:**
- Room selector (All Rooms, Lion, Tiger, Elephant, Zebra)
- User/Staff filter

#### 2.1.5 Actions

| Action | Description |
|---|---|
| Log Exception | Record an exception (late arrival, early departure, etc.) |
| Manual Check-In | Manually check in a child/staff member |

---

### 2.2 Daily Logs

**Purpose:** Track and manage daily activity log submissions

#### 2.2.1 Stats Row

| Stat | Value | Description |
|---|---|---|
| Submitted Today | 40 | Logs submitted today |
| Pending Review | 12 | Logs awaiting review |
| Incidents Logged | 03 | Incidents reported today |
| Media Uploaded | 27 | Photos/videos uploaded |

#### 2.2.2 Daily Logs Table

| Column | Description |
|---|---|
| Child | Child name |
| Activity Type | Type of log (meal, nap, activity, incident, etc.) |
| Room | Room assignment |
| Time | Time logged |
| Logged By | Staff name who created the log |
| Status | Submitted (green), Pending (amber) |

**Filters:**
- Date picker
- Room selector
- Search by child name

---

## 3. Data Model

### 3.1 Implicit Models

```typescript
type CheckInEvent = {
  id: string;
  personName: string;
  personType: "child" | "staff";
  action: "IN" | "OUT";
  timestamp: string;
  status: "success" | "pending" | "exception";
};

type AttendanceRecord = {
  id: string;
  name: string;
  room: string;
  status: "IN" | "Absent" | "Pending";
};

type DailyLog = {
  id: string;
  childName: string;
  activityType: string;
  room: string;
  time: string;
  loggedBy: string;
  status: "Submitted" | "Pending";
};

type Exception = {
  id: string;
  personName: string;
  type: string;
  reason: string;
  timestamp: string;
};
```

---

## 4. QR Code System

| Aspect | Current State |
|---|---|
| QR Generation | Placeholder image — no actual QR code generation |
| QR Scanning | No scanning functionality implemented |
| Data Persistence | All data is mock/static |
| Real-time Updates | Simulated with mock data, no WebSocket/SSE |

---

## 5. Gaps & Future Work

- No actual QR code generation or scanning
- No real-time attendance tracking
- No integration with mobile app for parent check-in
- No exception workflow (approval/rejection)
- No log review/approval system
- No media upload functionality
- No reporting on daily operations
- No notification system for exceptions
- No export of daily logs
- No calendar integration
