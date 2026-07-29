"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const snackbarVariants = cva(
  "inline-flex items-center justify-between gap-3 rounded-[8px] px-4 py-2 text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        success: "bg-[#009061] text-white",
        default: "bg-[#3D3D3D] text-white",
        tan: "bg-[#E0BFA0] text-brand-dark",
        "light-success": "bg-[#E1F5EC] text-[#009061]",
        "light-danger": "bg-[#FDE8E8] text-[#CD3030]",
        info: "bg-[#EFF6FF] text-[#3B82F6]",
        warning: "bg-[#F9F1E6] text-[#FF9A01]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface SnackbarProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof snackbarVariants> {
  onClose?: () => void
  showCloseButton?: boolean
}

function Snackbar({
  className,
  variant = "default",
  onClose,
  showCloseButton = true,
  children,
  ...props
}: SnackbarProps) {
  return (
    <div
      data-slot="snackbar"
      className={cn(snackbarVariants({ variant }), className)}
      role="alert"
      {...props}
    >
      <span>{children}</span>
      {showCloseButton && (
        <button
          type="button"
          onClick={onClose}
          className={cn(
            "flex size-6 shrink-0 items-center justify-center rounded-full transition-opacity hover:opacity-80",
            variant === "success" || variant === "default"
              ? "text-white/80 hover:text-white"
              : "text-current/60 hover:text-current"
          )}
          aria-label="Close"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  )
}

export { Snackbar, snackbarVariants, type SnackbarProps }
