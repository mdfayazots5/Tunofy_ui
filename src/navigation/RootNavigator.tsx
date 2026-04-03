import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootRoutes } from './navigation.constants';
import { RootStackParamList } from './navigation.types';
import { SplashScreen } from '../screens/splash/SplashScreen';
import { OnboardingScreen } from '../screens/onboarding/OnboardingScreen';
import { AuthNavigator } from './AuthNavigator';
import { AppNavigator } from './AppNavigator';
import { useAppStore } from '../store/useAppStore';
import { useAuthStore } from '../store/useAuthStore';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const { onboardingSeen, guestMode, startupResolved } = useAppStore();
  const { isAuthenticated } = useAuthStore();

  // If startup hasn't resolved, show the splash screen
  if (!startupResolved) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={RootRoutes.SPLASH} component={SplashScreen} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!onboardingSeen ? (
        <Stack.Screen name={RootRoutes.ONBOARDING} component={OnboardingScreen} />
      ) : !isAuthenticated && !guestMode ? (
        <Stack.Screen name={RootRoutes.AUTH} component={AuthNavigator} />
      ) : (
        <Stack.Screen name={RootRoutes.APP} component={AppNavigator} />
      )}
    </Stack.Navigator>
  );
};
