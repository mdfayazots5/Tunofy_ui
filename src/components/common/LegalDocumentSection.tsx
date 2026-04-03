import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { spacing } from '../../theme/tokens';

interface LegalDocumentSectionProps {
  title: string;
  content: string;
}

export const LegalDocumentSection: React.FC<LegalDocumentSectionProps> = ({ title, content }) => {
  const { colors, typography } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text.primary, fontSize: typography.body.large.size }]}>
        {title}
      </Text>
      <Text style={[styles.content, { color: colors.text.secondary, fontSize: typography.body.medium.size }]}>
        {content}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xl,
  },
  title: {
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  content: {
    lineHeight: 24,
    opacity: 0.8,
  },
});
