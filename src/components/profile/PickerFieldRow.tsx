import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { spacing, borderRadius } from '../../theme/tokens';

interface PickerFieldRowProps {
  label: string;
  value: string;
  onPress: () => void;
  error?: string;
}

export const PickerFieldRow: React.FC<PickerFieldRowProps> = ({
  label,
  value,
  onPress,
  error,
}) => {
  const { colors, typography } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.text.muted, fontSize: typography.body.small.size }]}>
        {label}
      </Text>
      <TouchableOpacity
        style={[
          styles.picker,
          {
            backgroundColor: colors.surface.card,
            borderColor: error ? colors.error : colors.border.subtle,
          },
        ]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.value,
            {
              color: value ? colors.text.primary : colors.text.muted,
              fontSize: typography.body.medium.size,
            },
          ]}
        >
          {value || `Select ${label}`}
        </Text>
        <ChevronDown size={20} color={colors.text.muted} />
      </TouchableOpacity>
      {error && (
        <Text style={[styles.error, { color: colors.error, fontSize: typography.body.small.size }]}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  label: {
    fontWeight: '600',
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  picker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
  },
  value: {
    fontWeight: '500',
  },
  error: {
    marginTop: 4,
    fontWeight: '500',
  },
});
