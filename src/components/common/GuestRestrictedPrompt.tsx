import React from 'react';
import { Lock } from 'lucide-react-native';
import { PromptModalShell } from './PromptModalShell';
import { useTheme } from '../../theme/ThemeProvider';

interface GuestRestrictedPromptProps {
  visible: boolean;
  onClose: () => void;
  onSignIn: () => void;
}

export const GuestRestrictedPrompt: React.FC<GuestRestrictedPromptProps> = ({ 
  visible, 
  onClose, 
  onSignIn 
}) => {
  const { colors } = useTheme();

  return (
    <PromptModalShell
      visible={visible}
      onClose={onClose}
      title="Sign In Required"
      description="You need to be signed in to use this feature. Save your favorites and sync your history across devices."
      icon={<Lock size={48} color={colors.brand.primary} />}
      primaryAction={{
        label: 'Sign In',
        onPress: onSignIn,
      }}
      secondaryAction={{
        label: 'Maybe Later',
        onPress: onClose,
      }}
    />
  );
};
