"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { restoreSession } from "@/lib/utils/authSession";

export function ProtectedRouteWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    restoreSession({ redirectOnFail: true, router }).then(() => {
      setAuthorized(true);
    });
  }, [router]);

  if (!authorized) return null;
  return <>{children}</>;
}
