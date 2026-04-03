import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { spacing, borderRadius, shadows } from '@theme/tokens';
import { Station } from '../../types/home';
import { formatRelativeTime } from '../../utils/dateUtils';
import { Play } from 'lucide-react-native';

interface RecentCardProps {
  station: Station;
  onPress?: (station: Station) => void;
}

export const RecentCard: React.FC<RecentCardProps> = ({
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
          style={styles.logo}
          resizeMode="cover"
        />
        <View style={[styles.playOverlay, { backgroundColor: 'rgba(0,0,0,0.3)' }]}>
          <Play size={16} color="#FFFFFF" fill="#FFFFFF" />
        </View>
      </View>
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
            {station.genre}
          </Text>
        </View>
        {station.lastPlayedAt && (
          <Text style={[styles.time, { color: colors.text.secondary, fontSize: typography.caption.size }]}>
            {formatRelativeTime(station.lastPlayedAt)}
          </Text>
        )}
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
  imageContainer: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.sm,
    marginRight: spacing.md,
    overflow: 'hidden',
    position: 'relative',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  playOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
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
  time: {
    opacity: 0.7,
  },
});
