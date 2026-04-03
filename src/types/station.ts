import { Station } from './index';

export interface StationDetail extends Station {
  banner?: string;
  description: string;
  bitrate?: string;
  quality?: 'SD' | 'HD' | 'Ultra';
  tags: string[];
  isFavorite?: boolean;
  relatedStationIds: string[];
  moreLikeThisIds: string[];
  streamUrl: string;
}

export type PlaybackState = 'idle' | 'loading' | 'playing' | 'paused' | 'error';

export interface PlaybackStatus {
  state: PlaybackState;
  isBuffering: boolean;
  error?: string;
  position?: number;
  duration?: number;
}
