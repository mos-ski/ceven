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

**Tab Navigation (6 tabs):**

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
| Action | Three-dot menu → View Profile, Edit Member, Deactivate |

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

#### Tab 4: Leaderboard

Staff performance leaderboard with rankings based on log compliance, attendance score, incidents logged, parent rating, and total points.

---

#### Tab 5: Leave Management

Leave request management with approval flow, leave balances, calendar view, and active/upcoming leave tracking.

---

#### Tab 6: Compliance & Safety

Compliance tracking including DBS/Police Checks, Fire & Safety Drills, Food Hygiene logs, and Risk Assessments. Each section shows compliant items, due items, overdue items, and next inspection dates.

---

### 2.2 Add Staff Modal — Choice Screen

When the admin clicks "Add Staff", a modal opens with two options:

**Option 1: Manual Entry**
- Add one staff member at a time with full details
- 3-step wizard: Staff Information → Salary Details → Documents

**Option 2: Bulk Upload**
- Import multiple staff from an Excel spreadsheet
- Upload file → System extracts data → Review & confirm

---

### 2.3 Manual Entry — Step 1: Staff Information

**Form Fields:**

| Field | Type | Required |
|---|---|---|
| Name | Text input | Yes |
| Email Address | Email input | Yes |
| Phone Number | Phone input | Yes |
| Assign Role | Dropdown (Team Member, Lead Caregiver, Caregiver, Cook, Driver, Cleaner, Nanny) | Yes |
| Assign Class | Dropdown (Lion, Sun flowers, Bloomers) | No |

**Footer:** Back (→ choice screen), Continue

---

### 2.4 Manual Entry — Step 2: Salary Details

**Employment & Salary:**

| Field | Type | Required |
|---|---|---|
| Employment Type | Dropdown (Full time, Contract, Part time) | Yes |
| Basic Salary | Number input (₦) | Yes |

**Deductions Section:**

Three toggleable deduction types, each with a %/₦ mode switch:

| Deduction | Toggle | Mode | Input |
|---|---|---|---|
| Tax | On/Off switch | % or ₦ | Value (percentage or fixed amount) |
| Pension | On/Off switch | % or ₦ | Value (percentage or fixed amount) |
| Other | On/Off switch | % or ₦ | Custom name (e.g. HMO, Housing Loan) + value |

When a deduction is toggled on, the admin selects % or ₦ mode and enters a value. The system calculates:
- **Total Deductions** — sum of all active deductions (displayed in red)
- **Net Pay** — Basic Salary minus Total Deductions (displayed prominently)

**Bank Details:**

| Field | Type | Required |
|---|---|---|
| Bank Name | Text input | Yes |
| Account Number | Text input | Yes |
| Pension PIN | Text input | No |
| Tax ID | Text input | No |

**Footer:** Back (→ Step 1), Continue

---

### 2.5 Manual Entry — Step 3: Documents (Optional)

This step can be skipped and documents added later.

**Document Uploads:**

| Document | Format |
|---|---|
| ID Verification (NIN, National ID, Driver's License, Passport) | PDF, JPEG, Max 650 KB |
| Work Experience | PDF, JPEG, Max 650 KB |

Each upload shows a drag-and-drop zone with "Tap to Upload" link. Uploaded files display name, size, progress bar, and delete button.

**Footer:** Back (→ Step 2), "Save & Add Another", "Add Staff"

---

### 2.6 Bulk Upload — Upload Screen

**Upload Area:**
- Drag & drop zone for Excel files
- Supports .xlsx, .xls, .csv — Max 5 MB
- Shows file name, size, and progress bar after upload

**Footer:** Back (→ choice screen), "Extract & Review"

---

### 2.7 Bulk Upload — Preview Screen

After clicking "Extract & Review", the system displays all staff extracted from the file.

**Preview Table:**

| Column | Content |
|---|---|
| Checkbox | Select/deselect individual staff |
| Staff | Name + email |
| Role | Staff role |
| Salary | Basic salary (₦) |
| Deductions | Total deductions (₦, red) |
| Net Pay | Calculated net pay (₦, bold) |
| Bank | Bank name |
| Account | Account number |

- "Select All" / "Deselect All" toggle
- Selected count shown in header (e.g., "3 of 4 staff selected")
- Mobile: card layout with checkboxes

**Footer:** Back (→ upload screen), "Confirm & Add" (disabled if 0 selected)

---

### 2.8 Bulk Upload — Confirmation

Success screen showing:
- Green checkmark icon
- Count of staff added (e.g., "4 Staff Added")
- "All selected staff have been imported and are ready for payroll"

**Footer:** "Done" button closes modal

---

### 2.9 Role Form Modal (Create/Edit)

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
| Add staff | Header button | Opens choice modal (Manual Entry or Bulk Upload) |
| Add staff manually | Choice modal → Manual Entry | 3-step wizard: info, salary/deductions, documents |
| Bulk import staff | Choice modal → Bulk Upload | Upload Excel → extract → review → confirm |
| View profile | Staff table row menu | Navigates to staff profile |
| Edit member | Staff table row menu | Opens edit modal |
| Deactivate member | Staff table row menu | Opens deactivation confirmation |
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

---

### US-9: Admin Adds Staff Manually
**As a** crèche administrator,  
**I want to** add a new staff member by filling in their details step by step,  
**so that** their salary and bank info are ready for payroll.

**Acceptance Criteria:**
- [ ] Clicking "Add Staff" opens a choice modal with "Manual Entry" and "Bulk Upload" options
- [ ] Manual Entry opens a 3-step wizard: Staff Information → Salary Details → Documents
- [ ] Step 1 collects: Name, Email, Phone, Role (required), Class (optional)
- [ ] Step 2 collects: Employment Type, Basic Salary, Deductions (Tax, Pension, Other — each toggleable with % or ₦ mode), Bank Name, Account Number, Pension PIN, Tax ID
- [ ] Deductions calculate live: Total Deductions and Net Pay are displayed as the user enters values
- [ ] Step 3 for documents is optional and can be skipped
- [ ] "Save & Add Another" saves and resets the form; "Add Staff" saves and closes

---

### US-10: Admin Bulk Imports Staff from Excel
**As a** crèche administrator,  
**I want to** upload an Excel file to import multiple staff at once,  
**so that** I don't have to enter each staff member manually.

**Acceptance Criteria:**
- [ ] Bulk Upload option shows a drag-and-drop zone for .xlsx, .xls, or .csv files (max 5 MB)
- [ ] After upload, "Extract & Review" button processes the file
- [ ] Preview table shows all extracted staff with: name, email, role, salary, deductions, net pay, bank, account number
- [ ] Each row has a checkbox; "Select All" / "Deselect All" toggle is available
- [ ] "Confirm & Add" imports only selected staff
- [ ] Success confirmation shows count of staff added

- No real staff CRUD — cannot actually create, update, or delete staff
- No real attendance tracking — no check-in/check-out system
- No document upload or download functionality
- No real compliance scoring algorithm
- No email or invitation system for new staff
- No shift scheduling
- No performance review system
- No real-time attendance updates
