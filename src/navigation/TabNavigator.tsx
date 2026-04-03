import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@theme/ThemeProvider';
import { TabRoutes } from './navigation.constants';
import { TabStackParamList } from './navigation.types';
import { useMiniPlayerVisibility } from './useMiniPlayerVisibility';
import { MINI_PLAYER_HEIGHT, MINI_PLAYER_MARGIN } from '../constants/layout';
import { HomeStack } from './stacks/HomeStack';
import { SearchStack } from './stacks/SearchStack';
import { FavoritesStack } from './stacks/FavoritesStack';
import { NotificationsStack } from './stacks/NotificationsStack';
import { ProfileStack } from './stacks/ProfileStack';
import { Home, Search, Heart, Bell, User } from 'lucide-react-native';
import { TabIcon } from '../components/common/TabIcon';

const Tab = createBottomTabNavigator<TabStackParamList>();

export const TabNavigator = () => {
  const { colors } = useTheme();
  const { isVisible } = useMiniPlayerVisibility();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.brand.primary,
        tabBarInactiveTintColor: colors.text.muted,
        tabBarStyle: {
          backgroundColor: colors.surface.main,
          borderTopColor: colors.border.subtle,
          height: 60,
          paddingBottom: 8,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        },
      }}
      sceneContainerStyle={{
        flex: 1,
        paddingBottom: isVisible ? MINI_PLAYER_HEIGHT + MINI_PLAYER_MARGIN : 0,
      }}
    >
      <Tab.Screen
        name={TabRoutes.HOME_STACK}
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon focused={focused} color={color} size={size} Icon={Home} />
          ),
        }}
      />
      <Tab.Screen
        name={TabRoutes.SEARCH_STACK}
        component={SearchStack}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon focused={focused} color={color} size={size} Icon={Search} />
          ),
        }}
      />
      <Tab.Screen
        name={TabRoutes.FAVORITES_STACK}
        component={FavoritesStack}
        options={{
          tabBarLabel: 'Favorites',
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon focused={focused} color={color} size={size} Icon={Heart} />
          ),
        }}
      />
      <Tab.Screen
        name={TabRoutes.NOTIFICATIONS_STACK}
        component={NotificationsStack}
        options={{
          tabBarLabel: 'Alerts',
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon focused={focused} color={color} size={size} Icon={Bell} />
          ),
        }}
      />
      <Tab.Screen
        name={TabRoutes.PROFILE_STACK}
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon focused={focused} color={color} size={size} Icon={User} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
