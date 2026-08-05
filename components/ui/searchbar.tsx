"use client"

import * as React from "react"
import { Search, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchBarProps extends Omit<React.ComponentProps<"input">, "size"> {
 size?: "sm" | "default" | "lg"
 showClearButton?: boolean
 onClear?: () => void
}

function SearchBar({
 className,
 size = "default",
 showClearButton = true,
 onClear,
 value,
 ...props
}: SearchBarProps) {
 const [internalValue, setInternalValue] = React.useState(value ?? "")
 const currentValue = value ?? internalValue

 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setInternalValue(e.target.value)
  props.onChange?.(e)
 }

 const handleClear = () => {
  setInternalValue("")
  onClear?.()
 }

 return (
  <div
   data-slot="search-bar"
   data-size={size}
   className={cn(
    "relative flex items-center",
    className
   )}
  >
   <input
    type="text"
    data-slot="search-bar-input"
    value={currentValue}
    onChange={handleChange}
    className={cn(
     "w-full rounded-full border border-input bg-transparent text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-3 focus:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50",
     size === "sm" && "h-8 px-3 pr-10 text-sm",
     size === "default" && "h-10 px-4 pr-12 text-sm",
     size === "lg" && "h-12 px-5 pr-14 text-base"
    )}
    {...props}
   />
   <div className="absolute right-1 flex items-center gap-1">
    {showClearButton && currentValue && (
     <button
      type="button"
      onClick={handleClear}
      className={cn(
       "flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground transition-colors",
       size === "sm" && "size-6",
       size === "default" && "size-7",
       size === "lg" && "size-8"
      )}
      aria-label="Clear search"
     >
      <X className="size-3.5" />
     </button>
    )}
    <div
     className={cn(
      "flex items-center justify-center rounded-full bg-[#3B2513] text-white",
      size === "sm" && "size-6",
      size === "default" && "size-7",
      size === "lg" && "size-8"
     )}
    >
     <Search className={cn(
      "text-white",
      size === "sm" && "size-3",
      size === "default" && "size-3.5",
      size === "lg" && "size-4"
     )} />
    </div>
   </div>
  </div>
 )
}

export { SearchBar, type SearchBarProps }
