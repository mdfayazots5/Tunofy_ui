import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from '../utils/storage';

interface AppState {
  onboardingSeen: boolean;
  guestMode: boolean;
  startupResolved: boolean;
  isMaintenance: boolean;
  isUpdateRequired: boolean;
  isSessionExpired: boolean;
  setOnboardingSeen: (seen: boolean) => void;
  setGuestMode: (guest: boolean) => void;
  setStartupResolved: (resolved: boolean) => void;
  setMaintenance: (active: boolean) => void;
  setUpdateRequired: (required: boolean) => void;
  setSessionExpired: (expired: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      onboardingSeen: false,
      guestMode: false,
      startupResolved: false,
      isMaintenance: false,
      isUpdateRequired: false,
      isSessionExpired: false,
      setOnboardingSeen: (seen) => set({ onboardingSeen: seen }),
      setGuestMode: (guest) => set({ guestMode: guest }),
      setStartupResolved: (resolved) => set({ startupResolved: resolved }),
      setMaintenance: (active) => set({ isMaintenance: active }),
      setUpdateRequired: (required) => set({ isUpdateRequired: required }),
      setSessionExpired: (expired) => set({ isSessionExpired: expired }),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => mmkvStorage),
      partialize: (state) => ({
        onboardingSeen: state.onboardingSeen,
        guestMode: state.guestMode,
      }),
    }
  )
);
