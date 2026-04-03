import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { spacing, borderRadius, shadows } from '@theme/tokens';
import { Button } from '@components/common/Button';
import { LogIn } from 'lucide-react-native';

interface GuestSignInBannerProps {
  onSignInPress?: () => void;
}

export const GuestSignInBanner: React.FC<GuestSignInBannerProps> = ({ onSignInPress }) => {
  const { colors, typography } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.brand.secondary, borderColor: colors.brand.primary }]}>
      <View style={styles.iconContainer}>
        <LogIn size={32} color={colors.brand.primary} />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: colors.text.primary, fontSize: typography.h3.size }]}>
          Unlock Personalized Experience
        </Text>
        <Text style={[styles.subtitle, { color: colors.text.secondary, fontSize: typography.body.medium.size }]}>
          Sign in to save your favorites and see your listening history.
        </Text>
        <Button
          label="Sign In Now"
          variant="primary"
          onPress={onSignInPress}
          style={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    marginHorizontal: spacing.lg,
    marginVertical: spacing.md,
    ...shadows.md,
  },
  iconContainer: {
    marginRight: spacing.lg,
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  subtitle: {
    marginBottom: spacing.md,
    opacity: 0.8,
  },
  button: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
});
