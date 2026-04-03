import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ChevronLeft } from 'lucide-react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useTheme } from '../../theme/ThemeProvider';
import { spacing, borderRadius, shadows } from '../../theme/tokens';
import { useAuthStore } from '../../store/useAuthStore';
import { feedbackSchema } from '../../utils/validationSchemas';
import { FeedbackIssueTypeChips } from '../../components/profile/FeedbackIssueTypeChips';
import { FeedbackSuccessState } from '../../components/profile/FeedbackSuccessState';

export const FeedbackScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const insets = useSafeAreaInsets();
  const { colors, typography } = useTheme();
  const { user, isAuthenticated } = useAuthStore();
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(feedbackSchema),
    defaultValues: {
      issueType: 'general_feedback',
      stationId: route.params?.stationId || '',
      subject: '',
      message: '',
      contactEmail: user?.email || '',
    },
  });

  const watchedIssueType = watch('issueType');

  const onSubmit = (data: any) => {
    console.log('Feedback submitted:', data);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return <FeedbackSuccessState onBackToHome={() => navigation.navigate('Home' as any)} />;
  }

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <ChevronLeft size={28} color={colors.text.primary} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text.primary, fontSize: typography.heading.h4.size }]}>
            Feedback
          </Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <Text style={[styles.intro, { color: colors.text.secondary, fontSize: typography.body.medium.size }]}>
              Have a problem or a suggestion? Let us know! Your feedback helps us improve Tunofy for everyone.
            </Text>

            <FeedbackIssueTypeChips 
              value={watchedIssueType}
              onChange={(val) => setValue('issueType', val)}
            />

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.text.muted, fontSize: typography.body.small.size }]}>
                SUBJECT
              </Text>
              <Controller
                control={control}
                name="subject"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      styles.input,
                      { 
                        backgroundColor: colors.surface.card, 
                        color: colors.text.primary,
                        borderColor: errors.subject ? colors.error : colors.border.subtle,
                        fontSize: typography.body.medium.size,
                      }
                    ]}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Brief summary of the issue"
                    placeholderTextColor={colors.text.muted}
                  />
                )}
              />
              {errors.subject && (
                <Text style={[styles.error, { color: colors.error, fontSize: typography.body.small.size }]}>
                  {errors.subject.message}
                </Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.text.muted, fontSize: typography.body.small.size }]}>
                MESSAGE
              </Text>
              <Controller
                control={control}
                name="message"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      styles.input,
                      styles.textArea,
                      { 
                        backgroundColor: colors.surface.card, 
                        color: colors.text.primary,
                        borderColor: errors.message ? colors.error : colors.border.subtle,
                        fontSize: typography.body.medium.size,
                      }
                    ]}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Tell us more about it..."
                    placeholderTextColor={colors.text.muted}
                    multiline
                    numberOfLines={6}
                    textAlignVertical="top"
                  />
                )}
              />
              {errors.message && (
                <Text style={[styles.error, { color: colors.error, fontSize: typography.body.small.size }]}>
                  {errors.message.message}
                </Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.text.muted, fontSize: typography.body.small.size }]}>
                CONTACT EMAIL
              </Text>
              <Controller
                control={control}
                name="contactEmail"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      styles.input,
                      { 
                        backgroundColor: colors.surface.card, 
                        color: colors.text.primary,
                        borderColor: errors.contactEmail ? colors.error : colors.border.subtle,
                        fontSize: typography.body.medium.size,
                      }
                    ]}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Where can we reach you?"
                    placeholderTextColor={colors.text.muted}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                )}
              />
              {errors.contactEmail && (
                <Text style={[styles.error, { color: colors.error, fontSize: typography.body.small.size }]}>
                  {errors.contactEmail.message}
                </Text>
              )}
            </View>
          </View>
        </ScrollView>

        {/* Sticky Submit Button */}
        <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.md, backgroundColor: colors.background }]}>
          <TouchableOpacity
            style={[
              styles.submitButton,
              { 
                backgroundColor: colors.brand.primary,
                opacity: isValid ? 1 : 0.6
              }
            ]}
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid}
          >
            <Text style={[styles.submitButtonText, { color: '#FFF', fontSize: typography.body.medium.size }]}>
              Submit Feedback
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  backButton: {
    padding: spacing.sm,
  },
  headerTitle: {
    fontWeight: '800',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
  },
  intro: {
    marginBottom: spacing.xxl,
    lineHeight: 22,
    opacity: 0.8,
  },
  inputGroup: {
    marginBottom: spacing.xl,
  },
  label: {
    fontWeight: '600',
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
  },
  textArea: {
    minHeight: 120,
    paddingTop: spacing.md,
  },
  error: {
    marginTop: 4,
    fontWeight: '500',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  submitButton: {
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    ...shadows.md,
  },
  submitButtonText: {
    fontWeight: '700',
  },
});
