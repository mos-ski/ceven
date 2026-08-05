"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface BreadcrumbItem {
 label: string
 href?: string
 isCurrent?: boolean
}

interface BreadcrumbProps extends React.ComponentProps<"nav"> {
 items: BreadcrumbItem[]
 separator?: React.ReactNode
}

function Breadcrumb({
 items,
 separator = "/",
 className,
 ...props
}: BreadcrumbProps) {
 return (
  <nav
   aria-label="Breadcrumb"
   data-slot="breadcrumb"
   className={cn("flex items-center gap-1.5 text-sm", className)}
   {...props}
  >
   <ol className="flex items-center gap-1.5">
    {items.map((item, i) => (
     <li
      key={i}
      data-slot="breadcrumb-item"
      className="flex items-center gap-1.5"
     >
      {i > 0 && (
       <span className="text-muted-foreground select-none" aria-hidden>
        {separator}
       </span>
      )}
      {item.href && !item.isCurrent ? (
       <a
        href={item.href}
        className="text-muted-text hover:text-heading transition-colors"
       >
        {item.label}
       </a>
      ) : (
       <span
        aria-current={item.isCurrent ? "page" : undefined}
        className={cn(
         "font-medium",
         item.isCurrent ? "text-heading" : "text-muted-text"
        )}
       >
        {item.label}
       </span>
      )}
     </li>
    ))}
   </ol>
  </nav>
 )
}

export { Breadcrumb, type BreadcrumbProps, type BreadcrumbItem }
