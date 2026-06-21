# Finance Module - PRD

## 1. Overview

The Finance module provides payment tracking and expense management for the creche. It includes a payment history view with transaction records and an expenses view with invoice tracking and category-based analysis.

**Route:** `/finance`
**File:** `app/(admin)/finance/page.tsx` (363 lines, client component)

---

## 2. Tab Navigation (2 tabs)

---

### 2.1 Payment History

**Purpose:** Track all incoming payments from parents/guardians

#### Data Table

| Column | Description |
|---|---|
| Room Plan | Plan type (Daily/Monthly/Termly/Annual) + bold amount |
| Reference ID | Unique transaction reference |
| Amount | Payment amount in ₦ |
| Date | Payment date |
| Invoice | Invoice number |
| Status | Successful (green), Failed (red) |
| Action | Download Payslips button |

#### Filters

| Filter | Options |
|---|---|
| Date | Date range picker |
| Status | All Status, Successful, Failed |
| Search | By reference ID, child name, or plan type |

---

### 2.2 Expenses

**Purpose:** Track outgoing expenses and manage vendor invoices

#### 2.2.1 Analysis Cards (4 cards)

| Card | Value | Description |
|---|---|---|
| Total Expenses | ₦2,450,000 | All expenses this period |
| Payroll | ₦1,800,000 | Staff salaries |
| Operations | ₦450,000 | Operational costs |
| Pending Invoices | ₦200,000 | Awaiting payment |

#### 2.2.2 Invoice Tracking Table

| Column | Description |
|---|---|
| Invoice # | Invoice identifier |
| Vendor/Payee | Recipient name |
| Category | Payroll, Utilities, Operations, Technology |
| Amount | Invoice amount in ₦ |
| Due Date | Payment due date |
| Status | Paid (green), Overdue (red), Pending (amber) |

#### 2.2.3 Filters

| Filter | Options |
|---|---|
| Category | All, Payroll, Utilities, Operations, Technology |
| Date | Date range picker |
| Search | By vendor, invoice #, or category |

#### 2.2.4 Actions

| Action | Description |
|---|---|
| Add Invoice | Opens new invoice form (not implemented) |

---

## 3. Data Model

### 3.1 Implicit Models

```typescript
type Payment = {
  id: string;
  roomPlan: "Daily" | "Monthly" | "Termly" | "Annual";
  amount: number;
  referenceId: string;
  date: string;
  invoice: string;
  status: "Successful" | "Failed";
};

type Invoice = {
  id: string;
  invoiceNumber: string;
  vendor: string;
  category: "Payroll" | "Utilities" | "Operations" | "Technology";
  amount: number;
  dueDate: string;
  status: "Paid" | "Overdue" | "Pending";
};
```

---

## 4. Currency

All monetary values are displayed in **Nigerian Naira (₦)** with comma-separated formatting (e.g., ₦1,200,000).

---

## 5. Subscription Plans (Reference)

From Account & Setup module:

| Plan | Monthly Price |
|---|---|
| Seedling | ₦18,500 |
| Nestling Pro | ₦45,000 |
| Flourish | ₦85,000 |

---

## 6. Gaps & Future Work

- No real payment processing (no Stripe, Paystack, etc.)
- No actual invoice generation
- No expense CRUD (create, update, delete)
- No financial reporting/analytics
- No export to CSV/PDF
- No budget management
- No multi-currency support
- No receipt scanning/OCR
- No integration with accounting software
- No automated payment reminders
- No refund management
- No tax calculation
