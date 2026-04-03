import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { ThemeProvider } from '@theme/ThemeProvider';
import { RootNavigator } from '@navigation/RootNavigator';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { MiniPlayer } from './components/player/MiniPlayer';

import { useAppStore } from './store/useAppStore';
import { useNetworkStatus } from './hooks/useNetworkStatus';
import { NoInternetState } from './components/common/NoInternetState';
import { MaintenancePrompt } from './components/common/MaintenancePrompt';
import { AppUpdatePrompt } from './components/common/AppUpdatePrompt';
import { SessionExpiredPrompt } from './components/common/SessionExpiredPrompt';

const AppContent = () => {
  const { isDark } = useTheme();
  const { isConnected } = useNetworkStatus();
  const { 
    isMaintenance, 
    isUpdateRequired, 
    isSessionExpired,
    setUpdateRequired,
    setSessionExpired
  } = useAppStore();

  if (!isConnected) {
    return <NoInternetState onRetry={() => {}} />;
  }

  if (isMaintenance) {
    return <MaintenancePrompt onRefresh={() => {}} estimatedTime="2:00 PM" />;
  }

  return (
    <View style={styles.container}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <RootNavigator />
      <MiniPlayer />
      
      <AppUpdatePrompt 
        visible={isUpdateRequired} 
        onUpdate={() => {}} 
        onLater={() => setUpdateRequired(false)} 
      />
      
      <SessionExpiredPrompt 
        visible={isSessionExpired} 
        onSignIn={() => setSessionExpired(false)} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics} style={styles.container}>
        <ThemeProvider>
          <NavigationContainer>
            <AppContent />
          </NavigationContainer>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
