import { create } from "zustand";
import api from "@/lib/api";
import { ApplicationRead } from "@/types/application";

type NotificationStore = {
  notifications: ApplicationRead[];
  fetchNotifications: (userId: number) => Promise<void>;
  clearNotifications: () => void;
};

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  fetchNotifications: async (userId) => {
    try {
      const res = await api.applications.getReceivedApps(userId);
      const pending = res.filter((app) => app.status === "pending");
      set({ notifications: pending });
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  },
  clearNotifications: () => set({ notifications: [] }),
}));
