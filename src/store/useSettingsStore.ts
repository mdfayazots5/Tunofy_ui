import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from './mmkvStorage';
import { AppSettings, AppTheme } from '../types/profile';

interface SettingsState extends AppSettings {
  setPushNotifications: (enabled: boolean) => void;
  setTheme: (theme: AppTheme) => void;
  setPlaybackQuality: (quality: AppSettings['playbackQuality']) => void;
  setDefaultLanguage: (language: string) => void;
  setDefaultCountry: (country: string) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      pushNotifications: true,
      theme: 'system',
      playbackQuality: 'auto',
      defaultLanguage: 'en',
      defaultCountry: 'us',
      appVersion: '1.0.0',

      setPushNotifications: (enabled) => set({ pushNotifications: enabled }),
      setTheme: (theme) => set({ theme }),
      setPlaybackQuality: (quality) => set({ playbackQuality: quality }),
      setDefaultLanguage: (language) => set({ defaultLanguage: language }),
      setDefaultCountry: (country) => set({ defaultCountry: country }),
    }),
    {
      name: 'tunofy-settings',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);
