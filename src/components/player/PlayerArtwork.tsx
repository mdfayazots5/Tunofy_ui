import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

const { width } = Dimensions.get('window');
const ARTWORK_SIZE = width * 0.7;

interface PlayerArtworkProps {
  logo: string;
}

export const PlayerArtwork: React.FC<PlayerArtworkProps> = ({ logo }) => {
  const { colors, spacing } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface, padding: spacing.md }]}>
      <Image source={{ uri: logo }} style={styles.artwork} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: ARTWORK_SIZE,
    height: ARTWORK_SIZE,
    borderRadius: 24,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  artwork: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
});
