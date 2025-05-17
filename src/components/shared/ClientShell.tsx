"use client";

import Navbar from "@/components/shared/Navbar";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import ApplyModal from "@/lib/modals/ApplyModal";

export default function ClientShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <Navbar />
      {children}
      <ApplyModal />
    </ThemeProvider>
  );
}
