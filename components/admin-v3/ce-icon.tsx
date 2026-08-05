import Image from "next/image";

export function CEIcon({ className = "h-4 w-4", ...props }: { className?: string } & React.ComponentProps<"img">) {
 return (
  <img
   src="/AI/CEven AI.svg"
   alt="CE"
   className={className}
   {...props}
  />
 );
}
