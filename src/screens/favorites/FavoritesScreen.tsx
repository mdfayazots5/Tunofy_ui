import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Heart, ListFilter, Music } from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { spacing } from '../../theme/tokens';
import { useFavoritesStore } from '../../store/useFavoritesStore';
import { useAuthStore } from '../../store/useAuthStore';
import { useAppStore } from '../../store/useAppStore';
import { usePlayerStore } from '../../store/usePlayerStore';
import { HorizontalCard } from '../../components/station/HorizontalCard';
import { EmptyFavoritesState } from '../../components/common/EmptyFavoritesState';
import { GuestPromptFullScreen } from '../../components/library/GuestPromptFullScreen';
import { SortBottomSheet } from '../../components/library/SortBottomSheet';
import { AppRoutes, TabRoutes } from '../../navigation/navigation.constants';
import { FavoritesSortOption } from '../../types/library';

export const FavoritesScreen: React.FC<any> = ({ navigation }) => {
  const { colors, typography } = useTheme();
  const insets = useSafeAreaInsets();
  const { isAuthenticated } = useAuthStore();
  const { guestMode } = useAppStore();
  const { playStation } = usePlayerStore();
  const { 
    getSortedFavorites, 
    sortOption, 
    setSortOption, 
    removeFavorite 
  } = useFavoritesStore();

  const [refreshing, setRefreshing] = useState(false);
  const [sortSheetVisible, setSortSheetVisible] = useState(false);

  const favorites = useMemo(() => getSortedFavorites(), [getSortedFavorites, sortOption]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleStationPress = (station: any) => {
    navigation.navigate(AppRoutes.STATION_DETAILS, { stationId: station.id });
  };

  const handlePlayPress = (station: any) => {
    playStation(station);
    navigation.navigate(AppRoutes.FULL_PLAYER);
  };

  const handleBrowsePress = () => {
    navigation.navigate(TabRoutes.SEARCH_STACK);
  };

  const handleSignInPress = () => {
    navigation.navigate('Auth');
  };

  if (!isAuthenticated && !guestMode) {
    return (
      <GuestPromptFullScreen
        title="Your Favorites"
        description="Sign in to save your favorite stations and access them from any device."
        onSignInPress={handleSignInPress}
      />
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + spacing.md, borderBottomColor: colors.border.subtle }]}>
        <Text style={[styles.headerTitle, { color: colors.text.primary, fontSize: typography.heading.h2.size }]}>
          My Favorites
        </Text>
        {favorites.length > 0 && (
          <TouchableOpacity
            style={[styles.sortButton, { backgroundColor: colors.surface.card }]}
            onPress={() => setSortSheetVisible(true)}
          >
            <ListFilter size={20} color={colors.brand.primary} />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HorizontalCard
            station={item}
            onPress={() => handleStationPress(item)}
            onPlayPress={() => handlePlayPress(item)}
            showFavoriteIcon
            isFavorite={true}
            onFavoritePress={() => removeFavorite(item.id)}
          />
        )}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: insets.bottom + spacing.xxl, paddingHorizontal: spacing.xl },
          favorites.length === 0 && { flex: 1 },
        ]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.brand.primary} />
        }
        ListEmptyComponent={
          <EmptyFavoritesState
            onBrowse={handleBrowsePress}
            isFullScreen={false}
          />
        }
      />

      <SortBottomSheet
        visible={sortSheetVisible}
        onClose={() => setSortSheetVisible(false)}
        currentOption={sortOption}
        onSelect={setSortOption}
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
  sortButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingTop: spacing.md,
  },
});
