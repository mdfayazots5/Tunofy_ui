import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { spacing, borderRadius } from '@theme/tokens';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { User } from 'lucide-react-native';

interface AppHeaderProps {
  title?: string;
  leftAction?: React.ReactNode;
  rightAction?: React.ReactNode;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  transparent?: boolean;
  showAvatar?: boolean;
  onAvatarPress?: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  leftAction,
  rightAction,
  containerStyle,
  titleStyle,
  transparent,
  showAvatar,
  onAvatarPress,
}) => {
  const { colors, typography } = useTheme();
  const insets = useSafeAreaInsets();

  const renderAvatar = () => {
    if (!showAvatar) return null;

    return (
      <TouchableOpacity
        onPress={onAvatarPress}
        style={[styles.avatarContainer, { backgroundColor: colors.surface.card }]}
      >
        <User size={20} color={colors.text.secondary} />
      </TouchableOpacity>
    );
  };

  const safeTopInset = insets.top || 0;

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: safeTopInset + spacing.sm,
          backgroundColor: transparent ? 'transparent' : colors.surface.main,
          borderBottomColor: colors.border.main,
          borderBottomWidth: transparent ? 0 : 1,
        },
        containerStyle,
      ]}
    >
      <View style={styles.content}>
        <View style={styles.leftContainer}>
          {leftAction}
          {title && (
            <Text
              style={[
                styles.title,
                {
                  color: colors.text.primary,
                  fontSize: typography.heading.medium.size,
                  fontWeight: typography.heading.medium.weight as any,
                },
                titleStyle,
              ]}
              numberOfLines={1}
            >
              {title}
            </Text>
          )}
        </View>
        <View style={styles.rightContainer}>
          {rightAction}
          {renderAvatar()}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 44,
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginLeft: spacing.xs,
  },
  avatarContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.sm,
    overflow: 'hidden',
  },
});
