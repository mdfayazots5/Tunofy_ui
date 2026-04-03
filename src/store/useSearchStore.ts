import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from './mmkvStorage';
import { SearchHistoryItem, FilterState } from '../types/search';

interface SearchState {
  history: SearchHistoryItem[];
  filters: FilterState;
  addHistory: (query: string) => void;
  removeHistory: (id: string) => void;
  clearHistory: () => void;
  setFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;
}

const initialFilters: FilterState = {
  genres: [],
  languages: [],
  countries: [],
  sortBy: 'popularity',
};

export const useSearchStore = create<SearchState>()(
  persist(
    (set) => ({
      history: [],
      filters: initialFilters,
      addHistory: (query) =>
        set((state) => {
          const newHistory = [
            { id: Date.now().toString(), query, timestamp: Date.now() },
            ...state.history.filter((h) => h.query !== query),
          ].slice(0, 10);
          return { history: newHistory };
        }),
      removeHistory: (id) =>
        set((state) => ({
          history: state.history.filter((h) => h.id !== id),
        })),
      clearHistory: () => set({ history: [] }),
      setFilters: (filters) =>
        set((state) => ({
          filters: { ...state.filters, ...filters },
        })),
      resetFilters: () => set({ filters: initialFilters }),
    }),
    {
      name: 'tunofy-search-storage',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);
