import { useAuthStore } from "@/lib/stores/useAuthStore";

export async function authFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const { accessToken, setAccessToken, logout } = useAuthStore.getState();

  const fetchWithToken = async (token: string | null) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });

    return res;
  };

  let res = await fetchWithToken(accessToken);

  if (res.status === 401) {
    const refreshed = await tryRefreshToken();
    if (refreshed) {
      res = await fetchWithToken(refreshed);
    } else {
      logout();
      throw new Error("Session expired");
    }
  }

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(errText);
  }

  return res.json();
}

async function tryRefreshToken(): Promise<string | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) return null;

  const { access_token } = await res.json();
  useAuthStore.getState().setAccessToken(access_token);
  return access_token;
}
