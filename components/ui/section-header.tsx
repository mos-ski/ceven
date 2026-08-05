import * as React from "react"
import { cn } from "@/lib/utils"

interface SectionHeaderProps extends React.ComponentProps<"div"> {
 title: string
 description?: string
 action?: React.ReactNode
}

function SectionHeader({
 title,
 description,
 action,
 className,
 ...props
}: SectionHeaderProps) {
 return (
  <div
   data-slot="section-header"
   className={cn("flex items-center justify-between gap-4", className)}
   {...props}
  >
   <div className="flex flex-col gap-0.5">
    <h2 className="text-h4 text-heading">{title}</h2>
    {description && (
     <p className="text-body-sm text-muted-text">{description}</p>
    )}
   </div>
   {action && <div className="flex items-center gap-2">{action}</div>}
  </div>
 )
}

function SectionFooter({
 className,
 ...props
}: React.ComponentProps<"div">) {
 return (
  <div
   data-slot="section-footer"
   className={cn(
    "flex items-center justify-center border-t border-card-border px-5 py-3",
    className
   )}
   {...props}
  />
 )
}

export { SectionHeader, SectionFooter, type SectionHeaderProps }
