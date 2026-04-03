import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeRoutes } from '../navigation.constants';
import { HomeStackParamList } from '../navigation.types';
import { HomeScreen } from '../../screens/home/HomeScreen';
import { StationDetailsScreen } from '../../screens/station/StationDetailsScreen';
import { FullPlayerScreen } from '../../screens/player/FullPlayerScreen';
import { TrendingStationsScreen, FeaturedStationsScreen } from '../../screens/placeholders';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={HomeRoutes.HOME} component={HomeScreen} />
    <Stack.Screen name={HomeRoutes.TRENDING_STATIONS} component={TrendingStationsScreen} />
    <Stack.Screen name={HomeRoutes.FEATURED_STATIONS} component={FeaturedStationsScreen} />
    <Stack.Screen name={HomeRoutes.STATION_DETAILS} component={StationDetailsScreen} />
    <Stack.Screen name={HomeRoutes.FULL_PLAYER} component={FullPlayerScreen} />
  </Stack.Navigator>
);
