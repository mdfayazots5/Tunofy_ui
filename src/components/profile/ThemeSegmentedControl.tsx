import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { spacing, borderRadius, shadows } from '../../theme/tokens';
import { AppTheme } from '../../types/profile';

interface ThemeSegmentedControlProps {
  value: AppTheme;
  onChange: (value: AppTheme) => void;
}

export const ThemeSegmentedControl: React.FC<ThemeSegmentedControlProps> = ({ value, onChange }) => {
  const { colors, typography } = useTheme();

  const options: { id: AppTheme; label: string }[] = [
    { id: 'light', label: 'Light' },
    { id: 'dark', label: 'Dark' },
    { id: 'system', label: 'System' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.surface.card }]}>
      {options.map((option) => {
        const isActive = value === option.id;
        return (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.option,
              isActive && [styles.activeOption, { backgroundColor: colors.brand.primary }],
            ]}
            onPress={() => onChange(option.id)}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.label,
                {
                  color: isActive ? '#FFF' : colors.text.secondary,
                  fontSize: typography.body.small.size,
                },
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: borderRadius.md,
    padding: 4,
    ...shadows.sm,
  },
  option: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: borderRadius.sm,
  },
  activeOption: {
    ...shadows.sm,
  },
  label: {
    fontWeight: '600',
  },
});
