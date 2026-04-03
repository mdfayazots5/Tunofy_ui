import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../theme/ThemeProvider';
import { borderRadius } from '../../theme/tokens';

interface StationLogoFallbackProps {
  name: string;
  size?: number;
  fontSize?: number;
}

export const StationLogoFallback: React.FC<StationLogoFallbackProps> = ({ 
  name, 
  size = 48, 
  fontSize = 20 
}) => {
  const { colors } = useTheme();
  const firstLetter = name.charAt(0).toUpperCase();

  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: borderRadius.md }]}>
      <LinearGradient
        colors={[colors.brand.primary, colors.brand.secondary || colors.brand.primary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <Text style={[styles.text, { fontSize, color: '#FFFFFF' }]}>
          {firstLetter}
        </Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: '800',
  },
});
