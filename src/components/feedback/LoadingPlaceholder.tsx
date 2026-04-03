import React, { useEffect, useRef } from 'react';
import { StyleSheet, ViewStyle, Animated, DimensionValue } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { borderRadius } from '@theme/tokens';

interface LoadingPlaceholderProps {
  width?: DimensionValue;
  height?: DimensionValue;
  radius?: keyof typeof borderRadius | number;
  style?: ViewStyle;
}

export const LoadingPlaceholder: React.FC<LoadingPlaceholderProps> = ({
  width = '100%',
  height = 20,
  radius = 'sm',
  style,
}) => {
  const { colors } = useTheme();
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [animatedValue]);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  const borderRadiusValue = typeof radius === 'number' ? radius : borderRadius[radius];

  return (
    <Animated.View
      style={[
        styles.placeholder,
        {
          width,
          height,
          borderRadius: borderRadiusValue,
          backgroundColor: colors.border,
          opacity,
        },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  placeholder: {
    overflow: 'hidden',
  },
});
