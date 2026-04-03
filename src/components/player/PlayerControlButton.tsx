import React from 'react';
import { TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

interface PlayerControlButtonProps {
  icon: React.ReactNode;
  onPress: () => void;
  size?: number;
  primary?: boolean;
  loading?: boolean;
  disabled?: boolean;
}

export const PlayerControlButton: React.FC<PlayerControlButtonProps> = ({
  icon,
  onPress,
  size = 56,
  primary = false,
  loading = false,
  disabled = false,
}) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: primary ? colors.primary : 'rgba(255, 255, 255, 0.05)',
          opacity: disabled ? 0.5 : 1,
        },
      ]}
    >
      {loading ? (
        <ActivityIndicator color={primary ? colors.background : colors.primary} />
      ) : (
        icon
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
});
