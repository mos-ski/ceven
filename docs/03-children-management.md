# Children Management Module - PRD

## 1. Overview

The Children Management module provides a comprehensive system for managing enrolled children, including a filterable roster table and detailed individual child profiles with activity logs, health records, payment history, development tracking, and contact management.

**Routes:**
- `/children` — Children list (server component)
- `/children/[id]` — Individual child profile (client component, 564 lines)

---

## 2. Children List Page

**File:** `app/(admin)/children/page.tsx` (server component)

### 2.1 Stat Cards

| Stat | Value | Description |
|---|---|---|
| Total Enrolled | 124 | All children in system |
| Active | 98 | Currently active enrollments |
| New This Month | 12 | Enrolled in current month |
| Average Activity Log | 95% | Log completion rate |

### 2.2 Filterable Data Table

**File:** `components/admin/children/children-table.tsx`

**Columns:**

| Column | Content |
|---|---|
| Checkbox | Bulk selection |
| Child | Name + gender/blood group |
| Age | Computed from DOB |
| Room | Room assignment (Lion, Tiger, Elephant, Zebra) |
| Parent Name | Guardian name |
| Status | Present (green), Late (amber), Absent (red) |
| Health Flag | Alert icon if allergies/conditions exist |
| Fee Status | Paid (green), Overdue (red), Pending (amber) |
| Action | Log dropdown + More menu |

**Filters:**
- Room: All Rooms, Lion, Tiger, Owl, Bear
- Status: Present, Late, Absent
- Search: By child name or parent name

**Row Actions (Log dropdown):**
- Log Daily Report
- New Picture/Video
- Log Incident

**Row Actions (More menu):**
- View Profile
- Reassign Caregiver
- Change Room
- Contact Guardian

---

## 3. Child Profile Page

**File:** `app/(admin)/children/[id]/page.tsx` (564 lines)

### 3.1 Profile Header

| Element | Description |
|---|---|
| Avatar | Child initials in colored circle |
| Name | Full name |
| ID | CEV-2024-XXXX format |
| Demographics | Age, gender, blood group |
| Room | Current room assignment |
| Actions | "AI Parent Update" button |

### 3.2 Tab Navigation (6 tabs)

---

#### Tab 1: Overview

**Info Cards (2x2 grid):**

| Card | Value |
|---|---|
| Room | Lion Room |
| Subscription | Monthly |
| Enrollment Date | Jan 15, 2024 |
| Status | Active |

**Additional Info:**
- Blood Group: O+
- Guardian: Mrs. Adaeze Okonkwo

**Primary Parent Card:**
- Name, phone, email
- Message button, Call button

**Mood Trend Chart:**
- 7-day bar chart showing mood scores (1-5 scale)
- Data: Mon-Fri with mood values

**Health Status:**
- Allergies: Peanut allergy
- Last Checkup: March 2024
- Health Flag: Yes/No indicator

---

#### Tab 2: Activity Log

**Today's Log Cards:**

| Activity | Details |
|---|---|
| Morning Mood | Happy (😊) |
| Breakfast | Rice & Beans, Ate Well |
| Nap | 10:30 AM - 12:00 PM |
| Play | Outdoor Play |
| Afternoon Mood | Excited (🎉) |
| Departure | 3:30 PM, Picked up by Mom |

**Caregiver Note:**
"Chidinma was very cheerful today. She helped clean up after play time."

**Log History Table:**

| Column | Description |
|---|---|
| Date | Log date |
| Mood | Mood emoji |
| Meals | Meal summary |
| Nap | Nap duration |
| Activity | Activity type |
| Caregiver | Staff name |
| Notes | Additional notes |

---

#### Tab 3: Health Status

**Health Information:**

| Field | Value |
|---|---|
| Height | 95 cm |
| Weight | 14 kg |
| Blood Group | O+ |
| Allergies | Peanut allergy |
| Medications | None |
| Medical Notes | Regular checkups required |

**Prescriptions & Documents:**
- File viewer for uploaded medical documents
- Upload area for new documents

---

#### Tab 4: Payment History

**Filterable Table:**

| Column | Description |
|---|---|
| Room Plan | Plan type + amount |
| Reference ID | Transaction reference |
| Amount | Payment amount in ₦ |
| Date | Payment date |
| Invoice | Invoice number |
| Status | Successful (green), Failed (red) |
| Action | Download Receipt button |

**Filters:** Date range, Status (All, Successful, Failed)

---

#### Tab 5: Development & Behaviour

**Development Milestones:**
- Checklist of developmental milestones
- Track progress across categories (motor, language, social, cognitive)

**Photo Gallery:**
- 6 placeholder image cards
- Upload new photos button

---

#### Tab 6: Contact

**Authorized Persons Table:**

| Column | Description |
|---|---|
| Name | Contact name |
| Relationship | Parent, Guardian, etc. |
| Phone | Phone number |
| Email | Email address |
| Access Level | Primary (green), Secondary (blue), Emergency (red) |

**Actions:**
- Add Contact button
- Edit/Delete per contact

---

## 4. AI Features

| Feature | Location | Description |
|---|---|---|
| AI Observations Banner | Profile page header | Dismissable banner with AI-generated insights about child progress |
| AI Parent Update | Profile header button | Generates AI-powered parent update message |
| Health Flag | Children table | Automatic flag for children with allergies/conditions |

---

## 5. Data Model

**File:** `lib/mock-data/children.ts`

```typescript
type Child = {
  id: string;
  name: string;
  gender: "Male" | "Female";
  bloodGroup: string;
  age: number;
  room: string;
  parentName: string;
  parentEmail: string;
  status: ChildStatus;
  healthFlag: boolean;
  feeStatus: FeeStatus;
};

type ChildStatus = "Present" | "Absent" | "Late";
type FeeStatus = "Paid" | "Overdue" | "Pending";
```

### 5.1 Mock Data

8 children are defined in the mock data file with varied statuses, rooms, and fee states.

---

## 6. Gaps & Future Work

- No real database — all data is hardcoded mock
- No CRUD operations (create, update, delete children)
- No file upload for photos/documents
- No real health record management
- No development milestone tracking persistence
- No parent portal integration
- No export functionality
- No bulk operations beyond checkbox selection
- No pagination for large rosters
