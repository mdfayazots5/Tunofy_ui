import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { spacing, borderRadius, shadows } from '@theme/tokens';
import { ExploreLanguage } from '../../types/search';
import { ChevronRight } from 'lucide-react-native';

interface LanguageCardProps {
  language: ExploreLanguage;
  onPress?: (language: ExploreLanguage) => void;
  variant?: 'grid' | 'list';
}

export const LanguageCard: React.FC<LanguageCardProps> = ({
  language,
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
      onPress={() => onPress?.(language)}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <Text style={[styles.name, { color: colors.text.primary, fontSize: typography.body.large.size }]}>
          {language.name}
        </Text>
        <Text style={[styles.subtitle, { color: colors.text.secondary, fontSize: typography.caption.size }]}>
          {language.stationCount.toLocaleString()} stations
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
