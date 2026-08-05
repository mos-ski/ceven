import * as React from "react"
import { cn } from "@/lib/utils"

interface StatCardProps extends React.ComponentProps<"div"> {
 label: string
 value: string | number
 change?: string
 changeType?: "positive" | "negative" | "neutral"
 icon?: React.ReactNode
}

function StatCard({
 label,
 value,
 change,
 changeType = "neutral",
 icon,
 className,
 ...props
}: StatCardProps) {
 return (
  <div
   data-slot="stat-card"
   className={cn(
    "flex flex-col gap-1 border border-card-border bg-card px-5 py-4",
    className
   )}
   {...props}
  >
   <div className="flex items-center justify-between">
    <span className="text-caption">{label}</span>
    {icon && (
     <span className="text-muted-foreground">{icon}</span>
    )}
   </div>
   <div className="text-h2 text-stat-heading font-heading font-bold">
    {value}
   </div>
   {change && (
    <span
     className={cn(
      "text-caption text-xs font-medium",
      changeType === "positive" && "text-success",
      changeType === "negative" && "text-error",
      changeType === "neutral" && "text-muted-text"
     )}
    >
     {change}
    </span>
   )}
  </div>
 )
}

export { StatCard, type StatCardProps }
