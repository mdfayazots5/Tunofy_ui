import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Check } from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { spacing, borderRadius, shadows } from '../../theme/tokens';
import { GENRES } from '../../mocks/profileOptions';

interface MultiSelectGenrePickerProps {
  selectedGenres: string[];
  onToggle: (genreId: string) => void;
  error?: string;
}

export const MultiSelectGenrePicker: React.FC<MultiSelectGenrePickerProps> = ({
  selectedGenres,
  onToggle,
  error,
}) => {
  const { colors, typography } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.text.muted, fontSize: typography.body.small.size }]}>
        FAVORITE GENRES
      </Text>
      <View style={styles.grid}>
        {GENRES.map((genre) => {
          const isSelected = selectedGenres.includes(genre.id);
          return (
            <TouchableOpacity
              key={genre.id}
              style={[
                styles.chip,
                {
                  backgroundColor: isSelected ? colors.brand.primary : colors.surface.card,
                  borderColor: isSelected ? colors.brand.primary : colors.border.subtle,
                },
              ]}
              onPress={() => onToggle(genre.id)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.chipText,
                  {
                    color: isSelected ? '#FFF' : colors.text.secondary,
                    fontSize: typography.body.small.size,
                  },
                ]}
              >
                {genre.label}
              </Text>
              {isSelected && <Check size={14} color="#FFF" style={styles.check} />}
            </TouchableOpacity>
          );
        })}
      </View>
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
    marginBottom: spacing.xl,
  },
  label: {
    fontWeight: '600',
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    ...shadows.sm,
  },
  chipText: {
    fontWeight: '600',
  },
  check: {
    marginLeft: 6,
  },
  error: {
    marginTop: 8,
    fontWeight: '500',
  },
});
