import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { spacing } from '@theme/tokens';
import { HomeSection, Station, Banner, Category } from '../../types/home';
import { SectionHeader } from '../layout/SectionHeader';
import { VerticalCard } from '../station/VerticalCard';
import { HorizontalCard } from '../station/HorizontalCard';
import { TrendingCard } from '../station/TrendingCard';
import { RecentCard } from '../station/RecentCard';
import { FeaturedBannerCarousel } from './FeaturedBannerCarousel';
import { BrowseChipStrip } from './BrowseChipStrip';
import { GuestSignInBanner } from './GuestSignInBanner';
import { LoadingPlaceholder } from '../feedback/LoadingPlaceholder';
import { ErrorState } from '../feedback/ErrorState';
import { useAuthStore } from '../../store/useAuthStore';
import { useAppStore } from '../../store/useAppStore';

interface HomeSectionRendererProps {
  section: HomeSection;
  onStationPress?: (station: Station) => void;
  onBannerPress?: (banner: Banner) => void;
  onCategoryPress?: (category: Category) => void;
  onViewAllPress?: (sectionType: string) => void;
  onSignInPress?: () => void;
}

export const HomeSectionRenderer: React.FC<HomeSectionRendererProps> = ({
  section,
  onStationPress,
  onBannerPress,
  onCategoryPress,
  onViewAllPress,
  onSignInPress,
}) => {
  const { colors } = useTheme();
  const { isAuthenticated } = useAuthStore();
  const { guestMode } = useAppStore();

  if (section.isLoading) {
    return (
      <View style={styles.sectionContainer}>
        {section.title && <SectionHeader title={section.title} />}
        <LoadingPlaceholder variant={section.type === 'banner_carousel' ? 'banner' : 'card'} />
      </View>
    );
  }

  if (section.isError) {
    return (
      <View style={styles.sectionContainer}>
        {section.title && <SectionHeader title={section.title} />}
        <ErrorState message={`Failed to load ${section.title}`} onRetry={() => {}} />
      </View>
    );
  }

  if (section.isEmpty || !section.data || section.data.length === 0) {
    return null;
  }

  // Guest-specific conditional rendering
  if ((section.type === 'continue_listening' || section.type === 'recently_played') && !isAuthenticated) {
    return null;
  }

  switch (section.type) {
    case 'banner_carousel':
      return (
        <FeaturedBannerCarousel
          data={section.data as Banner[]}
          onPress={onBannerPress}
        />
      );

    case 'trending_now':
      return (
        <View style={styles.sectionContainer}>
          <SectionHeader
            title={section.title || 'Trending Now'}
            onPress={() => onViewAllPress?.(section.type)}
          />
          <FlatList
            data={section.data as Station[]}
            renderItem={({ item }) => (
              <TrendingCard station={item} onPress={onStationPress} />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalListContent}
            keyExtractor={(item) => item.id}
          />
        </View>
      );

    case 'editor_picks':
    case 'recommended':
    case 'new_stations':
    case 'most_favorited':
      return (
        <View style={styles.sectionContainer}>
          <SectionHeader
            title={section.title || ''}
            onPress={() => onViewAllPress?.(section.type)}
          />
          <FlatList
            data={section.data as Station[]}
            renderItem={({ item }) => (
              <VerticalCard station={item} onPress={onStationPress} />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalListContent}
            keyExtractor={(item) => item.id}
          />
        </View>
      );

    case 'continue_listening':
      return (
        <View style={styles.sectionContainer}>
          <SectionHeader
            title={section.title || 'Continue Listening'}
            onPress={() => onViewAllPress?.(section.type)}
          />
          <FlatList
            data={section.data as Station[]}
            renderItem={({ item }) => (
              <RecentCard station={item} onPress={onStationPress} />
            )}
            contentContainerStyle={styles.verticalListContent}
            keyExtractor={(item) => item.id}
          />
        </View>
      );

    case 'recently_played':
      return (
        <View style={styles.sectionContainer}>
          <SectionHeader
            title={section.title || 'Recently Played'}
            onPress={() => onViewAllPress?.(section.type)}
          />
          <FlatList
            data={section.data as Station[]}
            renderItem={({ item }) => (
              <HorizontalCard station={item} onPress={onStationPress} />
            )}
            contentContainerStyle={styles.verticalListContent}
            keyExtractor={(item) => item.id}
          />
        </View>
      );

    case 'browse_genre':
    case 'browse_language':
    case 'browse_country':
      return (
        <BrowseChipStrip
          title={section.title || ''}
          data={section.data as Category[]}
          onChipPress={onCategoryPress}
          onViewAllPress={() => onViewAllPress?.(section.type)}
        />
      );

    case 'guest_signin_banner':
      if (isAuthenticated) return null;
      return <GuestSignInBanner onSignInPress={onSignInPress} />;

    default:
      return null;
  }
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginVertical: spacing.md,
  },
  horizontalListContent: {
    paddingHorizontal: spacing.lg,
  },
  verticalListContent: {
    paddingHorizontal: spacing.lg,
  },
});
