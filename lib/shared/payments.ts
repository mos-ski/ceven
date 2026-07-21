import { sharedGetList, sharedSet } from "./storage";
import { addNotification } from "./notifications";

export type InvoiceStatus = "paid" | "pending" | "overdue";

export type SharedInvoice = {
  id: string; childId: string; childName: string; term: string; description: string;
  amount: number; dueDate: string; status: InvoiceStatus;
  paidAt?: number; paymentMethod?: string; transactionRef?: string;
};

export type PaymentReceipt = {
  invoiceId: string; amount: number; paidAt: number; method: string;
  reference: string; parentName: string; childName: string; term: string;
};

const INVOICE_KEY = "invoices";
const RECEIPT_KEY = "payment_receipts";

const MOCK_INVOICES: SharedInvoice[] = [
  { id: "inv-1", childId: "child-1", childName: "Liam Smith", term: "January Term 2026", description: "Full term tuition — Toddler Room", amount: 45000, dueDate: "2026-01-31", status: "pending" },
  { id: "inv-2", childId: "child-1", childName: "Liam Smith", term: "December Term 2025", description: "Full term tuition — Toddler Room", amount: 45000, dueDate: "2025-12-31", status: "paid", paidAt: Date.now() - 35 * 86400000, paymentMethod: "Paystack", transactionRef: "PSK-TXN-001234" },
  { id: "inv-3", childId: "child-1", childName: "Liam Smith", term: "November Term 2025", description: "Full term tuition — Toddler Room", amount: 40000, dueDate: "2025-11-30", status: "paid", paidAt: Date.now() - 65 * 86400000, paymentMethod: "Bank Transfer", transactionRef: "BTR-20251128" },
  { id: "inv-4", childId: "child-2", childName: "Olivia Brown", term: "January Term 2026", description: "Full term tuition — Toddler Room", amount: 45000, dueDate: "2026-01-31", status: "overdue" },
];

function init() {
  if (sharedGetList<SharedInvoice>(INVOICE_KEY).length === 0) sharedSet(INVOICE_KEY, MOCK_INVOICES);
  if (sharedGetList<PaymentReceipt>(RECEIPT_KEY).length === 0) sharedSet(RECEIPT_KEY, []);
}

export function getInvoices(childId?: string): SharedInvoice[] {
  init();
  const all = sharedGetList<SharedInvoice>(INVOICE_KEY);
  return childId ? all.filter((i) => i.childId === childId) : all;
}

export function getInvoice(id: string): SharedInvoice | null {
  init();
  return sharedGetList<SharedInvoice>(INVOICE_KEY).find((i) => i.id === id) ?? null;
}

export function getOutstandingBalance(childId?: string): number {
  return getInvoices(childId).filter((i) => i.status !== "paid").reduce((sum, i) => sum + i.amount, 0);
}

export function markAsPaid(id: string, method: string, parentName: string): PaymentReceipt | null {
  init();
  const all = sharedGetList<SharedInvoice>(INVOICE_KEY);
  const invoice = all.find((i) => i.id === id);
  if (!invoice) return null;
  const ref = `PSK-TXN-${Date.now().toString(36).toUpperCase()}`;
  const updated = { ...invoice, status: "paid" as const, paidAt: Date.now(), paymentMethod: method, transactionRef: ref };
  sharedSet(INVOICE_KEY, all.map((i) => (i.id === id ? updated : i)));
  const receipt: PaymentReceipt = { invoiceId: id, amount: invoice.amount, paidAt: Date.now(), method, reference: ref, parentName, childName: invoice.childName, term: invoice.term };
  const receipts = sharedGetList<PaymentReceipt>(RECEIPT_KEY);
  sharedSet(RECEIPT_KEY, [...receipts, receipt]);
  addNotification({ type: "fee", title: "Payment Confirmed", body: `Payment of ₦${invoice.amount.toLocaleString()} for ${invoice.term} confirmed. Ref: ${ref}`, childId: invoice.childId, childName: invoice.childName, data: { invoiceId: id, reference: ref, amount: invoice.amount } });
  return receipt;
}

export function getPaymentHistory(childId?: string): PaymentReceipt[] {
  init();
  const all = sharedGetList<PaymentReceipt>(RECEIPT_KEY);
  return childId ? all.filter((r) => { const inv = sharedGetList<SharedInvoice>(INVOICE_KEY).find((i) => i.id === r.invoiceId); return inv?.childId === childId; }) : all;
}
