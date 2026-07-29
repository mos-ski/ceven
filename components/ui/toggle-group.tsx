"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const toggleGroupItemVariants = cva(
  "inline-flex items-center justify-center border border-transparent px-3 py-1 text-sm font-medium transition-all outline-none select-none hover:bg-muted focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-muted data-[state=on]:text-foreground data-[state=on]:border-border",
  {
    variants: {
      size: {
        default: "h-8",
        sm: "h-7 text-xs",
        lg: "h-9",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

interface ToggleGroupContextValue {
  value: string | string[]
  onValueChange?: (itemValue: string) => void
  type?: "single" | "multiple"
}

const ToggleGroupContext = React.createContext<ToggleGroupContextValue>({
  value: "",
  type: "single",
})

interface ToggleGroupProps extends React.ComponentProps<"div"> {
  type?: "single" | "multiple"
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
  defaultValue?: string | string[]
}

function ToggleGroup({
  className,
  type = "single",
  value: controlledValue,
  onValueChange,
  defaultValue,
  children,
  ...props
}: ToggleGroupProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState<
    string | string[]
  >(defaultValue ?? (type === "multiple" ? [] : ""))
  const value = controlledValue ?? uncontrolledValue

  const handleValueChange = React.useCallback(
    (itemValue: string) => {
      if (type === "multiple") {
        const current = Array.isArray(value) ? value : []
        const next = current.includes(itemValue)
          ? current.filter((v) => v !== itemValue)
          : [...current, itemValue]
        onValueChange?.(next)
        setUncontrolledValue(next)
      } else {
        const next = value === itemValue ? "" : itemValue
        onValueChange?.(next)
        setUncontrolledValue(next)
      }
    },
    [type, value, onValueChange]
  )

  return (
    <ToggleGroupContext.Provider
      value={{ value, onValueChange: handleValueChange, type }}
    >
      <div
        role="group"
        data-slot="toggle-group"
        data-orientation="horizontal"
        className={cn(
          "inline-flex items-center border border-border",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </ToggleGroupContext.Provider>
  )
}

interface ToggleGroupItemProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof toggleGroupItemVariants> {
  value: string
}

function ToggleGroupItem({
  className,
  size = "default",
  value: itemValue,
  children,
  ...props
}: ToggleGroupItemProps) {
  const ctx = React.useContext(ToggleGroupContext)
  const isActive = Array.isArray(ctx.value)
    ? ctx.value.includes(itemValue)
    : ctx.value === itemValue

  return (
    <button
      role="radio"
      aria-checked={isActive}
      data-slot="toggle-group-item"
      data-state={isActive ? "on" : "off"}
      className={cn(toggleGroupItemVariants({ size }), className)}
      onClick={() => ctx.onValueChange?.(itemValue)}
      {...props}
    >
      {children}
    </button>
  )
}

export {
  ToggleGroup,
  ToggleGroupItem,
  toggleGroupItemVariants,
  type ToggleGroupProps,
  type ToggleGroupItemProps,
}
