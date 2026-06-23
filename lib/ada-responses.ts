// Lightweight canned-response matcher for Ada chat simulators across the app.
// Not a real AI integration — keyword-matches the user's message to a plausible reply.

const RULES: { keywords: string[]; reply: string }[] = [
  {
    keywords: ["absen", "attendance", "checked in", "present"],
    reply:
      "Today's attendance: 40 checked in, 7 absent. Zara Mohammed has been absent 3× this week and has a nut allergy on file — I'd recommend a welfare check.",
  },
  {
    keywords: ["invoice", "overdue", "payment", "owe", "fee"],
    reply:
      "3 invoices are 7+ days overdue, totalling ₦190,000. Mr Okafor has historically paid late in Q2 — want me to send an auto-reminder to the affected families?",
  },
  {
    keywords: ["welfare", "incident", "health", "flag", "allerg"],
    reply:
      "There are 2 open health & welfare flags this week, both already logged with caregivers notified. I'll keep monitoring and escalate if either goes unresolved past 4 hours.",
  },
  {
    keywords: ["compliance", "logging", "staff", "caregiver"],
    reply:
      "Lion Class caregiver logging compliance is at 62% this week, below the 80% target. I can draft a reminder to the Lion Class team — just say the word.",
  },
  {
    keywords: ["report", "summary", "summarise", "summarize"],
    reply:
      "Here's today's summary: 3 children flagged for follow-up, 2 invoices overdue, and Lion Class logging compliance is below target. Want this as a downloadable report?",
  },
  {
    keywords: ["draft", "reminder", "send", "message"],
    reply:
      'Done! Here\'s a draft: "Hi team, please ensure all activities and meals are logged before end of day — compliance this week is below target. Thank you!" Want me to send this now?',
  },
];

const FALLBACK_REPLIES = [
  "Got it — I've noted that. Is there anything specific from today's brief you'd like me to dig into?",
  "I'll keep an eye on that. Let me know if you'd like a full report generated.",
  "Understood. I can pull more detail on attendance, finance, or staff compliance if that helps.",
];

export function getAdaReply(message: string): string {
  const lower = message.toLowerCase();
  for (const rule of RULES) {
    if (rule.keywords.some((k) => lower.includes(k))) return rule.reply;
  }
  return FALLBACK_REPLIES[Math.floor(Math.random() * FALLBACK_REPLIES.length)];
}
