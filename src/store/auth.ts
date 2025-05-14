import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface IUser {
  _id: string;
  fullName: string;
  phoneNumber: string;
  password: string;
  address: string;
  accountNumber: number;
  role: "user" | "admin";
}

interface AuthState {
  user: IUser | null;
  token: string | null;
  setUser: (user: IUser) => void;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);
