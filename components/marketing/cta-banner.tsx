import * as React from "react"
import { cn } from "@/lib/utils"

interface CTABannerProps extends React.ComponentProps<"section"> {
 title: string
 description?: string
 actions?: React.ReactNode
 variant?: "default" | "dark"
}

function CTABanner({
 title,
 description,
 actions,
 variant = "default",
 className,
 ...props
}: CTABannerProps) {
 return (
  <section
   data-slot="cta-banner"
   data-variant={variant}
   className={cn(
    "px-6 py-16",
    variant === "dark" && "bg-brand-dark text-white",
    className
   )}
   {...props}
  >
   <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">
    <h2
     style={{ fontFamily: "var(--font-merriweather-import)" }}
     className={cn(
      "text-2xl font-bold text-heading line-clamp-2",
      variant === "dark" && "text-white"
     )}
    >
     {title}
    </h2>
    {description && (
     <p
      style={{ fontFamily: "var(--font-urbanist-import)" }}
      className={cn(
       "text-lg leading-[1.5] text-muted-text line-clamp-3 max-w-2xl",
       variant === "dark" && "text-white/80"
      )}
     >
      {description}
     </p>
    )}
    {actions && (
     <div className="flex flex-wrap items-center justify-center gap-4">
      {actions}
     </div>
    )}
   </div>
  </section>
 )
}

export { CTABanner, type CTABannerProps }
