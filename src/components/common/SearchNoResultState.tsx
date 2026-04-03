import React from 'react';
import { SearchX } from 'lucide-react-native';
import { EdgeStateLayout } from './EdgeStateLayout';
import { useTheme } from '../../theme/ThemeProvider';

interface SearchNoResultStateProps {
  query: string;
  onClear: () => void;
  isFullScreen?: boolean;
}

export const SearchNoResultState: React.FC<SearchNoResultStateProps> = ({ 
  query, 
  onClear, 
  isFullScreen = false 
}) => {
  const { colors } = useTheme();

  return (
    <EdgeStateLayout
      title="No Results Found"
      description={`We couldn't find any stations matching "${query}". Try searching for a different genre or station name.`}
      icon={<SearchX size={64} color={colors.text.muted} />}
      primaryAction={{
        label: 'Clear Search',
        onPress: onClear,
      }}
      isFullScreen={isFullScreen}
    />
  );
};
