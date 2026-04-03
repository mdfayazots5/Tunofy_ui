import { create } from 'zustand';
import { StationDetail, PlaybackState } from '../types/station';

interface PlayerState {
  currentStation: StationDetail | null;
  playbackState: PlaybackState;
  isBuffering: boolean;
  error: string | null;
  isMuted: boolean;
  volume: number;
  
  // Actions
  playStation: (station: StationDetail) => void;
  pausePlayback: () => void;
  resumePlayback: () => void;
  stopPlayback: () => void;
  setPlaybackState: (state: PlaybackState) => void;
  setBuffering: (isBuffering: boolean) => void;
  setError: (error: string | null) => void;
  toggleMute: () => void;
  setVolume: (volume: number) => void;
  clearPlayer: () => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  currentStation: null,
  playbackState: 'idle',
  isBuffering: false,
  error: null,
  isMuted: false,
  volume: 1.0,

  playStation: (station) => set({ 
    currentStation: station, 
    playbackState: 'loading', 
    error: null 
  }),
  pausePlayback: () => set({ playbackState: 'paused' }),
  resumePlayback: () => set({ playbackState: 'playing' }),
  stopPlayback: () => set({ playbackState: 'idle' }),
  setPlaybackState: (state) => set({ playbackState: state }),
  setBuffering: (isBuffering) => set({ isBuffering }),
  setError: (error) => set({ error, playbackState: error ? 'error' : 'idle' }),
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  setVolume: (volume) => set({ volume }),
  clearPlayer: () => set({ 
    currentStation: null, 
    playbackState: 'idle', 
    isBuffering: false, 
    error: null 
  }),
}));
