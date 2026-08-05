import * as React from "react"
import { cn } from "@/lib/utils"

interface FooterProps extends React.ComponentProps<"footer"> {
 brand?: React.ReactNode
 columns?: Array<{
  title: string
  links: Array<{ label: string; href: string }>
 }>
 copyright?: string
 minimal?: boolean
}

function Footer({
 brand,
 columns = [],
 copyright,
 minimal = false,
 className,
 ...props
}: FooterProps) {
 return (
  <footer
   data-slot="footer"
   data-minimal={minimal || undefined}
   className={cn(
    "border-t border-card-border bg-card px-6 py-12",
    className
   )}
   {...props}
  >
   <div className="mx-auto max-w-6xl">
    {minimal ? (
     <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
      {brand}
      {copyright && (
       <p className="text-caption">{copyright}</p>
      )}
     </div>
    ) : (
     <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
      <div className="lg:col-span-2">
       {brand}
       {copyright && (
        <p className="text-caption mt-4">{copyright}</p>
       )}
      </div>
      {columns.map((column) => (
       <div key={column.title}>
        <h4 className="text-ui-sm font-semibold text-heading mb-3">
         {column.title}
        </h4>
        <ul className="flex flex-col gap-2">
         {column.links.map((link) => (
          <li key={link.label}>
           <a
            href={link.href}
            className="text-body-sm text-muted-text hover:text-heading transition-colors"
           >
            {link.label}
           </a>
          </li>
         ))}
        </ul>
       </div>
      ))}
     </div>
    )}
   </div>
  </footer>
 )
}

export { Footer, type FooterProps }
