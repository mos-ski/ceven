import { sharedSet, sharedGetList } from "@/lib/shared/storage";

// ── Types ─────────────────────────────────────────────────────────────────────

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
};

// ── Categories ────────────────────────────────────────────────────────────────

export const FAQ_CATEGORIES = [
  "Enrollment",
  " Fees & Payments",
  "Health & Safety",
  "Daily Routine",
  "Policies",
  "General",
] as const;

export type FaqCategory = (typeof FAQ_CATEGORIES)[number];

// ── Storage key ───────────────────────────────────────────────────────────────

const STORAGE_KEY = "admin_faqs";

// ── Default mock data ─────────────────────────────────────────────────────────

const DEFAULT_FAQS: FaqItem[] = [
  {
    id: "faq-1",
    question: "What age groups do you accept?",
    answer:
      "We accept children from 6 months to 5 years old. Our rooms are divided by age groups: Infant Room (6-12 months), Toddler Room (1-2 years), and Preschool Room (3-5 years).",
    category: "Enrollment",
    order: 0,
  },
  {
    id: "faq-2",
    question: "What are your operating hours?",
    answer:
      "We are open Monday through Friday from 6:30 AM to 6:30 PM. We ask that all children be picked up by 6:30 PM. A late fee of $2 per minute applies after closing time.",
    category: "General",
    order: 1,
  },
  {
    id: "faq-3",
    question: "What is the enrollment process?",
    answer:
      "To enroll your child, please submit an inquiry through our app or visit us in person. We will schedule a tour, provide the enrollment forms, and once completed and reviewed, we will confirm your child's spot.",
    category: "Enrollment",
    order: 2,
  },
  {
    id: "faq-4",
    question: "Do you provide meals?",
    answer:
      "Yes, we provide all meals and snacks following USDA guidelines. Breakfast, lunch, and an afternoon snack are included in the tuition. Please inform us of any allergies or dietary restrictions.",
    category: "Daily Routine",
    order: 3,
  },
  {
    id: "faq-5",
    question: "What is the illness policy?",
    answer:
      "Children must be symptom-free for 24 hours before returning to the creche. This includes fever, vomiting, diarrhea, and contagious conditions. We will notify you promptly if your child becomes ill during the day.",
    category: "Health & Safety",
    order: 4,
  },
  {
    id: "faq-6",
    question: "How do payments work?",
    answer:
      "Tuition is due weekly by Friday for the following week. We accept bank transfers and card payments through our app. A 30-day written notice is required for any changes to enrollment.",
    category: " Fees & Payments",
    order: 5,
  },
];

// ── CRUD helpers ──────────────────────────────────────────────────────────────

function generateId(): string {
  return `faq-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function getFaqs(): FaqItem[] {
  const stored = sharedGetList<FaqItem>(STORAGE_KEY);
  if (stored.length === 0) {
    sharedSet(STORAGE_KEY, DEFAULT_FAQS);
    return [...DEFAULT_FAQS];
  }
  return stored.sort((a, b) => a.order - b.order);
}

export function getFaqsByCategory(category: string): FaqItem[] {
  return getFaqs().filter((faq) => faq.category === category);
}

export function addFaq(data: Omit<FaqItem, "id" | "order">): FaqItem {
  const faqs = getFaqs();
  const newItem: FaqItem = {
    ...data,
    id: generateId(),
    order: faqs.length,
  };
  sharedSet(STORAGE_KEY, [...faqs, newItem]);
  return newItem;
}

export function updateFaq(id: string, data: Partial<Omit<FaqItem, "id">>): FaqItem | null {
  const faqs = getFaqs();
  const idx = faqs.findIndex((f) => f.id === id);
  if (idx === -1) return null;
  faqs[idx] = { ...faqs[idx], ...data };
  sharedSet(STORAGE_KEY, faqs);
  return faqs[idx];
}

export function deleteFaq(id: string): boolean {
  const faqs = getFaqs();
  const filtered = faqs.filter((f) => f.id !== id);
  if (filtered.length === faqs.length) return false;
  sharedSet(STORAGE_KEY, filtered);
  return true;
}

export function reorderFaqs(orderedIds: string[]): void {
  const faqs = getFaqs();
  const map = new Map(faqs.map((f) => [f.id, f]));
  const reordered = orderedIds
    .map((id, i) => {
      const item = map.get(id);
      return item ? { ...item, order: i } : null;
    })
    .filter(Boolean) as FaqItem[];
  sharedSet(STORAGE_KEY, reordered);
}
