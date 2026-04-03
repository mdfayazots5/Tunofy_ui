import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { spacing, borderRadius, shadows } from '@theme/tokens';
import { Station } from '../../types/home';

interface TrendingCardProps {
  station: Station;
  onPress?: (station: Station) => void;
}

export const TrendingCard: React.FC<TrendingCardProps> = ({
  station,
  onPress,
}) => {
  const { colors, typography } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors.surface.card }]}
      onPress={() => onPress?.(station)}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: station.logo }}
          style={styles.image}
          resizeMode="cover"
        />
        {station.rank && (
          <View style={[styles.rankBadge, { backgroundColor: colors.brand.primary }]}>
            <Text style={[styles.rankText, { fontSize: typography.caption.size }]}>
              #{station.rank}
            </Text>
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
  rankBadge: {
    position: 'absolute',
    top: spacing.xs,
    left: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  rankText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
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
