import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { spacing } from '../../theme/tokens';

interface RecentSectionHeaderProps {
  title: string;
}

export const RecentSectionHeader: React.FC<RecentSectionHeaderProps> = ({ title }) => {
  const { colors, typography } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface.main }]}>
      <Text style={[styles.title, { color: colors.text.secondary, fontSize: typography.caption.size }]}>
        {title.toUpperCase()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
  title: {
    fontWeight: '700',
    letterSpacing: 1.2,
  },
});
