import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import { usePlayerStore } from '../store/usePlayerStore';
import { useEffect, useRef } from 'react';

// Configure Audio Mode globally
Audio.setAudioModeAsync({
  allowsRecordingIOS: false,
  staysActiveInBackground: true,
  interruptionModeIOS: InterruptionModeIOS.DoNotMix,
  playsInSilentModeIOS: true,
  shouldDuckAndroid: true,
  interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
  playThroughEarpieceAndroid: false,
});

class AudioService {
  private sound: Audio.Sound | null = null;
  private currentUrl: string | null = null;

  async loadStream(url: string) {
    if (this.currentUrl === url && this.sound) {
      return;
    }

    await this.unload();
    this.currentUrl = url;

    const { setPlaybackState, setBuffering, setError } = usePlayerStore.getState();

    try {
      setPlaybackState('loading');
      setBuffering(true);

      const { sound } = await Audio.Sound.createAsync(
        { uri: url },
        { shouldPlay: true },
        (status) => {
          if (status.isLoaded) {
            setBuffering(status.isBuffering);
            if (status.didJustFinish) {
              setPlaybackState('idle');
            }
            if (status.isPlaying) {
              setPlaybackState('playing');
            } else {
              setPlaybackState('paused');
            }
          } else if (status.error) {
            setError(status.error);
          }
        }
      );

      this.sound = sound;
    } catch (e) {
      setError('Failed to load stream');
      console.error('Error loading stream:', e);
    }
  }

  async play() {
    if (this.sound) {
      await this.sound.playAsync();
    }
  }

  async pause() {
    if (this.sound) {
      await this.sound.pauseAsync();
    }
  }

  async stop() {
    if (this.sound) {
      await this.sound.stopAsync();
    }
  }

  async unload() {
    if (this.sound) {
      await this.sound.unloadAsync();
      this.sound = null;
      this.currentUrl = null;
    }
  }

  async setVolume(volume: number) {
    if (this.sound) {
      await this.sound.setVolumeAsync(volume);
    }
  }
}

export const audioService = new AudioService();

import { useHistoryStore } from '../store/useHistoryStore';

export const useAudioPlayer = () => {
  const { 
    currentStation, 
    playbackState, 
    volume, 
    isMuted, 
    pausePlayback, 
    resumePlayback, 
    stopPlayback 
  } = usePlayerStore();
  const { addHistoryEntry } = useHistoryStore();
  const prevStationId = useRef<string | null>(null);

  useEffect(() => {
    if (currentStation && currentStation.id !== prevStationId.current) {
      audioService.loadStream(currentStation.streamUrl);
      addHistoryEntry(currentStation);
      prevStationId.current = currentStation.id;
    }
  }, [currentStation, addHistoryEntry]);

  useEffect(() => {
    audioService.setVolume(isMuted ? 0 : volume);
  }, [volume, isMuted]);

  const togglePlayPause = async () => {
    if (playbackState === 'playing') {
      await audioService.pause();
      pausePlayback();
    } else {
      await audioService.play();
      resumePlayback();
    }
  };

  const retry = async () => {
    if (currentStation) {
      await audioService.loadStream(currentStation.streamUrl);
    }
  };

  const stop = async () => {
    await audioService.stop();
    stopPlayback();
  };

  return {
    togglePlayPause,
    retry,
    stop,
  };
};
