"use client";
import { ProtectedRouteWrapper } from "@/components/shared/ProtectedRouteWrapper";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedRouteWrapper>{children}</ProtectedRouteWrapper>;
}
