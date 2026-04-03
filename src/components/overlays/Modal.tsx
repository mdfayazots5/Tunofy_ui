import React from 'react';
import {
  Modal as RNModal,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ViewStyle,
  TextStyle,
  ModalProps as RNModalProps,
} from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { borderRadius, spacing, shadows } from '@theme/tokens';
import { X } from 'lucide-react-native';
import { IconButton } from '@components/common/IconButton';

interface ModalProps extends RNModalProps {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  containerStyle?: ViewStyle;
  contentStyle?: ViewStyle;
  titleStyle?: TextStyle;
  showCloseButton?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isVisible,
  onClose,
  title,
  children,
  containerStyle,
  contentStyle,
  titleStyle,
  showCloseButton = true,
  ...props
}) => {
  const { colors, typography } = useTheme();

  return (
    <RNModal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      {...props}
    >
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.overlay, { backgroundColor: colors.surface.overlay }]}
        onPress={onClose}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={[
            styles.content,
            {
              backgroundColor: colors.surface.card,
              borderRadius: borderRadius.lg,
              ...shadows.lg,
            },
            contentStyle,
          ]}
        >
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              {title && (
                <Text
                  style={[
                    styles.title,
                    {
                      color: colors.text.primary,
                      fontSize: typography.heading.small.size,
                      fontWeight: typography.heading.small.weight as any,
                    },
                    titleStyle,
                  ]}
                >
                  {title}
                </Text>
              )}
            </View>
            {showCloseButton && (
              <IconButton
                icon={<X size={20} color={colors.text.secondary} />}
                variant="ghost"
                size="sm"
                onPress={onClose}
              />
            )}
          </View>
          <View style={[styles.body, containerStyle]}>{children}</View>
        </TouchableOpacity>
      </TouchableOpacity>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  content: {
    width: '100%',
    maxHeight: '80%',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    textAlign: 'left',
  },
  body: {
    padding: spacing.md,
  },
});
