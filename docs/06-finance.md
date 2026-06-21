# Finance — Product Requirements Document

## 1. Purpose

The Finance module provides payment tracking and expense management for the crèche. It gives administrators visibility into incoming payments from parents and outgoing expenses to vendors, with category-based analysis and invoice tracking.

---

## 2. Screens

The page features a toggle between two views via a pill-shaped switcher in the header.

---

### 2.1 Payment History

**Sub-Header:**
- Back arrow, "Payment History" heading, current date display

**Filter Toolbar:**
- Date filter
- Status filter (All Status, Successful, Failed)
- Search input

**Payment Table:**

| Column | Content |
|---|---|
| Room Plan | Plan type name (Daily/Monthly/Termly/Annual) with bold amount underneath |
| Reference ID | Unique transaction reference number |
| Amount | Payment amount in ₦ |
| Date | Payment date |
| Invoice | Invoice number |
| Status | Successful (green) or Failed (red) badge |
| Action | "Download Payslips" link with download icon |

---

### 2.2 Expenses

**Analysis Cards (4):**

| Card | What It Shows |
|---|---|
| Total Expenses | Total expenses for the period with trend indicator (e.g., "+8.2% vs last month") |
| Payroll | Total payroll amount and percentage of total expenses |
| Operations | Total operational costs and percentage of total |
| Pending Invoices | Total pending amount with count of overdue invoices |

**Invoice Tracking Table:**

| Column | Content |
|---|---|
| Invoice # | Invoice identifier |
| Vendor / Payee | Recipient name |
| Category | Payroll, Utilities, Operations, or Technology |
| Amount | Invoice amount in ₦ |
| Due Date | Payment due date |
| Status | Paid (green), Overdue (red), or Pending (amber) badge |
| Action | Three-dot menu |

**Toolbar:**
- Category filter (All, Payroll, Utilities, Operations, Technology)
- Date filter
- Search input
- "Add Invoice" primary button

---

## 3. User Actions Summary

| Action | Where | Result |
|---|---|---|
| Download payslips | Payment History table | Downloads payment receipt |
| Add Invoice | Expenses toolbar | Opens invoice creation form |
| Filter payments | Payment History toolbar | Filters by date or status |
| Filter invoices | Expenses toolbar | Filters by category or date |
| Search payments | Payment History toolbar | Searches by reference or name |
| Search invoices | Expenses toolbar | Searches by vendor or invoice number |
| View invoice details | Invoice table row menu | Opens invoice detail view |

---

## 4. Currency & Tax

| Aspect | Value |
|---|---|
| Currency | Nigerian Naira (₦) |
| Formatting | Comma-separated (e.g., ₦1,200,000) |
| VAT Rate | 7.5% (applied in subscription billing) |

---

## 5. Subscription Plan Pricing (Reference)

| Plan | Monthly Price |
|---|---|
| Seedling | ₦18,500 |
| Nestling Pro | ₦45,000 |
| Flourish | ₦85,000 |

---

## 6. User Stories & Acceptance Criteria

### US-1: Admin Views Payment History
**As a** crèche administrator,  
**I want to** see a history of all payments received from parents,  
**so that** I can track revenue and identify outstanding balances.

**Acceptance Criteria:**
- [ ] Payment History table shows: Room Plan, Reference ID, Amount, Date, Invoice, Status, Action
- [ ] Room Plan column shows plan type name with bold amount underneath
- [ ] Status shows as badge: Successful (green) or Failed (red)
- [ ] Action column has "Download Payslips" link with download icon
- [ ] Table supports filtering by Date and Status
- [ ] Table supports search by reference ID or child name

---

### US-2: Admin Downloads Payment Receipt
**As a** crèche administrator,  
**I want to** download a payment receipt for any transaction,  
**so that** I can provide proof of payment to parents or for record-keeping.

**Acceptance Criteria:**
- [ ] "Download Payslips" action is available per row in the Payment History table
- [ ] Clicking it downloads the payment receipt as a file

---

### US-3: Admin Views Expense Summary
**As a** crèche administrator,  
**I want to** see a summary of my crèche's expenses,  
**so that** I can understand where money is going and manage budgets.

**Acceptance Criteria:**
- [ ] Expenses tab shows 4 analysis cards: Total Expenses, Payroll, Operations, Pending Invoices
- [ ] Total Expenses shows the total amount with trend indicator (e.g., "+8.2% vs last month")
- [ ] Payroll and Operations show the amount and percentage of total expenses
- [ ] Pending Invoices shows the total pending amount and count of overdue invoices
- [ ] All amounts are displayed in Nigerian Naira (₦) with comma formatting

---

### US-4: Admin Tracks Invoices
**As a** crèche administrator,  
**I want to** track invoices issued to vendors and their payment status,  
**so that** I can manage outgoing payments and avoid overdue penalties.

**Acceptance Criteria:**
- [ ] Invoice Tracking table shows: Invoice #, Vendor/Payee, Category, Amount, Due Date, Status, Action
- [ ] Status shows as badge: Paid (green), Overdue (red), or Pending (amber)
- [ ] Categories include: Payroll, Utilities, Operations, Technology
- [ ] Table supports filtering by Category and Date
- [ ] Table supports search by vendor name or invoice number
- [ ] "Add Invoice" button opens an invoice creation form

---

### US-5: Admin Adds a New Invoice
**As a** crèche administrator,  
**I want to** add a new invoice for an expense,  
**so that** I can keep my financial records up to date.

**Acceptance Criteria:**
- [ ] "Add Invoice" button is available in the Expenses toolbar
- [ ] Clicking it opens an invoice creation form
- [ ] Form collects: vendor/payee, category, amount, due date
- [ ] New invoice appears in the Invoice Tracking table after submission

---

### US-6: Admin Filters Financial Data
**As a** crèche administrator,  
**I want to** filter payment and expense data by date, status, or category,  
**so that** I can focus on specific time periods or types of transactions.

**Acceptance Criteria:**
- [ ] Payment History supports Date and Status filters
- [ ] Expenses supports Category and Date filters
- [ ] Both views support search
- [ ] Filters update results immediately
- [ ] Multiple filters can be applied simultaneously

- No real payment processing — no gateway integration (Paystack, Stripe, etc.)
- No actual invoice generation
- No expense CRUD operations — cannot create, update, or delete expenses
- No financial reporting or analytics engine
- No export to CSV or PDF
- No budget management
- No multi-currency support
- No receipt scanning or OCR
- No accounting software integration
- No automated payment reminders
- No refund management
- No tax calculation beyond VAT display
