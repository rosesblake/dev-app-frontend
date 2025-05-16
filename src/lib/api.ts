import { Project } from "@/types/project";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

const api = {
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
  },
};

export default api;
