import React, { useState } from 'react';
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
import { Mail, CheckCircle, ChevronLeft } from 'lucide-react-native';
import { IconButton } from '@components/common/IconButton';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
});

export const ForgotPasswordScreen = () => {
  const { colors, typography } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: any) => {
    // Mock forgot password
    console.log('Forgot password data:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.surface.main }]}>
        <View style={styles.successContent}>
          <CheckCircle size={80} color={colors.brand.primary} />
          <Text style={[styles.successTitle, { color: colors.text.primary, fontSize: typography.h2.size }]}>
            Check Your Email
          </Text>
          <Text style={[styles.successSubtitle, { color: colors.text.secondary, fontSize: typography.body.large.size }]}>
            We&apos;ve sent a password reset link to your email address.
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
          <IconButton
            icon={<ChevronLeft size={24} color={colors.text.primary} />}
            variant="ghost"
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          />

          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text.primary, fontSize: typography.h1.size }]}>
              Forgot Password
            </Text>
            <Text style={[styles.subtitle, { color: colors.text.secondary, fontSize: typography.body.large.size }]}>
              Enter your email and we&apos;ll send you a link to reset your password.
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

            <Button
              label="Send Link"
              variant="primary"
              onPress={handleSubmit(onSubmit)}
              loading={isSubmitting}
              style={styles.submitButton}
            />
          </View>

          <View style={styles.footer}>
            <Button
              label="Back to Login"
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
  backButton: {
    marginLeft: -spacing.md,
    marginBottom: spacing.lg,
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
  footer: {
    alignItems: 'center',
    marginTop: 'auto',
  },
  footerAction: {
    padding: 0,
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
