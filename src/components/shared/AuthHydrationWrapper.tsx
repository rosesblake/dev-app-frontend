// app/components/shared/AuthHydrationWrapper.tsx
"use client";

import { useEffect } from "react";
import { restoreSession } from "@/lib/utils/authSession";
import { useAuthStore } from "@/lib/stores/useAuthStore";

export function AuthHydrationWrapper() {
  const setHydrated = useAuthStore((s) => s.setHydrated);

  useEffect(() => {
    restoreSession().finally(() => setHydrated(true));
  }, [setHydrated]);

  return null;
}
