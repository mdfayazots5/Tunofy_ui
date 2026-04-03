import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthRoutes } from './navigation.constants';
import { AuthStackParamList } from './navigation.types';
import { WelcomeScreen } from '../screens/auth/WelcomeScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { ForgotPasswordScreen } from '../screens/auth/ForgotPasswordScreen';
import { ResetPasswordScreen } from '../screens/auth/ResetPasswordScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={AuthRoutes.WELCOME} component={WelcomeScreen} />
    <Stack.Screen name={AuthRoutes.LOGIN} component={LoginScreen} />
    <Stack.Screen name={AuthRoutes.REGISTER} component={RegisterScreen} />
    <Stack.Screen name={AuthRoutes.FORGOT_PASSWORD} component={ForgotPasswordScreen} />
    <Stack.Screen name={AuthRoutes.RESET_PASSWORD} component={ResetPasswordScreen} />
  </Stack.Navigator>
);
