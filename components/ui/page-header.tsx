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
   className={cn("flex flex-col gap-1", className)}
   {...props}
  >
   <div className="flex items-center justify-between gap-4">
    <div className="flex flex-col gap-1">
     {backLink}
     <h1 className="text-h2 text-heading">{title}</h1>
     {description && (
      <p className="text-body-sm text-muted-text">{description}</p>
     )}
    </div>
    {action && <div className="flex items-center gap-2">{action}</div>}
   </div>
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
