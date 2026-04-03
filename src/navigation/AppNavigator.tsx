import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppRoutes } from './navigation.constants';
import { AppStackParamList } from './navigation.types';
import { TabNavigator } from './TabNavigator';
import { StationDetailsScreen } from '../screens/station/StationDetailsScreen';
import { FullPlayerScreen } from '../screens/player/FullPlayerScreen';
import { GuestRestrictedPromptScreen, AppUpdatePromptScreen } from '../screens/placeholders';
import { PlayerAwareContainer } from '../components/layout/PlayerAwareContainer';

const Stack = createNativeStackNavigator<AppStackParamList>();

export const AppNavigator = () => (
  <PlayerAwareContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={AppRoutes.TABS} component={TabNavigator} />
      <Stack.Screen
        name={AppRoutes.STATION_DETAILS}
        component={StationDetailsScreen}
        options={{ presentation: 'card' }}
      />
      <Stack.Screen
        name={AppRoutes.FULL_PLAYER}
        component={FullPlayerScreen}
        options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
      />
      <Stack.Screen
        name={AppRoutes.GUEST_RESTRICTED_PROMPT}
        component={GuestRestrictedPromptScreen}
        options={{ presentation: 'transparentModal', animation: 'fade' }}
      />
      <Stack.Screen
        name={AppRoutes.APP_UPDATE_PROMPT}
        component={AppUpdatePromptScreen}
        options={{ presentation: 'transparentModal', animation: 'fade' }}
      />
    </Stack.Navigator>
  </PlayerAwareContainer>
);
