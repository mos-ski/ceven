"use client";

import { ArrowLeft, ArrowUp, Search } from "lucide-react";
import { useState } from "react";

import {
  ADA_SUGGESTED_PROMPTS,
  FAQ_ITEMS,
  ROLE_GUIDES,
  SETUP_PROGRESS_ITEMS,
  SETUP_PROGRESS_PERCENT,
  type RoleGuide,
} from "@/lib/mock-data/account-setup";

const gradientBg = "linear-gradient(135deg, rgb(30,45,74) 0%, rgb(45,24,16) 100%)";

function SetupProgressCard() {
  return (
    <div className="flex flex-col gap-3 rounded-xl bg-white p-4">
      <p className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">
        Set-up Progress
      </p>
      <div className="flex flex-col gap-2">
        <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">
          Progress {SETUP_PROGRESS_PERCENT}% complete
        </p>
        <div className="h-1.5 w-full rounded-full bg-[#f5f5f5]">
          <div className="h-full rounded-full bg-[#008753]" style={{ width: `${SETUP_PROGRESS_PERCENT}%` }} />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {SETUP_PROGRESS_ITEMS.map((item) => (
          <div key={item.id} className="flex items-center gap-4 rounded-[10px] border border-[#edd9c0] bg-[#faf2e1] p-4">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-[#edd9c0] font-[family-name:var(--font-nunito)] text-xs font-medium text-[#1f2937]">
              {item.step}
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <p className="font-[family-name:var(--font-nunito)] text-sm font-medium text-black">{item.title}</p>
              <p className="font-[family-name:var(--font-urbanist)] text-[10px] text-[#6b7280]">{item.description}</p>
            </div>
            {item.done && <span className="text-xs font-semibold text-[#008753]">✓</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

function FaqAccordion() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white p-5">
      <p className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-black">
        Frequently Asked Questions
      </p>
      <div className="flex flex-col gap-3">
        {FAQ_ITEMS.map((item) => {
          const isOpen = openId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="flex flex-col gap-2 border-b border-[#e6ebf3] pb-4 text-left last:border-0 last:pb-0"
            >
              <p className="font-[family-name:var(--font-nunito)] text-sm font-medium text-black">{item.question}</p>
              {isOpen && item.answer && (
                <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">{item.answer}</p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function AskAdaPanel() {
  const [input, setInput] = useState("");

  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border-l-[3px] border-[rgba(45,24,16,0.1)] bg-[#fffcf4]">
      <div className="flex shrink-0 flex-col gap-1.5 border-b border-[rgba(45,24,16,0.07)] px-5 py-3.5">
        <div className="flex items-center gap-1">
          <span className="size-1.5 rounded-full bg-[#c47b2c]" />
          <span className="font-[family-name:var(--font-nunito)] text-xs font-bold tracking-[0.84px] text-[#2d1810] uppercase">
            Ask ADA
          </span>
        </div>
        <div className="flex items-center gap-1 font-[family-name:var(--font-nunito)] text-[10px]">
          <span className="text-[rgba(45,24,16,0.5)]">Professional &amp; Warm</span>
          <button className="text-[#1f3345] underline">Personalize</button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        <div className="flex items-start justify-end gap-2">
          <div className="max-w-[268px] rounded-tl-[10px] rounded-tr-[10px] rounded-br-[10px] rounded-bl-[2px] border border-[rgba(45,24,16,0.12)] bg-[#fdf6e8] p-3">
            <p className="font-[family-name:var(--font-nunito)] text-xs font-medium text-[#2d1810]">
              How do i generate report that i can send to parents at the end of each day
            </p>
          </div>
          <div
            className="flex size-6 shrink-0 items-center justify-center rounded-xl text-xs font-bold text-white"
            style={{ background: gradientBg }}
          >
            ✦
          </div>
        </div>
      </div>

      <div className="flex shrink-0 flex-col gap-3 border-t border-[rgba(45,24,16,0.07)] px-5 py-3">
        <div className="flex flex-wrap gap-1">
          {ADA_SUGGESTED_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => setInput(prompt)}
              className="rounded-full border border-[rgba(45,24,16,0.12)] bg-[#f5edd8] px-3 py-1.5 font-[family-name:var(--font-nunito)] text-[10px] text-[rgba(45,24,16,0.5)]"
            >
              {prompt}
            </button>
          ))}
        </div>
        <div className="relative">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Ada anything…"
            className="h-10 w-full rounded-[10px] border border-[rgba(45,24,16,0.12)] bg-[#f5edd8] px-3 pr-12 font-[family-name:var(--font-nunito)] text-xs font-medium text-[#2d1810] placeholder:text-[rgba(45,24,16,0.5)] outline-none"
          />
          <button
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
            className="h-8 w-full rounded-lg border border-[rgba(45,24,16,0.12)] bg-[#f5edd8] pl-8 font-[family-name:var(--font-nunito)] text-[10px] text-[#2d1810] placeholder:text-[rgba(45,24,16,0.5)] outline-none"
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
            <p className="font-[family-name:var(--font-nunito)] text-sm font-medium text-black">{guide.title}</p>
            <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">{guide.excerpt}</p>
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
          <SetupProgressCard />
          <FaqAccordion />
        </div>
        <div className="flex flex-col gap-4">
          <RoleGuidesList search={search} onSearchChange={setSearch} onSelect={setActiveGuide} />
          <AskAdaPanel />
        </div>
      </div>
    </div>
  );
}
