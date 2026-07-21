// Display-only payment ledger. Payments happen outside the app (bank
// transfer, admin-recorded) per App Store guideline 3.1.1 — this module
// deliberately exposes no way to create or modify a transaction.

export type Transaction = {
  id: string;
  title: string;
  reference: string;
  amount: number; // Naira
  date: string;
  status: "successful";
  method: string;
};

const TRANSACTIONS: Transaction[] = [
  {
    id: "txn-1",
    title: "January Term Tuition — Joy Adewale",
    reference: "TXN-1784197633346",
    amount: 45000,
    date: "16th Jan 2026 11:27 AM",
    status: "successful",
    method: "Bank Transfer",
  },
  {
    id: "txn-2",
    title: "January Term Tuition — Philip Adewale",
    reference: "TXN-1784197633921",
    amount: 45000,
    date: "14th Jan 2026 09:03 AM",
    status: "successful",
    method: "Recorded by admin",
  },
  {
    id: "txn-3",
    title: "December Term Tuition — Joy Adewale",
    reference: "TXN-1781605218812",
    amount: 40000,
    date: "12th Dec 2025 04:41 PM",
    status: "successful",
    method: "Bank Transfer",
  },
];

export function getTransactions(): Transaction[] {
  return TRANSACTIONS;
}
