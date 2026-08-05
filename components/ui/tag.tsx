"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const tagVariants = cva(
 "inline-flex items-center gap-1 border px-2 py-0.5 text-xs font-medium transition-colors select-none",
 {
  variants: {
   variant: {
    default: "border-border bg-muted text-muted-foreground",
    brand: "border-button-primary-border bg-button-primary-bg/20 text-brand-dark",
    success: "border-success/20 bg-success-light text-success",
    warning: "border-warning/20 bg-warning-light text-warning",
    danger: "border-danger/20 bg-danger-light text-danger",
    info: "border-info/20 bg-info-light text-info",
   },
  },
  defaultVariants: {
   variant: "default",
  },
 }
)

interface TagProps
 extends React.ComponentProps<"span">,
  VariantProps<typeof tagVariants> {
 removable?: boolean
 onRemove?: () => void
}

function Tag({
 className,
 variant = "default",
 removable = false,
 onRemove,
 children,
 ...props
}: TagProps) {
 return (
  <span
   data-slot="tag"
   className={cn(tagVariants({ variant }), className)}
   {...props}
  >
   {children}
   {removable && (
    <button
     type="button"
     onClick={onRemove}
     className="ml-0.5 inline-flex size-3.5 items-center justify-center rounded-sm hover:bg-foreground/10 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring"
     aria-label="Remove"
    >
     <X className="size-3" />
    </button>
   )}
  </span>
 )
}

export { Tag, tagVariants, type TagProps }
