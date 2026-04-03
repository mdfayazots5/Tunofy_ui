import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { spacing, borderRadius, shadows } from '@theme/tokens';
import { Station } from '../../types/home';
import { Heart } from 'lucide-react-native';

import { FavoriteToggleAnimated } from '../common/FavoriteToggleAnimated';
import { StationLogoFallback } from '../station/StationLogoFallback';

interface VerticalCardProps {
  station: Station;
  onPress?: (station: Station) => void;
  onFavoritePress?: (station: Station) => void;
}

export const VerticalCard: React.FC<VerticalCardProps> = ({
  station,
  onPress,
  onFavoritePress,
}) => {
  const { colors, typography } = useTheme();
  const [imageError, setImageError] = React.useState(false);

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors.surface.card }]}
      onPress={() => onPress?.(station)}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
        {!imageError && station.logo ? (
          <Image
            source={{ uri: station.logo }}
            style={styles.image}
            resizeMode="cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <StationLogoFallback name={station.name} size={120} />
        )}
        {onFavoritePress && (
          <View style={styles.favoriteButtonContainer}>
            <FavoriteToggleAnimated
              isFavorite={station.isFavorite}
              onPress={() => onFavoritePress(station)}
              size={16}
              activeColor={colors.brand.primary}
              inactiveColor="#FFFFFF"
            />
          </View>
        )}
      </View>
      <View style={styles.content}>
        <Text
          style={[styles.name, { color: colors.text.primary, fontSize: typography.body.medium.size }]}
          numberOfLines={1}
        >
          {station.name}
        </Text>
        <Text
          style={[styles.genre, { color: colors.text.secondary, fontSize: typography.caption.size }]}
          numberOfLines={1}
        >
          {station.genre}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 120,
    borderRadius: borderRadius.md,
    marginRight: spacing.md,
    ...shadows.sm,
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderTopLeftRadius: borderRadius.md,
    borderTopRightRadius: borderRadius.md,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  favoriteButtonContainer: {
    position: 'absolute',
    top: spacing.xs,
    right: spacing.xs,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 14,
    padding: 2,
  },
  content: {
    padding: spacing.sm,
  },
  name: {
    fontWeight: '600',
    marginBottom: 2,
  },
  genre: {
    opacity: 0.8,
  },
});
