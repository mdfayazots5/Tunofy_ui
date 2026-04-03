import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NotificationsRoutes } from '../navigation.constants';
import { NotificationsStackParamList } from '../navigation.types';
import { NotificationsScreen } from '../../screens/notifications/NotificationsScreen';

const Stack = createNativeStackNavigator<NotificationsStackParamList>();

export const NotificationsStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={NotificationsRoutes.NOTIFICATIONS} component={NotificationsScreen} />
  </Stack.Navigator>
);
