"use client";

import Navbar from "@/components/shared/Navbar";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { AuthHydrationWrapper } from "@/components/shared/AuthHydrationWrapper";
import { useAuthStore } from "@/lib/stores/useAuthStore";
import { GlobalSpinner } from "./GlobalSpinner";
import GlobalModal from "../ui/GlobalModal";
import { Toaster } from "sonner";

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
      <GlobalModal />
      <Toaster />

      {isHydrated && (
        <>
          <Navbar />
          {children}
        </>
      )}
    </ThemeProvider>
  );
}
