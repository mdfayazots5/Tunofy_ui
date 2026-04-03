import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Pressable } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { spacing, borderRadius, shadows } from '../../theme/tokens';

interface PromptModalShellProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  description: string;
  icon?: React.ReactNode;
  primaryAction?: {
    label: string;
    onPress: () => void;
  };
  secondaryAction?: {
    label: string;
    onPress: () => void;
  };
}

export const PromptModalShell: React.FC<PromptModalShellProps> = ({
  visible,
  onClose,
  title,
  description,
  icon,
  primaryAction,
  secondaryAction,
}) => {
  const { colors, typography } = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={[styles.modal, { backgroundColor: colors.surface.card }]}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Text style={[styles.title, { color: colors.text.primary, fontSize: typography.heading.small.size }]}>
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
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  modal: {
    width: '100%',
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    alignItems: 'center',
    ...shadows.lg,
  },
  iconContainer: {
    marginBottom: spacing.lg,
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
