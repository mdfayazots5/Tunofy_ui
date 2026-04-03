import { useNavigationState } from '@react-navigation/native';
import { usePlayerStore } from '../store/usePlayerStore';
import { RootRoutes, AuthRoutes, AppRoutes } from './navigation.constants';

const EXCLUDED_ROUTES: string[] = [
  RootRoutes.SPLASH,
  RootRoutes.ONBOARDING,
  AuthRoutes.WELCOME,
  AuthRoutes.LOGIN,
  AuthRoutes.REGISTER,
  AuthRoutes.FORGOT_PASSWORD,
  AuthRoutes.RESET_PASSWORD,
  AppRoutes.FULL_PLAYER,
];

export const useMiniPlayerVisibility = () => {
  const { currentStation, playbackState } = usePlayerStore();
  
  const navigationState = useNavigationState((state) => state);

  if (!navigationState) return { isVisible: false, isTabVisible: false };

  // Recursive function to find the active route name in nested navigators
  const getActiveRoute = (navState: any): { name: string; isTab: boolean } => {
    const route = navState.routes[navState.index];
    
    // Check if this route is the 'Tabs' navigator
    const isTab = route.name === AppRoutes.TABS;
    
    if (route.state) {
      const child = getActiveRoute(route.state);
      return { name: child.name, isTab: isTab || child.isTab };
    }
    return { name: route.name, isTab };
  };

  const { name: currentRouteName, isTab: isTabVisible } = getActiveRoute(navigationState);

  const isPlaybackActive = currentStation !== null && playbackState !== 'idle';
  const isRouteAllowed = !EXCLUDED_ROUTES.includes(currentRouteName as any);

  return {
    isVisible: isPlaybackActive && isRouteAllowed,
    isTabVisible,
  };
};
