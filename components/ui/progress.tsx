"use client"

import { Progress as ProgressPrimitive } from "@base-ui/react/progress"

import { cn } from "@/lib/utils"

function Progress({
 className,
 children,
 value,
 ...props
}: ProgressPrimitive.Root.Props) {
 return (
  <ProgressPrimitive.Root
   value={value}
   data-slot="progress"
   className={cn("flex flex-wrap gap-3", className)}
   {...props}
  >
   {children}
   <ProgressTrack>
    <ProgressIndicator />
   </ProgressTrack>
  </ProgressPrimitive.Root>
 )
}

function ProgressTrack({ className, ...props }: ProgressPrimitive.Track.Props) {
 return (
  <ProgressPrimitive.Track
   className={cn(
    "relative flex h-1 w-full items-center overflow-x-hidden rounded-full bg-muted",
    className
   )}
   data-slot="progress-track"
   {...props}
  />
 )
}

function ProgressIndicator({
 className,
 ...props
}: ProgressPrimitive.Indicator.Props) {
 return (
  <ProgressPrimitive.Indicator
   data-slot="progress-indicator"
   className={cn("h-full bg-primary transition-all", className)}
   {...props}
  />
 )
}

function ProgressLabel({ className, ...props }: ProgressPrimitive.Label.Props) {
 return (
  <ProgressPrimitive.Label
   className={cn("text-sm font-medium", className)}
   data-slot="progress-label"
   {...props}
  />
 )
}

function ProgressValue({ className, ...props }: ProgressPrimitive.Value.Props) {
 return (
  <ProgressPrimitive.Value
   className={cn(
    "ml-auto text-sm text-muted-foreground tabular-nums",
    className
   )}
   data-slot="progress-value"
   {...props}
  />
 )
}

function CircularProgress({
 className,
 size = 40,
 strokeWidth = 4,
 value = 0,
 indeterminate = false,
 ...props
}: React.ComponentProps<"div"> & {
 size?: number
 strokeWidth?: number
 value?: number
 indeterminate?: boolean
}) {
 const radius = (size - strokeWidth) / 2
 const circumference = radius * 2 * Math.PI
 const offset = circumference - (value / 100) * circumference

 return (
  <div
   data-slot="circular-progress"
   className={cn("relative inline-flex items-center justify-center", className)}
   {...props}
  >
   <svg
    width={size}
    height={size}
    viewBox={`0 0 ${size} ${size}`}
    className={cn(
     "-rotate-90",
     indeterminate && "animate-spin"
    )}
   >
    <circle
     cx={size / 2}
     cy={size / 2}
     r={radius}
     fill="none"
     stroke="currentColor"
     strokeWidth={strokeWidth}
     className="text-muted"
    />
    <circle
     cx={size / 2}
     cy={size / 2}
     r={radius}
     fill="none"
     stroke="currentColor"
     strokeWidth={strokeWidth}
     strokeDasharray={circumference}
     strokeDashoffset={indeterminate ? circumference * 0.75 : offset}
     strokeLinecap="round"
     className={cn(
      "transition-all duration-300",
      indeterminate ? "origin-center animate-[circular-spin_1.4s_linear_infinite]" : ""
     )}
    />
   </svg>
  </div>
 )
}

export {
 Progress,
 ProgressTrack,
 ProgressIndicator,
 ProgressLabel,
 ProgressValue,
 CircularProgress,
}
