"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { cn } from "@/lib/utils"

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

interface DatePickerProps extends Omit<React.ComponentProps<"div">, "onSelect"> {
  selected?: Date | null
  onDateSelect?: (date: Date) => void
  showCloseButton?: boolean
  onClose?: () => void
}

function DatePicker({
  selected,
  onDateSelect,
  showCloseButton = false,
  onClose,
  className,
  ...props
}: DatePickerProps) {
  const today = new Date()
  const [currentMonth, setCurrentMonth] = React.useState(selected?.getMonth() ?? today.getMonth())
  const [currentYear, setCurrentYear] = React.useState(selected?.getFullYear() ?? today.getFullYear())

  const daysInMonth = getDaysInMonth(currentYear, currentMonth)
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth)

  const handlePrev = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const handleNext = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const isToday = (day: number) =>
    day === today.getDate() &&
    currentMonth === today.getMonth() &&
    currentYear === today.getFullYear()

  const isSelected = (day: number) =>
    selected &&
    day === selected.getDate() &&
    currentMonth === selected.getMonth() &&
    currentYear === selected.getFullYear()

  return (
    <div
      data-slot="date-picker"
      className={cn(
        "w-[320px] rounded-[12px] bg-[#F5F5F5] p-4 shadow-md",
        className
      )}
      {...props}
    >
      {showCloseButton && (
        <div className="flex justify-end mb-1">
          <button
            type="button"
            onClick={onClose}
            className="flex size-6 items-center justify-center rounded-full text-muted-foreground hover:bg-muted transition-colors"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>
      )}

      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={handlePrev}
          className="flex size-8 items-center justify-center rounded-full text-foreground hover:bg-muted transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft className="size-4" />
        </button>
        <span className="text-sm font-semibold text-foreground">
          {MONTHS[currentMonth]} {currentYear}
        </span>
        <button
          type="button"
          onClick={handleNext}
          className="flex size-8 items-center justify-center rounded-full text-foreground hover:bg-muted transition-colors"
          aria-label="Next month"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-y-1">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="flex h-8 items-center justify-center text-xs font-medium text-muted-foreground"
          >
            {day}
          </div>
        ))}

        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1
          return (
            <button
              key={day}
              type="button"
              onClick={() => onDateSelect?.(new Date(currentYear, currentMonth, day))}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-sm transition-colors",
                isSelected(day)
                  ? "bg-[#3B2513] text-white font-semibold"
                  : isToday(day)
                  ? "bg-muted font-medium text-foreground"
                  : "text-foreground hover:bg-muted"
              )}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export { DatePicker, type DatePickerProps }
