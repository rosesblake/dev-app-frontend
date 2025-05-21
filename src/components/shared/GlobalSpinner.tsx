import { useUiStore } from "@/lib/stores/useUiStore";
import { Spinner } from "@/components/ui/Spinner";

export function GlobalSpinner() {
  const isLoading = useUiStore((s) => s.isLoading);

  if (!isLoading) return null;
  return (
    <div className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm flex items-center justify-center">
      <Spinner className="w-8 h-8" />
    </div>
  );
}
