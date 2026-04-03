import { Station, Banner, Category } from '../types/home';

export const FEATURED_BANNERS: Banner[] = [
  {
    id: 'b1',
    stationId: 's1',
    title: 'Vibe FM',
    subtitle: 'The best of house and techno',
    imageUrl: 'https://picsum.photos/seed/vibefm/800/400',
    genre: 'Electronic',
  },
  {
    id: 'b2',
    stationId: 's2',
    title: 'Jazz Central',
    subtitle: 'Smooth jazz for your afternoon',
    imageUrl: 'https://picsum.photos/seed/jazz/800/400',
    genre: 'Jazz',
  },
  {
    id: 'b3',
    stationId: 's3',
    title: 'Rock Radio',
    subtitle: 'Classic rock hits all day long',
    imageUrl: 'https://picsum.photos/seed/rock/800/400',
    genre: 'Rock',
  },
];

export const TRENDING_STATIONS: Station[] = [
  {
    id: 's1',
    name: 'Vibe FM',
    logo: 'https://picsum.photos/seed/vibefm/200/200',
    genre: 'Electronic',
    country: 'UK',
    language: 'English',
    rank: 1,
  },
  {
    id: 's2',
    name: 'Jazz Central',
    logo: 'https://picsum.photos/seed/jazz/200/200',
    genre: 'Jazz',
    country: 'USA',
    language: 'English',
    rank: 2,
  },
  {
    id: 's3',
    name: 'Rock Radio',
    logo: 'https://picsum.photos/seed/rock/200/200',
    genre: 'Rock',
    country: 'USA',
    language: 'English',
    rank: 3,
  },
  {
    id: 's4',
    name: 'Pop Hits',
    logo: 'https://picsum.photos/seed/pop/200/200',
    genre: 'Pop',
    country: 'UK',
    language: 'English',
    rank: 4,
  },
  {
    id: 's5',
    name: 'Classical FM',
    logo: 'https://picsum.photos/seed/classical/200/200',
    genre: 'Classical',
    country: 'Germany',
    language: 'German',
    rank: 5,
  },
];

export const EDITOR_PICKS: Station[] = [
  {
    id: 's6',
    name: 'Indie Wave',
    logo: 'https://picsum.photos/seed/indie/200/200',
    genre: 'Indie',
    country: 'USA',
    language: 'English',
  },
  {
    id: 's7',
    name: 'Chill Beats',
    logo: 'https://picsum.photos/seed/chill/200/200',
    genre: 'Lo-Fi',
    country: 'Japan',
    language: 'Japanese',
  },
  {
    id: 's8',
    name: 'Global News',
    logo: 'https://picsum.photos/seed/news/200/200',
    genre: 'News',
    country: 'UK',
    language: 'English',
  },
];

export const CONTINUE_LISTENING: Station[] = [
  {
    id: 's1',
    name: 'Vibe FM',
    logo: 'https://picsum.photos/seed/vibefm/200/200',
    genre: 'Electronic',
    country: 'UK',
    language: 'English',
    lastPlayedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
  },
];

export const RECENTLY_PLAYED: Station[] = [
  {
    id: 's2',
    name: 'Jazz Central',
    logo: 'https://picsum.photos/seed/jazz/200/200',
    genre: 'Jazz',
    country: 'USA',
    language: 'English',
    lastPlayedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
  },
  {
    id: 's3',
    name: 'Rock Radio',
    logo: 'https://picsum.photos/seed/rock/200/200',
    genre: 'Rock',
    country: 'USA',
    language: 'English',
    lastPlayedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
  },
];

export const GENRES: Category[] = [
  { id: 'g1', name: 'Pop', type: 'genre' },
  { id: 'g2', name: 'Rock', type: 'genre' },
  { id: 'g3', name: 'Jazz', type: 'genre' },
  { id: 'g4', name: 'Electronic', type: 'genre' },
  { id: 'g5', name: 'Classical', type: 'genre' },
  { id: 'g6', name: 'Hip Hop', type: 'genre' },
  { id: 'g7', name: 'Country', type: 'genre' },
  { id: 'g8', name: 'Reggae', type: 'genre' },
];

export const LANGUAGES: Category[] = [
  { id: 'l1', name: 'English', type: 'language' },
  { id: 'l2', name: 'Spanish', type: 'language' },
  { id: 'l3', name: 'French', type: 'language' },
  { id: 'l4', name: 'German', type: 'language' },
  { id: 'l5', name: 'Japanese', type: 'language' },
  { id: 'l6', name: 'Chinese', type: 'language' },
  { id: 'l7', name: 'Hindi', type: 'language' },
  { id: 'l8', name: 'Arabic', type: 'language' },
];

export const COUNTRIES: Category[] = [
  { id: 'c1', name: 'USA', type: 'country' },
  { id: 'c2', name: 'UK', type: 'country' },
  { id: 'c3', name: 'Canada', type: 'country' },
  { id: 'c4', name: 'Australia', type: 'country' },
  { id: 'c5', name: 'Germany', type: 'country' },
  { id: 'c6', name: 'France', type: 'country' },
  { id: 'c7', name: 'Japan', type: 'country' },
  { id: 'c8', name: 'India', type: 'country' },
];

export const RECOMMENDED: Station[] = [
  {
    id: 's9',
    name: 'Synth Wave',
    logo: 'https://picsum.photos/seed/synth/200/200',
    genre: 'Electronic',
    country: 'France',
    language: 'French',
  },
  {
    id: 's10',
    name: 'Soul Radio',
    logo: 'https://picsum.photos/seed/soul/200/200',
    genre: 'Soul',
    country: 'USA',
    language: 'English',
  },
];

export const NEW_STATIONS: Station[] = [
  {
    id: 's11',
    name: 'Podcast FM',
    logo: 'https://picsum.photos/seed/podcast/200/200',
    genre: 'Talk',
    country: 'USA',
    language: 'English',
  },
];

export const MOST_FAVORITED: Station[] = [
  {
    id: 's12',
    name: 'Top 40 World',
    logo: 'https://picsum.photos/seed/top40/200/200',
    genre: 'Pop',
    country: 'UK',
    language: 'English',
  },
];
