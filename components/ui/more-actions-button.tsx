import * as React from "react"
import { MoreHorizontal } from "lucide-react"

import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

type MoreAction = {
 label: string
 icon?: React.ComponentType<{ className?: string }>
 onClick: () => void
}

function MoreActionsButton({ actions }: { actions: MoreAction[] }) {
 return (
  <DropdownMenu>
   <DropdownMenuTrigger
    render={
     <Button
      variant="outline"
      className="h-9 gap-2 rounded-lg border-[#d0d5dd] px-4 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#2d1810]"
     />
    }
   >
    <MoreHorizontal className="h-4 w-4" />
    More Actions
   </DropdownMenuTrigger>
   <DropdownMenuContent align="end">
    {actions.map(({ label, icon: Icon, onClick }) => (
     <DropdownMenuItem key={label} onClick={onClick}>
      {Icon && <Icon className="h-4 w-4" />}
      {label}
     </DropdownMenuItem>
    ))}
   </DropdownMenuContent>
  </DropdownMenu>
 )
}

export { MoreActionsButton, type MoreAction }
