import * as React from "react"
import { cn } from "@/lib/utils"

interface MetricRowProps extends React.ComponentProps<"section"> {
 metrics: Array<{
  value: string
  label: string
 }>
 variant?: "default" | "dark"
}

function MetricRow({ metrics, variant = "default", className, ...props }: MetricRowProps) {
 return (
  <section
   data-slot="metric-row"
   data-variant={variant}
   className={cn(
    "px-6 py-12",
    variant === "dark" && "bg-brand-dark text-white",
    className
   )}
   {...props}
  >
   <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 md:grid-cols-4">
    {metrics.map((metric) => (
     <div key={metric.label} className="flex flex-col items-center gap-1 text-center">
      <span
       className={cn(
        "text-display text-3xl lg:text-4xl",
        variant === "dark" ? "text-white" : "text-heading"
       )}
      >
       {metric.value}
      </span>
      <span
       className={cn(
        "text-body-sm",
        variant === "dark" ? "text-white/70" : "text-muted-text"
       )}
      >
       {metric.label}
      </span>
     </div>
    ))}
   </div>
  </section>
 )
}

export { MetricRow, type MetricRowProps }
