import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from './mmkvStorage';
import { HistoryEntry } from '../types/library';
import { Station } from '../types/home';

interface HistoryState {
  history: HistoryEntry[];
  
  // Actions
  addHistoryEntry: (station: Station) => void;
  clearHistory: () => void;
  removeHistoryEntry: (id: string) => void;
  getGroupedHistory: () => { title: string; data: HistoryEntry[] }[];
}

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set, get) => ({
      history: [
        {
          id: 'h1',
          stationId: 's1',
          stationName: 'Vibe FM',
          stationLogo: 'https://picsum.photos/seed/vibefm/200/200',
          genre: 'Electronic',
          playedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 mins ago
        },
        {
          id: 'h2',
          stationId: 's7',
          stationName: 'Chill Beats',
          stationLogo: 'https://picsum.photos/seed/chill/200/200',
          genre: 'Lo-Fi',
          playedAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
        },
        {
          id: 'h3',
          stationId: 's3',
          stationName: 'Rock Radio',
          stationLogo: 'https://picsum.photos/seed/rock/200/200',
          genre: 'Rock',
          playedAt: new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString(), // Yesterday
        }
      ],

      addHistoryEntry: (station) => {
        const { history } = get();
        
        // Remove existing entry for same station if it's very recent (within 5 mins)
        const fiveMinsAgo = Date.now() - 1000 * 60 * 5;
        const recentEntryIndex = history.findIndex(
          (h) => h.stationId === station.id && new Date(h.playedAt).getTime() > fiveMinsAgo
        );

        const newEntry: HistoryEntry = {
          id: `${station.id}-${Date.now()}`,
          stationId: station.id,
          stationName: station.name,
          stationLogo: station.logo,
          genre: station.genre,
          playedAt: new Date().toISOString(),
        };

        if (recentEntryIndex !== -1) {
          const updatedHistory = [...history];
          updatedHistory.splice(recentEntryIndex, 1);
          set({ history: [newEntry, ...updatedHistory] });
        } else {
          set({ history: [newEntry, ...history] });
        }
      },

      clearHistory: () => set({ history: [] }),

      removeHistoryEntry: (id) => {
        const { history } = get();
        set({ history: history.filter((h) => h.id !== id) });
      },

      getGroupedHistory: () => {
        const { history } = get();
        const groups: Record<string, HistoryEntry[]> = {
          Today: [],
          Yesterday: [],
          'This Week': [],
          Earlier: [],
        };

        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const thisWeek = new Date(today);
        thisWeek.setDate(thisWeek.getDate() - 7);

        history.forEach((entry) => {
          const playedDate = new Date(entry.playedAt);
          if (playedDate >= today) {
            groups.Today.push(entry);
          } else if (playedDate >= yesterday) {
            groups.Yesterday.push(entry);
          } else if (playedDate >= thisWeek) {
            groups['This Week'].push(entry);
          } else {
            groups.Earlier.push(entry);
          }
        });

        return Object.entries(groups)
          .filter(([_, data]) => data.length > 0)
          .map(([title, data]) => ({ title, data }));
      },
    }),
    {
      name: 'history-storage',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);
