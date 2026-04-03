import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { spacing, borderRadius, shadows } from '@theme/tokens';
import { Music, Globe, Radio } from 'lucide-react-native';

interface SearchCategoryCardProps {
  type: 'genre' | 'language' | 'country';
  onPress?: () => void;
}

export const SearchCategoryCard: React.FC<SearchCategoryCardProps> = ({
  type,
  onPress,
}) => {
  const { colors, typography } = useTheme();

  const getIcon = () => {
    switch (type) {
      case 'genre':
        return <Music size={24} color={colors.brand.primary} />;
      case 'language':
        return <Radio size={24} color={colors.brand.primary} />;
      case 'country':
        return <Globe size={24} color={colors.brand.primary} />;
    }
  };

  const getLabel = () => {
    switch (type) {
      case 'genre':
        return 'Browse Genre';
      case 'language':
        return 'Browse Language';
      case 'country':
        return 'Browse Country';
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors.surface.card, borderColor: colors.border.main }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: colors.brand.secondary }]}>
        {getIcon()}
      </View>
      <Text style={[styles.label, { color: colors.text.primary, fontSize: typography.body.medium.size }]}>
        {getLabel()}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    marginHorizontal: spacing.xs,
    ...shadows.sm,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  label: {
    fontWeight: '600',
    textAlign: 'center',
  },
});
