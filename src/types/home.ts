export interface Station {
  id: string;
  name: string;
  logo: string;
  genre: string;
  country: string;
  language: string;
  isFavorite?: boolean;
  rank?: number;
  lastPlayedAt?: string;
  streamUrl?: string;
  description?: string;
}

export interface Banner {
  id: string;
  stationId: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  genre: string;
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
  type: 'genre' | 'language' | 'country';
}

export type HomeSectionType =
  | 'banner_carousel'
  | 'trending_now'
  | 'editor_picks'
  | 'continue_listening'
  | 'recently_played'
  | 'browse_genre'
  | 'browse_language'
  | 'browse_country'
  | 'recommended'
  | 'new_stations'
  | 'most_favorited'
  | 'guest_signin_banner';

export interface HomeSection {
  id: string;
  type: HomeSectionType;
  title?: string;
  data: any[];
  isLoading?: boolean;
  isError?: boolean;
  isEmpty?: boolean;
}
