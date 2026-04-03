import { Station } from './home';

export interface FavoriteStation extends Station {
  addedAt: string;
  playCount: number;
}

export interface HistoryEntry {
  id: string;
  stationId: string;
  stationName: string;
  stationLogo: string;
  genre: string;
  playedAt: string;
}

export type NotificationType = 'featured_station' | 'app_update' | 'new_genre' | 'system';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  timestamp: string;
  isRead: boolean;
  deepLink?: string;
  metadata?: Record<string, any>;
}

export type FavoritesSortOption = 'name' | 'recently_added' | 'most_played';
