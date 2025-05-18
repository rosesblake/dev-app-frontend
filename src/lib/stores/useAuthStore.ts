import { create } from "zustand";
import { User } from "@/types/user";

type AuthState = {
  accessToken: string | null;
  currentUser: User | null;
  isHydrated: boolean;
  setAccessToken: (token: string) => void;
  setCurrentUser: (user: User) => void;
  logout: () => void;
  setHydrated: (value: boolean) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  currentUser: null,
  isHydrated: false,
  setAccessToken: (token) => set({ accessToken: token }),
  setCurrentUser: (user) => set({ currentUser: user }),
  logout: () => set({ accessToken: null, currentUser: null }),
  setHydrated: (value) => set({ isHydrated: value }),
}));
