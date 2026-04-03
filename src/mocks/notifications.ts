import { AppNotification } from '../types/library';

export const MOCK_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'n1',
    type: 'featured_station',
    title: 'New Featured Station',
    body: 'Vibe FM is now featured! Check out the latest electronic beats.',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
    isRead: false,
    deepLink: 'StationDetails',
    metadata: { stationId: 's1' },
  },
  {
    id: 'n2',
    type: 'new_genre',
    title: 'Explore Jazz',
    body: 'We added 50+ new Jazz stations from around the world.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    isRead: true,
    deepLink: 'ExploreGenres',
  },
  {
    id: 'n3',
    type: 'app_update',
    title: 'App Update Available',
    body: 'Version 1.2.0 is out! Enjoy a smoother playback experience.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    isRead: false,
  },
  {
    id: 'n4',
    type: 'system',
    title: 'Welcome to Tunofy',
    body: 'Start exploring and favorite your first station!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
    isRead: true,
  },
];
