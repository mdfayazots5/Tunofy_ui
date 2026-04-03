import React, { useEffect } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Heart } from 'lucide-react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring, 
  withSequence, 
  withTiming,
  interpolateColor
} from 'react-native-reanimated';
import { useTheme } from '../../theme/ThemeProvider';
import { hapticHelper } from '../../utils/haptics';

interface FavoriteToggleAnimatedProps {
  isFavorited: boolean;
  onToggle: () => void;
  size?: number;
}

export const FavoriteToggleAnimated: React.FC<FavoriteToggleAnimatedProps> = ({ 
  isFavorited, 
  onToggle, 
  size = 24 
}) => {
  const { colors } = useTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleToggle = () => {
    hapticHelper.medium();
    scale.value = withSequence(
      withSpring(1.4, { damping: 10, stiffness: 300 }),
      withSpring(1, { damping: 10, stiffness: 300 })
    );
    onToggle();
  };

  return (
    <TouchableOpacity onPress={handleToggle} activeOpacity={0.7}>
      <Animated.View style={animatedStyle}>
        <Heart 
          size={size} 
          color={isFavorited ? colors.brand.primary : colors.text.muted} 
          fill={isFavorited ? colors.brand.primary : 'transparent'} 
        />
      </Animated.View>
    </TouchableOpacity>
  );
};
