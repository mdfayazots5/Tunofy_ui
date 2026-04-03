import React from 'react';
import { UserX } from 'lucide-react-native';
import { PromptModalShell } from './PromptModalShell';
import { useTheme } from '../../theme/ThemeProvider';

interface SessionExpiredPromptProps {
  visible: boolean;
  onSignIn: () => void;
}

export const SessionExpiredPrompt: React.FC<SessionExpiredPromptProps> = ({ 
  visible, 
  onSignIn 
}) => {
  const { colors } = useTheme();

  return (
    <PromptModalShell
      visible={visible}
      onClose={() => {}} // Force sign in
      title="Session Expired"
      description="Your session has expired for security reasons. Please sign in again to continue using Tunofy."
      icon={<UserX size={48} color={colors.semantic.error} />}
      primaryAction={{
        label: 'Sign In Again',
        onPress: onSignIn,
      }}
    />
  );
};
