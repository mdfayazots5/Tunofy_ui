import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { spacing, borderRadius, shadows } from '@theme/tokens';
import { ExploreCountry } from '../../types/search';
import { ChevronRight } from 'lucide-react-native';

interface CountryCardProps {
  country: ExploreCountry;
  onPress?: (country: ExploreCountry) => void;
  variant?: 'grid' | 'list';
}

export const CountryCard: React.FC<CountryCardProps> = ({
  country,
  onPress,
  variant = 'grid',
}) => {
  const { colors, typography } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        variant === 'grid' ? styles.gridContainer : styles.listContainer,
        { backgroundColor: colors.surface.card, borderColor: colors.border.main },
      ]}
      onPress={() => onPress?.(country)}
      activeOpacity={0.7}
    >
      <View style={styles.flagContainer}>
        <Text style={styles.flag}>{country.flag}</Text>
      </View>
      <View style={styles.content}>
        <Text style={[styles.name, { color: colors.text.primary, fontSize: typography.body.large.size }]}>
          {country.name}
        </Text>
        <Text style={[styles.subtitle, { color: colors.text.secondary, fontSize: typography.caption.size }]}>
          {country.stationCount.toLocaleString()} stations
        </Text>
      </View>
      {variant === 'list' && <ChevronRight size={20} color={colors.text.secondary} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    ...shadows.sm,
  },
  gridContainer: {
    flex: 1,
    padding: spacing.lg,
    margin: spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  flagContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  flag: {
    fontSize: 24,
  },
  content: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    opacity: 0.8,
  },
});
