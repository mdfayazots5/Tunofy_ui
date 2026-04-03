import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../theme/ThemeProvider';

const { width } = Dimensions.get('window');

interface StationHeroProps {
  banner?: string;
  logo: string;
}

export const StationHero: React.FC<StationHeroProps> = ({ banner, logo }) => {
  const { colors, spacing } = useTheme();

  return (
    <View style={styles.container}>
      {banner ? (
        <Image source={{ uri: banner }} style={styles.banner} />
      ) : (
        <LinearGradient
          colors={[colors.primary, colors.secondary]}
          style={styles.banner}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      )}
      <LinearGradient
        colors={['transparent', colors.background]}
        style={styles.overlay}
      />
      <View style={[styles.logoContainer, { backgroundColor: colors.surface, bottom: -spacing.xl }]}>
        <Image source={{ uri: logo }} style={styles.logo} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: 240,
    position: 'relative',
  },
  banner: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  logoContainer: {
    position: 'absolute',
    alignSelf: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    padding: 4,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  logo: {
    width: '100%',
    height: '100%',
    borderRadius: 46,
  },
});
