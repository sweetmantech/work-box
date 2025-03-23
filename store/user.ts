import { create } from 'zustand';

interface Wallet {
  wallet: string | null;
}

interface UserState {
    wallet: Wallet | null;
  setUser: (user: Wallet | null) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    wallet: null,
  setUser: (w) => set({ wallet: w }),
  clearUser: () => set({ wallet: null }),
}));

