import * as React from "react"
import { cn } from "@/lib/utils"

interface ButtonGroupProps extends React.ComponentProps<"div"> {
 orientation?: "horizontal" | "vertical"
}

function ButtonGroup({
 className,
 orientation = "horizontal",
 ...props
}: ButtonGroupProps) {
 return (
  <div
   role="group"
   data-slot="button-group"
   data-orientation={orientation}
   className={cn(
    "inline-flex data-[orientation=horizontal]:flex-row data-[orientation=vertical]:flex-col [&>[data-slot=button]]:rounded-none [&>[data-slot=button]:first-child]:rounded-none [&>[data-slot=button]:last-child]:rounded-none [&>[data-slot=button]:not(:first-child)]:border-l-0",
    className
   )}
   {...props}
  />
 )
}

export { ButtonGroup, type ButtonGroupProps }
