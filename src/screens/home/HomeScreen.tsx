import React, { useMemo } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@theme/ThemeProvider';
import { spacing } from '@theme/tokens';
import { AppHeader } from '../../components/layout/AppHeader';
import { SearchShortcut } from '../../components/home/SearchShortcut';
import { HomeSectionRenderer } from '../../components/home/HomeSectionRenderer';
import { TabRoutes, SearchRoutes, AppRoutes } from '../../navigation/navigation.constants';
import { HomeSection, Station, Banner, Category } from '../../types/home';
import { useAuthStore } from '../../store/useAuthStore';
import { useAppStore } from '../../store/useAppStore';
import {
  FEATURED_BANNERS,
  TRENDING_STATIONS,
  EDITOR_PICKS,
  CONTINUE_LISTENING,
  RECENTLY_PLAYED,
  GENRES,
  LANGUAGES,
  COUNTRIES,
  RECOMMENDED,
  NEW_STATIONS,
  MOST_FAVORITED,
} from '../../mocks/homeData';

export const HomeScreen = ({ navigation }: any) => {
  const { colors } = useTheme();
  const { isAuthenticated, user } = useAuthStore();
  const { guestMode } = useAppStore();

  const sections: HomeSection[] = useMemo(() => {
    const baseSections: HomeSection[] = [
      {
        id: 'featured',
        type: 'banner_carousel',
        data: FEATURED_BANNERS,
      },
      {
        id: 'trending',
        type: 'trending_now',
        title: 'Trending Now',
        data: TRENDING_STATIONS,
      },
      {
        id: 'editor_picks',
        type: 'editor_picks',
        title: "Editor's Picks",
        data: EDITOR_PICKS,
      },
    ];

    if (isAuthenticated) {
      baseSections.push(
        {
          id: 'continue_listening',
          type: 'continue_listening',
          title: 'Continue Listening',
          data: CONTINUE_LISTENING,
        },
        {
          id: 'recently_played',
          type: 'recently_played',
          title: 'Recently Played',
          data: RECENTLY_PLAYED,
        }
      );
    } else {
      baseSections.push({
        id: 'guest_banner',
        type: 'guest_signin_banner',
        data: [{}],
      });
    }

    baseSections.push(
      {
        id: 'genres',
        type: 'browse_genre',
        title: 'Browse by Genre',
        data: GENRES,
      },
      {
        id: 'languages',
        type: 'browse_language',
        title: 'Browse by Language',
        data: LANGUAGES,
      },
      {
        id: 'countries',
        type: 'browse_country',
        title: 'Browse by Country',
        data: COUNTRIES,
      },
      {
        id: 'recommended',
        type: 'recommended',
        title: 'Recommended For You',
        data: RECOMMENDED,
      },
      {
        id: 'new',
        type: 'new_stations',
        title: 'New Stations',
        data: NEW_STATIONS,
      },
      {
        id: 'most_favorited',
        type: 'most_favorited',
        title: 'Most Favorited',
        data: MOST_FAVORITED,
      }
    );

    return baseSections;
  }, [isAuthenticated]);

  const handleStationPress = (station: Station) => {
    navigation.navigate(AppRoutes.STATION_DETAILS, { stationId: station.id });
  };

  const handleBannerPress = (banner: Banner) => {
    navigation.navigate(AppRoutes.STATION_DETAILS, { stationId: banner.stationId });
  };

  const handleCategoryPress = (category: Category) => {
    const screenMap: Record<string, string> = {
      genre: SearchRoutes.EXPLORE_GENRES,
      language: SearchRoutes.EXPLORE_LANGUAGES,
      country: SearchRoutes.EXPLORE_COUNTRIES,
    };
    navigation.navigate(TabRoutes.SEARCH_STACK, { screen: screenMap[category.type] });
  };

  const handleViewAllPress = (sectionType: string) => {
    // Logic for view all navigation
    console.log('View all:', sectionType);
  };

  const handleSearchPress = () => {
    navigation.navigate(TabRoutes.SEARCH_STACK, { screen: SearchRoutes.SEARCH });
  };

  const handleSignInPress = () => {
    navigation.navigate('Auth');
  };

  const renderHeader = () => (
    <View>
      <AppHeader
        title={isAuthenticated ? `Hi, ${user?.name || 'User'}` : 'Welcome to Tunofy'}
        showAvatar
        onAvatarPress={() => navigation.navigate('Profile')}
      />
      <SearchShortcut onPress={handleSearchPress} />
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.surface.main }]}>
      <StatusBar barStyle={colors.isDark ? 'light-content' : 'dark-content'} />
      <FlatList
        data={sections}
        renderItem={({ item }) => (
          <HomeSectionRenderer
            section={item}
            onStationPress={handleStationPress}
            onBannerPress={handleBannerPress}
            onCategoryPress={handleCategoryPress}
            onViewAllPress={handleViewAllPress}
            onSignInPress={handleSignInPress}
          />
        )}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingBottom: spacing.xl,
  },
});
