import * as React from "react"
import { cn } from "@/lib/utils"

interface FeatureGridProps extends React.ComponentProps<"section"> {
 title?: string
 description?: string
 columns?: 2 | 3 | 4
}

function FeatureGrid({
 title,
 description,
 columns = 3,
 className,
 children,
 ...props
}: FeatureGridProps) {
 return (
  <section
   data-slot="feature-grid"
   className={cn("px-6 py-16", className)}
   {...props}
  >
   {(title || description) && (
    <div className="mx-auto mb-12 max-w-2xl text-center">
     {title && <h2 className="text-h2 text-heading mb-4">{title}</h2>}
     {description && (
      <p className="text-body-lg text-muted-text">{description}</p>
     )}
    </div>
   )}
   <div
    className={cn(
     "mx-auto grid max-w-6xl gap-8",
     columns === 2 && "grid-cols-1 md:grid-cols-2",
     columns === 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
     columns === 4 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
    )}
   >
    {children}
   </div>
  </section>
 )
}

interface FeatureCardProps extends React.ComponentProps<"div"> {
 icon?: React.ReactNode
 title: string
 description?: string
}

function FeatureCard({
 icon,
 title,
 description,
 className,
 ...props
}: FeatureCardProps) {
 return (
  <div
   data-slot="feature-card"
   className={cn(
    "flex flex-col gap-4 rounded-[8px] border border-card-border bg-card p-6 transition-colors hover:bg-muted/50",
    className
   )}
   {...props}
  >
   {icon && (
    <div className="flex size-10 items-center justify-center rounded-[8px] bg-button-primary-bg/20 text-brand-dark">
     {icon}
    </div>
   )}
   <h3 className="text-h5 text-heading">{title}</h3>
   {description && <p className="text-body-sm text-muted-text">{description}</p>}
  </div>
 )
}

export { FeatureGrid, FeatureCard, type FeatureGridProps, type FeatureCardProps }
