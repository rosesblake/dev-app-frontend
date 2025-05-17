import { create } from "zustand";

type ApplyModalStore = {
  isOpen: boolean;
  projectId: number | null;
  openModal: (projectId: number) => void;
  closeModal: () => void;
};

export const useApplyModal = create<ApplyModalStore>((set) => ({
  isOpen: false,
  projectId: null,
  openModal: (projectId) => set({ isOpen: true, projectId }),
  closeModal: () => set({ isOpen: false, projectId: null }),
}));
