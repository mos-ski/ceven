"use client";

import { useState } from "react";
import { Search, ArrowUpDown, Download, Printer, ChevronLeft, ChevronRight, FileText, X } from "lucide-react";
import { PLATFORM_NOTIFICATIONS, type PlatformNotification } from "@/lib/super-admin/mock-data";
import { exportRowsToCsv } from "@/lib/super-admin/export-csv";

const PAGE_SIZE = 10;

export default function NotificationsPage() {
 const [search, setSearch] = useState("");
 const [page, setPage] = useState(1);
 const [oldestFirst, setOldestFirst] = useState(false);
 const [notifications, setNotifications] = useState(PLATFORM_NOTIFICATIONS);
 const [viewNotification, setViewNotification] = useState<PlatformNotification | null>(null);
 const [composeOpen, setComposeOpen] = useState(false);
 const [newTitle, setNewTitle] = useState("");
 const [newMessage, setNewMessage] = useState("");

 const filtered = notifications.filter(
  (n) => n.title.toLowerCase().includes(search.toLowerCase()) || n.message.toLowerCase().includes(search.toLowerCase())
 );
 const sorted = oldestFirst ? [...filtered].reverse() : filtered;
 const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
 const paginated = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

 const handleExport = () => {
  exportRowsToCsv(
   "notifications.csv",
   ["Date Created", "Title", "Message"],
   sorted.map((n) => [n.time, n.title, n.message])
  );
 };

 const handleSend = () => {
  if (!newTitle.trim() || !newMessage.trim()) return;
  setNotifications((prev) => [
   { id: `not-${Date.now()}`, time: "Just now", title: newTitle.trim(), message: newMessage.trim() },
   ...prev,
  ]);
  setNewTitle("");
  setNewMessage("");
  setComposeOpen(false);
 };

 return (
  <div className="flex flex-col gap-4">
   <div className="flex items-center justify-between">
    <h1 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-heading">
     Notifications
    </h1>
    <button
     type="button"
     onClick={() => setComposeOpen(true)}
     className="rounded-lg bg-brand-dark px-4 py-2 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-white hover:bg-brand-dark/90"
    >
     New Notification
    </button>
   </div>

   <div className="rounded-xl bg-[#F5EDD8]/30 p-4">
    <div className="mb-1 flex items-center gap-2">
     <div className="flex size-8 items-center justify-center rounded-full bg-blue-50">
      <span className="font-[family-name:var(--font-merriweather)] text-sm font-bold text-blue-600">
       {notifications.length}
      </span>
     </div>
     <p className="font-[family-name:var(--font-urbanist)] text-sm font-semibold text-heading">Total Activity Logs</p>
    </div>
   </div>

   <div className="rounded-xl bg-[#F5EDD8]/30">
    <div className="flex flex-wrap items-center gap-3 border-b border-card-border p-4">
     <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-text" />
      <input
       type="search"
       value={search}
       onChange={(e) => { setSearch(e.target.value); setPage(1); }}
       placeholder="Search notifications..."
       className="h-9 w-full rounded-lg border border-input-border bg-white pl-9 pr-3 font-[family-name:var(--font-urbanist)] text-sm placeholder:text-muted-text focus:outline-none focus:ring-2 focus:ring-brand-accent"
      />
     </div>
     <button
      type="button"
      onClick={() => { setOldestFirst((v) => !v); setPage(1); }}
      className="flex h-9 items-center gap-1.5 rounded-lg border border-input-border bg-white px-3 font-[family-name:var(--font-urbanist)] text-sm text-heading"
     >
      <ArrowUpDown className="size-3.5" /> Sort by: {oldestFirst ? "Oldest" : "Most recent"}
     </button>
     <button
      type="button"
      onClick={handleExport}
      className="flex h-9 items-center gap-1.5 rounded-lg border border-input-border bg-white px-3 font-[family-name:var(--font-urbanist)] text-sm text-heading"
     >
      <Download className="size-3.5" /> Export as
     </button>
     <button
      type="button"
      onClick={() => window.print()}
      className="flex h-9 items-center gap-1.5 rounded-lg border border-input-border bg-white px-3 font-[family-name:var(--font-urbanist)] text-sm text-heading"
     >
      <Printer className="size-3.5" /> Print
     </button>
    </div>

    <div className="overflow-x-auto">
     <table className="w-full text-left">
      <thead>
       <tr className="bg-table-header-bg">
        <th className="px-4 py-3 font-[family-name:var(--font-urbanist)] text-xs font-semibold text-white">Date Created</th>
        <th className="px-4 py-3 font-[family-name:var(--font-urbanist)] text-xs font-semibold text-white">Recipients</th>
        <th className="px-4 py-3 font-[family-name:var(--font-urbanist)] text-xs font-semibold text-white">Title</th>
        <th className="px-4 py-3 font-[family-name:var(--font-urbanist)] text-xs font-semibold text-white">Message</th>
        <th className="px-4 py-3 font-[family-name:var(--font-urbanist)] text-xs font-semibold text-white">Action</th>
       </tr>
      </thead>
      <tbody>
       {paginated.length === 0 ? (
        <tr>
         <td colSpan={5} className="px-4 py-16 text-center">
          <div className="flex flex-col items-center gap-2">
           <div className="flex size-12 items-center justify-center rounded-full bg-slate-100">
            <FileText className="size-6 text-slate-400" />
           </div>
           <p className="font-[family-name:var(--font-urbanist)] text-sm font-semibold text-heading">
            No Data Available Yet!
           </p>
          </div>
         </td>
        </tr>
       ) : (
        paginated.map((notification) => (
         <tr key={notification.id} className="border-b border-table-border last:border-0 hover:bg-slate-50">
          <td className="px-4 py-3 font-[family-name:var(--font-urbanist)] text-sm text-heading">{notification.time}</td>
          <td className="px-4 py-3 font-[family-name:var(--font-urbanist)] text-sm text-heading">All</td>
          <td className="px-4 py-3 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-heading">{notification.title}</td>
          <td className="px-4 py-3 font-[family-name:var(--font-urbanist)] text-sm text-muted-text">{notification.message}</td>
          <td className="px-4 py-3">
           <button
            type="button"
            onClick={() => setViewNotification(notification)}
            className="font-[family-name:var(--font-urbanist)] text-sm font-semibold text-brand-accent hover:underline"
           >
            View
           </button>
          </td>
         </tr>
        ))
       )}
      </tbody>
     </table>
    </div>

    <div className="flex items-center justify-between border-t border-card-border px-4 py-3">
     <span className="font-[family-name:var(--font-urbanist)] text-xs text-muted-text">10 per page</span>
     <div className="flex items-center gap-1">
      <button
       type="button"
       onClick={() => setPage((p) => Math.max(1, p - 1))}
       disabled={page === 1}
       className="flex size-8 items-center justify-center rounded-lg border border-card-border text-muted-text hover:bg-slate-50 disabled:opacity-40"
      >
       <ChevronLeft className="size-4" />
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
       <button
        key={p}
        type="button"
        onClick={() => setPage(p)}
        className={`flex size-8 items-center justify-center rounded-lg font-[family-name:var(--font-urbanist)] text-xs font-semibold ${
         p === page ? "bg-brand-dark text-white" : "border border-card-border text-heading hover:bg-slate-50"
        }`}
       >
        {p}
       </button>
      ))}
      <button
       type="button"
       onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
       disabled={page === totalPages}
       className="flex size-8 items-center justify-center rounded-lg border border-card-border text-muted-text hover:bg-slate-50 disabled:opacity-40"
      >
       <ChevronRight className="size-4" />
      </button>
     </div>
    </div>
   </div>

   {viewNotification && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
     <div className="relative w-full max-w-md rounded-xl bg-white p-6 ">
      <button
       type="button"
       onClick={() => setViewNotification(null)}
       className="absolute right-3 top-3 text-muted-text hover:text-heading"
      >
       <X className="size-5" />
      </button>
      <p className="mb-1 font-[family-name:var(--font-urbanist)] text-xs text-muted-text">{viewNotification.time}</p>
      <h3 className="mb-3 font-[family-name:var(--font-merriweather)] text-lg font-bold text-heading">
       {viewNotification.title}
      </h3>
      <p className="font-[family-name:var(--font-urbanist)] text-sm text-heading">{viewNotification.message}</p>
     </div>
    </div>
   )}

   {composeOpen && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
     <div className="relative w-full max-w-md rounded-xl bg-white p-6 ">
      <button
       type="button"
       onClick={() => setComposeOpen(false)}
       className="absolute right-3 top-3 text-muted-text hover:text-heading"
      >
       <X className="size-5" />
      </button>
      <h3 className="mb-4 font-[family-name:var(--font-merriweather)] text-lg font-bold text-heading">
       New Notification
      </h3>
      <div className="mb-4">
       <label className="mb-1 block font-[family-name:var(--font-urbanist)] text-sm font-semibold text-heading">
        Title
       </label>
       <input
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        placeholder="Notification title"
        className="w-full rounded-lg border border-input-border p-3 font-[family-name:var(--font-urbanist)] text-sm text-heading placeholder:text-muted-text focus:outline-none focus:ring-2 focus:ring-brand-accent"
       />
      </div>
      <div className="mb-4">
       <label className="mb-1 block font-[family-name:var(--font-urbanist)] text-sm font-semibold text-heading">
        Message
       </label>
       <textarea
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Write the notification message"
        rows={4}
        className="w-full rounded-lg border border-input-border p-3 font-[family-name:var(--font-urbanist)] text-sm text-heading placeholder:text-muted-text focus:outline-none focus:ring-2 focus:ring-brand-accent"
       />
      </div>
      <div className="flex justify-end gap-2">
       <button
        type="button"
        onClick={() => setComposeOpen(false)}
        className="rounded-lg border border-card-border px-4 py-2 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-heading hover:bg-slate-50"
       >
        Cancel
       </button>
       <button
        type="button"
        onClick={handleSend}
        disabled={!newTitle.trim() || !newMessage.trim()}
        className="rounded-lg bg-brand-dark px-4 py-2 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-white hover:bg-brand-dark/90 disabled:opacity-40"
       >
        Send
       </button>
      </div>
     </div>
    </div>
   )}
  </div>
 );
}
