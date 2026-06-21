# Staff Management — Product Requirements Document

## 1. Purpose

The Staff Management module provides tools for managing nursery staff, tracking attendance and compliance, and configuring role-based access control. It ensures administrators can monitor their team's performance, maintain compliance standards, and control what each staff member can access.

---

## 2. Screens

### 2.1 Staff List Page

**Page Header:**
- Title: "Staff Management"
- "Add Staff" primary button

**Stat Cards (4):**

| Stat | What It Shows |
|---|---|
| Total Staff | Number of staff in the system |
| On Duty Today | Staff currently on duty (verified via QR) |
| Absent | Staff absent today |
| Average Log Compliance | Overall logging compliance percentage with trend |

**AI Flags Banner:**
- Dismissible gradient banner showing Ada-generated compliance alerts
- Examples: "Mrs Anita — compliance at 52% (below 72% threshold)", "Mr Adamu — absent 3 of last 5 days"

**Tab Navigation (3 tabs):**

---

#### Tab 1: Staff Members

**Toolbar:**
- Filter by Date Added, All Status dropdowns
- Search input ("Search staff...")

**Staff Table:**

| Column | Content |
|---|---|
| Staff | Name + email |
| Phone Number | Contact phone |
| Date Added | When the staff member was added |
| Role | Staff role (Caregiver, Admin, Marketer, etc.) |
| Status | Active (green), Absent (amber), or Pending (grey) badge |
| Action | Three-dot menu → View Profile |

---

#### Tab 2: Attendance Log

**Toolbar:**
- Filter by Week, All Status dropdowns
- Search input

**Attendance Table:**

| Column | Content |
|---|---|
| Checkbox | Bulk selection |
| Staff | Name + email |
| Mon–Sat | Checkmark (green circle) or X (red circle) per day |
| Compliance Score | Color-coded percentage: green (≥80%), amber (≥50%), red (<50%) |

---

#### Tab 3: Role Management

**Toolbar:**
- "Role Log" heading
- Filter by Date Created, All Access dropdowns
- "Add New Role" button

**Role Log Table:**

| Column | Content |
|---|---|
| Role Type | Role name (e.g., Caregiver, Admin, Nurse) |
| Date Created | When the role was created |
| Team | Department or room assignment |
| Access Level | Full (green), Limited (amber), or View Only (grey) badge |
| Last Updated | Last modification date |
| Action | Edit (pencil) and Delete (trash) icons |

---

### 2.2 Role Form Modal (Create/Edit)

**Header:**
- "Create New Role" or "Edit Role"
- Description text

**Form Fields:**
- Role Name (text input)
- Description (textarea)
- Invite Staff (dropdown to select staff members)

**Permissions Grid (7 modules):**

| Permission | Toggle |
|---|---|
| Children & Parent | Checkbox |
| Finance | Checkbox |
| Account & Setup | Checkbox |
| Staff Management | Checkbox |
| Communication | Checkbox |
| Intelligence | Checkbox |
| Daily Operations | Checkbox |

**Footer:** Cancel, "Confirm and Save" / "Save Changes" buttons

---

### 2.3 Delete Role Modal

**Content:**
- Warning icon (red)
- "Remove Role" heading
- Description explaining permanent removal and impact on assigned staff
- "No, Cancel" button, "Yes, Remove" red button

---

### 2.4 Staff Profile Page

**Header:**
- "Back to Staff" navigation link
- "Suspend Account" outline button
- "Disable Account" red button
- "Export Log" button with download icon

**Left Sidebar:**

**Profile Card:**
- Large initials avatar
- Full name
- Staff ID (e.g., CEV-STF-0042)
- Active status badge
- Key-value details: Email, Phone, Date Added, Role, Room, Emergency Contact

**Documents Card:**
- List of uploaded documents (Employment Contract, DBS Check, First Aid Certificate)
- Each shows file icon, name, date, and "View" button
- Upload area with drag-and-drop zone and "browse" link

**Right Main Area:**

**AI Flag Card:**
- Amber callout with AI-generated compliance warning
- Recommended action

**Log History Table:**
- Columns: Activity, Child, Date & Time, Status
- Status badges: Completed (green), Flagged (red), Late (amber)
- Filter by Date Range and Activity Type

---

## 3. User Actions Summary

| Action | Where | Result |
|---|---|---|
| Add staff | Header button | Opens staff creation form |
| View profile | Staff table row menu | Navigates to staff profile |
| Create role | Role Management toolbar | Opens role creation modal |
| Edit role | Role table row action | Opens role edit modal |
| Delete role | Role table row action | Opens delete confirmation modal |
| Suspend account | Staff profile header | Suspends staff access |
| Disable account | Staff profile header | Permanently deactivates staff |
| Export log | Staff profile header | Downloads activity log |
| Upload document | Staff profile sidebar | Opens file upload dialog |

---

## 4. Compliance System

The compliance system tracks staff logging behavior:

| Threshold | Status | Color |
|---|---|---|
| ≥ 80% | Compliant | Green |
| ≥ 50% and < 80% | Needs Attention | Amber |
| < 50% | Non-Compliant | Red |

Compliance is calculated based on the percentage of daily logs submitted on time. The AI monitors compliance and flags staff members who fall below the 72% threshold.

---

## 5. User Stories & Acceptance Criteria

### US-1: Admin Views Staff Roster
**As a** crèche administrator,  
**I want to** see a list of all staff members with key details,  
**so that** I can manage my team effectively.

**Acceptance Criteria:**
- [ ] Staff page displays 4 stat cards: Total Staff, On Duty Today, Absent, Average Log Compliance
- [ ] Staff table shows: name/email, phone number, date added, role, status, actions
- [ ] Status is shown as badge: Active (green), Absent (amber), Pending (grey)
- [ ] Table supports search by staff name or email
- [ ] Table supports filtering by Date Added and Status
- [ ] Each row has a three-dot menu with "View Profile" option

---

### US-2: Admin Tracks Staff Attendance
**As a** crèche administrator,  
**I want to** see a weekly attendance grid for all staff,  
**so that** I can identify attendance patterns and compliance issues.

**Acceptance Criteria:**
- [ ] Attendance Log tab shows a weekly grid (Mon–Sat) for each staff member
- [ ] Checkmarks (green circle) indicate present days; X marks (red circle) indicate absent days
- [ ] Compliance Score column shows color-coded percentage: green (≥80%), amber (≥50%), red (<50%)
- [ ] Table supports filtering by Week and Status
- [ ] Table supports search

---

### US-3: Admin Creates a New Role
**As a** crèche administrator,  
**I want to** create a custom role with specific permissions,  
**so that** I can control what different staff members can access.

**Acceptance Criteria:**
- [ ] "Add New Role" button opens the role creation modal
- [ ] Modal collects: Role Name, Description, Invite Staff (dropdown)
- [ ] Permissions grid shows 7 modules: Children & Parent, Finance, Account & Setup, Staff Management, Communication, Intelligence, Daily Operations
- [ ] Each permission has a checkbox toggle
- [ ] "Confirm and Save" button saves the role
- [ ] "Cancel" button closes the modal without saving

---

### US-4: Admin Edits an Existing Role
**As a** crèche administrator,  
**I want to** edit an existing role's permissions,  
**so that** I can adjust access as team needs change.

**Acceptance Criteria:**
- [ ] Edit (pencil) icon is available per role in the Role Management table
- [ ] Clicking it opens the role edit modal pre-filled with existing data
- [ ] Changes can be saved or cancelled
- [ ] "Save Changes" button persists the updates

---

### US-5: Admin Deletes a Role
**As a** crèche administrator,  
**I want to** delete a role that is no longer needed,  
**so that** I can keep my role definitions clean.

**Acceptance Criteria:**
- [ ] Delete (trash) icon is available per role
- [ ] Clicking it opens a confirmation modal with warning icon
- [ ] Modal explains the permanent nature of deletion and its impact on assigned staff
- [ ] "No, Cancel" closes the modal
- [ ] "Yes, Remove" permanently deletes the role

---

### US-6: Admin Views Staff Profile
**As a** crèche administrator,  
**I want to** view a detailed profile for any staff member,  
**so that** I can see their information, documents, and activity log.

**Acceptance Criteria:**
- [ ] Staff profile shows: avatar, name, staff ID, status badge
- [ ] Key-value details: Email, Phone, Date Added, Role, Room, Emergency Contact
- [ ] Documents section lists: Employment Contract, DBS Check, First Aid Certificate
- [ ] Each document shows file icon, name, date, and View button
- [ ] Upload area with drag-and-drop zone is available
- [ ] "Back to Staff" link returns to the staff list

---

### US-7: Admin Monitors Staff Compliance
**As a** crèche administrator,  
**I want to** see AI-generated compliance flags for staff members,  
**so that** I can address performance issues early.

**Acceptance Criteria:**
- [ ] AI Flags Banner appears on the staff list page
- [ ] Banner shows compliance alerts (e.g., "Mrs Anita — compliance at 52%")
- [ ] Banner is dismissible
- [ ] Staff profile shows an AI Flag card with compliance warning and recommended action
- [ ] Log History table shows: Activity, Child, Date & Time, Status (Completed/Flagged/Late)

---

### US-8: Admin Manages Staff Account Status
**As a** crèche administrator,  
**I want to** suspend or disable a staff member's account,  
**so that** I can manage access when someone leaves or takes leave.

**Acceptance Criteria:**
- [ ] "Suspend Account" button is available in the staff profile header
- [ ] "Disable Account" (red) button is available in the staff profile header
- [ ] "Export Log" button allows downloading the staff member's activity log
- [ ] Confirmation is required before suspend/disable actions

- No real staff CRUD — cannot actually create, update, or delete staff
- No real attendance tracking — no check-in/check-out system
- No document upload or download functionality
- No real compliance scoring algorithm
- No email or invitation system for new staff
- No payroll integration
- No shift scheduling
- No performance review system
- No real-time attendance updates
