import React, { useEffect } from 'react';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring, 
  withRepeat, 
  withSequence,
  withTiming,
  Easing
} from 'react-native-reanimated';

interface TabIconProps {
  focused: boolean;
  color: string;
  size: number;
  Icon: any;
}

export const TabIcon: React.FC<TabIconProps> = ({ focused, color, size, Icon }) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  useEffect(() => {
    if (focused) {
      // Pulse animation when focused
      scale.value = withRepeat(
        withSequence(
          withTiming(1.1, { duration: 400, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }),
          withTiming(1, { duration: 400, easing: Easing.bezier(0.25, 0.1, 0.25, 1) })
        ),
        -1, // Infinite
        true // Reverse
      );
    } else {
      scale.value = withSpring(1);
      opacity.value = withSpring(1);
    }
  }, [focused, scale, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Icon color={color} size={size} fill={focused ? color + '20' : 'transparent'} />
    </Animated.View>
  );
};
