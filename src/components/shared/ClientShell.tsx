"use client";

import Navbar from "@/components/shared/Navbar";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { AuthHydrationWrapper } from "@/components/shared/AuthHydrationWrapper";
import { useAuthStore } from "@/lib/stores/useAuthStore";

export default function ClientShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const isHydrated = useAuthStore((s) => s.isHydrated);

  return (
    <ThemeProvider>
      <AuthHydrationWrapper />
      {isHydrated && (
        <>
          <Navbar />
          {children}
        </>
      )}
    </ThemeProvider>
  );
}
