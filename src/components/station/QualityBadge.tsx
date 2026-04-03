import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

interface QualityBadgeProps {
  quality?: 'SD' | 'HD' | 'Ultra';
  bitrate?: string;
}

export const QualityBadge: React.FC<QualityBadgeProps> = ({ quality, bitrate }) => {
  const { colors, spacing, typography } = useTheme();

  if (!quality && !bitrate) return null;

  return (
    <View style={[styles.container, { backgroundColor: colors.surface, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs }]}>
      <Text style={[styles.text, { color: colors.primary, fontSize: typography.size.xs }]}>
        {quality} {bitrate}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignSelf: 'flex-start',
  },
  text: {
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
