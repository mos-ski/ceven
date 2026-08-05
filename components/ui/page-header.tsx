import * as React from "react"
import { cn } from "@/lib/utils"

interface PageHeaderProps extends React.ComponentProps<"div"> {
 title: string
 description?: string
 action?: React.ReactNode
 backLink?: React.ReactNode
}

function PageHeader({
 title,
 description,
 action,
 backLink,
 className,
 ...props
}: PageHeaderProps) {
 return (
  <div
   data-slot="page-header"
   className={cn("flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between", className)}
   {...props}
  >
   <div>
    {backLink}
    <h1 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2D1810]">{title}</h1>
    {description && (
     <p className="mt-1 text-sm text-[#2D1810]/50">{description}</p>
    )}
   </div>
   {action && <div className="flex shrink-0 items-center gap-2">{action}</div>}
  </div>
 )
}

function PageHeaderActions({
 className,
 ...props
}: React.ComponentProps<"div">) {
 return (
  <div
   data-slot="page-header-actions"
   className={cn("flex items-center gap-2", className)}
   {...props}
  />
 )
}

export { PageHeader, PageHeaderActions, type PageHeaderProps }
