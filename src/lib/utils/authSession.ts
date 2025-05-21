import api from "@/lib/api";
import { useAuthStore } from "@/lib/stores/useAuthStore";

export async function restoreSession({
  redirectOnFail = false,
  router,
}: { redirectOnFail?: boolean; router?: any } = {}) {
  const { setAccessToken, setCurrentUser, logout, setHydrated } =
    useAuthStore.getState();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) throw new Error("Refresh failed");

    const { access_token } = await res.json();
    setAccessToken(access_token);

    const user = await api.users.getMe(access_token);
    setCurrentUser(user);
  } catch {
    logout();
    if (redirectOnFail && router) {
      router.replace("/login");
    }
  } finally {
    setHydrated(true);
  }
}
