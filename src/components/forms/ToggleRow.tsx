import React from 'react';
import { View, Text, Switch, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { spacing } from '@theme/tokens';

interface ToggleRowProps {
  label: string;
  description?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  containerStyle?: ViewStyle;
  disabled?: boolean;
}

export const ToggleRow: React.FC<ToggleRowProps> = ({
  label,
  description,
  value,
  onValueChange,
  containerStyle,
  disabled,
}) => {
  const { colors, typography } = useTheme();

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.textContainer}>
        <Text
          style={[
            styles.label,
            {
              color: colors.text.primary,
              fontSize: typography.body.large.size,
              fontWeight: typography.body.large.weight as any,
            },
          ]}
        >
          {label}
        </Text>
        {description && (
          <Text
            style={[
              styles.description,
              {
                color: colors.text.secondary,
                fontSize: typography.body.medium.size,
                fontWeight: typography.body.medium.weight as any,
              },
            ]}
          >
            {description}
          </Text>
        )}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        trackColor={{ false: colors.border, true: colors.brand.primary }}
        thumbColor={colors.text.inverse}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
  },
  textContainer: {
    flex: 1,
    marginRight: spacing.md,
  },
  label: {
    marginBottom: spacing.xs,
  },
  description: {},
});
