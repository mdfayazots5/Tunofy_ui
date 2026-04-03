import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { spacing } from '@theme/tokens';
import { Button } from '@components/common/Button';
import { InputField } from '@components/forms/InputField';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/navigation.types';
import { AuthRoutes } from '../../navigation/navigation.constants';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuthStore } from '../../store/useAuthStore';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react-native';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export const LoginScreen = () => {
  const { colors, typography } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const { setToken } = useAuthStore();
  const [showPassword, setShowPassword] = React.useState(false);

  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: any) => {
    // Mock login
    console.log('Login data:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setToken('mock-token');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.surface.main }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text.primary, fontSize: typography.h1.size }]}>
              Welcome Back
            </Text>
            <Text style={[styles.subtitle, { color: colors.text.secondary, fontSize: typography.body.large.size }]}>
              Sign in to continue your musical journey
            </Text>
          </View>

          <View style={styles.form}>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <InputField
                  label="Email"
                  placeholder="Enter your email"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.email?.message}
                  leftIcon={<Mail size={20} color={colors.text.muted} />}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <InputField
                  label="Password"
                  placeholder="Enter your password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.password?.message}
                  secureTextEntry={!showPassword}
                  leftIcon={<Lock size={20} color={colors.text.muted} />}
                  rightIcon={
                    <Button
                      variant="ghost"
                      onPress={() => setShowPassword(!showPassword)}
                      style={styles.eyeButton}
                      label=""
                    >
                      {showPassword ? <EyeOff size={20} color={colors.text.muted} /> : <Eye size={20} color={colors.text.muted} />}
                    </Button>
                  }
                />
              )}
            />

            <Button
              label="Forgot Password?"
              variant="ghost"
              onPress={() => navigation.navigate(AuthRoutes.FORGOT_PASSWORD)}
              style={styles.forgotButton}
            />

            <Button
              label="Sign In"
              variant="primary"
              onPress={handleSubmit(onSubmit)}
              loading={isSubmitting}
              style={styles.submitButton}
            />

            <Button
              label="Demo Login (Skip Form)"
              variant="outline"
              onPress={() => setToken('demo-token')}
              style={styles.demoButton}
            />
          </View>

          <View style={styles.oauthContainer}>
            <Text style={[styles.oauthText, { color: colors.text.muted }]}>Or continue with</Text>
            <View style={styles.oauthRow}>
              <Button label="Google" variant="outline" disabled style={styles.oauthButton} />
              <Button label="Apple" variant="outline" disabled style={styles.oauthButton} />
            </View>
            <Text style={[styles.comingSoon, { color: colors.text.muted }]}>OAuth coming soon</Text>
          </View>

          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: colors.text.secondary }]}>
              Don&apos;t have an account?{' '}
            </Text>
            <Button
              label="Create Account"
              variant="ghost"
              onPress={() => navigation.navigate(AuthRoutes.REGISTER)}
              style={styles.footerAction}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.xl,
    flexGrow: 1,
  },
  header: {
    marginBottom: spacing.xl,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  subtitle: {
    opacity: 0.8,
  },
  form: {
    marginBottom: spacing.xl,
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginTop: -spacing.sm,
    marginBottom: spacing.md,
  },
  submitButton: {
    marginTop: spacing.md,
  },
  demoButton: {
    marginTop: spacing.md,
  },
  eyeButton: {
    padding: 0,
    margin: 0,
    minHeight: 0,
    minWidth: 0,
  },
  oauthContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  oauthText: {
    marginBottom: spacing.md,
    fontSize: 14,
  },
  oauthRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  oauthButton: {
    width: '48%',
  },
  comingSoon: {
    fontSize: 10,
    marginTop: 4,
    fontStyle: 'italic',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
  },
  footerText: {
    fontSize: 14,
  },
  footerAction: {
    padding: 0,
    minHeight: 0,
    minWidth: 0,
  },
});
