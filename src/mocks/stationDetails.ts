import { StationDetail } from '../types/station';
import { SEARCH_STATIONS } from './searchData';

export const mockStationDetails: Record<string, StationDetail> = {
  '1': {
    ...SEARCH_STATIONS[0],
    banner: 'https://picsum.photos/seed/vibrant/1920/1080?blur=4',
    description: 'Vibrant Radio is your ultimate destination for the latest in electronic dance music. From deep house to high-energy trance, we bring you the beats that keep the world moving. Join our community of music lovers and experience the energy of the global dance floor.',
    bitrate: '128kbps',
    quality: 'HD',
    tags: ['Electronic', 'Dance', 'Club', 'Vibrant'],
    isFavorite: false,
    relatedStationIds: ['2', '3', '4'],
    moreLikeThisIds: ['5', '6', '7'],
    streamUrl: 'https://stream.vibrantradio.com/live',
  },
  '2': {
    ...SEARCH_STATIONS[1],
    banner: 'https://picsum.photos/seed/chill/1920/1080?blur=4',
    description: 'Chill Beats provides the perfect soundtrack for your relaxation, study, or focus sessions. Our curated selection of lo-fi, ambient, and downtempo tracks will help you find your zen in a busy world.',
    bitrate: '128kbps',
    quality: 'HD',
    tags: ['Chill', 'Lo-fi', 'Ambient', 'Relax'],
    isFavorite: true,
    relatedStationIds: ['1', '3', '8'],
    moreLikeThisIds: ['9', '10', '11'],
    streamUrl: 'https://stream.chillbeats.com/live',
  },
  '3': {
    ...SEARCH_STATIONS[2],
    banner: 'https://picsum.photos/seed/urban/1920/1080?blur=4',
    description: 'Urban Flow is the heart of the city, bringing you the best in hip-hop, R&B, and soul. From underground classics to the latest chart-toppers, we keep the flow moving 24/7.',
    bitrate: '128kbps',
    quality: 'HD',
    tags: ['Urban', 'Hip-Hop', 'R&B', 'Soul'],
    isFavorite: false,
    relatedStationIds: ['1', '2', '4'],
    moreLikeThisIds: ['12', '13', '14'],
    streamUrl: 'https://stream.urbanflow.com/live',
  },
};

// Helper to get station details by ID
export const getStationDetail = (id: string): StationDetail => {
  const found = mockStationDetails[id] || SEARCH_STATIONS.find(s => s.id === id);
  
  if (found) {
    return {
      ...found,
      description: (found as any).description || 'No description available for this station.',
      tags: (found as any).tags || [],
      relatedStationIds: (found as any).relatedStationIds || [],
      moreLikeThisIds: (found as any).moreLikeThisIds || [],
      streamUrl: (found as any).streamUrl || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      banner: (found as any).banner || 'https://picsum.photos/seed/music/1920/1080?blur=4',
      logo: (found as any).logo || 'https://picsum.photos/seed/music/200/200',
      isFavorite: (found as any).isFavorite || false,
      bitrate: (found as any).bitrate || '128kbps',
      quality: (found as any).quality || 'HD',
    } as StationDetail;
  }

  // Ultimate fallback for demo
  return {
    id: id,
    name: 'Demo Station',
    logo: 'https://picsum.photos/seed/demo/200/200',
    banner: 'https://picsum.photos/seed/demo/1920/1080?blur=4',
    genre: 'Various',
    country: 'Global',
    language: 'English',
    description: 'This is a demo station for Tunofy. Enjoy the best music from around the world.',
    bitrate: '128kbps',
    quality: 'HD',
    tags: ['Demo', 'Tunofy', 'Music'],
    isFavorite: false,
    relatedStationIds: [],
    moreLikeThisIds: [],
    streamUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  };
};
