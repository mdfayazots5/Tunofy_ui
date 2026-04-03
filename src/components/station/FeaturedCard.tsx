import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { spacing, borderRadius, shadows } from '@theme/tokens';
import { Banner } from '../../types/home';
import { LinearGradient } from 'expo-linear-gradient';

interface FeaturedCardProps {
  banner: Banner;
  onPress?: (banner: Banner) => void;
}

export const FeaturedCard: React.FC<FeaturedCardProps> = ({
  banner,
  onPress,
}) => {
  const { colors, typography } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors.surface.card }]}
      onPress={() => onPress?.(banner)}
      activeOpacity={0.9}
    >
      <ImageBackground
        source={{ uri: banner.imageUrl }}
        style={styles.image}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradient}
        >
          <View style={styles.badge}>
            <Text style={[styles.badgeText, { fontSize: typography.caption.size }]}>
              {banner.genre}
            </Text>
          </View>
          <Text style={[styles.title, { color: '#FFFFFF', fontSize: typography.h2.size }]}>
            {banner.title}
          </Text>
          <Text style={[styles.subtitle, { color: 'rgba(255,255,255,0.8)', fontSize: typography.body.medium.size }]}>
            {banner.subtitle}
          </Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.md,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: spacing.lg,
  },
  badge: {
    backgroundColor: 'rgba(242, 125, 38, 0.9)', // colors.brand.primary with opacity
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
    marginBottom: spacing.xs,
  },
  badgeText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    opacity: 0.9,
  },
});
