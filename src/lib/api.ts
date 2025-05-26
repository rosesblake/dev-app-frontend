import { ApplicationCreate, ApplicationRead } from "@/types/application";
import { Project, ProjectCreate, ProjectRead } from "@/types/project";
import { authFetch } from "@/lib/utils/authFetch";
import { User } from "@/types/user";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

const api = {
  users: {
    login: async (
      email: string,
      password: string
    ): Promise<{ access_token: string }> => {
      const form = new URLSearchParams();
      form.append("username", email);
      form.append("password", password);

      const res = await fetch(`${API_URL}/auth/token/`, {
        method: "POST",
        body: form,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        credentials: "include",
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Login failed: ${errText}`);
      }

      return res.json();
    },
    register: async (user: {
      name: string;
      email: string;
      password: string;
    }): Promise<{ access_token: string }> => {
      const res = await fetch(`${API_URL}/users/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...user,
          bio: null,
          github_url: null,
          portfolio_url: null,
        }),
      });
      if (!res.ok) {
        const err = await res.text();
        throw new Error(`Register failed: ${err}`);
      }
      return await api.users.login(user.email, user.password);
    },
    getMe: async (token: string): Promise<User> => {
      const res = await fetch(`${API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to fetch current user");
      return res.json();
    },
    logout: async (): Promise<void> => {
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    },
    applications: async (userId: number): Promise<ApplicationRead[]> => {
      return authFetch(`/applications/user/${userId}`);
    },
  },
  projects: {
    list: async (): Promise<Project[]> => {
      const res = await fetch(`${API_URL}/projects/`);
      if (!res.ok) throw new Error("Failed to fetch projects");
      return res.json();
    },
    getBySlug: async (slug: string): Promise<Project | null> => {
      const res = await fetch(`${API_URL}/projects/${slug}`, {
        cache: "no-store",
      });
      if (!res.ok) return null;
      return res.json();
    },
    create: async (data: ProjectCreate): Promise<ProjectRead> => {
      return authFetch("/projects/", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
  },
  applications: {
    apply: async (data: ApplicationCreate): Promise<ApplicationRead> => {
      return authFetch("/applications/", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    getUserApps: async (userId: number): Promise<ApplicationRead[]> => {
      return authFetch(`/applications/user/${userId}`);
    },
    getReceivedApps: async (userId: number): Promise<ApplicationRead[]> => {
      return authFetch(`/applications/received/${userId}`);
    },
    getProjectApps: async (projectId: number): Promise<ApplicationRead[]> => {
      return authFetch(`/applications/project/${projectId}`);
    },
  },
};

export default api;
