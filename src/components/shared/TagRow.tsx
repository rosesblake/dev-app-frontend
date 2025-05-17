import { Badge } from "@/components/ui/badge";

export function TagRow({
  label,
  items,
  detailsPage = false,
}: {
  label: string;
  items: string[];
  detailsPage: boolean;
}) {
  const variantMap: Record<string, "default" | "secondary" | "outline"> = {
    Stack: "secondary",
    Roles: "default",
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
          <Badge
            key={i}
            variant={variantMap[label] ?? "secondary"}
            className={`${sizeClass} px-2 py-1 rounded-full`}
          >
            {item}
          </Badge>
        ))}
      </div>
    </div>
  );
}
