import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({
 className,
 type,
 ...props
}: React.ComponentProps<"input">) {
 return (
  <InputPrimitive
   type={type}
   data-slot="input"
   className={cn(
    "h-8 w-full min-w-0 rounded-[8px] border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
    className
   )}
   {...props}
  />
 )
}

function InputWrapper({
 className,
 children,
 ...props
}: React.ComponentProps<"div">) {
 return (
  <div
   data-slot="input-wrapper"
   className={cn("flex flex-col gap-1.5", className)}
   {...props}
  >
   {children}
  </div>
 )
}

function InputField({
 className,
 error,
 leftIcon,
 rightIcon,
 disabled,
 ...props
}: React.ComponentProps<"input"> & {
 error?: boolean
 leftIcon?: React.ReactNode
 rightIcon?: React.ReactNode
}) {
 return (
  <div
   data-slot="input-field"
   className={cn(
    "flex h-10 items-center rounded-[8px] border bg-transparent px-3 transition-colors",
    error
     ? "border-red-500 focus-within:border-red-500 focus-within:ring-3 focus-within:ring-red-500/20"
     : "border-input focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
    disabled && "cursor-not-allowed opacity-50",
    className
   )}
  >
   {leftIcon && (
    <span className="mr-2 flex shrink-0 items-center text-muted-foreground">
     {leftIcon}
    </span>
   )}
   <input
    data-slot="input-field-input"
    className={cn(
     "flex-1 bg-transparent py-2 text-base outline-none placeholder:text-muted-foreground md:text-sm",
     leftIcon && "pl-0",
     rightIcon && "pr-0"
    )}
    disabled={disabled}
    {...props}
   />
   {rightIcon && (
    <span className={cn(
     "ml-2 flex shrink-0 items-center",
     error ? "text-red-500" : "text-muted-foreground"
    )}>
     {rightIcon}
    </span>
   )}
  </div>
 )
}

function InputHint({
 className,
 error,
 children,
 ...props
}: React.ComponentProps<"p"> & {
 error?: boolean
}) {
 return (
  <p
   data-slot="input-hint"
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

export { Input, InputWrapper, InputField, InputHint }
