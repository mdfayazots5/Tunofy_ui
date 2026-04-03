import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { History, Trash2, Play } from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { spacing, borderRadius } from '../../theme/tokens';
import { useHistoryStore } from '../../store/useHistoryStore';
import { useAuthStore } from '../../store/useAuthStore';
import { useAppStore } from '../../store/useAppStore';
import { usePlayerStore } from '../../store/usePlayerStore';
import { RecentSectionHeader } from '../../components/library/RecentSectionHeader';
import { EmptyRecentState } from '../../components/common/EmptyRecentState';
import { GuestPromptFullScreen } from '../../components/library/GuestPromptFullScreen';
import { ClearHistoryConfirmationSheet } from '../../components/library/ClearHistoryConfirmationSheet';
import { AppRoutes, TabRoutes } from '../../navigation/navigation.constants';
import { formatRelativeTime } from '../../utils/libraryHelpers';
import { HorizontalCard } from '../../components/station/HorizontalCard';

export const RecentListeningScreen: React.FC<any> = ({ navigation }) => {
  const { colors, typography } = useTheme();
  const insets = useSafeAreaInsets();
  const { isAuthenticated } = useAuthStore();
  const { guestMode } = useAppStore();
  const { playStation } = usePlayerStore();
  const { 
    getGroupedHistory, 
    clearHistory, 
    removeHistoryEntry 
  } = useHistoryStore();

  const [refreshing, setRefreshing] = useState(false);
  const [clearSheetVisible, setClearSheetVisible] = useState(false);

  const sections = useMemo(() => getGroupedHistory(), [getGroupedHistory]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleStationPress = (stationId: string) => {
    navigation.navigate(AppRoutes.STATION_DETAILS, { stationId });
  };

  const handlePlayPress = (station: any) => {
    playStation(station);
    navigation.navigate(AppRoutes.FULL_PLAYER);
  };

  const handleDiscoverPress = () => {
    navigation.navigate(TabRoutes.SEARCH_STACK);
  };

  const handleSignInPress = () => {
    navigation.navigate('Auth');
  };

  if (!isAuthenticated && !guestMode) {
    return (
      <GuestPromptFullScreen
        title="Listening History"
        description="Sign in to keep track of your listening history across all your devices."
        onSignInPress={handleSignInPress}
      />
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + spacing.md, borderBottomColor: colors.border.subtle }]}>
        <Text style={[styles.headerTitle, { color: colors.text.primary, fontSize: typography.heading.h2.size }]}>
          History
        </Text>
        {sections.length > 0 && (
          <TouchableOpacity
            style={[styles.clearButton, { backgroundColor: colors.surface.card }]}
            onPress={() => setClearSheetVisible(true)}
          >
            <Trash2 size={20} color={colors.error} />
          </TouchableOpacity>
        )}
      </View>

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HorizontalCard
            station={{
              id: item.stationId,
              name: item.stationName,
              logo: item.stationLogo,
              genre: item.genre,
            } as any}
            onPress={() => handleStationPress(item.stationId)}
            onPlayPress={() => handlePlayPress({
              id: item.stationId,
              name: item.stationName,
              logo: item.stationLogo,
              genre: item.genre,
            } as any)}
            subtitle={formatRelativeTime(item.playedAt)}
            showFavoriteIcon={false}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <RecentSectionHeader title={title} />
        )}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: insets.bottom + spacing.xxl, paddingHorizontal: spacing.xl },
          sections.length === 0 && { flex: 1 },
        ]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.brand.primary} />
        }
        ListEmptyComponent={
          <EmptyRecentState
            onBrowse={handleDiscoverPress}
            isFullScreen={false}
          />
        }
      />

      <ClearHistoryConfirmationSheet
        visible={clearSheetVisible}
        onClose={() => setClearSheetVisible(false)}
        onConfirm={clearHistory}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontWeight: '800',
  },
  clearButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingTop: 0,
  },
});
