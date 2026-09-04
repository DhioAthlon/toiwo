export function SectionHeading({
  kicker,
  title,
  align = "left",
  className = "",
}: {
  kicker?: string;
  title: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={`${align === "center" ? "text-center" : "text-left"} ${className}`}>
      {kicker && (
        <p className="text-xs uppercase tracking-[0.25em] text-muted mb-3">{kicker}</p>
      )}
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl leading-tight">{title}</h2>
    </div>
  );
}
