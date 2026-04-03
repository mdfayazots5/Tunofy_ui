import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { spacing } from '@theme/tokens';
import { Button } from '@components/common/Button';
import { InputField } from '@components/forms/InputField';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/navigation.types';
import { AuthRoutes } from '../../navigation/navigation.constants';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Lock, CheckCircle, Eye, EyeOff } from 'lucide-react-native';

const schema = yup.object().shape({
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

export const ResetPasswordScreen = () => {
  const { colors, typography } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const route = useRoute<RouteProp<AuthStackParamList, AuthRoutes.RESET_PASSWORD>>();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: any) => {
    // Mock reset password
    console.log('Reset password data:', data, 'Token:', route.params?.token);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.surface.main }]}>
        <View style={styles.successContent}>
          <CheckCircle size={80} color={colors.brand.primary} />
          <Text style={[styles.successTitle, { color: colors.text.primary, fontSize: typography.h2.size }]}>
            Password Reset
          </Text>
          <Text style={[styles.successSubtitle, { color: colors.text.secondary, fontSize: typography.body.large.size }]}>
            Your password has been reset successfully. You can now log in with your new password.
          </Text>
          <Button
            label="Back to Login"
            variant="primary"
            onPress={() => navigation.navigate(AuthRoutes.LOGIN)}
            style={styles.successButton}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.surface.main }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text.primary, fontSize: typography.h1.size }]}>
              Reset Password
            </Text>
            <Text style={[styles.subtitle, { color: colors.text.secondary, fontSize: typography.body.large.size }]}>
              Create a new password for your account.
            </Text>
          </View>

          <View style={styles.form}>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <InputField
                  label="New Password"
                  placeholder="Enter new password"
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
                  label="Confirm New Password"
                  placeholder="Confirm new password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.confirmPassword?.message}
                  secureTextEntry={!showPassword}
                  leftIcon={<Lock size={20} color={colors.text.muted} />}
                />
              )}
            />

            <Button
              label="Reset Password"
              variant="primary"
              onPress={handleSubmit(onSubmit)}
              loading={isSubmitting}
              style={styles.submitButton}
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
    lineHeight: 24,
  },
  form: {
    marginBottom: spacing.xl,
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
  successContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  successTitle: {
    fontWeight: 'bold',
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  successSubtitle: {
    textAlign: 'center',
    opacity: 0.8,
    lineHeight: 24,
    marginBottom: spacing.xl,
  },
  successButton: {
    width: '100%',
  },
});
