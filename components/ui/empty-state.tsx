import { cn } from "@/lib/utils"

interface EmptyStateProps extends React.ComponentProps<"div"> {
 icon?: React.ReactNode
 title: string
 description?: string
 action?: React.ReactNode
 secondaryAction?: React.ReactNode
 layout?: "inline" | "stacked"
}

function EmptyState({
 icon,
 title,
 description,
 action,
 secondaryAction,
 layout = "inline",
 className,
 ...props
}: EmptyStateProps) {
 return (
  <div
   data-slot="empty-state"
   data-layout={layout}
   className={cn(
    "flex flex-col items-center justify-center py-12 text-center",
    className
   )}
   {...props}
  >
   {icon && (
    <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
     {icon}
    </div>
   )}
   <h3 className="text-h4 text-heading mb-1">{title}</h3>
   {description && (
    <p className="text-body-sm text-muted-text max-w-sm mb-4">
     {description}
    </p>
   )}
   {(action || secondaryAction) && (
    <div
     className={cn(
      "flex items-center gap-3",
      layout === "stacked" && "flex-col w-full max-w-[240px]"
     )}
    >
     {action}
     {secondaryAction}
    </div>
   )}
  </div>
 )
}

export { EmptyState, type EmptyStateProps }
