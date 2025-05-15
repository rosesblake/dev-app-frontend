export function TagRow({ label, items }: { label: string; items: string[] }) {
  const colorMap: Record<string, string> = {
    Stack: "bg-muted text-foreground",
    Roles: "bg-foreground/70 text-muted",
  };

  return (
    <div className="flex items-start gap-2">
      <span className="w-[64px] shrink-0 text-muted-foreground text-[10px] font-medium uppercase tracking-wide leading-5">
        {label}
      </span>
      <div className="flex flex-wrap gap-1">
        {items.slice(0, 5).map((item, i) => (
          <span
            key={i}
            className={`${
              colorMap[label] ?? "bg-muted text-foreground"
            } px-2 py-0.5 rounded-full text-[11px]`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
