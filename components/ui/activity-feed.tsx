import * as React from "react"
import { cn } from "@/lib/utils"

interface ActivityItem {
  id: string
  icon?: React.ReactNode
  title: string
  description?: string
  timestamp: string
  badge?: React.ReactNode
}

interface ActivityFeedProps extends React.ComponentProps<"div"> {
  items: ActivityItem[]
}

function ActivityFeed({ items, className, ...props }: ActivityFeedProps) {
  return (
    <div
      data-slot="activity-feed"
      className={cn("flex flex-col", className)}
      {...props}
    >
      {items.map((item, i) => (
        <div
          key={item.id}
          data-slot="activity-item"
          className={cn(
            "flex gap-3 py-3",
            i < items.length - 1 && "border-b border-card-border"
          )}
        >
          <div className="flex flex-col items-center">
            {item.icon ? (
              <div className="flex size-8 items-center justify-center bg-muted text-muted-foreground">
                {item.icon}
              </div>
            ) : (
              <div className="size-2 rounded-full bg-muted-foreground/30 mt-1.5" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <p className="text-body-sm font-medium text-heading truncate">
                {item.title}
              </p>
              {item.badge}
            </div>
            {item.description && (
              <p className="text-caption mt-0.5">{item.description}</p>
            )}
            <p className="text-body-xs text-muted-text mt-1">
              {item.timestamp}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export { ActivityFeed, type ActivityFeedProps, type ActivityItem }
