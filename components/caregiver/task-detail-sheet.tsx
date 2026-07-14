"use client";

import { useState, useRef, useEffect } from "react";
import { X, Upload, FileText } from "lucide-react";
import type { Task } from "@/lib/caregiver/mock-data";

type Props = {
  task: Task | null;
  onClose: () => void;
  onMarkDone: (id: string) => void;
  onMarkUndone: (id: string) => void;
};

function StatusBadge({ status }: { status: Task["status"] }) {
  if (status === "completed")
    return <span className="rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white">Completed</span>;
  if (status === "undone")
    return <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">Undone</span>;
  return <span className="rounded-full bg-gray-200 px-3 py-1 text-xs font-medium text-gray-500">Pending</span>;
}

const ROW = "flex items-start gap-4 border-b border-gray-100 py-3 last:border-0";
const LBL = "w-32 shrink-0 text-sm text-gray-400";
const VAL = "flex-1 text-sm font-medium leading-relaxed text-cg-brand";

export function TaskDetailSheet({ task, onClose, onMarkDone, onMarkUndone }: Props) {
  const [step, setStep] = useState<"info" | "treat">("info");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [success, setSuccess] = useState<"done" | "undone" | null>(null);
  const [showImages, setShowImages] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (task) { setStep("info"); setAdditionalInfo(""); setUploadedFile(null); setSuccess(null); }
  }, [task]);

  if (!task) return null;

  function handleDone() {
    onMarkDone(task!.id);
    setSuccess("done");
  }

  function handleUndone() {
    onMarkUndone(task!.id);
    setSuccess("undone");
  }

  function handleSuccessClose() {
    setSuccess(null);
    onClose();
  }

  return (
    <>
      {/* Backdrop */}
      <div className="absolute inset-0 z-40 bg-black/50" onClick={onClose} />

      {/* Sheet */}
      <div className="absolute inset-x-0 bottom-0 z-50 max-h-[85%] overflow-y-auto rounded-t-3xl bg-white">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h3 className="text-base font-bold text-cg-brand">Task Details</h3>
          <button
            onClick={() => { onClose(); }}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100"
          >
            <X size={14} className="text-gray-500" />
          </button>
        </div>

        {/* Step 1 — Info */}
        {step === "info" && (
          <div className="px-5 pb-8 pt-3">
            <div className={ROW}><span className={LBL}>Task Title</span><span className={VAL}>{task.title}</span></div>
            <div className={ROW}><span className={LBL}>Description</span><span className={VAL}>{task.description}</span></div>
            <div className={ROW}><span className={LBL}>Scheduled Time</span><span className={VAL}>{task.dueTime}</span></div>
            <div className={ROW}><span className={LBL}>Reminder Time</span><span className={VAL}>{task.reminderTime}</span></div>
            <div className={ROW}>
              <span className={LBL}>Status</span>
              <StatusBadge status={task.status} />
            </div>
            <div className={ROW}><span className={LBL}>Additional Comment</span><span className={VAL}>–</span></div>
            {task.status !== "pending" && (
              <div className={ROW}>
                <span className={LBL}>Image Upload</span>
                {task.status === "completed" ? (
                  <button onClick={() => setShowImages(true)} className="flex-1 text-left text-sm font-medium underline text-cg-brand">
                    View Images
                  </button>
                ) : (
                  <span className={VAL}>–</span>
                )}
              </div>
            )}

            {task.status === "pending" && (
              <button
                onClick={() => setStep("treat")}
                className="mt-6 w-full rounded-2xl bg-cg-brand py-4 text-sm font-semibold text-white"
              >
                Proceed to Treat
              </button>
            )}
          </div>
        )}

        {/* Step 2 — Treat */}
        {step === "treat" && (
          <div className="flex flex-col gap-4 px-5 pb-8 pt-4">
            <div>
              <p className="mb-2 text-sm font-medium text-gray-700">Additional Information</p>
              <textarea
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                placeholder="Additional information can be added here..."
                rows={4}
                className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm placeholder:text-gray-300 focus:border-cg-accent focus:outline-none"
              />
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-gray-700">Image Upload</p>
              <input ref={fileRef} type="file" accept=".png,.jpg,.jpeg" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) setUploadedFile(f.name); }} />
              {!uploadedFile ? (
                <button
                  onClick={() => fileRef.current?.click()}
                  className="flex w-full flex-col items-center gap-2 rounded-xl border border-dashed border-gray-200 bg-gray-50 py-6"
                >
                  <Upload size={20} className="text-gray-400" />
                  <p className="text-xs text-gray-500"><span className="font-semibold text-cg-brand">Tap to upload</span> or drag and drop</p>
                  <p className="text-xs text-gray-400">PNG or JPG (max. 5mb)</p>
                </button>
              ) : (
                <div>
                  <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                      <FileText size={16} className="text-gray-500" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="truncate text-xs font-medium text-cg-brand">{uploadedFile}</p>
                        <div className="ml-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cg-brand">
                          <svg viewBox="0 0 10 8" className="h-2.5 w-2.5"><path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </div>
                      </div>
                      <p className="text-[10px] text-gray-400">650 KB</p>
                      <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-gray-100">
                        <div className="h-full w-full rounded-full bg-cg-brand" />
                      </div>
                    </div>
                    <span className="ml-2 shrink-0 text-xs text-gray-500">100%</span>
                  </div>
                  <button onClick={() => fileRef.current?.click()} className="mt-2 flex items-center gap-1.5 text-xs text-gray-500">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full border border-gray-400 text-gray-400 text-[10px]">+</span>
                    Add more photos
                  </button>
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={handleUndone} className="flex-1 rounded-xl bg-red-500 py-3.5 text-sm font-semibold text-white">Undone</button>
              <button onClick={handleDone} className="flex-1 rounded-xl bg-green-700 py-3.5 text-sm font-semibold text-white">Done</button>
            </div>
          </div>
        )}
      </div>

      {/* Success modal */}
      {success && (
        <>
          <div className="absolute inset-0 z-[60] bg-black/50" />
          <div className="absolute inset-x-6 top-1/2 z-[70] -translate-y-1/2 rounded-3xl bg-white p-6">
            <button onClick={handleSuccessClose} className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-gray-100">
              <X size={14} className="text-gray-500" />
            </button>
            <div className="flex flex-col items-center gap-2 py-10">
              <p className="text-xl font-bold text-cg-brand" style={{ fontFamily: "var(--font-merriweather)" }}>Success</p>
              <p className="text-center text-sm text-gray-500">
                {success === "done" ? "Task successfully marked as done." : "Task successfully marked as undone."}
              </p>
            </div>
          </div>
        </>
      )}

      {/* Images viewer */}
      {showImages && (
        <>
          <div className="absolute inset-0 z-[60] bg-black/50" onClick={() => setShowImages(false)} />
          <div className="absolute inset-x-6 top-1/2 z-[70] -translate-y-1/2 overflow-hidden rounded-3xl bg-white">
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <h3 className="text-base font-bold text-cg-brand">Images</h3>
              <button onClick={() => setShowImages(false)} className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100">
                <X size={14} className="text-gray-500" />
              </button>
            </div>
            <div className="p-4">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gray-200">
                <img
                  src={task.images?.[0] ?? "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=900&q=80"}
                  alt="Task evidence"
                  className="h-full w-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              </div>
              <div className="mt-3 flex justify-center gap-1.5">
                <span className="h-1.5 w-4 rounded-full bg-cg-brand" />
                <span className="h-1.5 w-1.5 rounded-full bg-gray-200" />
                <span className="h-1.5 w-1.5 rounded-full bg-gray-200" />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
