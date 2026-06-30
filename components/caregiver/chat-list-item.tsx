import Link from "next/link";
import type { ChatThread } from "@/lib/caregiver/mock-data";

type Props = { thread: ChatThread };

export function ChatListItem({ thread }: Props) {
  return (
    <Link href={`/caregiver/chat/${thread.id}`}>
      <div className="flex items-center gap-3 px-4 py-3 active:bg-gray-50">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-300 text-sm font-bold text-white">
          {thread.contact.avatarInitials}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-cg-brand">{thread.contact.name}</p>
          <p className="truncate text-xs text-gray-400">{thread.lastMessage}</p>
        </div>
        <span className="shrink-0 text-xs text-gray-400">{thread.lastMessageTime}</span>
      </div>
    </Link>
  );
}
