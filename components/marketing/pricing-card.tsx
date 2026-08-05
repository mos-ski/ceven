import * as React from "react"
import { cn } from "@/lib/utils"

interface PricingCardProps extends React.ComponentProps<"div"> {
 name: string
 price: string
 period?: string
 description?: string
 features?: string[]
 highlighted?: boolean
 action?: React.ReactNode
}

function PricingCard({
 name,
 price,
 period,
 description,
 features,
 highlighted = false,
 action,
 className,
 ...props
}: PricingCardProps) {
 return (
  <div
   data-slot="pricing-card"
   data-highlighted={highlighted || undefined}
   className={cn(
    "flex flex-col border bg-card p-6",
    highlighted
     ? "border-brand-dark ring-1 ring-brand-dark/10"
     : "border-card-border",
    className
   )}
   {...props}
  >
   <h3 className="text-h4 text-heading">{name}</h3>
   {description && (
    <p className="text-body-sm text-muted-text mt-1">{description}</p>
   )}
   <div className="mt-4 flex items-baseline gap-1">
    <span className="text-h2 text-heading font-heading font-bold">
     {price}
    </span>
    {period && (
     <span className="text-body-sm text-muted-text">/{period}</span>
    )}
   </div>
   {features && (
    <ul className="mt-6 flex flex-col gap-2">
     {features.map((feature) => (
      <li
       key={feature}
       className="flex items-start gap-2 text-body-sm text-heading"
      >
       <svg
        className="mt-0.5 size-4 shrink-0 text-success"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
       >
        <path
         strokeLinecap="round"
         strokeLinejoin="round"
         d="M5 13l4 4L19 7"
        />
       </svg>
       {feature}
      </li>
     ))}
    </ul>
   )}
   {action && <div className="mt-6">{action}</div>}
  </div>
 )
}

function PricingGrid({
 className,
 ...props
}: React.ComponentProps<"div">) {
 return (
  <div
   data-slot="pricing-grid"
   className={cn(
    "grid gap-6 lg:grid-cols-3",
    className
   )}
   {...props}
  />
 )
}

export { PricingCard, PricingGrid, type PricingCardProps }
