import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Play, Heart, Share2, AlertTriangle, Pause } from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeProvider';

interface StationActionRowProps {
  isPlaying: boolean;
  isFavorite: boolean;
  onPlayPress: () => void;
  onFavoritePress: () => void;
  onSharePress: () => void;
  onReportPress: () => void;
}

export const StationActionRow: React.FC<StationActionRowProps> = ({
  isPlaying,
  isFavorite,
  onPlayPress,
  onFavoritePress,
  onSharePress,
  onReportPress,
}) => {
  const { colors, spacing, typography } = useTheme();

  return (
    <View style={[styles.container, { gap: spacing.md }]}>
      <TouchableOpacity
        style={[styles.playButton, { backgroundColor: colors.primary, paddingHorizontal: spacing.xl, paddingVertical: spacing.md }]}
        onPress={onPlayPress}
      >
        {isPlaying ? (
          <Pause size={24} color={colors.background} fill={colors.background} />
        ) : (
          <Play size={24} color={colors.background} fill={colors.background} />
        )}
        <Text style={[styles.playText, { color: colors.background, fontSize: typography.size.md, marginLeft: spacing.sm }]}>
          {isPlaying ? 'Pause' : 'Play Station'}
        </Text>
      </TouchableOpacity>

      <View style={[styles.secondaryActions, { gap: spacing.md }]}>
        <TouchableOpacity
          style={[styles.iconButton, { backgroundColor: colors.surface }]}
          onPress={onFavoritePress}
        >
          <Heart size={22} color={isFavorite ? colors.error : colors.textSecondary} fill={isFavorite ? colors.error : 'transparent'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.iconButton, { backgroundColor: colors.surface }]}
          onPress={onSharePress}
        >
          <Share2 size={22} color={colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.iconButton, { backgroundColor: colors.surface }]}
          onPress={onReportPress}
        >
          <AlertTriangle size={22} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    width: '100%',
  },
  playText: {
    fontWeight: '700',
  },
  secondaryActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  iconButton: {
    flex: 1,
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
});
