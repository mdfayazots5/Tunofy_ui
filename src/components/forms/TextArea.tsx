import React from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { borderRadius, spacing } from '@theme/tokens';

interface TextAreaProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  numberOfLines?: number;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  containerStyle,
  inputStyle,
  numberOfLines = 4,
  onFocus,
  onBlur,
  ...props
}) => {
  const { colors, typography } = useTheme();
  const [isFocused, setIsFocused] = React.useState(false);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text
          style={[
            styles.label,
            {
              color: colors.text.secondary,
              fontSize: typography.body.medium.size,
              fontWeight: typography.body.medium.weight as any,
            },
          ]}
        >
          {label}
        </Text>
      )}
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: colors.surface.card,
            borderColor: error ? colors.semantic.error : isFocused ? colors.brand.primary : colors.border,
            height: numberOfLines * 24 + spacing.md,
          },
        ]}
      >
        <TextInput
          style={[
            styles.input,
            {
              color: colors.text.primary,
              fontSize: typography.body.large.size,
              fontWeight: typography.body.large.weight as any,
            },
            inputStyle,
          ]}
          placeholderTextColor={colors.text.muted}
          multiline
          numberOfLines={numberOfLines}
          textAlignVertical="top"
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
      </View>
      {error && (
        <Text
          style={[
            styles.errorText,
            {
              color: colors.semantic.error,
              fontSize: typography.caption.size,
              fontWeight: typography.caption.weight as any,
            },
          ]}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    marginBottom: spacing.xs,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
  },
  input: {
    flex: 1,
    height: '100%',
  },
  errorText: {
    marginTop: spacing.xs,
  },
});
