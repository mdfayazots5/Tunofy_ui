import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { spacing } from '../../theme/tokens';

interface StaticInfoHeaderProps {
  title: string;
  subtitle?: string;
  showLogo?: boolean;
}

export const StaticInfoHeader: React.FC<StaticInfoHeaderProps> = ({ 
  title, 
  subtitle, 
  showLogo = false 
}) => {
  const { colors, typography } = useTheme();

  return (
    <View style={styles.container}>
      {showLogo && (
        <View style={[styles.logoContainer, { backgroundColor: colors.brand.primary + '15' }]}>
          <Text style={[styles.logoText, { color: colors.brand.primary, fontSize: 40 }]}>T</Text>
        </View>
      )}
      <Text style={[styles.title, { color: colors.text.primary, fontSize: typography.heading.medium.size }]}>
        {title}
      </Text>
      {subtitle && (
        <Text style={[styles.subtitle, { color: colors.text.secondary, fontSize: typography.body.medium.size }]}>
          {subtitle}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.xl,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logoText: {
    fontWeight: '900',
  },
  title: {
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    textAlign: 'center',
    opacity: 0.7,
  },
});
