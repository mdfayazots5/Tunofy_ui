import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { borderRadius } from '../../theme/tokens';

interface MiniPlayerArtworkProps {
  logo: string;
}

export const MiniPlayerArtwork: React.FC<MiniPlayerArtworkProps> = ({ logo }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: logo }}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#333',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
