import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { spacing } from '@theme/tokens';
import { Button } from '@components/common/Button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/navigation.types';
import { AuthRoutes } from '../../navigation/navigation.constants';
import { useAppStore } from '../../store/useAppStore';

export const WelcomeScreen = () => {
  const { colors, typography } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const { setGuestMode } = useAppStore();

  const handleGuestEntry = () => {
    setGuestMode(true);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.surface.main }]}>
      <View style={styles.content}>
        <View style={styles.brandArea}>
          <View style={[styles.logoPlaceholder, { backgroundColor: colors.brand.primary }]}>
            <Text style={[styles.logoText, { color: colors.text.inverse }]}>T</Text>
          </View>
          <Text style={[styles.title, { color: colors.text.primary, fontSize: typography.h1.size }]}>
            Tunofy
          </Text>
          <Text style={[styles.tagline, { color: colors.text.secondary, fontSize: typography.body.large.size }]}>
            Your World of Radio, Anywhere.
          </Text>
        </View>

        <View style={styles.actions}>
          <Button
            label="Sign In"
            variant="primary"
            onPress={() => navigation.navigate(AuthRoutes.LOGIN)}
            style={styles.button}
          />
          <Button
            label="Create Account"
            variant="outline"
            onPress={() => navigation.navigate(AuthRoutes.REGISTER)}
            style={styles.button}
          />
          <Button
            label="Continue as Guest"
            variant="ghost"
            onPress={handleGuestEntry}
            style={styles.guestButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: spacing.xl,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  logoText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  tagline: {
    textAlign: 'center',
    opacity: 0.8,
  },
  actions: {
    width: '100%',
    paddingBottom: spacing.xl,
  },
  button: {
    marginBottom: spacing.md,
  },
  guestButton: {
    marginTop: spacing.sm,
  },
});
