import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { spacing, borderRadius } from '@theme/tokens';
import { X } from 'lucide-react-native';

interface FilterChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  onRemove?: () => void;
  showRemove?: boolean;
}

export const FilterChip: React.FC<FilterChipProps> = ({
  label,
  selected,
  onPress,
  onRemove,
  showRemove,
}) => {
  const { colors, typography } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: selected ? colors.brand.primary : colors.surface.card,
          borderColor: selected ? colors.brand.primary : colors.border.main,
          borderWidth: 1,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.label,
          {
            color: selected ? '#FFFFFF' : colors.text.primary,
            fontSize: typography.body.medium.size,
            fontWeight: selected ? 'bold' : '500',
          },
        ]}
      >
        {label}
      </Text>
      {showRemove && (
        <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
          <X size={14} color={selected ? '#FFFFFF' : colors.text.secondary} />
        </TouchableOpacity>
      )}
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
    marginBottom: spacing.sm,
  },
  label: {
    textAlign: 'center',
  },
  removeButton: {
    marginLeft: spacing.xs,
  },
});
