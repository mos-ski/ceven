import * as React from "react"
import { cn } from "@/lib/utils"

interface HeaderNavProps extends React.ComponentProps<"header"> {
  logo?: React.ReactNode
  links?: Array<{ label: string; href: string }>
  actions?: React.ReactNode
}

function HeaderNav({
  logo,
  links = [],
  actions,
  className,
  ...props
}: HeaderNavProps) {
  return (
    <header
      data-slot="header-nav"
      className={cn(
        "sticky top-0 z-40 border-b border-card-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
      {...props}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-8">
          {logo}
          <nav className="hidden items-center gap-6 md:flex">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-ui text-muted-text hover:text-heading transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        {actions && (
          <div className="flex items-center gap-2">{actions}</div>
        )}
      </div>
    </header>
  )
}

export { HeaderNav, type HeaderNavProps }
