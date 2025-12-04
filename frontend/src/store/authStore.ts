import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface User {
  name: string;
  phoneNumber: string;
  countryCode: string;
  countryName: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user: User) =>
        set({
          user,
          isAuthenticated: true,
        }),
      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "whatsapp-auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
