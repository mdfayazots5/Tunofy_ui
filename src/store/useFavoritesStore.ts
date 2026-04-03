import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from './mmkvStorage';
import { FavoriteStation, FavoritesSortOption } from '../types/library';
import { Station } from '../types/home';

interface FavoritesState {
  favorites: FavoriteStation[];
  sortOption: FavoritesSortOption;
  
  // Actions
  addFavorite: (station: Station) => void;
  removeFavorite: (stationId: string) => void;
  toggleFavorite: (station: Station) => void;
  isFavorite: (stationId: string) => boolean;
  setSortOption: (option: FavoritesSortOption) => void;
  getSortedFavorites: () => FavoriteStation[];
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [
        {
          id: 's1',
          name: 'Vibe FM',
          logo: 'https://picsum.photos/seed/vibefm/200/200',
          genre: 'Electronic',
          country: 'UK',
          language: 'English',
          addedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
          playCount: 15,
        },
        {
          id: 's2',
          name: 'Jazz Central',
          logo: 'https://picsum.photos/seed/jazz/200/200',
          genre: 'Jazz',
          country: 'USA',
          language: 'English',
          addedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
          playCount: 8,
        },
        {
          id: 's6',
          name: 'Indie Wave',
          logo: 'https://picsum.photos/seed/indie/200/200',
          genre: 'Indie',
          country: 'USA',
          language: 'English',
          addedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
          playCount: 22,
        }
      ],
      sortOption: 'recently_added',

      addFavorite: (station) => {
        const { favorites } = get();
        if (favorites.some((f) => f.id === station.id)) return;

        const newFavorite: FavoriteStation = {
          ...station,
          addedAt: new Date().toISOString(),
          playCount: 0,
        };

        set({ favorites: [newFavorite, ...favorites] });
      },

      removeFavorite: (stationId) => {
        const { favorites } = get();
        set({ favorites: favorites.filter((f) => f.id !== stationId) });
      },

      toggleFavorite: (station) => {
        const { isFavorite, addFavorite, removeFavorite } = get();
        if (isFavorite(station.id)) {
          removeFavorite(station.id);
        } else {
          addFavorite(station);
        }
      },

      isFavorite: (stationId) => {
        return get().favorites.some((f) => f.id === stationId);
      },

      setSortOption: (option) => set({ sortOption: option }),

      getSortedFavorites: () => {
        const { favorites, sortOption } = get();
        const sorted = [...favorites];

        switch (sortOption) {
          case 'name':
            return sorted.sort((a, b) => a.name.localeCompare(b.name));
          case 'most_played':
            return sorted.sort((a, b) => b.playCount - a.playCount);
          case 'recently_added':
          default:
            return sorted.sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime());
        }
      },
    }),
    {
      name: 'favorites-storage',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);
