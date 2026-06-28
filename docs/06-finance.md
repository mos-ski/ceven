# Finance — Product Requirements Document

## 1. Purpose

The Finance module provides payment tracking, expense management, and payroll processing for the crèche. It gives administrators visibility into incoming payments, outgoing expenses, financial reports, and staff payroll — all from a single module.

---

## 2. Screens

The Finance page uses a sidebar-driven tab layout. Clicking a sub-item in the sidebar loads the corresponding view.

**Tabs:** Wallet (default), Billing & Payments, Expenses, Payroll, Financial Reports

---

### 2.1 Wallet

**Wallet Dashboard:**
- Wallet balance display (available, pending in, pending out)
- Recent transactions list with type badges (Credit/Debit)
- Quick actions: Deposit, Withdraw
- Bank account info display

---

### 2.2 Billing & Payments

**Billing Stats (4):**

| Stat | What It Shows |
|---|---|
| Collected | Total collected with trend vs last month |
| Outstanding | Unpaid invoices with count |
| Overdue Payments | Overdue amount with oldest overdue days |
| Target This Month | Target amount with collection rate |

**Invoice Tracking Table:**

| Column | Content |
|---|---|
| Child | Child name + extra children count |
| Parent Name | Parent name |
| Room Plan | Plan type with amount |
| Due Payment | Amount due |
| Due Date | Payment due date |
| Status | Overdue (red), Partial (amber), Paid (green), Pending (grey) badge |
| Risk | Low (green), Medium (amber), High Risk (red) badge |

---

### 2.3 Expenses

**Expense Overview Stats (4):**

| Stat | What It Shows |
|---|---|
| Monthly Budget | Budget amount with forecast variance |
| Expenses | Total expenses with transaction count and trend |
| Remaining Budget | Remaining amount with estimated days |
| Pending Approval | Count of pending approvals with amount |

**Expense Table:**

| Column | Content |
|---|---|
| Date | Transaction date |
| Vendor / Payee | Recipient name |
| Category | Payroll, Rent, Utilities, Supplies, Others |
| Description | Transaction description |
| Amount | Expense amount in ₦ |
| Status | Paid (green), Pending (amber), Overdue (red) badge |
| Receipt | Receipt attached indicator |

**Toolbar:**
- Category filter (All, Payroll, Rent, Utilities, Supplies, Others)
- Date filter
- Search input
- "Add Expense" primary button

---

### 2.4 Payroll

**Stats Row (4):**

| Stat | What It Shows |
|---|---|
| Total Payroll (This Month) | Sum of all net pay for current month |
| Staff Paid | Count of staff with Paid status |
| Pending Payments | Count of staff awaiting processing |
| Next Pay Date | Next scheduled pay date |

**Sub-tabs:** This Month, Payroll History, Salary Setup

#### Sub-tab: This Month (Payment Flow)

**Staff Payment List Table:**

| Column | Content |
|---|---|
| Checkbox | Select staff for payment |
| Staff | Staff name |
| Role | Staff role |
| Net Pay | Net pay amount (₦) |
| Status | Paid (green), Pending (grey), Processing (amber) badge |

- Select All / Deselect All checkbox in header
- Selected rows highlighted
- Running total bar appears when staff are selected: shows count, total net pay, and "Pay Selected" button

**Confirm & Pay Modal:**
- Wallet balance display
- Staff count and total net pay
- If wallet balance < total: red **Insufficient Balance** warning with shortfall amount and "Top Up Wallet" link
- "Confirm & Pay" button (disabled if insufficient balance)
- Success confirmation after payment

#### Sub-tab: Payroll History

**Payroll History Table:**

| Column | Content |
|---|---|
| Month | Payroll period |
| Staffs | Number of staff paid |
| Gross Payroll | Gross amount |
| Deduction | Total deductions |
| Net Paid | Net amount paid |
| Run by | Who ran the payroll |
| Date Paid | Payment date |
| Status | Paid badge |
| Action | "View Details" link |

#### Sub-tab: Salary Setup

**Salary Setup Table:**

| Column | Content |
|---|---|
| Staff | Staff name |
| Role | Staff role |
| Employment | Employment type (Full time, Contract, Part time) |
| Basic Salary | Base salary (₦) |
| Bank Name | Bank name |
| Account Number | Account number |
| Pension Pin | Pension PIN (masked) |
| Tax ID | Tax ID (masked) |
| Action | "Edit" link |

**New Salary Setup Modal:**
- Staff Member (dropdown)
- Employment Type (dropdown)
- Basic Salary (number input)
- Bank Name, Account Number, Pension PIN, Tax ID
- "Save Setup" button

---

### 2.5 Financial Reports

**Report Summary Stats (4):**

| Stat | What It Shows |
|---|---|
| Total Revenue | Revenue amount with trend |
| Total Expenses | Expense amount with trend |
| Net Profit | Profit amount with margin |
| Cash Available | Available cash with runway days |

**P&L Statement:**
- Income breakdown (Tuition fees, Registration, Meals, Total Income)
- Expenditure breakdown (Payroll, Rent, Utilities, Supplies, Maintenance, Total Expenditure)

**Budget vs Actual table by category**

**Monthly Revenue & Expenses trend chart**

**Revenue Breakdown donut chart**

**Cash Flow table (monthly)**

---

## 3. User Actions Summary

| Action | Where | Result |
|---|---|---|
| Deposit funds | Wallet | Initiates deposit flow |
| Withdraw funds | Wallet | Opens withdrawal request modal |
| Add Expense | Expenses toolbar | Opens new expense form |
| Filter expenses | Expenses toolbar | Filters by category or date |
| Search expenses | Expenses toolbar | Searches by vendor or description |
| View invoice details | Billing table row | Opens invoice detail view |
| Select staff for payroll | Payroll → This Month | Checkboxes to select staff |
| Pay selected staff | Payroll → This Month | Opens confirm & pay modal |
| Top up wallet | Payroll modal (insufficient) | Navigates to wallet |
| View payroll history | Payroll History tab | Shows past payroll runs |
| Add salary setup | Salary Setup tab | Opens new salary setup modal |
| Edit salary setup | Salary Setup table | Opens edit form |

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

### US-1: Admin Views Wallet Dashboard
**As a** crèche administrator,  
**I want to** see my wallet balance and recent transactions,  
**so that** I know how much money is available.

**Acceptance Criteria:**
- [ ] Wallet tab shows available balance, pending in, pending out
- [ ] Recent transactions list shows type (Credit/Debit), category, amount, date
- [ ] Quick action buttons for Deposit and Withdraw are available

---

### US-2: Admin Views Billing & Payments
**As a** crèche administrator,  
**I want to** track invoices and their payment status,  
**so that** I can follow up on outstanding payments.

**Acceptance Criteria:**
- [ ] Billing stats show: Collected, Outstanding, Overdue Payments, Target This Month
- [ ] Invoice tracking table shows: child, parent, room plan, due payment, due date, status, risk
- [ ] Status badges: Overdue (red), Partial (amber), Paid (green), Pending (grey)
- [ ] Risk badges: Low (green), Medium (amber), High Risk (red)

---

### US-3: Admin Manages Expenses
**As a** crèche administrator,  
**I want to** track and categorize my crèche's expenses,  
**so that** I can manage budgets and control costs.

**Acceptance Criteria:**
- [ ] Expense overview shows: Monthly Budget, Expenses, Remaining Budget, Pending Approval
- [ ] Expense table shows: date, vendor, category, description, amount, status, receipt
- [ ] Categories include: Payroll, Rent, Utilities, Supplies, Others
- [ ] Table supports filtering by category and date
- [ ] "Add Expense" button opens expense creation form

---

### US-4: Admin Runs Payroll
**As a** crèche administrator,  
**I want to** select staff and pay them from my wallet,  
**so that** payroll is processed quickly and accurately.

**Acceptance Criteria:**
- [ ] Payroll tab shows staff list with checkboxes, role, net pay, and status
- [ ] Select All / Deselect All checkbox available in table header
- [ ] Selected staff are highlighted; running total bar shows count and total net pay
- [ ] "Pay Selected" button opens confirmation modal
- [ ] Modal shows wallet balance, staff count, and total net pay
- [ ] If wallet balance < total: red "Insufficient Balance" warning with shortfall amount and "Top Up Wallet" link
- [ ] "Confirm & Pay" button is disabled when balance is insufficient
- [ ] Success confirmation after payment

---

### US-5: Admin Views Payroll History
**As a** crèche administrator,  
**I want to** see past payroll runs,  
**so that** I can reference previous payments.

**Acceptance Criteria:**
- [ ] Payroll History table shows: month, staff count, gross payroll, deductions, net paid, run by, date paid, status
- [ ] "View Details" link available per row

---

### US-6: Admin Manages Salary Setup
**As a** crèche administrator,  
**I want to** set up salary and bank details for staff,  
**so that** payroll can be processed automatically.

**Acceptance Criteria:**
- [ ] Salary Setup table shows: staff, role, employment type, basic salary, bank name, account number, pension PIN, tax ID
- [ ] "New Salary Setup" button opens a form with all salary and bank fields
- [ ] "Edit" link available per row

---

### US-7: Admin Views Financial Reports
**As a** crèche administrator,  
**I want to** see P&L statements, budget vs actual, and cash flow,  
**so that** I can understand the financial health of my business.

**Acceptance Criteria:**
- [ ] Report summary shows: Total Revenue, Total Expenses, Net Profit, Cash Available
- [ ] P&L statement shows income and expenditure breakdown
- [ ] Budget vs Actual comparison by category
- [ ] Monthly trend chart for revenue and expenses
- [ ] Cash Flow table shows monthly cash in, cash out, net cash flow

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
