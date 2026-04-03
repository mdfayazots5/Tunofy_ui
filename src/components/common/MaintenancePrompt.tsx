import React from 'react';
import { Settings } from 'lucide-react-native';
import { EdgeStateLayout } from './EdgeStateLayout';
import { useTheme } from '../../theme/ThemeProvider';

interface MaintenancePromptProps {
  onRefresh: () => void;
  estimatedTime?: string;
}

export const MaintenancePrompt: React.FC<MaintenancePromptProps> = ({ 
  onRefresh, 
  estimatedTime 
}) => {
  const { colors } = useTheme();

  return (
    <EdgeStateLayout
      title="Scheduled Maintenance"
      description={`Tunofy is currently undergoing scheduled maintenance to improve our services. ${estimatedTime ? `We expect to be back by ${estimatedTime}.` : 'We will be back shortly.'}`}
      icon={<Settings size={64} color={colors.brand.primary} />}
      primaryAction={{
        label: 'Refresh App',
        onPress: onRefresh,
      }}
      isFullScreen={true}
    />
  );
};
