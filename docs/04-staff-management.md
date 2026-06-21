# Staff Management Module - PRD

## 1. Overview

The Staff Management module provides tools for managing nursery staff, tracking attendance, and configuring role-based access control. It includes a staff roster, attendance logging with compliance scores, and a role management system with permission configuration.

**Routes:**
- `/staff` — Staff management page (747 lines, client component)
- `/staff/[id]` — Individual staff profile (219 lines)

---

## 2. Staff List Page

**File:** `app/(admin)/staff/page.tsx` (747 lines)

### 2.1 Tab Navigation (3 tabs)

---

#### Tab 1: Staff Members

**Data Table:**

| Column | Description |
|---|---|
| Staff | Name + email |
| Phone Number | Contact phone |
| Date Added | Enrollment date |
| Role | Staff role (Caregiver, Admin, etc.) |
| Status | Active (green), Absent (red), Pending (amber) |
| Action | More menu |

**Filters:**
- Date Added (date range)
- Status: All Status, Active, Absent, Pending
- Search: By name or email

**Row Actions (More menu):**
- View Profile
- Edit Details
- Suspend Account
- Disable Account
- Export Log

---

#### Tab 2: Attendance Log

**Weekly Grid View:**

| Staff | Mon | Tue | Wed | Thu | Fri | Sat | Compliance |
|---|---|---|---|---|---|---|---|
| Amina Bello | ✓ | ✓ | ✓ | ✓ | ✓ | — | 95% (green) |
| Chioma Eze | ✓ | ✗ | ✓ | ✓ | ✗ | — | 72% (amber) |

**Compliance Score Colors:**
- Green: >= 80%
- Amber: >= 50% and < 80%
- Red: < 50%

**Filters:**
- Week selector
- Status: All Status, Active, Absent

---

#### Tab 3: Role Management

**Role Log Table:**

| Column | Description |
|---|---|
| Role Type | Role name |
| Date Created | Creation date |
| Team | Department/team |
| Access Level | Full (green), Limited (amber), View Only (blue) |
| Last Updated | Last modification date |

**Role CRUD Operations:**

##### Create/Edit Role Modal

**Form Fields:**
- Role Name (text input)
- Description (textarea)
- Invite Staff (multi-select dropdown)

**Permissions Grid:**

| Permission Category | Toggle |
|---|---|
| Children & Parent | ON/OFF |
| Finance | ON/OFF |
| Account & Setup | ON/OFF |
| Staff Management | ON/OFF |
| Communication | ON/OFF |
| Intelligence | ON/OFF |
| Daily Operations | ON/OFF |

##### Delete Role Modal

- Confirmation dialog with role name
- Warning message about consequences
- Cancel / Delete buttons

---

## 3. Staff Profile Page

**File:** `app/(admin)/staff/[id]/page.tsx` (219 lines)

### 3.1 Left Panel

**Profile Card:**
- Avatar (staff photo or initials)
- Full Name
- Staff ID (STF-XXXX format)
- Status badge (Active/Absent/Pending)
- Details (role, department, join date)

**Documents Section:**

| Document | Status |
|---|---|
| Employment Contract | Uploaded |
| DBS Check | Uploaded |
| First Aid Certificate | Pending |

**Upload Area:**
- Drag-and-drop zone for new documents
- Supported formats indicator

### 3.2 Right Panel

**AI Flag Card:**
- Compliance warning or recommendation
- Action button

**Log History Table:**

| Column | Description |
|---|---|
| Activity | Activity type |
| Child | Associated child name |
| Date & Time | Timestamp |
| Status | Completed (green), Flagged (red), Late (amber) |

### 3.3 Actions

| Action | Description |
|---|---|
| Suspend Account | Temporarily disable staff access |
| Disable Account | Permanently deactivate staff |
| Export Log | Download activity log as file |

---

## 4. Data Model

### 4.1 Implicit Staff Model

```typescript
type Staff = {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateAdded: string;
  role: string;
  status: "Active" | "Absent" | "Pending";
};

type Role = {
  name: string;
  created: string;
  team: string;
  accessLevel: "Full" | "Limited" | "View Only";
  lastUpdated: string;
  permissions: Record<string, boolean>;
};
```

---

## 5. Gaps & Future Work

- No real database — all data is hardcoded mock
- No actual staff CRUD (create, update, delete)
- No real attendance tracking (check-in/check-out)
- No document upload/download functionality
- No real compliance scoring algorithm
- No email/invitation system for new staff
- No payroll integration
- No shift scheduling
- No performance review system
- No real-time attendance updates
