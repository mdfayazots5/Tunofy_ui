import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native';
import { AlertCircle } from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { spacing, borderRadius, shadows } from '../../theme/tokens';

interface ClearHistoryConfirmationSheetProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ClearHistoryConfirmationSheet: React.FC<ClearHistoryConfirmationSheetProps> = ({
  visible,
  onClose,
  onConfirm,
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
        <View style={[styles.content, { backgroundColor: colors.surface.card }]}>
          <View style={[styles.handle, { backgroundColor: colors.border.subtle }]} />
          <View style={styles.header}>
            <AlertCircle size={48} color={colors.error} strokeWidth={1.5} />
            <Text style={[styles.title, { color: colors.text.primary, fontSize: typography.heading.h4.size }]}>
              Clear History
            </Text>
            <Text style={[styles.description, { color: colors.text.secondary, fontSize: typography.body.medium.size }]}>
              Are you sure you want to clear your listening history? This action cannot be undone.
            </Text>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.confirmButton, { backgroundColor: colors.error }]}
              onPress={() => {
                onConfirm();
                onClose();
              }}
            >
              <Text style={[styles.confirmText, { color: '#FFF', fontSize: typography.body.medium.size }]}>
                Clear All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.cancelButton, { borderColor: colors.border.subtle }]}
              onPress={onClose}
            >
              <Text style={[styles.cancelText, { color: colors.text.primary, fontSize: typography.body.medium.size }]}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  content: {
    borderTopLeftRadius: borderRadius.xxl,
    borderTopRightRadius: borderRadius.xxl,
    padding: spacing.xl,
    paddingBottom: spacing.xxxl,
    ...shadows.lg,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  title: {
    fontWeight: '700',
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  description: {
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: spacing.md,
  },
  actions: {
    width: '100%',
    gap: spacing.md,
  },
  confirmButton: {
    width: '100%',
    paddingVertical: spacing.md,
    borderRadius: borderRadius.full,
    alignItems: 'center',
  },
  confirmText: {
    fontWeight: '700',
  },
  cancelButton: {
    width: '100%',
    paddingVertical: spacing.md,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    borderWidth: 1,
  },
  cancelText: {
    fontWeight: '600',
  },
});
