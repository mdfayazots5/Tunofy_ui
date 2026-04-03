import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { spacing } from '@theme/tokens';
import { Button } from '@components/common/Button';
import { AlertCircle } from 'lucide-react-native';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  messageStyle?: TextStyle;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'We encountered an error while loading the content. Please try again.',
  onRetry,
  containerStyle,
  titleStyle,
  messageStyle,
}) => {
  const { colors, typography } = useTheme();

  return (
    <View style={[styles.container, containerStyle]}>
      <AlertCircle size={48} color={colors.semantic.error} style={styles.icon} />
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
      >
        {title}
      </Text>
      <Text
        style={[
          styles.message,
          {
            color: colors.text.secondary,
            fontSize: typography.body.medium.size,
            fontWeight: typography.body.medium.weight as any,
          },
          messageStyle,
        ]}
      >
        {message}
      </Text>
      {onRetry && (
        <Button
          label="Try Again"
          onPress={onRetry}
          style={styles.retryButton}
          variant="outline"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  icon: {
    marginBottom: spacing.md,
  },
  title: {
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  message: {
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  retryButton: {
    minWidth: 140,
  },
});
