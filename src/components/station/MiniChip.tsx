import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { spacing, borderRadius, shadows } from '@theme/tokens';
import { Category } from '../../types/home';
import { ChevronRight } from 'lucide-react-native';

interface MiniChipProps {
  item: Category | { id: string; name: string; icon?: any };
  onPress?: (item: any) => void;
  isViewAll?: boolean;
}

export const MiniChip: React.FC<MiniChipProps> = ({
  item,
  onPress,
  isViewAll,
}) => {
  const { colors, typography } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: isViewAll ? colors.brand.primary : colors.surface.card,
          borderColor: colors.border.main,
          borderWidth: isViewAll ? 0 : 1,
        },
      ]}
      onPress={() => onPress?.(item)}
      activeOpacity={0.7}
    >
      {!isViewAll && item.icon && (
        <View style={styles.iconContainer}>
          {/* Placeholder for icon if needed, or just use a generic one */}
          <View style={[styles.placeholderIcon, { backgroundColor: colors.brand.secondary }]} />
        </View>
      )}
      <Text
        style={[
          styles.name,
          {
            color: isViewAll ? '#FFFFFF' : colors.text.primary,
            fontSize: typography.body.medium.size,
            fontWeight: isViewAll ? 'bold' : '500',
          },
        ]}
      >
        {item.name}
      </Text>
      {isViewAll && <ChevronRight size={16} color="#FFFFFF" />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    marginRight: spacing.sm,
    ...shadows.sm,
  },
  iconContainer: {
    marginRight: spacing.sm,
  },
  placeholderIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  name: {
    textAlign: 'center',
  },
});
