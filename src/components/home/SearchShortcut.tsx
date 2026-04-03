import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { spacing, borderRadius, shadows } from '@theme/tokens';
import { Search } from 'lucide-react-native';

interface SearchShortcutProps {
  onPress?: () => void;
}

export const SearchShortcut: React.FC<SearchShortcutProps> = ({ onPress }) => {
  const { colors, typography } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors.surface.card, borderColor: colors.border.main }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Search size={20} color={colors.text.secondary} />
      <Text style={[styles.placeholder, { color: colors.text.secondary, fontSize: typography.body.medium.size }]}>
        Search for stations, genres, or countries...
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    marginHorizontal: spacing.lg,
    marginVertical: spacing.md,
    ...shadows.sm,
  },
  placeholder: {
    marginLeft: spacing.sm,
    flex: 1,
  },
});
