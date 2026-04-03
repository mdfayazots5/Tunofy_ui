import React from 'react';
import { History } from 'lucide-react-native';
import { EdgeStateLayout } from './EdgeStateLayout';
import { useTheme } from '../../theme/ThemeProvider';

interface EmptyRecentStateProps {
  onBrowse: () => void;
  isFullScreen?: boolean;
}

export const EmptyRecentState: React.FC<EmptyRecentStateProps> = ({ 
  onBrowse, 
  isFullScreen = true 
}) => {
  const { colors } = useTheme();

  return (
    <EdgeStateLayout
      title="No Recent Activity"
      description="You haven't listened to any stations yet. Start playing some music to see your history here."
      icon={<History size={64} color={colors.text.muted} />}
      primaryAction={{
        label: 'Start Listening',
        onPress: onBrowse,
      }}
      isFullScreen={isFullScreen}
    />
  );
};
