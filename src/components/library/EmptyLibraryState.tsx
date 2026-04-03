import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { spacing, borderRadius } from '../../theme/tokens';

interface EmptyLibraryStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  ctaText: string;
  onCtaPress: () => void;
}

export const EmptyLibraryState: React.FC<EmptyLibraryStateProps> = ({
  icon: Icon,
  title,
  description,
  ctaText,
  onCtaPress,
}) => {
  const { colors, typography } = useTheme();

  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: colors.surface.card }]}>
        <Icon size={48} color={colors.brand.primary} strokeWidth={1.5} />
      </View>
      <Text style={[styles.title, { color: colors.text.primary, fontSize: typography.heading.h3.size }]}>
        {title}
      </Text>
      <Text style={[styles.description, { color: colors.text.secondary, fontSize: typography.body.medium.size }]}>
        {description}
      </Text>
      <TouchableOpacity
        style={[styles.cta, { backgroundColor: colors.brand.primary }]}
        onPress={onCtaPress}
      >
        <Text style={[styles.ctaText, { color: colors.text.inverse, fontSize: typography.body.medium.size }]}>
          {ctaText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    fontWeight: '700',
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    marginBottom: spacing.xxl,
    lineHeight: 22,
  },
  cta: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.full,
  },
  ctaText: {
    fontWeight: '600',
  },
});
