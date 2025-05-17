"use client";

import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
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
