import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/ThemeProvider';
import { spacing, borderRadius, shadows } from '../../theme/tokens';
import { usePlayerStore } from '../../store/usePlayerStore';
import { useAudioPlayer } from '../../services/audioService';
import { useMiniPlayerVisibility } from '../../navigation/useMiniPlayerVisibility';
import { AppRoutes } from '../../navigation/navigation.constants';
import { MiniPlayerArtwork } from './MiniPlayerArtwork';
import { MiniPlayerControls } from './MiniPlayerControls';

import { MINI_PLAYER_HEIGHT, TAB_BAR_HEIGHT, MINI_PLAYER_MARGIN } from '../../constants/layout';

export const MiniPlayer: React.FC = () => {
  const { colors, typography } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const { isVisible, isTabVisible } = useMiniPlayerVisibility();
  
  const { currentStation, playbackState } = usePlayerStore();
  const { togglePlayPause, stop } = useAudioPlayer();

  const translateY = useSharedValue(MINI_PLAYER_HEIGHT + 100);

  useEffect(() => {
    if (isVisible) {
      translateY.value = withSpring(0, { damping: 15 });
    } else {
      translateY.value = withTiming(MINI_PLAYER_HEIGHT + 100);
    }
  }, [isVisible, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  if (!currentStation) return null;

  const handlePress = () => {
    navigation.navigate(AppRoutes.FULL_PLAYER);
  };

  const safeBottomInset = insets.bottom || 0;
  const bottomInset = isTabVisible 
    ? TAB_BAR_HEIGHT + safeBottomInset + MINI_PLAYER_MARGIN 
    : safeBottomInset + MINI_PLAYER_MARGIN;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: colors.surface.card,
          bottom: bottomInset || spacing.md,
          borderColor: colors.brand.primary + '20',
        },
        animatedStyle,
      ]}
    >
      <TouchableOpacity
        style={styles.content}
        onPress={handlePress}
        activeOpacity={0.9}
      >
        <View style={styles.leftSection}>
          <MiniPlayerArtwork logo={currentStation.logo} />
          <View style={styles.info}>
            <Text
              style={[
                styles.name,
                { color: colors.text.primary, fontSize: typography.body.medium.size },
              ]}
              numberOfLines={1}
            >
              {currentStation.name}
            </Text>
            <Text
              style={[
                styles.genre,
                { color: colors.text.secondary, fontSize: typography.caption.size },
              ]}
              numberOfLines={1}
            >
              {currentStation.genre}
            </Text>
          </View>
        </View>
        <MiniPlayerControls
          playbackState={playbackState}
          onPlayPause={togglePlayPause}
          onStop={stop}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: spacing.md,
    right: spacing.md,
    height: MINI_PLAYER_HEIGHT,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    ...shadows.md,
    zIndex: 1000,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
  },
  leftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    marginLeft: spacing.sm,
    flex: 1,
  },
  name: {
    fontWeight: '600',
  },
  genre: {
    marginTop: 2,
  },
});
