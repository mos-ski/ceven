"use client";

import { CheckCircle2 } from "lucide-react";

import { Dialog, DialogContent } from "@/components/ui/dialog";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  heading: string;
  description: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
};

export function SuccessModal({
  open,
  onOpenChange,
  heading,
  description,
  buttonLabel = "Done",
  onButtonClick,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[492px]" showCloseButton={false}>
        <div className="flex flex-col items-center px-8 pt-10 pb-8 text-center">
          <div className="mb-6 flex size-[88px] items-center justify-center rounded-full bg-[#e1f5ec]">
            <div className="flex size-[72px] items-center justify-center rounded-full bg-[#009061]">
              <CheckCircle2 className="size-9 text-white" strokeWidth={1.5} />
            </div>
          </div>
          <h2 className="font-[family-name:var(--font-merriweather)] text-xl font-bold text-[#2d1810]">
            {heading}
          </h2>
          <p className="mt-2 font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
            {description}
          </p>
          <button
            onClick={() => {
              onButtonClick?.();
              onOpenChange(false);
            }}
            className="mt-7 h-[52px] w-full max-w-[240px] rounded-lg bg-[#3b2513] font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#faf2e1] hover:bg-[#2d1810]"
          >
            {buttonLabel}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
