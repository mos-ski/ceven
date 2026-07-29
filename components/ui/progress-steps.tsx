"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ProgressStepsProps extends React.ComponentProps<"div"> {
  currentStep: number
  totalSteps: number
}

function ProgressSteps({
  currentStep,
  totalSteps,
  className,
  ...props
}: ProgressStepsProps) {
  return (
    <div
      data-slot="progress-steps"
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      {Array.from({ length: totalSteps }, (_, i) => {
        const step = i + 1
        const isCompleted = step < currentStep
        const isActive = step === currentStep
        const isUpcoming = step > currentStep

        return (
          <React.Fragment key={step}>
            <div className="flex items-center gap-2">
              <div
                data-slot="progress-step-indicator"
                data-state={
                  isCompleted ? "completed" : isActive ? "active" : "upcoming"
                }
                className={cn(
                  "flex size-7 items-center justify-center text-xs font-semibold border rounded-[8px] transition-colors",
                  isCompleted &&
                    "border-success bg-success text-white",
                  isActive &&
                    "border-brand-dark bg-brand-dark text-white",
                  isUpcoming &&
                    "border-border bg-muted text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <svg
                    className="size-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  step
                )}
              </div>
              <span
                className={cn(
                  "text-sm font-medium hidden sm:inline",
                  isCompleted && "text-success",
                  isActive && "text-brand-dark",
                  isUpcoming && "text-muted-foreground"
                )}
              >
                Step {step}
              </span>
            </div>
            {i < totalSteps - 1 && (
              <div
                data-slot="progress-step-connector"
                className={cn(
                  "h-px flex-1 transition-colors",
                  isCompleted ? "bg-success" : "bg-border"
                )}
              />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

export { ProgressSteps, type ProgressStepsProps }
