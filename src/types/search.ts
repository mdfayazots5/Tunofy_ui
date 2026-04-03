import { Station, Category } from './home';

export interface SearchHistoryItem {
  id: string;
  query: string;
  timestamp: number;
}

export interface FilterState {
  genres: string[];
  languages: string[];
  countries: string[];
  sortBy: 'popularity' | 'name' | 'recent';
}

export interface SearchResult {
  stations: Station[];
  genres: Category[];
  countries: Category[];
}

export interface ExploreGenre extends Category {
  icon: string;
  color: string;
}

export interface ExploreLanguage extends Category {
  stationCount: number;
}

export interface ExploreCountry extends Category {
  flag: string;
  stationCount: number;
}
