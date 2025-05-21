"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores/useAuthStore";

export function ProtectedRouteWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser, isHydrated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isHydrated && !currentUser) {
      router.replace("/login");
    }
  }, [isHydrated, currentUser, router]);

  if (!isHydrated) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p>Loading protected page...</p>
      </div>
    );
  }

  if (!currentUser) return null; // redirect is happening

  return <>{children}</>;
}
