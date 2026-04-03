import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { WifiOff, AlertCircle, RefreshCw } from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeProvider';

interface PlayerStatusStateProps {
  type: 'error' | 'no-internet';
  message: string;
  onRetry: () => void;
}

export const PlayerStatusState: React.FC<PlayerStatusStateProps> = ({ type, message, onRetry }) => {
  const { colors, spacing, typography } = useTheme();

  const Icon = type === 'error' ? AlertCircle : WifiOff;

  return (
    <View style={[styles.container, { gap: spacing.md }]}>
      <Icon size={48} color={colors.error} />
      <Text style={[styles.message, { color: colors.text, fontSize: typography.size.md }]}>{message}</Text>
      <TouchableOpacity
        onPress={onRetry}
        style={[styles.retryButton, { backgroundColor: colors.surface, paddingHorizontal: spacing.xl, paddingVertical: spacing.sm }]}
      >
        <RefreshCw size={18} color={colors.primary} style={{ marginRight: spacing.xs }} />
        <Text style={[styles.retryText, { color: colors.primary, fontSize: typography.size.sm }]}>Try Again</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  message: {
    fontWeight: '600',
    textAlign: 'center',
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  retryText: {
    fontWeight: '700',
  },
});
