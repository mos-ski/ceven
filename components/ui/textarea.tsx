import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({
 className,
 error,
 maxLength,
 ...props
}: React.ComponentProps<"textarea"> & {
 error?: boolean
 maxLength?: number
}) {
 const [charCount, setCharCount] = React.useState(0)

 const handleChange = React.useCallback(
  (e: React.ChangeEvent<HTMLTextAreaElement>) => {
   setCharCount(e.target.value.length)
   props.onChange?.(e)
  },
  [props.onChange]
 )

 return (
  <div data-slot="textarea-wrapper" className="flex flex-col gap-1.5">
   <div
    data-slot="textarea-container"
    className={cn(
     "relative rounded-[8px] border bg-transparent transition-colors",
     error
      ? "border-red-500 focus-within:border-red-500 focus-within:ring-3 focus-within:ring-red-500/20"
      : "border-input focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
     className
    )}
   >
    <textarea
     data-slot="textarea"
     className={cn(
      "flex field-sizing-content min-h-16 w-full bg-transparent px-2.5 py-2 text-base transition-colors outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80"
     )}
     onChange={handleChange}
     maxLength={maxLength}
     {...props}
    />
    {maxLength !== undefined && (
     <span className="pointer-events-none absolute bottom-2 right-2 text-xs text-muted-foreground">
      {charCount}/{maxLength}
     </span>
    )}
   </div>
  </div>
 )
}

function TextareaHint({
 className,
 error,
 children,
 ...props
}: React.ComponentProps<"p"> & {
 error?: boolean
}) {
 return (
  <p
   data-slot="textarea-hint"
   className={cn(
    "text-xs",
    error ? "text-red-500" : "text-muted-foreground",
    className
   )}
   {...props}
  >
   {children}
  </p>
 )
}

export { Textarea, TextareaHint }
