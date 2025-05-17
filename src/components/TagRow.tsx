export function TagRow({
  label,
  items,
  detailsPage = false,
}: {
  label: string;
  items: string[];
  detailsPage: boolean;
}) {
  const colorMap: Record<string, string> = {
    Stack: "bg-muted text-foreground",
    Roles: "bg-foreground/70 text-muted",
  };

  const sizeClass = detailsPage ? "text-sm" : "text-[10px]";

  return (
    <div className="flex items-start gap-2">
      <span
        className={`${sizeClass} text-xs w-[64px] shrink-0 text-muted-foreground font-medium uppercase tracking-wide leading-5`}
      >
        {label}
      </span>
      <div className="flex flex-wrap gap-1">
        {items.slice(0, 5).map((item, i) => (
          <span
            key={i}
            className={`${
              colorMap[label] ?? "bg-muted text-foreground"
            } px-2 py-1 rounded-full ${sizeClass}`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
