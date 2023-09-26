import { create } from 'zustand'

type State = {
  accessToken: string | null;
  refreshToken: string | null;
};

type Actions = {
  setAccessToken: (accessToken: string | null) => void;
  setRefreshToken: (refreshToken: string | null) => void;
};

export const useAuthStore = create<State & Actions>((set) => ({
  accessToken: null,
  refreshToken: null,
  setAccessToken: (accessToken) => set({ accessToken }),
  setRefreshToken: (refreshToken) => set({ refreshToken }),
}));
