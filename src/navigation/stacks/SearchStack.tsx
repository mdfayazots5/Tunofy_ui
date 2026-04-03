import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SearchRoutes } from '../navigation.constants';
import { SearchStackParamList } from '../navigation.types';
import { SearchScreen } from '../../screens/search/SearchScreen';
import { ExploreGenresScreen } from '../../screens/explore/ExploreGenresScreen';
import { ExploreLanguagesScreen } from '../../screens/explore/ExploreLanguagesScreen';
import { ExploreCountriesScreen } from '../../screens/explore/ExploreCountriesScreen';
import { FilteredStationListScreen } from '../../screens/search/FilteredStationListScreen';
import { StationDetailsScreen } from '../../screens/station/StationDetailsScreen';

const Stack = createNativeStackNavigator<SearchStackParamList>();

export const SearchStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={SearchRoutes.SEARCH} component={SearchScreen} />
    <Stack.Screen name={SearchRoutes.EXPLORE_GENRES} component={ExploreGenresScreen} />
    <Stack.Screen name={SearchRoutes.EXPLORE_LANGUAGES} component={ExploreLanguagesScreen} />
    <Stack.Screen name={SearchRoutes.EXPLORE_COUNTRIES} component={ExploreCountriesScreen} />
    <Stack.Screen name={SearchRoutes.FILTERED_STATION_LIST} component={FilteredStationListScreen} />
    <Stack.Screen name={SearchRoutes.STATION_DETAILS} component={StationDetailsScreen} />
  </Stack.Navigator>
);
