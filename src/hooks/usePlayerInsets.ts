import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMiniPlayerVisibility } from '../navigation/useMiniPlayerVisibility';
import { spacing } from '../theme/tokens';

const MINI_PLAYER_HEIGHT = 64;
const TAB_BAR_HEIGHT = 60;

export const usePlayerInsets = () => {
  const insets = useSafeAreaInsets();
  const { isVisible, isTabVisible } = useMiniPlayerVisibility();

  let bottomInset = insets.bottom;

  if (isTabVisible) {
    bottomInset += TAB_BAR_HEIGHT;
  }

  if (isVisible) {
    bottomInset += MINI_PLAYER_HEIGHT + spacing.sm;
  }

  return {
    bottom: bottomInset,
    playerHeight: isVisible ? MINI_PLAYER_HEIGHT : 0,
    tabBarHeight: isTabVisible ? TAB_BAR_HEIGHT : 0,
  };
};
