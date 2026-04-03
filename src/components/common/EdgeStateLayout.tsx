import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { spacing, borderRadius, shadows } from '../../theme/tokens';
import { EdgeStateProps } from '../../types/edgeStates';

export const EdgeStateLayout: React.FC<EdgeStateProps> = ({
  title,
  description,
  icon,
  primaryAction,
  secondaryAction,
  isFullScreen = true,
}) => {
  const { colors, typography } = useTheme();

  const content = (
    <View style={[styles.content, isFullScreen && styles.fullScreenContent]}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text style={[styles.title, { color: colors.text.primary, fontSize: typography.h3.size }]}>
        {title}
      </Text>
      <Text style={[styles.description, { color: colors.text.secondary, fontSize: typography.body.medium.size }]}>
        {description}
      </Text>
      
      <View style={styles.actions}>
        {primaryAction && (
          <TouchableOpacity
            style={[styles.primaryButton, { backgroundColor: colors.brand.primary }]}
            onPress={primaryAction.onPress}
            activeOpacity={0.8}
          >
            <Text style={[styles.primaryButtonText, { color: '#FFFFFF', fontSize: typography.body.medium.size }]}>
              {primaryAction.label}
            </Text>
          </TouchableOpacity>
        )}
        
        {secondaryAction && (
          <TouchableOpacity
            style={[styles.secondaryButton, { borderColor: colors.border.light }]}
            onPress={secondaryAction.onPress}
            activeOpacity={0.7}
          >
            <Text style={[styles.secondaryButtonText, { color: colors.text.secondary, fontSize: typography.body.medium.size }]}>
              {secondaryAction.label}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  if (isFullScreen) {
    return (
      <View style={[styles.container, { backgroundColor: colors.surface.main }]}>
        {content}
      </View>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullScreenContent: {
    flex: 1,
  },
  iconContainer: {
    marginBottom: spacing.xl,
    opacity: 0.8,
  },
  title: {
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  description: {
    textAlign: 'center',
    lineHeight: 22,
    opacity: 0.7,
    marginBottom: spacing.xl,
  },
  actions: {
    width: '100%',
    gap: spacing.md,
  },
  primaryButton: {
    width: '100%',
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    ...shadows.sm,
  },
  primaryButtonText: {
    fontWeight: '700',
  },
  secondaryButton: {
    width: '100%',
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    borderWidth: 1,
  },
  secondaryButtonText: {
    fontWeight: '600',
  },
});
