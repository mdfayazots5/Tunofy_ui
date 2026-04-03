import React from 'react';
import { WifiOff } from 'lucide-react-native';
import { EdgeStateLayout } from './EdgeStateLayout';
import { useTheme } from '../../theme/ThemeProvider';

interface NoInternetStateProps {
  onRetry: () => void;
  isFullScreen?: boolean;
}

export const NoInternetState: React.FC<NoInternetStateProps> = ({ onRetry, isFullScreen = true }) => {
  const { colors } = useTheme();

  return (
    <EdgeStateLayout
      title="No Internet Connection"
      description="Please check your network settings and try again. You need an active connection to stream music."
      icon={<WifiOff size={64} color={colors.text.muted} />}
      primaryAction={{
        label: 'Try Again',
        onPress: onRetry,
      }}
      isFullScreen={isFullScreen}
    />
  );
};
