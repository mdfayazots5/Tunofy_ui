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
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react-native';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

export const RegisterScreen = () => {
  const { colors, typography } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const { setToken } = useAuthStore();
  const [showPassword, setShowPassword] = React.useState(false);

  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: any) => {
    // Mock register
    console.log('Register data:', data);
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
              Create Account
            </Text>
            <Text style={[styles.subtitle, { color: colors.text.secondary, fontSize: typography.body.large.size }]}>
              Join the Tunofy community today
            </Text>
          </View>

          <View style={styles.form}>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <InputField
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.name?.message}
                  leftIcon={<User size={20} color={colors.text.muted} />}
                />
              )}
            />

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
                  placeholder="Create a password"
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

            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <InputField
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.confirmPassword?.message}
                  secureTextEntry={!showPassword}
                  leftIcon={<Lock size={20} color={colors.text.muted} />}
                />
              )}
            />

            <Text style={[styles.termsText, { color: colors.text.muted }]}>
              By registering, you agree to our Terms and Privacy Policy.
            </Text>

            <Button
              label="Register"
              variant="primary"
              onPress={handleSubmit(onSubmit)}
              loading={isSubmitting}
              style={styles.submitButton}
            />
          </View>

          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: colors.text.secondary }]}>
              Already have an account?{' '}
            </Text>
            <Button
              label="Sign In"
              variant="ghost"
              onPress={() => navigation.navigate(AuthRoutes.LOGIN)}
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
  termsText: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: spacing.md,
    lineHeight: 18,
  },
  submitButton: {
    marginTop: spacing.md,
  },
  eyeButton: {
    padding: 0,
    margin: 0,
    minHeight: 0,
    minWidth: 0,
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
