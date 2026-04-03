import React from 'react';
import { AlertCircle } from 'lucide-react-native';
import { EdgeStateLayout } from './EdgeStateLayout';
import { useTheme } from '../../theme/ThemeProvider';

interface StreamErrorStateProps {
  onRetry: () => void;
  onReport?: () => void;
  isFullScreen?: boolean;
}

export const StreamErrorState: React.FC<StreamErrorStateProps> = ({ 
  onRetry, 
  onReport, 
  isFullScreen = false 
}) => {
  const { colors } = useTheme();

  return (
    <EdgeStateLayout
      title="Stream Unavailable"
      description="We're having trouble connecting to this station. It might be temporarily offline or experiencing high traffic."
      icon={<AlertCircle size={64} color={colors.error} />}
      primaryAction={{
        label: 'Retry Connection',
        onPress: onRetry,
      }}
      secondaryAction={onReport ? {
        label: 'Report Issue',
        onPress: onReport,
      } : undefined}
      isFullScreen={isFullScreen}
    />
  );
};
