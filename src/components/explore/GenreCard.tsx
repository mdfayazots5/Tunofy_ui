import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { spacing, borderRadius, shadows } from '@theme/tokens';
import { ExploreGenre } from '../../types/search';
import { LinearGradient } from 'expo-linear-gradient';
import { Music } from 'lucide-react-native';

interface GenreCardProps {
  genre: ExploreGenre;
  onPress?: (genre: ExploreGenre) => void;
  variant?: 'grid' | 'horizontal';
}

export const GenreCard: React.FC<GenreCardProps> = ({
  genre,
  onPress,
  variant = 'grid',
}) => {
  const { typography } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        variant === 'grid' ? styles.gridContainer : styles.horizontalContainer,
        { backgroundColor: genre.color },
      ]}
      onPress={() => onPress?.(genre)}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.3)']}
        style={styles.gradient}
      >
        <Music size={variant === 'grid' ? 32 : 24} color="#FFFFFF" style={styles.icon} />
        <Text style={[styles.name, { color: '#FFFFFF', fontSize: typography.body.large.size }]}>
          {genre.name}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.sm,
  },
  gridContainer: {
    flex: 1,
    height: 100,
    margin: spacing.xs,
  },
  horizontalContainer: {
    width: 140,
    height: 80,
    marginRight: spacing.md,
  },
  gradient: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'flex-end',
  },
  icon: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    opacity: 0.5,
  },
  name: {
    fontWeight: 'bold',
  },
});
