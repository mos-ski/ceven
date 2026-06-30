import type { Message } from "@/lib/caregiver/mock-data";

type Props = { message: Message };

export function MessageBubble({ message }: Props) {
  const isSent = message.direction === "sent";

  return (
    <div className={`flex ${isSent ? "justify-end" : "justify-start"} mb-3`}>
      <div className={`max-w-[75%] ${isSent ? "items-end" : "items-start"} flex flex-col gap-1`}>
        <div
          className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
            isSent
              ? "rounded-tr-sm bg-cg-sent-bubble text-white"
              : "rounded-tl-sm bg-white text-cg-brand shadow-sm"
          }`}
        >
          {message.body}
        </div>
        <div className={`flex items-center gap-1 ${isSent ? "flex-row-reverse" : ""}`}>
          <span className="text-[10px] text-gray-400">{message.sentAt}</span>
          {isSent && (
            <span className="text-[10px] text-blue-400">✓✓</span>
          )}
        </div>
      </div>
    </div>
  );
}
