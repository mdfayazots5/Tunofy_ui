import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle, TouchableOpacity } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { spacing } from '@theme/tokens';

interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onActionPress?: () => void;
  onPress?: () => void; // Alias for onActionPress
  showViewAll?: boolean;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  actionStyle?: TextStyle;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  actionLabel = 'View All',
  onActionPress,
  onPress,
  showViewAll = true,
  containerStyle,
  titleStyle,
  actionStyle,
}) => {
  const { colors, typography } = useTheme();

  const handlePress = onPress || onActionPress;
  const shouldShowAction = showViewAll && handlePress;

  return (
    <View style={[styles.container, containerStyle]}>
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
      {shouldShowAction && (
        <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
          <Text
            style={[
              styles.action,
              {
                color: colors.brand.primary,
                fontSize: typography.body.medium.size,
                fontWeight: typography.body.medium.weight as any,
              },
              actionStyle,
            ]}
          >
            {actionLabel}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  title: {
    flex: 1,
  },
  action: {
    marginLeft: spacing.md,
  },
});
