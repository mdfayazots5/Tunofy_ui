import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { spacing, borderRadius, shadows } from '../../theme/tokens';
import { UserProfile } from '../../types/profile';

interface PreferenceSummaryCardProps {
  user: UserProfile | null;
}

export const PreferenceSummaryCard: React.FC<PreferenceSummaryCardProps> = ({ user }) => {
  const { colors, typography } = useTheme();

  if (!user) return null;

  return (
    <View style={[styles.container, { backgroundColor: colors.surface.card }]}>
      <View style={styles.row}>
        <View style={styles.item}>
          <Text style={[styles.label, { color: colors.text.muted, fontSize: typography.body.small.size }]}>
            Language
          </Text>
          <Text style={[styles.value, { color: colors.text.primary, fontSize: typography.body.medium.size }]}>
            {user.preferredLanguage}
          </Text>
        </View>
        <View style={[styles.divider, { backgroundColor: colors.border.subtle }]} />
        <View style={styles.item}>
          <Text style={[styles.label, { color: colors.text.muted, fontSize: typography.body.small.size }]}>
            Country
          </Text>
          <Text style={[styles.value, { color: colors.text.primary, fontSize: typography.body.medium.size }]}>
            {user.preferredCountry}
          </Text>
        </View>
      </View>
      
      <View style={[styles.horizontalDivider, { backgroundColor: colors.border.subtle }]} />
      
      <View style={styles.genresContainer}>
        <Text style={[styles.label, { color: colors.text.muted, fontSize: typography.body.small.size, marginBottom: spacing.xs }]}>
          Favorite Genres
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.genresScroll}>
          {user.favoriteGenres.map((genre) => (
            <View key={genre} style={[styles.genreChip, { backgroundColor: colors.brand.primary + '15' }]}>
              <Text style={[styles.genreText, { color: colors.brand.primary, fontSize: typography.body.small.size }]}>
                {genre}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginHorizontal: spacing.xl,
    marginBottom: spacing.xl,
    ...shadows.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  item: {
    flex: 1,
    alignItems: 'center',
  },
  divider: {
    width: 1,
    height: 30,
  },
  horizontalDivider: {
    height: 1,
    width: '100%',
    marginVertical: spacing.md,
  },
  label: {
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  value: {
    fontWeight: '700',
  },
  genresContainer: {
    width: '100%',
  },
  genresScroll: {
    gap: spacing.xs,
  },
  genreChip: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
  },
  genreText: {
    fontWeight: '600',
  },
});
