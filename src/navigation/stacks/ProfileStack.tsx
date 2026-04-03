import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileRoutes } from '../navigation.constants';
import { ProfileStackParamList } from '../navigation.types';
import { ProfileScreen } from '../../screens/profile/ProfileScreen';
import { RecentListeningScreen } from '../../screens/library/RecentListeningScreen';
import { FeedbackScreen } from '../../screens/profile/FeedbackScreen';
import { EditProfileScreen } from '../../screens/profile/EditProfileScreen';
import { SettingsScreen } from '../../screens/profile/SettingsScreen';
import { AboutScreen } from '../../screens/profile/AboutScreen';
import { ContactScreen } from '../../screens/profile/ContactScreen';
import { PrivacyScreen } from '../../screens/profile/PrivacyScreen';
import { TermsScreen } from '../../screens/profile/TermsScreen';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export const ProfileStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={ProfileRoutes.PROFILE} component={ProfileScreen} />
    <Stack.Screen name={ProfileRoutes.EDIT_PROFILE} component={EditProfileScreen} />
    <Stack.Screen name={ProfileRoutes.SETTINGS} component={SettingsScreen} />
    <Stack.Screen name={ProfileRoutes.RECENT_LISTENING} component={RecentListeningScreen} />
    <Stack.Screen name={ProfileRoutes.FEEDBACK} component={FeedbackScreen} />
    <Stack.Screen name={ProfileRoutes.ABOUT} component={AboutScreen} />
    <Stack.Screen name={ProfileRoutes.CONTACT} component={ContactScreen} />
    <Stack.Screen name={ProfileRoutes.PRIVACY} component={PrivacyScreen} />
    <Stack.Screen name={ProfileRoutes.TERMS} component={TermsScreen} />
  </Stack.Navigator>
);
