import React from 'react';
import { HeartOff } from 'lucide-react-native';
import { EdgeStateLayout } from './EdgeStateLayout';
import { useTheme } from '../../theme/ThemeProvider';

interface EmptyFavoritesStateProps {
  onBrowse: () => void;
  isFullScreen?: boolean;
}

export const EmptyFavoritesState: React.FC<EmptyFavoritesStateProps> = ({ 
  onBrowse, 
  isFullScreen = true 
}) => {
  const { colors } = useTheme();

  return (
    <EdgeStateLayout
      title="No Favorites Yet"
      description="Start exploring radio stations and tap the heart icon to add them to your favorites list."
      icon={<HeartOff size={64} color={colors.text.muted} />}
      primaryAction={{
        label: 'Explore Stations',
        onPress: onBrowse,
      }}
      isFullScreen={isFullScreen}
    />
  );
};
