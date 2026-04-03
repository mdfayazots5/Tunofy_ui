import React from 'react';
import { TouchableOpacity, StyleSheet, ActivityIndicator, ViewStyle, TouchableOpacityProps } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { borderRadius, spacing } from '@theme/tokens';

interface IconButtonProps extends TouchableOpacityProps {
  icon: React.ReactNode;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  loading,
  variant = 'primary',
  size = 'md',
  disabled,
  style,
  ...props
}) => {
  const { colors } = useTheme();

  const getVariantStyles = (): ViewStyle => {
    switch (variant) {
      case 'primary':
        return { backgroundColor: colors.brand.primary };
      case 'secondary':
        return { backgroundColor: colors.brand.accent };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: colors.brand.primary,
        };
      case 'ghost':
        return { backgroundColor: 'transparent' };
      default:
        return { backgroundColor: colors.brand.primary };
    }
  };

  const getSizeStyles = (): ViewStyle => {
    switch (size) {
      case 'sm':
        return { padding: spacing.xs, width: 32, height: 32 };
      case 'md':
        return { padding: spacing.sm, width: 44, height: 44 };
      case 'lg':
        return { padding: spacing.md, width: 56, height: 56 };
      default:
        return { padding: spacing.sm, width: 44, height: 44 };
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
        variantStyles,
        disabled && { opacity: 0.5, backgroundColor: colors.surface.card },
        style,
      ]}
      {...props}
    >
      {loading ? <ActivityIndicator color={colors.text.inverse} /> : icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
