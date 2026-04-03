import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CheckCircle2 } from 'lucide-react-native';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';
import { useTheme } from '../../theme/ThemeProvider';
import { spacing, borderRadius, shadows } from '../../theme/tokens';

interface FeedbackSuccessStateProps {
  onBackToHome: () => void;
}

export const FeedbackSuccessState: React.FC<FeedbackSuccessStateProps> = ({ onBackToHome }) => {
  const { colors, typography } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Animated.View entering={ZoomIn.duration(500)} style={[styles.iconContainer, { backgroundColor: colors.brand.primary + '15' }]}>
        <CheckCircle2 size={80} color={colors.brand.primary} />
      </Animated.View>
      
      <Animated.View entering={FadeIn.delay(300).duration(500)} style={styles.content}>
        <Text style={[styles.title, { color: colors.text.primary, fontSize: typography.heading.h2.size }]}>
          Thanks for your feedback!
        </Text>
        <Text style={[styles.description, { color: colors.text.secondary, fontSize: typography.body.medium.size }]}>
          We&apos;ve received your message and will get back to you if necessary. Your input helps us make Tunofy better.
        </Text>
      </Animated.View>

      <Animated.View entering={FadeIn.delay(600).duration(500)} style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.brand.primary }]}
          onPress={onBackToHome}
        >
          <Text style={[styles.buttonText, { color: '#FFF', fontSize: typography.body.medium.size }]}>
            Back to Home
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xxl,
  },
  iconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  content: {
    alignItems: 'center',
    marginBottom: spacing.xxxl,
  },
  title: {
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  description: {
    textAlign: 'center',
    lineHeight: 24,
    opacity: 0.8,
  },
  footer: {
    width: '100%',
  },
  button: {
    width: '100%',
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    ...shadows.md,
  },
  buttonText: {
    fontWeight: '700',
  },
});
