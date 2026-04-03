import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { ChevronLeft, Play, Pause } from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { AppRoutes } from '../../navigation/navigation.constants';
import { AppStackParamList } from '../../navigation/navigation.types';
import { StationHero } from '../../components/station/StationHero';
import { StationMetaChips } from '../../components/station/StationMetaChips';
import { ExpandableDescription } from '../../components/station/ExpandableDescription';
import { StationActionRow } from '../../components/station/StationActionRow';
import { QualityBadge } from '../../components/station/QualityBadge';
import { SectionHeader } from '../../components/layout/SectionHeader';
import { HorizontalCard } from '../../components/station/HorizontalCard';
import { CompactListRow } from '../../components/station/CompactListRow';
import { shareStation } from '../../utils/shareHelper';
import { getStationDetail } from '../../mocks/stationDetails';
import { StationDetail } from '../../types/station';
import { usePlayerStore } from '../../store/usePlayerStore';
import { useAudioPlayer } from '../../services/audioService';
import { useAuthStore } from '../../store/useAuthStore';
import { SEARCH_STATIONS } from '../../mocks/searchData';

type StationDetailsRouteProp = RouteProp<AppStackParamList, AppRoutes.STATION_DETAILS>;

import { useFavoritesStore } from '../../store/useFavoritesStore';

export const StationDetailsScreen: React.FC = () => {
  const route = useRoute<StationDetailsRouteProp>();
  const navigation = useNavigation<any>();
  const { colors, spacing, typography } = useTheme();
  const { stationId } = route.params;
  
  const [station, setStation] = useState<StationDetail | null>(null);
  const [loading, setLoading] = useState(true);
  
  const { currentStation, playbackState, playStation } = usePlayerStore();
  const { togglePlayPause } = useAudioPlayer();
  const { user } = useAuthStore();
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const guestMode = !user;

  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Simulate API fetch
    setLoading(true);
    const detail = getStationDetail(stationId);
    setTimeout(() => {
      setStation(detail || null);
      setLoading(false);
    }, 500);
  }, [stationId]);

  const isCurrentStation = currentStation?.id === stationId;
  const isPlaying = isCurrentStation && playbackState === 'playing';
  const isStationFavorite = isFavorite(stationId);

  const handlePlayPress = () => {
    if (isCurrentStation) {
      togglePlayPause();
    } else if (station) {
      playStation(station);
      navigation.navigate(AppRoutes.FULL_PLAYER, { stationId: station.id });
    }
  };

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

  const handleReportPress = () => {
    navigation.navigate(AppRoutes.TABS, {
      screen: 'ProfileStack',
      params: { screen: 'Feedback' }
    });
  };

  const headerOpacity = scrollY.interpolate({
    inputRange: [150, 200],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  if (loading) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!station) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>Station not found</Text>
      </View>
    );
  }

  const relatedStations = SEARCH_STATIONS.filter(s => station.relatedStationIds.includes(s.id));
  const moreLikeThis = SEARCH_STATIONS.filter(s => station.moreLikeThisIds.includes(s.id));

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Sticky Header */}
      <Animated.View style={[styles.stickyHeader, { backgroundColor: colors.surface, opacity: headerOpacity, paddingTop: 50 }]}>
        <View style={styles.headerContent}>
          <Text style={[styles.headerTitle, { color: colors.text, fontSize: typography.size.md }]} numberOfLines={1}>
            {station.name}
          </Text>
          <TouchableOpacity onPress={handlePlayPress} style={[styles.headerPlay, { backgroundColor: colors.primary }]}>
            {isPlaying ? (
              <Pause size={16} color={colors.background} fill={colors.background} />
            ) : (
              <Play size={16} color={colors.background} fill={colors.background} />
            )}
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Back Button */}
      <TouchableOpacity
        style={[styles.backButton, { backgroundColor: 'rgba(0,0,0,0.3)' }]}
        onPress={() => navigation.goBack()}
      >
        <ChevronLeft size={28} color="#FFF" />
      </TouchableOpacity>

      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <StationHero banner={station.banner} logo={station.logo} />

        <View style={[styles.content, { padding: spacing.lg, marginTop: spacing.xl }]}>
          <Text style={[styles.title, { color: colors.text, fontSize: typography.size.xxl }]}>
            {station.name}
          </Text>
          
          <View style={{ marginVertical: spacing.md }}>
            <StationMetaChips
              genre={station.genre}
              language={station.language}
              country={station.country}
            />
          </View>

          <ExpandableDescription text={station.description} />

          <View style={{ marginVertical: spacing.lg }}>
            <StationActionRow
              isPlaying={isPlaying}
              isFavorite={isStationFavorite}
              onPlayPress={handlePlayPress}
              onFavoritePress={handleFavoritePress}
              onSharePress={handleSharePress}
              onReportPress={handleReportPress}
            />
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.lg }}>
            <QualityBadge quality={station.quality} bitrate={station.bitrate} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: spacing.xs }}>
              {station.tags.map(tag => (
                <View key={tag} style={[styles.tag, { backgroundColor: colors.surface }]}>
                  <Text style={[styles.tagText, { color: colors.textSecondary, fontSize: typography.size.xs }]}>#{tag}</Text>
                </View>
              ))}
            </ScrollView>
          </View>

          {relatedStations.length > 0 && (
            <View style={{ marginBottom: spacing.xl }}>
              <SectionHeader title="Related Stations" />
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: spacing.md }}>
                {relatedStations.map(item => (
                  <HorizontalCard
                    key={item.id}
                    station={item}
                    onPress={() => navigation.push(AppRoutes.STATION_DETAILS, { stationId: item.id })}
                  />
                ))}
              </ScrollView>
            </View>
          )}

          {moreLikeThis.length > 0 && (
            <View>
              <SectionHeader title="More Like This" />
              {moreLikeThis.map(item => (
                <CompactListRow
                  key={item.id}
                  station={item}
                  onPress={() => navigation.push(AppRoutes.STATION_DETAILS, { stationId: item.id })}
                />
              ))}
            </View>
          )}
        </View>
      </Animated.ScrollView>
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
  stickyHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    height: 100,
    justifyContent: 'center',
    paddingHorizontal: 60,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontWeight: '700',
    flex: 1,
  },
  headerPlay: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  title: {
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tagText: {
    fontWeight: '600',
  },
});
