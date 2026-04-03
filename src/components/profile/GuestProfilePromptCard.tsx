import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { UserPlus } from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { spacing, borderRadius, shadows } from '../../theme/tokens';

interface GuestProfilePromptCardProps {
  onSignIn: () => void;
}

export const GuestProfilePromptCard: React.FC<GuestProfilePromptCardProps> = ({ onSignIn }) => {
  const { colors, typography } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface.card }]}>
      <View style={[styles.iconContainer, { backgroundColor: colors.brand.primary + '15' }]}>
        <UserPlus size={32} color={colors.brand.primary} />
      </View>
      
      <Text style={[styles.title, { color: colors.text.primary, fontSize: typography.heading.h3.size }]}>
        Unlock the Full Experience
      </Text>
      <Text style={[styles.description, { color: colors.text.secondary, fontSize: typography.body.medium.size }]}>
        Sign in to save your favorite stations, sync your listening history, and get personalized recommendations across all your devices.
      </Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.brand.primary }]}
        onPress={onSignIn}
      >
        <Text style={[styles.buttonText, { color: '#FFF', fontSize: typography.body.medium.size }]}>
          Sign In or Create Account
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.lg,
    padding: spacing.xxl,
    marginHorizontal: spacing.xl,
    marginBottom: spacing.xl,
    alignItems: 'center',
    ...shadows.sm,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  description: {
    textAlign: 'center',
    marginBottom: spacing.xl,
    lineHeight: 22,
    opacity: 0.8,
  },
  button: {
    width: '100%',
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    ...shadows.sm,
  },
  buttonText: {
    fontWeight: '700',
  },
});
