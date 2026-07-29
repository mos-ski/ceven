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
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
        <h2
          className={cn(
            "text-h2",
            variant === "dark" ? "text-white" : "text-heading"
          )}
        >
          {title}
        </h2>
        {description && (
          <p
            className={cn(
              "text-body-lg max-w-2xl",
              variant === "dark" ? "text-white/80" : "text-muted-text"
            )}
          >
            {description}
          </p>
        )}
        {actions && (
          <div className="flex flex-wrap items-center justify-center gap-3">
            {actions}
          </div>
        )}
      </div>
    </section>
  )
}

export { CTABanner, type CTABannerProps }
