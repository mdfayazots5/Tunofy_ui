import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { borderRadius, spacing } from '@theme/tokens';

interface ButtonProps extends TouchableOpacityProps {
  label?: string;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  loading,
  variant = 'primary',
  size = 'md',
  disabled,
  style,
  leftIcon,
  rightIcon,
  ...props
}) => {
  const { colors, typography } = useTheme();

  const getVariantStyles = (): { container: ViewStyle; text: TextStyle } => {
    switch (variant) {
      case 'primary':
        return {
          container: { backgroundColor: colors.brand.primary },
          text: { color: colors.text.inverse },
        };
      case 'secondary':
        return {
          container: { backgroundColor: colors.brand.accent },
          text: { color: colors.text.inverse },
        };
      case 'outline':
        return {
          container: {
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: colors.brand.primary,
          },
          text: { color: colors.brand.primary },
        };
      case 'ghost':
        return {
          container: { backgroundColor: 'transparent' },
          text: { color: colors.brand.primary },
        };
      default:
        return {
          container: { backgroundColor: colors.brand.primary },
          text: { color: colors.text.inverse },
        };
    }
  };

  const getSizeStyles = (): ViewStyle => {
    switch (size) {
      case 'sm':
        return { paddingVertical: spacing.xs, paddingHorizontal: spacing.md };
      case 'md':
        return { paddingVertical: spacing.sm, paddingHorizontal: spacing.lg };
      case 'lg':
        return { paddingVertical: spacing.md, paddingHorizontal: spacing.xl };
      default:
        return { paddingVertical: spacing.sm, paddingHorizontal: spacing.lg };
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={disabled || loading}
      style={[
        styles.container,
        sizeStyles,
        variantStyles.container,
        disabled && { opacity: 0.5, backgroundColor: colors.surface.card },
        style,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variantStyles.text.color} />
      ) : (
        <>
          {leftIcon}
          {label && (
            <Text
              style={[
                styles.text,
                variantStyles.text,
                { fontSize: typography.body.large.size, fontWeight: typography.body.large.weight as any },
                leftIcon && { marginLeft: spacing.sm },
                rightIcon && { marginRight: spacing.sm },
              ]}
            >
              {label}
            </Text>
          )}
          {rightIcon}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
});
