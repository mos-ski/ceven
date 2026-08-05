export function CEIcon({ className = "h-4 w-4", ...props }: { className?: string } & React.ComponentProps<"img">) {
  return (
    <img
      src="/AI/CEven AI.svg"
      alt="CE"
      className={className}
      style={{ filter: "invert(35%) sepia(80%) saturate(500%) hue-rotate(355deg) brightness(90%) contrast(90%)" }}
      {...props}
    />
  );
}
