import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LogOut } from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { spacing, borderRadius, shadows } from '../../theme/tokens';

interface LogoutConfirmationSheetProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export const LogoutConfirmationSheet: React.FC<LogoutConfirmationSheetProps> = ({
  onConfirm,
  onCancel,
}) => {
  const { colors, typography } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface.card }]}>
      <View style={[styles.iconContainer, { backgroundColor: colors.error + '15' }]}>
        <LogOut size={32} color={colors.error} />
      </View>
      
      <Text style={[styles.title, { color: colors.text.primary, fontSize: typography.heading.h3.size }]}>
        Logout
      </Text>
      <Text style={[styles.description, { color: colors.text.secondary, fontSize: typography.body.medium.size }]}>
        Are you sure you want to logout? You&apos;ll need to sign in again to access your favorites and history.
      </Text>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.cancelButton, { borderColor: colors.border.subtle }]}
          onPress={onCancel}
        >
          <Text style={[styles.cancelText, { color: colors.text.secondary, fontSize: typography.body.medium.size }]}>
            Cancel
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.confirmButton, { backgroundColor: colors.error }]}
          onPress={onConfirm}
        >
          <Text style={[styles.confirmText, { color: '#FFF', fontSize: typography.body.medium.size }]}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.xxl,
    borderTopLeftRadius: borderRadius.xxl,
    borderTopRightRadius: borderRadius.xxl,
    alignItems: 'center',
    ...shadows.lg,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    fontWeight: '800',
    marginBottom: spacing.sm,
  },
  description: {
    textAlign: 'center',
    marginBottom: spacing.xxl,
    lineHeight: 22,
    opacity: 0.8,
  },
  footer: {
    flexDirection: 'row',
    width: '100%',
    gap: spacing.md,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    borderWidth: 1,
  },
  confirmButton: {
    flex: 1,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    ...shadows.sm,
  },
  cancelText: {
    fontWeight: '600',
  },
  confirmText: {
    fontWeight: '700',
  },
});
