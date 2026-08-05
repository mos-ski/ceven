"use client";

import { ArrowLeft, ArrowUp, Plus, Pencil, Trash2, GripVertical, ChevronDown, ChevronUp, Search } from "lucide-react";
import { useState, useCallback } from "react";

import {
  ADA_SUGGESTED_PROMPTS,
  ROLE_GUIDES,
  type RoleGuide,
} from "@/lib/mock-data/account-setup";
import { getAdaReply } from "@/lib/ada-responses";
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

const gradientBg = "linear-gradient(135deg, rgb(30,45,74) 0%, rgb(45,24,16) 100%)";

// ── FAQ Form Dialog ───────────────────────────────────────────────────────────

function FaqFormDialog({
  open,
  onOpenChange,
  initial,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
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
    setQuestion("");
    setAnswer("");
    setCategory(FAQ_CATEGORIES[0]);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initial ? "Edit FAQ" : "Add New FAQ"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-6">
          <div className="flex flex-col gap-1.5">
            <label className="font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#2d1810]">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-11 rounded-xl border border-[#e6ebf3] bg-white px-4 font-[family-name:var(--font-urbanist)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]"
            >
              {FAQ_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat.trim()}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#2d1810]">Question</label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g. What age groups do you accept?"
              className="h-11 rounded-xl border border-[#e6ebf3] bg-white px-4 font-[family-name:var(--font-urbanist)] text-sm text-[#2d1810] placeholder:text-[#9ca3af] outline-none focus:ring-2 focus:ring-[#c47b2c]"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#2d1810]">Answer</label>
            <textarea
              rows={5}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type the answer here..."
              className="resize-none rounded-xl border border-[#e6ebf3] bg-white px-4 py-3 font-[family-name:var(--font-urbanist)] text-sm text-[#2d1810] placeholder:text-[#9ca3af] outline-none focus:ring-2 focus:ring-[#c47b2c]"
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
      </DialogContent>
    </Dialog>
  );
}

// ── FAQ Management ────────────────────────────────────────────────────────────

function FaqManagement() {
  const [faqs, setFaqs] = useState<FaqItem[]>(() => getFaqs());
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editItem, setEditItem] = useState<FaqItem | null>(null);
  const [deleteItem, setDeleteItem] = useState<FaqItem | null>(null);

  const loadFaqs = useCallback(() => setFaqs(getFaqs()), []);

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

  function moveItem(index: number, direction: -1 | 1) {
    const filtered = filterCategory === "All" ? faqs : faqs.filter((f) => f.category === filterCategory);
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= filtered.length) return;
    const ids = filtered.map((f) => f.id);
    [ids[index], ids[targetIdx]] = [ids[targetIdx], ids[index]];
    const allIds = faqs.map((f) => f.id);
    const movedId = ids[index];
    const movedOrig = allIds.indexOf(movedId);
    const targetId = ids[targetIdx];
    const targetOrig = allIds.indexOf(targetId);
    allIds[movedOrig] = targetId;
    allIds[targetOrig] = movedId;
    reorderFaqs(allIds);
    loadFaqs();
  }

  const filtered = filterCategory === "All" ? faqs : faqs.filter((f) => f.category === filterCategory);

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-black">
          Frequently Asked Questions
        </p>
        <button
          onClick={() => setShowAddDialog(true)}
          className="flex items-center gap-1.5 rounded-lg bg-[#3b2513] px-4 py-2 font-[family-name:var(--font-urbanist)] text-xs font-semibold text-[#faf2e1] hover:bg-[#2d1810]"
        >
          <Plus size={14} />
          Add FAQ
        </button>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-1.5">
        <button
          onClick={() => setFilterCategory("All")}
          className={`rounded-full border px-3 py-1 font-[family-name:var(--font-urbanist)] text-[11px] font-medium transition-colors ${
            filterCategory === "All"
              ? "border-[#3b2513] bg-[#3b2513] text-[#faf2e1]"
              : "border-[#d0d5dd] text-[#6b7280] hover:border-[#c47b2c]"
          }`}
        >
          All
        </button>
        {FAQ_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`rounded-full border px-3 py-1 font-[family-name:var(--font-urbanist)] text-[11px] font-medium transition-colors ${
              filterCategory === cat
                ? "border-[#3b2513] bg-[#3b2513] text-[#faf2e1]"
                : "border-[#d0d5dd] text-[#6b7280] hover:border-[#c47b2c]"
            }`}
          >
            {cat.trim()}
          </button>
        ))}
      </div>

      {/* FAQ list */}
      {filtered.length === 0 ? (
        <p className="py-6 text-center font-[family-name:var(--font-urbanist)] text-xs text-[#9ca3af]">
          No FAQs yet. Click &ldquo;Add FAQ&rdquo; to get started.
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {filtered.map((faq, i) => (
            <FaqRow
              key={faq.id}
              faq={faq}
              onEdit={() => setEditItem(faq)}
              onDelete={() => setDeleteItem(faq)}
              onMoveUp={() => moveItem(i, -1)}
              onMoveDown={() => moveItem(i, 1)}
              isFirst={i === 0}
              isLast={i === filtered.length - 1}
            />
          ))}
        </div>
      )}

      <FaqFormDialog open={showAddDialog} onOpenChange={setShowAddDialog} onSave={handleAdd} />
      <FaqFormDialog open={!!editItem} onOpenChange={(o) => !o && setEditItem(null)} initial={editItem ?? undefined} onSave={handleEdit} />

      {/* Delete confirm */}
      <Dialog open={!!deleteItem} onOpenChange={(o) => !o && setDeleteItem(null)}>
        <DialogContent>
          {deleteItem && (
            <div className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
                <Trash2 size={24} className="text-red-500" />
              </div>
              <h3 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">Delete FAQ</h3>
              <p className="mt-2 font-[family-name:var(--font-urbanist)] text-sm text-[#6b7280]">
                Are you sure? This cannot be undone.
              </p>
              <p className="mt-3 rounded-lg bg-[#f9f8f6] px-4 py-2 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#2d1810]">
                &ldquo;{deleteItem.question}&rdquo;
              </p>
              <div className="mt-6 flex w-full gap-3">
                <DialogClose className="flex-1 rounded-lg border border-[#d0d5dd] px-5 py-2.5 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#2d1810] hover:bg-[#f9fafb]">
                  Cancel
                </DialogClose>
                <button
                  onClick={handleDelete}
                  className="flex-1 rounded-lg bg-red-500 px-5 py-2.5 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

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
      <div className="flex items-center gap-2 px-3 py-2.5">
        <GripVertical size={14} className="shrink-0 text-[#d0d5dd]" />
        <div className="min-w-0 flex-1">
          <p className="font-[family-name:var(--font-urbanist)] text-xs font-semibold text-[#2d1810] truncate">{faq.question}</p>
          <span className="font-[family-name:var(--font-urbanist)] text-[9px] text-[#c47b2c]">{faq.category.trim()}</span>
        </div>
        <div className="flex shrink-0 items-center gap-0.5">
          <button onClick={onMoveUp} disabled={isFirst} className="rounded p-0.5 text-[#9ca3af] hover:text-[#2d1810] disabled:opacity-30"><ChevronUp size={12} /></button>
          <button onClick={onMoveDown} disabled={isLast} className="rounded p-0.5 text-[#9ca3af] hover:text-[#2d1810] disabled:opacity-30"><ChevronDown size={12} /></button>
          <button onClick={onEdit} className="rounded p-0.5 text-[#9ca3af] hover:text-[#c47b2c]"><Pencil size={12} /></button>
          <button onClick={onDelete} className="rounded p-0.5 text-[#9ca3af] hover:text-red-500"><Trash2 size={12} /></button>
          <button onClick={() => setExpanded(!expanded)} className="rounded p-0.5 text-[#9ca3af] hover:text-[#2d1810]">
            <ChevronDown size={12} className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>
      {expanded && (
        <div className="px-3 py-2.5">
          <div className="h-px bg-black/[0.06] mb-2.5" />
          <p className="font-[family-name:var(--font-urbanist)] text-xs leading-relaxed text-[#6b7280]">{faq.answer}</p>
        </div>
      )}
    </div>
  );
}

type AdaMessage = { role: "user" | "ai"; text: string };

const INITIAL_ADA_MESSAGES: AdaMessage[] = [
  { role: "user", text: "How do i generate report that i can send to parents at the end of each day" },
  {
    role: "ai",
    text: 'Head to Daily Operations → Daily Logs, select the children you want to include, then click "Generate Parent Report". You can send it straight from there or download it as a PDF.',
  },
];

function AskAdaPanel() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<AdaMessage[]>(INITIAL_ADA_MESSAGES);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((prev) => [
      ...prev,
      { role: "user", text: trimmed },
      { role: "ai", text: getAdaReply(trimmed) },
    ]);
    setInput("");
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-2xl bg-[#fffcf4]">
      <div className="flex shrink-0 flex-col gap-1.5 px-5 py-3.5">
        <div className="flex items-center gap-1">
          <span className="size-1.5 rounded-full bg-[#c47b2c]" />
          <span className="font-[family-name:var(--font-urbanist)] text-xs font-bold tracking-[0.84px] text-[#2d1810] uppercase">
            Ask ADA
          </span>
        </div>
        <div className="flex items-center gap-1 font-[family-name:var(--font-urbanist)] text-[10px]">
          <span className="text-[rgba(45,24,16,0.5)]">Professional &amp; Warm</span>
          <button className="text-[#1f3345] underline">Personalize</button>
        </div>
        <div className="h-px bg-black/[0.06] mt-1.5" />
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        <div className="flex flex-col gap-3">
          {messages.map((msg, i) =>
            msg.role === "user" ? (
              <div key={i} className="flex items-start justify-end gap-2">
                <div className="max-w-[268px] rounded-tl-[10px] rounded-tr-[10px] rounded-br-[10px] rounded-bl-[2px] border border-[rgba(45,24,16,0.12)] bg-[#fdf6e8] p-3">
                  <p className="font-[family-name:var(--font-urbanist)] text-xs font-medium text-[#2d1810]">{msg.text}</p>
                </div>
                <div
                  className="flex size-6 shrink-0 items-center justify-center rounded-xl text-xs font-bold text-white"
                  style={{ background: gradientBg }}
                >
                  ✦
                </div>
              </div>
            ) : (
              <div key={i} className="flex items-start gap-2">
                <div
                  className="flex size-6 shrink-0 items-center justify-center rounded-xl text-xs font-bold text-white"
                  style={{ background: gradientBg }}
                >
                  ✦
                </div>
                <div className="max-w-[268px] rounded-tl-[2px] rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px] border border-[rgba(45,24,16,0.12)] bg-white p-3">
                  <p className="font-[family-name:var(--font-urbanist)] text-xs font-medium text-[#2d1810]">{msg.text}</p>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      <div className="flex shrink-0 flex-col gap-3 px-5 py-3">
        <div className="h-px bg-black/[0.06] mb-3" />
        <div className="flex flex-wrap gap-1">
          {ADA_SUGGESTED_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => send(prompt)}
              className="rounded-full border border-[rgba(45,24,16,0.12)] bg-[#f5edd8] px-3 py-1.5 font-[family-name:var(--font-urbanist)] text-[10px] text-[rgba(45,24,16,0.5)]"
            >
              {prompt}
            </button>
          ))}
        </div>
        <div className="relative">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send(input)}
            placeholder="Type a message…"
            className="h-10 w-full rounded-[10px] border border-[rgba(45,24,16,0.12)] bg-[#f5edd8] px-3 pr-12 font-[family-name:var(--font-urbanist)] text-xs font-medium text-[#2d1810] placeholder:text-[rgba(45,24,16,0.5)] outline-none"
          />
          <button
            onClick={() => send(input)}
            className="absolute top-1/2 right-1.5 flex size-8 -translate-y-1/2 items-center justify-center rounded-[6px] text-white"
            style={{ backgroundImage: "linear-gradient(135deg, rgb(30,45,74) 0%, rgb(196,123,44) 100%)" }}
          >
            <ArrowUp className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function RoleGuidesList({
  search,
  onSearchChange,
  onSelect,
}: {
  search: string;
  onSearchChange: (value: string) => void;
  onSelect: (guide: RoleGuide) => void;
}) {
  const filtered = ROLE_GUIDES.filter((g) => g.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex flex-col gap-6 rounded-xl bg-white p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-black">Role Based Guides</p>
        <div className="relative w-full sm:w-80">
          <Search className="absolute top-1/2 left-2 size-4 -translate-y-1/2 text-[rgba(45,24,16,0.5)]" />
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search children, parents…"
            className="h-8 w-full rounded-lg border border-[rgba(45,24,16,0.12)] bg-[#f5edd8] pl-8 font-[family-name:var(--font-urbanist)] text-[10px] text-[#2d1810] placeholder:text-[rgba(45,24,16,0.5)] outline-none"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {filtered.map((guide) => (
          <button
            key={guide.id}
            onClick={() => onSelect(guide)}
            className="flex flex-col gap-2 rounded-[10px] bg-[#fcfcfc] p-3 text-left hover:bg-[#f5edd8]"
          >
            <p className="font-[family-name:var(--font-urbanist)] text-sm font-medium text-black">{guide.title}</p>
            <p className="font-[family-name:var(--font-urbanist)] text-xs text-[#6b7280]">{guide.excerpt}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

function ArticleView({
  guide,
  onBack,
  search,
  onSearchChange,
  onSelect,
}: {
  guide: RoleGuide;
  onBack: () => void;
  search: string;
  onSearchChange: (value: string) => void;
  onSelect: (guide: RoleGuide) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={onBack}
        aria-label="Back"
        className="flex size-8 items-center justify-center rounded-full bg-[#edd9c0] text-[#3b2513]"
      >
        <ArrowLeft className="size-4" />
      </button>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
        <div className="flex-1 overflow-hidden rounded-xl bg-white">
          <div className="flex flex-col items-center gap-6 px-8 py-8 text-center">
            <p className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#1f2937]">{guide.title}</p>
            <p className="font-[family-name:var(--font-urbanist)] text-xs text-[#ba733e]">{guide.publishedOn}</p>
            <p className="max-w-[612px] font-[family-name:var(--font-urbanist)] text-sm text-[#6b7280]">{guide.intro}</p>
          </div>
          <div className="flex flex-col gap-6 px-8 pb-8">
            {guide.sections.map((section, i) => (
              <div key={section.heading} className="flex flex-col gap-2">
                <p className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#1f2937]">{section.heading}</p>
                <p className="font-[family-name:var(--font-urbanist)] text-xs text-[#6b7280]">{section.body}</p>
                {i === 1 && <div className="h-[200px] w-full rounded-md bg-[#d9d9d9]" />}
              </div>
            ))}
          </div>
        </div>
        <div className="w-full shrink-0 lg:w-[340px]">
          <RoleGuidesList search={search} onSearchChange={onSearchChange} onSelect={onSelect} />
        </div>
      </div>
    </div>
  );
}

export function HelpTrainingTab() {
  const [activeGuide, setActiveGuide] = useState<RoleGuide | null>(null);
  const [search, setSearch] = useState("");

  if (activeGuide) {
    return (
      <ArticleView
        guide={activeGuide}
        onBack={() => setActiveGuide(null)}
        search={search}
        onSearchChange={setSearch}
        onSelect={setActiveGuide}
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2d1810]">
        Help &amp; Training
      </h1>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <FaqManagement />
        </div>
        <div className="flex flex-col gap-4">
          <RoleGuidesList search={search} onSearchChange={setSearch} onSelect={setActiveGuide} />
          <AskAdaPanel />
        </div>
      </div>
    </div>
  );
}
