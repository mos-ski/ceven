import * as React from "react"
import { cn } from "@/lib/utils"

interface CardHeaderProps extends React.ComponentProps<"div"> {
 title: string
 description?: string
 action?: React.ReactNode
}

function CardHeader({
 title,
 description,
 action,
 className,
 ...props
}: CardHeaderProps) {
 return (
  <div
   data-slot="card-header"
   className={cn(
    "flex items-center justify-between gap-4 border-b border-card-border px-5 py-3",
    className
   )}
   {...props}
  >
   <div className="flex flex-col gap-0.5">
    <h3 className="text-h5 text-heading">{title}</h3>
    {description && (
     <p className="text-caption">{description}</p>
    )}
   </div>
   {action && <div className="flex items-center gap-2">{action}</div>}
  </div>
 )
}

export { CardHeader, type CardHeaderProps }
