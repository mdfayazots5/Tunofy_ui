import React from 'react';
import { Download } from 'lucide-react-native';
import { PromptModalShell } from './PromptModalShell';
import { useTheme } from '../../theme/ThemeProvider';

interface AppUpdatePromptProps {
  visible: boolean;
  onUpdate: () => void;
  onLater?: () => void;
  isForced?: boolean;
}

export const AppUpdatePrompt: React.FC<AppUpdatePromptProps> = ({ 
  visible, 
  onUpdate, 
  onLater, 
  isForced = false 
}) => {
  const { colors } = useTheme();

  return (
    <PromptModalShell
      visible={visible}
      onClose={isForced ? () => {} : (onLater || (() => {}))}
      title="New Update Available"
      description={isForced 
        ? "A critical update is required to continue using Tunofy. Please update to the latest version." 
        : "A new version of Tunofy is available with new features and improvements."}
      icon={<Download size={48} color={colors.brand.primary} />}
      primaryAction={{
        label: 'Update Now',
        onPress: onUpdate,
      }}
      secondaryAction={!isForced ? {
        label: 'Maybe Later',
        onPress: onLater || (() => {}),
      } : undefined}
    />
  );
};
