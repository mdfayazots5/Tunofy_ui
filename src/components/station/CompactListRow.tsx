import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { spacing, borderRadius } from '@theme/tokens';
import { Station } from '../../types/home';

interface CompactListRowProps {
  station: Station;
  onPress?: (station: Station) => void;
}

export const CompactListRow: React.FC<CompactListRowProps> = ({
  station,
  onPress,
}) => {
  const { colors, typography } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.container, { borderBottomColor: colors.border.main }]}
      onPress={() => onPress?.(station)}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: station.logo }}
        style={styles.logo}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text
          style={[styles.name, { color: colors.text.primary, fontSize: typography.body.medium.size }]}
          numberOfLines={1}
        >
          {station.name}
        </Text>
        <Text
          style={[styles.genre, { color: colors.text.secondary, fontSize: typography.caption.size }]}
          numberOfLines={1}
        >
          {station.genre}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.sm,
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
  },
  name: {
    fontWeight: '600',
    marginBottom: 2,
  },
  genre: {
    opacity: 0.8,
  },
});
