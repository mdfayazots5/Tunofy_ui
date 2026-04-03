import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import { 
  ChevronDown, 
  Heart, 
  Play, 
  Pause, 
  Share2, 
  Clock, 
  Speaker 
} from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { AppRoutes } from '../../navigation/navigation.constants';
import { shareStation } from '../../utils/shareHelper';
import { usePlayerStore } from '../../store/usePlayerStore';
import { useAudioPlayer } from '../../services/audioService';
import { useAuthStore } from '../../store/useAuthStore';
import { LiveBadge } from '../../components/player/LiveBadge';
import { PlayerArtwork } from '../../components/player/PlayerArtwork';
import { PlayerControlButton } from '../../components/player/PlayerControlButton';
import { PlayerStatusState } from '../../components/player/PlayerStatusState';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

import { useFavoritesStore } from '../../store/useFavoritesStore';

export const FullPlayerScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { colors, spacing, typography } = useTheme();
  const { user } = useAuthStore();
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const guestMode = !user;

  const { currentStation, playbackState, isBuffering, error } = usePlayerStore();
  const { togglePlayPause, retry } = useAudioPlayer();

  const station = currentStation;
  const isStationFavorite = station ? isFavorite(station.id) : false;

  const handleFavoritePress = () => {
    if (guestMode) {
      navigation.navigate(AppRoutes.GUEST_RESTRICTED_PROMPT);
    } else if (station) {
      toggleFavorite(station);
    }
  };

  const handleSharePress = async () => {
    if (!station) return;
    await shareStation(station.name, station.id);
  };

  if (!station) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>No station playing</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
          <Text style={{ color: colors.primary }}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Background Artwork with Blur */}
      <Image source={{ uri: station.banner || station.logo }} style={StyleSheet.absoluteFill} />
      <BlurView intensity={80} tint="dark" style={StyleSheet.absoluteFill} />
      <LinearGradient
        colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,0.95)']}
        style={StyleSheet.absoluteFill}
      />

      {/* Header */}
      <View style={[styles.header, { paddingTop: 60, paddingHorizontal: spacing.lg }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
          <ChevronDown size={32} color="#FFF" />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: '#FFF', fontSize: typography.size.sm }]}>
          NOW PLAYING
        </Text>
        <View style={{ width: 32 }} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <PlayerArtwork logo={station.logo} />

        <View style={[styles.info, { marginTop: spacing.xl, paddingHorizontal: spacing.xl }]}>
          <View style={styles.titleRow}>
            <Text style={[styles.stationName, { color: '#FFF', fontSize: typography.size.xxl }]} numberOfLines={1}>
              {station.name}
            </Text>
            <LiveBadge />
          </View>
          <Text style={[styles.stationMeta, { color: 'rgba(255,255,255,0.6)', fontSize: typography.size.md }]}>
            {station.genre} • {station.country}
          </Text>
        </View>

        {/* Status / Error States */}
        <View style={styles.statusContainer}>
          {playbackState === 'error' ? (
            <PlayerStatusState
              type="error"
              message={error || 'Stream unavailable'}
              onRetry={retry}
            />
          ) : isBuffering ? (
            <View style={styles.buffering}>
              <ActivityIndicator color={colors.primary} size="large" />
              <Text style={[styles.statusText, { color: colors.primary, marginTop: spacing.sm }]}>
                Connecting...
              </Text>
            </View>
          ) : null}
        </View>

        {/* Primary Controls */}
        <View style={[styles.controls, { gap: spacing.xl }]}>
          <TouchableOpacity onPress={handleFavoritePress}>
            <Heart size={28} color={isStationFavorite ? colors.error : '#FFF'} fill={isStationFavorite ? colors.error : 'transparent'} />
          </TouchableOpacity>

          <PlayerControlButton
            primary
            size={80}
            loading={isBuffering}
            icon={
              playbackState === 'playing' ? (
                <Pause size={40} color={colors.background} fill={colors.background} />
              ) : (
                <Play size={40} color={colors.background} fill={colors.background} />
              )
            }
            onPress={togglePlayPause}
          />

          <TouchableOpacity onPress={handleSharePress}>
            <Share2 size={28} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Secondary Controls */}
        <View style={[styles.secondaryControls, { marginTop: spacing.xxl, gap: spacing.xxl }]}>
          <TouchableOpacity style={styles.secondaryButton}>
            <Clock size={24} color="rgba(255,255,255,0.6)" />
            <Text style={[styles.secondaryText, { color: 'rgba(255,255,255,0.6)', fontSize: typography.size.xs }]}>
              Sleep Timer
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton}>
            <Speaker size={24} color="rgba(255,255,255,0.6)" />
            <Text style={[styles.secondaryText, { color: 'rgba(255,255,255,0.6)', fontSize: typography.size.xs }]}>
              AirPlay
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  closeButton: {
    padding: 4,
  },
  headerTitle: {
    fontWeight: '800',
    letterSpacing: 2,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 60,
  },
  info: {
    alignItems: 'center',
    width: '100%',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 4,
  },
  stationName: {
    fontWeight: '800',
    textAlign: 'center',
    maxWidth: width * 0.6,
  },
  stationMeta: {
    fontWeight: '500',
  },
  statusContainer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  buffering: {
    alignItems: 'center',
  },
  statusText: {
    fontWeight: '700',
    letterSpacing: 1,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  secondaryControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButton: {
    alignItems: 'center',
    gap: 8,
  },
  secondaryText: {
    fontWeight: '600',
  },
});
