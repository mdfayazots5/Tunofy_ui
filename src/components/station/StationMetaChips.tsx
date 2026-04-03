import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

interface StationMetaChipsProps {
  genre: string;
  language: string;
  country: string;
}

export const StationMetaChips: React.FC<StationMetaChipsProps> = ({ genre, language, country }) => {
  const { colors, spacing, typography } = useTheme();

  return (
    <View style={[styles.container, { gap: spacing.sm }]}>
      <View style={[styles.chip, { backgroundColor: colors.surface }]}>
        <Text style={[styles.text, { color: colors.textSecondary, fontSize: typography.size.xs }]}>{genre}</Text>
      </View>
      <View style={[styles.chip, { backgroundColor: colors.surface }]}>
        <Text style={[styles.text, { color: colors.textSecondary, fontSize: typography.size.xs }]}>{language}</Text>
      </View>
      <View style={[styles.chip, { backgroundColor: colors.surface }]}>
        <Text style={[styles.text, { color: colors.textSecondary, fontSize: typography.size.xs }]}>{country}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  text: {
    fontWeight: '500',
  },
});
