import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FavoritesRoutes } from '../navigation.constants';
import { FavoritesStackParamList } from '../navigation.types';
import { StationDetailsScreen } from '../../screens/station/StationDetailsScreen';
import { FavoritesScreen } from '../../screens/favorites/FavoritesScreen';

const Stack = createNativeStackNavigator<FavoritesStackParamList>();

export const FavoritesStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={FavoritesRoutes.FAVORITES} component={FavoritesScreen} />
    <Stack.Screen name={FavoritesRoutes.STATION_DETAILS} component={StationDetailsScreen} />
  </Stack.Navigator>
);
