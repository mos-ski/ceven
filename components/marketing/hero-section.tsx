import * as React from "react"
import { cn } from "@/lib/utils"

interface HeroSectionProps extends React.ComponentProps<"section"> {
 badge?: React.ReactNode
 title: string
 description?: string
 actions?: React.ReactNode
 variant?: "default" | "centered" | "split"
}

function HeroSection({
 badge,
 title,
 description,
 actions,
 variant = "default",
 className,
 children,
 ...props
}: HeroSectionProps) {
 return (
  <section
   data-slot="hero-section"
   data-variant={variant}
   className={cn(
    "relative overflow-hidden px-6 py-20 lg:py-28",
    variant === "centered" && "text-center",
    variant === "split" && "grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center",
    className
   )}
   {...props}
  >
   <div
    className={cn(
     "flex flex-col gap-6",
     variant === "centered" && "mx-auto max-w-3xl items-center",
     variant === "split" && "gap-8"
    )}
   >
    {badge}
    <h1 className="text-display text-4xl text-heading lg:text-5xl">
     {title}
    </h1>
    {description && (
     <p className="text-body-lg text-muted-text max-w-2xl">
      {description}
     </p>
    )}
    {actions && (
     <div className="flex flex-wrap items-center gap-3">
      {actions}
     </div>
    )}
   </div>
   {children}
  </section>
 )
}

function HeroBadge({ className, ...props }: React.ComponentProps<"span">) {
 return (
  <span
   data-slot="hero-badge"
   className={cn(
    "inline-flex items-center gap-1.5 border border-button-primary-border bg-button-primary-bg/20 px-3 py-1 text-ui-sm text-brand-dark",
    className
   )}
   {...props}
  />
 )
}

export { HeroSection, HeroBadge, type HeroSectionProps }
