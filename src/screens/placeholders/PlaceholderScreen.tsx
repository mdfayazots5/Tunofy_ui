import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';

interface PlaceholderScreenProps {
  title: string;
}

export const PlaceholderScreen: React.FC<PlaceholderScreenProps> = ({ title }) => {
  const { colors, typography } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface.main }]}>
      <Text style={[styles.text, { color: colors.text.primary, fontSize: typography.h1.size }]}>
        {title}
      </Text>
      <Text style={[styles.subtext, { color: colors.text.secondary, fontSize: typography.body.medium.size }]}>
        Phase 2 Placeholder
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtext: {
    opacity: 0.7,
  },
});
