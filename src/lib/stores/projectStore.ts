import { create } from "zustand";
import api from "@/lib/api";
import { Project } from "@/types/project";

interface ProjectStore {
  projects: Project[];
  loading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  loading: false,
  error: null,

  fetchProjects: async () => {
    set({ loading: true, error: null });
    try {
      const data = await api.projects.list();
      set({ projects: data, loading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to load", loading: false });
    }
  },
}));
