"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface CheckboxGroupProps extends React.ComponentProps<"div"> {
 value?: string[]
 onValueChange?: (value: string[]) => void
 orientation?: "horizontal" | "vertical"
}

const CheckboxGroupContext = React.createContext<{
 value: string[]
 onValueChange?: (value: string[]) => void
}>({ value: [] })

function CheckboxGroup({
 className,
 value = [],
 onValueChange,
 orientation = "vertical",
 children,
 ...props
}: CheckboxGroupProps) {
 return (
  <CheckboxGroupContext.Provider value={{ value, onValueChange }}>
   <div
    role="group"
    data-slot="checkbox-group"
    data-orientation={orientation}
    className={cn(
     "flex flex-col gap-2",
     orientation === "horizontal" && "flex-row flex-wrap gap-4",
     className
    )}
    {...props}
   >
    {children}
   </div>
  </CheckboxGroupContext.Provider>
 )
}

function CheckboxGroupItem({
 className,
 value: itemValue,
 children,
 ...props
}: React.ComponentProps<"label"> & {
 value: string
}) {
 const ctx = React.useContext(CheckboxGroupContext)
 const isChecked = ctx.value.includes(itemValue)

 return (
  <label
   data-slot="checkbox-group-item"
   data-checked={isChecked || undefined}
   className={cn(
    "flex items-center gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer",
    className
   )}
   {...props}
  >
   <input
    type="checkbox"
    className="sr-only"
    checked={isChecked}
    onChange={(e) => {
     const next = e.target.checked
      ? [...ctx.value, itemValue]
      : ctx.value.filter((v) => v !== itemValue)
     ctx.onValueChange?.(next)
    }}
   />
   {children}
  </label>
 )
}

export { CheckboxGroup, CheckboxGroupItem, type CheckboxGroupProps }
