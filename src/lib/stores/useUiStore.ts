import { create } from "zustand";

interface UiStore {
  isLoading: boolean;
  setLoading: (val: boolean) => void;
}

export const useUiStore = create<UiStore>((set) => ({
  isLoading: false,
  setLoading: (val) => set({ isLoading: val }),
}));
