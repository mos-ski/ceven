"use client";

import { useState, useCallback } from "react";
import {
 Plus,
 Pencil,
 Trash2,
 GripVertical,
 ChevronDown,
 ChevronUp,
 HelpCircle,
} from "lucide-react";

import {
 Dialog,
 DialogContent,
 DialogHeader,
 DialogTitle,
 DialogFooter,
 DialogClose,
} from "@/components/ui/dialog";
import {
 getFaqs,
 addFaq,
 updateFaq,
 deleteFaq,
 reorderFaqs,
 FAQ_CATEGORIES,
 type FaqItem,
} from "@/lib/mock-data/faq";

// ── FAQ Form ──────────────────────────────────────────────────────────────────

function FaqForm({
 initial,
 onSave,
}: {
 initial?: FaqItem;
 onSave: (data: { question: string; answer: string; category: string }) => void;
}) {
 const [question, setQuestion] = useState(initial?.question ?? "");
 const [answer, setAnswer] = useState(initial?.answer ?? "");
 const [category, setCategory] = useState(initial?.category ?? FAQ_CATEGORIES[0]);

 const canSave = question.trim().length > 0 && answer.trim().length > 0;

 function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  if (!canSave) return;
  onSave({ question: question.trim(), answer: answer.trim(), category });
 }

 return (
  <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-6">
   <div className="flex flex-col gap-1.5">
    <label className="font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#2d1810]">
     Category
    </label>
    <select
     value={category}
     onChange={(e) => setCategory(e.target.value)}
     className="h-11 rounded-xl border-none bg-[#F5EDD8]/30 px-4 font-[family-name:var(--font-urbanist)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]"
    >
     {FAQ_CATEGORIES.map((cat) => (
      <option key={cat} value={cat}>
       {cat.trim()}
      </option>
     ))}
    </select>
   </div>

   <div className="flex flex-col gap-1.5">
    <label className="font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#2d1810]">
     Question
    </label>
    <input
     type="text"
     value={question}
     onChange={(e) => setQuestion(e.target.value)}
     placeholder="e.g. What age groups do you accept?"
     className="h-11 rounded-xl border-none bg-[#F5EDD8]/30 px-4 font-[family-name:var(--font-urbanist)] text-sm text-[#2d1810] placeholder:text-[#9ca3af] outline-none focus:ring-2 focus:ring-[#c47b2c]"
    />
   </div>

   <div className="flex flex-col gap-1.5">
    <label className="font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#2d1810]">
     Answer
    </label>
    <textarea
     rows={5}
     value={answer}
     onChange={(e) => setAnswer(e.target.value)}
     placeholder="Type the answer here..."
     className="resize-none rounded-xl border-none bg-[#F5EDD8]/30 px-4 py-3 font-[family-name:var(--font-urbanist)] text-sm text-[#2d1810] placeholder:text-[#9ca3af] outline-none focus:ring-2 focus:ring-[#c47b2c]"
    />
   </div>

   <DialogFooter className="px-0 pt-4">
    <div className="h-px bg-black/[0.06] mb-4" />
    <DialogClose className="rounded-lg border border-[#d0d5dd] px-5 py-2.5 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#2d1810] hover:bg-[#f9fafb]">
     Cancel
    </DialogClose>
    <button
     type="submit"
     disabled={!canSave}
     className="rounded-lg bg-[#3b2513] px-5 py-2.5 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#faf2e1] hover:bg-[#2d1810] disabled:opacity-40 disabled:cursor-not-allowed"
    >
     {initial ? "Save Changes" : "Add FAQ"}
    </button>
   </DialogFooter>
  </form>
 );
}

// ── Delete Confirmation Dialog ────────────────────────────────────────────────

function DeleteConfirm({
 faq,
 onConfirm,
}: {
 faq: FaqItem;
 onConfirm: () => void;
}) {
 return (
  <div className="flex flex-col items-center p-6 text-center">
   <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
    <Trash2 size={24} className="text-red-500" />
   </div>
   <h3 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">
    Delete FAQ
   </h3>
   <p className="mt-2 font-[family-name:var(--font-urbanist)] text-sm text-[#6b7280]">
    Are you sure you want to delete this FAQ? This action cannot be undone.
   </p>
   <p className="mt-3 rounded-lg bg-[#f9f8f6] px-4 py-2 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#2d1810]">
    &ldquo;{faq.question}&rdquo;
   </p>
   <div className="mt-6 flex w-full gap-3">
    <DialogClose className="flex-1 rounded-lg border border-[#d0d5dd] px-5 py-2.5 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#2d1810] hover:bg-[#f9fafb]">
     Cancel
    </DialogClose>
    <button
     onClick={onConfirm}
     className="flex-1 rounded-lg bg-red-500 px-5 py-2.5 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-white hover:bg-red-600"
    >
     Delete
    </button>
   </div>
  </div>
 );
}

// ── FAQ Row ───────────────────────────────────────────────────────────────────

function FaqRow({
 faq,
 onEdit,
 onDelete,
 onMoveUp,
 onMoveDown,
 isFirst,
 isLast,
}: {
 faq: FaqItem;
 onEdit: () => void;
 onDelete: () => void;
 onMoveUp: () => void;
 onMoveDown: () => void;
 isFirst: boolean;
 isLast: boolean;
}) {
 const [expanded, setExpanded] = useState(false);

 return (
  <div className="rounded-xl bg-[#F5EDD8]/30">
   <div className="flex items-center gap-3 px-4 py-3">
    <GripVertical size={16} className="shrink-0 text-[#d0d5dd]" />

    <div className="min-w-0 flex-1">
     <p className="font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#2d1810] truncate">
      {faq.question}
     </p>
     <span className="font-[family-name:var(--font-urbanist)] text-[10px] font-medium text-[#c47b2c]">
      {faq.category.trim()}
     </span>
    </div>

    <div className="flex shrink-0 items-center gap-1">
     <button
      onClick={onMoveUp}
      disabled={isFirst}
      className="rounded p-1 text-[#9ca3af] hover:text-[#2d1810] disabled:opacity-30"
     >
      <ChevronUp size={14} />
     </button>
     <button
      onClick={onMoveDown}
      disabled={isLast}
      className="rounded p-1 text-[#9ca3af] hover:text-[#2d1810] disabled:opacity-30"
     >
      <ChevronDown size={14} />
     </button>
     <button
      onClick={onEdit}
      className="rounded p-1 text-[#9ca3af] hover:text-[#c47b2c]"
     >
      <Pencil size={14} />
     </button>
     <button
      onClick={onDelete}
      className="rounded p-1 text-[#9ca3af] hover:text-red-500"
     >
      <Trash2 size={14} />
     </button>
     <button
      onClick={() => setExpanded(!expanded)}
      className="rounded p-1 text-[#9ca3af] hover:text-[#2d1810]"
     >
      <ChevronDown
       size={14}
       className={`transition-transform ${expanded ? "rotate-180" : ""}`}
      />
     </button>
    </div>
   </div>

   {expanded && (
    <div className="px-4 py-3">
     <div className="h-px bg-black/[0.06] mb-3" />
     <p className="font-[family-name:var(--font-urbanist)] text-sm leading-relaxed text-[#6b7280]">
      {faq.answer}
     </p>
    </div>
   )}
  </div>
 );
}

// ── Main Tab ──────────────────────────────────────────────────────────────────

export function FaqTab() {
 const [faqs, setFaqs] = useState<FaqItem[]>(() => getFaqs());
 const [filterCategory, setFilterCategory] = useState<string>("All");
 const [showAddDialog, setShowAddDialog] = useState(false);
 const [editItem, setEditItem] = useState<FaqItem | null>(null);
 const [deleteItem, setDeleteItem] = useState<FaqItem | null>(null);

 const loadFaqs = useCallback(() => {
  setFaqs(getFaqs());
 }, []);

 function handleAdd(data: { question: string; answer: string; category: string }) {
  addFaq(data);
  loadFaqs();
  setShowAddDialog(false);
 }

 function handleEdit(data: { question: string; answer: string; category: string }) {
  if (!editItem) return;
  updateFaq(editItem.id, data);
  loadFaqs();
  setEditItem(null);
 }

 function handleDelete() {
  if (!deleteItem) return;
  deleteFaq(deleteItem.id);
  loadFaqs();
  setDeleteItem(null);
 }

 function handleMoveUp(index: number) {
  if (index === 0) return;
  const filtered = getFiltered();
  const ids = filtered.map((f) => f.id);
  [ids[index - 1], ids[index]] = [ids[index], ids[index - 1]];
  const allIds = getFaqs().map((f) => f.id);
  const movedId = ids[index - 1];
  const movedOrigIdx = allIds.indexOf(movedId);
  const targetId = ids[index];
  const targetOrigIdx = allIds.indexOf(targetId);
  allIds[movedOrigIdx] = targetId;
  allIds[targetOrigIdx] = movedId;
  reorderFaqs(allIds);
  loadFaqs();
 }

 function handleMoveDown(index: number) {
  const filtered = getFiltered();
  if (index >= filtered.length - 1) return;
  const ids = filtered.map((f) => f.id);
  [ids[index], ids[index + 1]] = [ids[index + 1], ids[index]];
  const allIds = getFaqs().map((f) => f.id);
  const movedId = ids[index];
  const movedOrigIdx = allIds.indexOf(movedId);
  const targetId = ids[index + 1];
  const targetOrigIdx = allIds.indexOf(targetId);
  allIds[movedOrigIdx] = targetId;
  allIds[targetOrigIdx] = movedId;
  reorderFaqs(allIds);
  loadFaqs();
 }

 function getFiltered(): FaqItem[] {
  if (filterCategory === "All") return faqs;
  return faqs.filter((f) => f.category === filterCategory);
 }

 const filtered = getFiltered();

 return (
  <div className="flex flex-col gap-4">
   {/* Header */}
   <div className="flex items-center justify-between">
    <div>
     <h1 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2d1810]">
      FAQ Management
     </h1>
     <p className="mt-1 font-[family-name:var(--font-urbanist)] text-sm text-[#6b7280]">
      Manage frequently asked questions that parents see when browsing your creche.
     </p>
    </div>
    <button
     onClick={() => setShowAddDialog(true)}
     className="flex items-center gap-2 rounded-lg bg-[#3b2513] px-5 py-3 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#faf2e1] hover:bg-[#2d1810]"
    >
     <Plus size={16} />
     Add FAQ
    </button>
   </div>

   {/* Category filter */}
   <div className="flex flex-wrap gap-2">
    <button
     onClick={() => setFilterCategory("All")}
     className={`rounded-full border px-4 py-1.5 font-[family-name:var(--font-urbanist)] text-sm font-medium transition-colors ${
      filterCategory === "All"
       ? "border-[#3b2513] bg-[#3b2513] text-[#faf2e1]"
       : "border-[#d0d5dd] text-[#6b7280] hover:border-[#c47b2c] hover:text-[#2d1810]"
     }`}
    >
     All
    </button>
    {FAQ_CATEGORIES.map((cat) => (
     <button
      key={cat}
      onClick={() => setFilterCategory(cat)}
      className={`rounded-full border px-4 py-1.5 font-[family-name:var(--font-urbanist)] text-sm font-medium transition-colors ${
       filterCategory === cat
        ? "border-[#3b2513] bg-[#3b2513] text-[#faf2e1]"
        : "border-[#d0d5dd] text-[#6b7280] hover:border-[#c47b2c] hover:text-[#2d1810]"
      }`}
     >
      {cat.trim()}
     </button>
    ))}
   </div>

   {/* FAQ list */}
   {filtered.length === 0 ? (
    <div className="flex flex-col items-center justify-center rounded-xl py-16">
     <HelpCircle size={40} className="text-[#d0d5dd]" />
     <p className="mt-3 font-[family-name:var(--font-urbanist)] text-sm text-[#9ca3af]">
      No FAQs yet. Click &ldquo;Add FAQ&rdquo; to get started.
     </p>
    </div>
   ) : (
    <div className="flex flex-col gap-2">
     {filtered.map((faq, i) => (
      <FaqRow
       key={faq.id}
       faq={faq}
       onEdit={() => setEditItem(faq)}
       onDelete={() => setDeleteItem(faq)}
       onMoveUp={() => handleMoveUp(i)}
       onMoveDown={() => handleMoveDown(i)}
       isFirst={i === 0}
       isLast={i === filtered.length - 1}
      />
     ))}
    </div>
   )}

   {/* Stats */}
   <div className="rounded-xl bg-[#f9f8f6] px-4 py-3">
    <p className="font-[family-name:var(--font-urbanist)] text-xs text-[#6b7280]">
     {faqs.length} FAQ{faqs.length !== 1 ? "s" : ""} total
     {filterCategory !== "All" && ` · ${filtered.length} in "${filterCategory.trim()}"`}
    </p>
   </div>

   {/* Add Dialog */}
   <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
    <DialogContent>
     <DialogHeader>
      <DialogTitle>Add New FAQ</DialogTitle>
     </DialogHeader>
     <FaqForm onSave={handleAdd} />
    </DialogContent>
   </Dialog>

   {/* Edit Dialog */}
   <Dialog open={!!editItem} onOpenChange={(open) => !open && setEditItem(null)}>
    <DialogContent>
     <DialogHeader>
      <DialogTitle>Edit FAQ</DialogTitle>
     </DialogHeader>
     {editItem && (
      <FaqForm
       initial={editItem}
       onSave={handleEdit}
      />
     )}
    </DialogContent>
   </Dialog>

   {/* Delete Dialog */}
   <Dialog open={!!deleteItem} onOpenChange={(open) => !open && setDeleteItem(null)}>
    <DialogContent>
     {deleteItem && (
      <DeleteConfirm
       faq={deleteItem}
       onConfirm={handleDelete}
      />
     )}
    </DialogContent>
   </Dialog>
  </div>
 );
}
