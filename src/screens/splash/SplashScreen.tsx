import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { spacing } from '@theme/tokens';
import { useAppStore } from '../../store/useAppStore';

export const SplashScreen = () => {
  const { colors, typography } = useTheme();
  const { setStartupResolved } = useAppStore();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Branded fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
      easing: Easing.out(Easing.quad),
    }).start();

    // Waveform pulse animation
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.sine),
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.sine),
        }),
      ])
    );
    
    pulseLoop.start();

    // Startup logic
    const timer = setTimeout(() => {
      setStartupResolved(true);
    }, 500);

    return () => {
      clearTimeout(timer);
      pulseLoop.stop();
    };
  }, [fadeAnim, pulseAnim, setStartupResolved]);

  return (
    <View style={[styles.container, { backgroundColor: colors.surface.main }]}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Animated.View style={[styles.logoContainer, { transform: [{ scale: pulseAnim }] }]}>
          <View style={[styles.logo, { backgroundColor: colors.brand.primary }]}>
            <Text style={[styles.logoText, { color: colors.text.inverse }]}>T</Text>
          </View>
        </Animated.View>
        <Text style={[styles.title, { color: colors.text.primary, fontSize: typography.h1.size }]}>
          Tunofy
        </Text>
        <View style={styles.waveform}>
          {[1, 2, 3, 4, 5].map((i) => (
            <View
              key={i}
              style={[
                styles.waveBar,
                {
                  backgroundColor: colors.brand.primary,
                  height: 10 + i * 5,
                  opacity: 0.2 + i * 0.15,
                },
              ]}
            />
          ))}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: spacing.lg,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoText: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  title: {
    fontWeight: 'bold',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  waveform: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xl,
    height: 40,
  },
  waveBar: {
    width: 4,
    marginHorizontal: 2,
    borderRadius: 2,
  },
});
