"use client"

import type { CSSProperties } from "react"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"
import { cn } from "@/lib/utils"

const Toaster = ({ className, style, toastOptions, ...props }: ToasterProps) => {
 return (
  <Sonner
   theme="light"
   position="top-center"
   closeButton
   richColors
   className={cn("toaster group", className)}
   icons={{
    success: (
     <CircleCheckIcon className="size-5" />
    ),
    info: (
     <InfoIcon className="size-5" />
    ),
    warning: (
     <TriangleAlertIcon className="size-5" />
    ),
    error: (
     <OctagonXIcon className="size-5" />
    ),
    loading: (
     <Loader2Icon className="size-5 animate-spin" />
    ),
   }}
   style={
    {
     "--width": "min(420px, calc(100vw - 32px))",
     "--normal-bg": "#2D1810",
     "--normal-text": "#FAF2E1",
     "--normal-border": "#9A6033",
     "--success-bg": "#002F18",
     "--success-border": "#007A45",
     "--success-text": "#63FFAA",
     "--info-bg": "#061E45",
     "--info-border": "#2563EB",
     "--info-text": "#93C5FD",
     "--warning-bg": "#3B2403",
     "--warning-border": "#D97706",
     "--warning-text": "#FBBF24",
     "--error-bg": "#3B0808",
     "--error-border": "#CD3030",
     "--error-text": "#FCA5A5",
     "--border-radius": "8px",
     ...style,
    } as CSSProperties
   }
   toastOptions={{
    ...toastOptions,
    classNames: {
     toast: "cn-toast min-h-16 rounded-[8px] border px-5 py-4 shadow-[0_14px_28px_rgba(0,0,0,0.14)]",
     title: "font-[family-name:var(--font-urbanist)] text-lg font-semibold leading-none",
     description: "font-[family-name:var(--font-urbanist)] text-sm opacity-80",
     icon: "mr-2 text-current",
     closeButton: "size-7 border-current bg-inherit text-current shadow-none hover:bg-inherit hover:opacity-80",
     actionButton: "rounded-[8px] bg-white/20 text-white hover:bg-white/30",
     cancelButton: "rounded-[8px] bg-white/15 text-white hover:bg-white/25",
     success: "border-[#007A45] bg-[#002F18] text-[#63FFAA]",
     info: "border-[#2563EB] bg-[#061E45] text-[#93C5FD]",
     warning: "border-[#D97706] bg-[#3B2403] text-[#FBBF24]",
     error: "border-[#CD3030] bg-[#3B0808] text-[#FCA5A5]",
     loading: "border-[#9A6033] bg-[#2D1810] text-[#FAF2E1]",
     default: "border-[#9A6033] bg-[#2D1810] text-[#FAF2E1]",
     ...toastOptions?.classNames,
    },
   }}
   {...props}
  />
 )
}

export { Toaster }
