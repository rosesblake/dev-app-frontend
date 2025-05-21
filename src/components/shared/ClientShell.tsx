"use client";

import Navbar from "@/components/shared/Navbar";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { AuthHydrationWrapper } from "@/components/shared/AuthHydrationWrapper";
import { useAuthStore } from "@/lib/stores/useAuthStore";
import { GlobalSpinner } from "./GlobalSpinner";

export default function ClientShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const isHydrated = useAuthStore((s) => s.isHydrated);
  return (
    <ThemeProvider>
      <AuthHydrationWrapper />
      <GlobalSpinner />
      {isHydrated && (
        <>
          <Navbar />
          {children}
        </>
      )}
    </ThemeProvider>
  );
}
