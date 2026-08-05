import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const cardVariants = cva("rounded-2xl border bg-white", {
 variants: {
  variant: {
   default: "border-black/[0.07]",
   highlight: "border-[#C47B2C]/40",
  },
  padding: {
   default: "p-5",
   compact: "p-4",
   none: "",
  },
 },
 defaultVariants: {
  variant: "default",
  padding: "default",
 },
})

interface CardProps
 extends React.ComponentProps<"div">,
  VariantProps<typeof cardVariants> {}

function Card({ className, variant, padding, ...props }: CardProps) {
 return (
  <div
   data-slot="card"
   className={cn(cardVariants({ variant, padding }), className)}
   {...props}
  />
 )
}

export { Card, cardVariants, type CardProps }
