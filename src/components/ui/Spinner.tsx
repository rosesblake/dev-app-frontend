import { cn } from "@/lib/utils";

export function Spinner({
  className,
  centered = false,
}: {
  className?: string;
  centered?: boolean;
}) {
  const spinner = (
    <div
      className={cn(
        "animate-spin w-6 h-6 rounded-full border-4 border-muted border-t-primary",
        className
      )}
    />
  );

  return centered ? (
    <div className="flex justify-center py-12">{spinner}</div>
  ) : (
    spinner
  );
}
