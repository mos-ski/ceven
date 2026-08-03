import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface AlertBannerProps extends React.ComponentProps<"div"> {
  variant?: "info" | "success" | "warning" | "error"
  icon?: React.ReactNode
  title?: string
  action?: React.ReactNode
  dismissible?: boolean
  onDismiss?: () => void
}

function AlertBanner({
  variant = "info",
  icon,
  title,
  action,
  dismissible = false,
  onDismiss,
  children,
  className,
  ...props
}: AlertBannerProps) {
  return (
    <div
      role="alert"
      data-slot="alert-banner"
      data-variant={variant}
      className={cn(
        "flex items-start gap-4 rounded-[8px] border px-4 py-4 text-sm",
        variant === "info" && "border-info/20 bg-info-light text-info",
        variant === "success" &&
          "border-success/20 bg-success-light text-success",
        variant === "warning" &&
          "border-warning/20 bg-warning-light text-warning",
        variant === "error" && "border-danger/20 bg-danger-light text-danger",
        className
      )}
      {...props}
    >
      {icon && <span className="mt-0.5 shrink-0">{icon}</span>}
      <div className="flex-1 min-w-0">
        {title && <p className="font-bold mb-1">{title}</p>}
        {children}
      </div>
      {action && <div className="shrink-0">{action}</div>}
      {dismissible && (
        <button
          type="button"
          onClick={onDismiss}
          className="shrink-0 p-0.5 hover:opacity-70 transition-opacity"
          aria-label="Dismiss"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  )
}

export { AlertBanner, type AlertBannerProps }
