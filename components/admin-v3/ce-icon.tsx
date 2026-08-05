type CEIconVariant = "fill" | "fill-refined" | "stroke" | "thick";

const VARIANT_SRC: Record<CEIconVariant, string> = {
  fill: "/AI/CEven AI.svg",
  "fill-refined": "/AI/CEven AI2-1.svg",
  stroke: "/AI/CEven AI2.svg",
  thick: "/AI/CEven AI3.svg",
};

export function CEIcon({
  className = "h-4 w-4",
  variant = "fill",
  ...props
}: { className?: string; variant?: CEIconVariant } & React.ComponentProps<"img">) {
  return (
    <img
      src={VARIANT_SRC[variant]}
      alt="CE"
      className={className}
      {...props}
    />
  );
}
