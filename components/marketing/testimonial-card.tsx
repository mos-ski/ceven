import * as React from "react"
import { cn } from "@/lib/utils"

interface TestimonialCardProps extends React.ComponentProps<"div"> {
 quote: string
 author: string
 role?: string
 avatar?: React.ReactNode
}

function TestimonialCard({
 quote,
 author,
 role,
 avatar,
 className,
 ...props
}: TestimonialCardProps) {
 return (
  <div
   data-slot="testimonial-card"
   className={cn(
    "flex flex-col gap-4 border border-card-border bg-card p-6",
    className
   )}
   {...props}
  >
   <div className="flex gap-0.5 text-button-primary-bg">
    {Array.from({ length: 5 }).map((_, i) => (
     <svg
      key={i}
      className="size-4 fill-current"
      viewBox="0 0 24 24"
     >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
     </svg>
    ))}
   </div>
   <blockquote className="text-body text-heading italic">
    &ldquo;{quote}&rdquo;
   </blockquote>
   <div className="flex items-center gap-3">
    {avatar}
    <div>
     <p className="text-ui-sm font-medium text-heading">{author}</p>
     {role && <p className="text-caption">{role}</p>}
    </div>
   </div>
  </div>
 )
}

function TestimonialGrid({
 className,
 ...props
}: React.ComponentProps<"div">) {
 return (
  <div
   data-slot="testimonial-grid"
   className={cn("grid gap-6 md:grid-cols-2 lg:grid-cols-3", className)}
   {...props}
  />
 )
}

export {
 TestimonialCard,
 TestimonialGrid,
 type TestimonialCardProps,
}
