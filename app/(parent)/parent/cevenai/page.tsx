"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, Mic, Send, ThumbsUp, ThumbsDown, Copy, RefreshCw,
  Sparkles, Crown, CheckCircle2, X, CreditCard, ChevronRight,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Message = {
  id: string;
  role: "user" | "ai";
  content: string;
};

// ─── Static data ──────────────────────────────────────────────────────────────

const SUGGESTED_PROMPTS = [
  { icon: "📄", text: "Summarize today's report" },
  { icon: "↗", text: "Any health patterns this week?" },
  { icon: "😊", text: "How was my child's mood?" },
  { icon: "📖", text: "What learning activity was done?" },
];

const MOCK_REPLY =
  "Of course! As an AI language model, I am designed to assist with a variety of tasks. Here are some examples of what I can do:\n• Answer questions: Just ask me anything you like!\n• Generate text: I can write stories, poems, or summaries for you.";

const PLANS = [
  {
    id: "free",
    name: "Free",
    price: "₦0",
    period: "forever",
    features: ["5 AI queries per day", "Basic daily summaries", "Standard support"],
    highlight: false,
  },
  {
    id: "premium",
    name: "Premium Monthly",
    price: "₦2,500",
    period: "per month",
    features: ["Unlimited AI queries", "Advanced health insights", "Weekly trend analysis", "Priority support", "Early feature access"],
    highlight: true,
  },
];

// ─── Pricing Modal ────────────────────────────────────────────────────────────

function PricingModal({
  onClose,
  onSelect,
}: {
  onClose: () => void;
  onSelect: (plan: typeof PLANS[number]) => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50">
      <div className="w-full max-w-[430px] rounded-t-3xl bg-[#FAF5EE] pb-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Choose a Plan</h2>
            <p className="mt-0.5 text-xs text-gray-500">Unlock the full power of CEvenAI</p>
          </div>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
            <X size={16} className="text-gray-600" />
          </button>
        </div>

        {/* Plan cards */}
        <div className="space-y-3 px-6">
          {PLANS.map((plan) => (
            <button
              key={plan.id}
              onClick={() => onSelect(plan)}
              className={`w-full rounded-2xl p-4 text-left transition-all ${
                plan.highlight
                  ? "bg-[#3B2513] shadow-lg"
                  : "bg-white border border-gray-200"
              }`}
            >
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {plan.highlight && <Crown size={16} className="text-amber-400" />}
                  <span className={`text-base font-bold ${plan.highlight ? "text-white" : "text-gray-800"}`}>
                    {plan.name}
                  </span>
                </div>
                {plan.highlight && (
                  <span className="rounded-full bg-amber-400 px-2.5 py-0.5 text-[10px] font-bold text-[#3B2513]">
                    POPULAR
                  </span>
                )}
              </div>

              <div className="mb-3 flex items-baseline gap-1">
                <span className={`text-2xl font-bold ${plan.highlight ? "text-amber-400" : "text-cg-brand"}`}>
                  {plan.price}
                </span>
                <span className={`text-xs ${plan.highlight ? "text-white/60" : "text-gray-400"}`}>
                  {plan.period}
                </span>
              </div>

              <ul className="space-y-1.5">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-2">
                    <CheckCircle2
                      size={13}
                      className={plan.highlight ? "text-amber-400 shrink-0" : "text-green-500 shrink-0"}
                    />
                    <span className={`text-xs ${plan.highlight ? "text-white/80" : "text-gray-600"}`}>
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>

              <div className={`mt-3 flex items-center justify-center gap-1 rounded-xl py-2 text-sm font-semibold ${
                plan.highlight ? "bg-amber-400 text-[#3B2513]" : "bg-gray-100 text-gray-600"
              }`}>
                {plan.highlight ? "Get Premium" : "Continue Free"}
                <ChevronRight size={14} />
              </div>
            </button>
          ))}
        </div>

        <p className="mt-4 px-6 text-center text-[10px] text-gray-400">
          Cancel anytime. Billed monthly. No hidden fees.
        </p>
      </div>
    </div>
  );
}

// ─── Payment Modal ─────────────────────────────────────────────────────────────

function PaymentModal({
  plan,
  onClose,
  onSuccess,
}: {
  plan: typeof PLANS[number];
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [loading, setLoading] = useState(false);

  function handlePay() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 1800);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50">
      <div className="w-full max-w-[430px] rounded-t-3xl bg-white pb-8">
        <div className="flex items-center justify-between px-6 py-5">
          <h2 className="text-lg font-bold text-gray-800">Payment</h2>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
            <X size={16} className="text-gray-600" />
          </button>
        </div>

        {/* Order summary */}
        <div className="mx-6 mb-5 rounded-2xl bg-[#F9F5EE] p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-800">{plan.name}</p>
              <p className="text-xs text-gray-500">{plan.period}</p>
            </div>
            <p className="text-lg font-bold text-cg-brand">{plan.price}</p>
          </div>
        </div>

        {/* Payment method */}
        <div className="px-6">
          <p className="mb-3 text-sm font-semibold text-gray-700">Payment Method</p>

          <div className="mb-4 flex items-center gap-3 rounded-2xl border border-cg-brand bg-[#F9F5EE] px-4 py-3.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
              <CreditCard size={18} className="text-cg-brand" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-800">Paystack</p>
              <p className="text-xs text-gray-500">Secure card & bank payment</p>
            </div>
            <div className="h-4 w-4 rounded-full border-2 border-cg-brand bg-cg-brand" />
          </div>

          <div className="mb-4 rounded-xl bg-amber-50 px-4 py-2.5">
            <p className="text-xs text-amber-700">
              🎉 7-day free trial included. You won&apos;t be charged until the trial ends.
            </p>
          </div>

          <button
            onClick={handlePay}
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-cg-brand py-3.5 text-sm font-semibold text-[#FAF2E1] disabled:opacity-70"
          >
            {loading ? (
              <>
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="15 45" />
                </svg>
                Processing...
              </>
            ) : (
              `Start Free Trial · ${plan.price}/mo`
            )}
          </button>
        </div>

        <p className="mt-4 px-6 text-center text-[10px] text-gray-400">
          By continuing you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}

// ─── Payment Success Modal ─────────────────────────────────────────────────────

function SuccessModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-6">
      <div className="w-full max-w-[327px] rounded-3xl bg-white px-6 py-8">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-400">
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-green-50">
            <CheckCircle2 size={52} className="text-green-500" />
          </div>
          <h2 className="mb-2 text-xl font-bold text-gray-800">Payment Successful!</h2>
          <p className="mb-1 text-sm text-gray-500">Your premium access has been activated.</p>
          <p className="mb-6 text-xs text-gray-400">7-day free trial starts today. Enjoy unlimited CEvenAI.</p>

          <button
            onClick={onClose}
            className="w-full rounded-xl bg-cg-brand py-3 text-sm font-semibold text-[#FAF2E1]"
          >
            Start Chatting
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function CEvenAIPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<typeof PLANS[number] | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  function handleSend(text?: string) {
    const content = text ?? input.trim();
    if (!content) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", content };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: MOCK_REPLY,
      }]);
    }, 1500);
  }

  function handleSelectPlan(plan: typeof PLANS[number]) {
    if (plan.id === "free") {
      setShowPricing(false);
      return;
    }
    setShowPricing(false);
    setSelectedPlan(plan);
  }

  const isEmpty = messages.length === 0 && !isTyping;

  return (
    <div className="flex flex-1 flex-col bg-[#fffefa]">
      {/* Header */}
      <div className="shrink-0 flex items-center px-6 pt-4 pb-3">
        <button
          onClick={() => router.back()}
          className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-gray-200 bg-[#f4f5f6]"
        >
          <ArrowLeft size={16} className="text-gray-700" />
        </button>

        <div className="flex flex-1 items-center justify-center gap-2">
          <Sparkles size={22} className="text-cg-brand" />
          <h1 className="text-lg font-bold text-gray-800">CEvenAI</h1>
        </div>

        <button
          onClick={() => setShowPricing(true)}
          className="flex items-center gap-1.5 rounded-xl bg-amber-50 px-3 py-1.5"
        >
          <Crown size={14} className="text-amber-600" />
          <span className="text-xs font-semibold text-amber-700">Upgrade</span>
        </button>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto px-6 pb-4">
        {isEmpty ? (
          <div className="flex h-full flex-col">
            {/* Hero */}
            <div className="flex flex-1 flex-col items-center justify-center text-center">
              <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-[#F3EDE5]">
                <Sparkles size={30} className="text-cg-brand" />
              </div>
              <h2 className="mb-1 text-base font-bold text-gray-800">Hi! I&apos;m CEvenAI</h2>
              <p className="max-w-[220px] text-xs text-gray-500">
                Ask me about your child&apos;s day, health patterns, or activities.
              </p>
            </div>

            {/* Suggested prompts */}
            <div className="space-y-2 pb-2">
              {SUGGESTED_PROMPTS.map((p) => (
                <button
                  key={p.text}
                  onClick={() => handleSend(p.text)}
                  className="flex w-full items-center gap-2 rounded-xl bg-[#F3EDE5] px-4 py-3 text-left text-sm text-cg-brand"
                >
                  <span>{p.icon}</span>
                  <span>{p.text}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3 py-2">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "user" ? (
                  <div className="max-w-[78%] rounded-2xl bg-cg-brand px-4 py-3 text-sm text-white">
                    {msg.content}
                  </div>
                ) : (
                  <div className="max-w-[88%]">
                    <div className="mb-1 flex items-center gap-1.5">
                      <Sparkles size={14} className="text-cg-brand" />
                    </div>
                    <div className="rounded-2xl bg-white px-4 py-3 text-sm text-gray-700 shadow-sm">
                      {msg.content.split("\n").map((line, i) => (
                        <p key={i} className={i > 0 ? "mt-1" : ""}>{line}</p>
                      ))}
                    </div>
                    <div className="mt-1.5 flex items-center gap-3">
                      <button className="text-gray-300 hover:text-gray-500"><ThumbsUp size={14} /></button>
                      <button className="text-gray-300 hover:text-gray-500"><ThumbsDown size={14} /></button>
                      <button className="text-gray-300 hover:text-gray-500"><Copy size={14} /></button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-cg-brand" />
                <div className="flex items-center gap-1 rounded-2xl bg-white px-4 py-3 shadow-sm">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:0ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:150ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:300ms]" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* Input bar */}
      <div className="shrink-0 bg-white px-6 pb-safe pt-4 shadow-[0px_-4px_12px_4px_rgba(46,46,46,0.04)]">
        <div className="flex items-center gap-3 pb-4">
          {messages.length > 0 && (
            <button
              onClick={() => setMessages([])}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100"
            >
              <RefreshCw size={14} className="text-gray-500" />
            </button>
          )}
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            placeholder="Ask me anything..."
            className="flex-1 rounded-xl bg-[#f4f5f6] px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none"
          />
          <button
            onClick={() => handleSend()}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cg-accent-muted"
          >
            <Send size={14} className="text-cg-brand" />
          </button>
          <button className="shrink-0">
            <Mic size={22} className="text-gray-500" />
          </button>
        </div>
      </div>

      {/* Modals */}
      {showPricing && (
        <PricingModal
          onClose={() => setShowPricing(false)}
          onSelect={handleSelectPlan}
        />
      )}
      {selectedPlan && (
        <PaymentModal
          plan={selectedPlan}
          onClose={() => setSelectedPlan(null)}
          onSuccess={() => { setSelectedPlan(null); setShowSuccess(true); }}
        />
      )}
      {showSuccess && (
        <SuccessModal onClose={() => setShowSuccess(false)} />
      )}
    </div>
  );
}
