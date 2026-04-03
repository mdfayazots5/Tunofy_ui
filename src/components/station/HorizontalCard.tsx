import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { spacing, borderRadius, shadows } from '@theme/tokens';
import { Station } from '../../types/home';
import { Heart } from 'lucide-react-native';

import { Play } from 'lucide-react-native';

import { FavoriteToggleAnimated } from '../common/FavoriteToggleAnimated';
import { StationLogoFallback } from '../station/StationLogoFallback';

interface HorizontalCardProps {
  station: Station;
  onPress?: (station: Station) => void;
  onFavoritePress?: (station: Station) => void;
  onPlayPress?: (station: Station) => void;
  isFavorite?: boolean;
  showFavoriteIcon?: boolean;
  subtitle?: string;
}

export const HorizontalCard: React.FC<HorizontalCardProps> = ({
  station,
  onPress,
  onFavoritePress,
  onPlayPress,
  isFavorite = false,
  showFavoriteIcon = true,
  subtitle,
}) => {
  const { colors, typography } = useTheme();
  const [imageError, setImageError] = React.useState(false);

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors.surface.card }]}
      onPress={() => onPress?.(station)}
      activeOpacity={0.7}
    >
      {!imageError && station.logo ? (
        <Image
          source={{ uri: station.logo }}
          style={styles.logo}
          resizeMode="cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <View style={styles.logo}>
          <StationLogoFallback name={station.name} size={56} />
        </View>
      )}
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text
            style={[styles.name, { color: colors.text.primary, fontSize: typography.body.large.size }]}
            numberOfLines={1}
          >
            {station.name}
          </Text>
          <Text
            style={[styles.genre, { color: colors.text.secondary, fontSize: typography.body.medium.size }]}
            numberOfLines={1}
          >
            {subtitle || `${station.genre} • ${station.country}`}
          </Text>
        </View>
        
        <View style={styles.actions}>
          {onPlayPress && (
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: colors.brand.primary + '15' }]}
              onPress={() => onPlayPress(station)}
            >
              <Play size={18} color={colors.brand.primary} fill={colors.brand.primary} />
            </TouchableOpacity>
          )}

          {showFavoriteIcon && (
            <FavoriteToggleAnimated
              isFavorite={isFavorite}
              onPress={() => onFavoritePress?.(station)}
              size={20}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  logo: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.sm,
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    marginRight: spacing.sm,
  },
  name: {
    fontWeight: '600',
    marginBottom: 2,
  },
  genre: {
    opacity: 0.8,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    padding: spacing.xs,
  },
});
