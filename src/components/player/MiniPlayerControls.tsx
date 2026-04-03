import React from 'react';
import { View, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Play, Pause, X } from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { spacing } from '../../theme/tokens';
import { PlaybackState } from '../../types/station';

interface MiniPlayerControlsProps {
  playbackState: PlaybackState;
  onPlayPause: () => void;
  onStop: () => void;
}

export const MiniPlayerControls: React.FC<MiniPlayerControlsProps> = ({
  playbackState,
  onPlayPause,
  onStop,
}) => {
  const { colors } = useTheme();

  const renderPlayPause = () => {
    if (playbackState === 'loading') {
      return <ActivityIndicator size="small" color={colors.brand.primary} />;
    }

    if (playbackState === 'playing') {
      return <Pause size={24} color={colors.text.primary} fill={colors.text.primary} />;
    }

    return <Play size={24} color={colors.text.primary} fill={colors.text.primary} />;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPlayPause}
        style={styles.button}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        {renderPlayPause()}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onStop}
        style={styles.button}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <X size={20} color={colors.text.secondary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginLeft: spacing.md,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
