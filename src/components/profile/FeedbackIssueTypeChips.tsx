import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { spacing, borderRadius, shadows } from '../../theme/tokens';
import { ISSUE_TYPES } from '../../mocks/profileOptions';
import { IssueType } from '../../types/profile';

interface FeedbackIssueTypeChipsProps {
  value: IssueType;
  onChange: (value: IssueType) => void;
}

export const FeedbackIssueTypeChips: React.FC<FeedbackIssueTypeChipsProps> = ({ value, onChange }) => {
  const { colors, typography } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.text.muted, fontSize: typography.body.small.size }]}>
        ISSUE TYPE
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {ISSUE_TYPES.map((type) => {
          const isActive = value === type.id;
          return (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.chip,
                {
                  backgroundColor: isActive ? colors.brand.primary : colors.surface.card,
                  borderColor: isActive ? colors.brand.primary : colors.border.subtle,
                },
              ]}
              onPress={() => onChange(type.id)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.chipText,
                  {
                    color: isActive ? '#FFF' : colors.text.secondary,
                    fontSize: typography.body.small.size,
                  },
                ]}
              >
                {type.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xl,
  },
  label: {
    fontWeight: '600',
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  scroll: {
    gap: spacing.sm,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    ...shadows.sm,
  },
  chipText: {
    fontWeight: '600',
  },
});
