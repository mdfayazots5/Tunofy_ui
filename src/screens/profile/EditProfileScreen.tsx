import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft } from 'lucide-react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as ImagePicker from 'expo-image-picker';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

import { useTheme } from '../../theme/ThemeProvider';
import { spacing, borderRadius, shadows } from '../../theme/tokens';
import { useAuthStore } from '../../store/useAuthStore';
import { profileSchema } from '../../utils/validationSchemas';
import { ProfileHeaderCard } from '../../components/profile/ProfileHeaderCard';
import { PickerFieldRow } from '../../components/profile/PickerFieldRow';
import { MultiSelectGenrePicker } from '../../components/profile/MultiSelectGenrePicker';
import { SingleSelectPickerSheet } from '../../components/profile/SingleSelectPickerSheet';
import { LANGUAGES, COUNTRIES } from '../../mocks/profileOptions';

export const EditProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { colors, typography } = useTheme();
  const { user, updateProfile } = useAuthStore();
  
  const [pickerType, setPickerType] = useState<'language' | 'country' | null>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      mobile: user?.mobile || '',
      preferredLanguage: user?.preferredLanguage || 'en',
      preferredCountry: user?.preferredCountry || 'us',
      favoriteGenres: user?.favoriteGenres || [],
    },
  });

  const watchedGenres = watch('favoriteGenres');
  const watchedLanguage = watch('preferredLanguage');
  const watchedCountry = watch('preferredCountry');

  const onSubmit = (data: any) => {
    updateProfile(data);
    Alert.alert('Success', 'Profile updated successfully', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      updateProfile({ avatar: result.assets[0].uri });
    }
  };

  const toggleGenre = (genreId: string) => {
    const current = [...watchedGenres];
    const index = current.indexOf(genreId);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(genreId);
    }
    setValue('favoriteGenres', current, { shouldDirty: true });
  };

  const openPicker = (type: 'language' | 'country') => {
    setPickerType(type);
  };

  const handleBack = () => {
    if (isDirty) {
      Alert.alert(
        'Unsaved Changes',
        'You have unsaved changes. Are you sure you want to leave?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Discard', style: 'destructive', onPress: () => navigation.goBack() },
        ]
      );
    } else {
      navigation.goBack();
    }
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <ChevronLeft size={28} color={colors.text.primary} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text.primary, fontSize: typography.heading.h4.size }]}>
            Edit Profile
          </Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
          showsVerticalScrollIndicator={false}
        >
          <ProfileHeaderCard 
            user={user} 
            onAvatarPress={handlePickImage} 
            showCameraIcon 
          />

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.text.muted, fontSize: typography.body.small.size }]}>
                FULL NAME
              </Text>
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      styles.input,
                      { 
                        backgroundColor: colors.surface.card, 
                        color: colors.text.primary,
                        borderColor: errors.name ? colors.error : colors.border.subtle,
                        fontSize: typography.body.medium.size,
                      }
                    ]}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Enter your full name"
                    placeholderTextColor={colors.text.muted}
                  />
                )}
              />
              {errors.name && (
                <Text style={[styles.error, { color: colors.error, fontSize: typography.body.small.size }]}>
                  {errors.name.message}
                </Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.text.muted, fontSize: typography.body.small.size }]}>
                EMAIL ADDRESS
              </Text>
              <TextInput
                style={[
                  styles.input,
                  styles.disabledInput,
                  { 
                    backgroundColor: colors.surface.card, 
                    color: colors.text.muted,
                    borderColor: colors.border.subtle,
                    fontSize: typography.body.medium.size,
                  }
                ]}
                value={user?.email}
                editable={false}
              />
              <Text style={[styles.hint, { color: colors.text.muted, fontSize: typography.body.small.size }]}>
                Email cannot be changed
              </Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.text.muted, fontSize: typography.body.small.size }]}>
                MOBILE NUMBER (OPTIONAL)
              </Text>
              <Controller
                control={control}
                name="mobile"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      styles.input,
                      { 
                        backgroundColor: colors.surface.card, 
                        color: colors.text.primary,
                        borderColor: errors.mobile ? colors.error : colors.border.subtle,
                        fontSize: typography.body.medium.size,
                      }
                    ]}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="+1 (555) 000-0000"
                    placeholderTextColor={colors.text.muted}
                    keyboardType="phone-pad"
                  />
                )}
              />
            </View>

            <PickerFieldRow 
              label="Preferred Language"
              value={LANGUAGES.find(l => l.id === watchedLanguage)?.label || ''}
              onPress={() => openPicker('language')}
              error={errors.preferredLanguage?.message}
            />

            <PickerFieldRow 
              label="Preferred Country"
              value={COUNTRIES.find(c => c.id === watchedCountry)?.label || ''}
              onPress={() => openPicker('country')}
              error={errors.preferredCountry?.message}
            />

            <MultiSelectGenrePicker 
              selectedGenres={watchedGenres}
              onToggle={toggleGenre}
              error={errors.favoriteGenres?.message}
            />
          </View>
        </ScrollView>

        {/* Sticky Save Button */}
        <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.md, backgroundColor: colors.background }]}>
          <TouchableOpacity
            style={[
              styles.saveButton,
              { 
                backgroundColor: colors.brand.primary,
                opacity: isDirty ? 1 : 0.6
              }
            ]}
            onPress={handleSubmit(onSubmit)}
            disabled={!isDirty}
          >
            <Text style={[styles.saveButtonText, { color: '#FFF', fontSize: typography.body.medium.size }]}>
              Save Changes
            </Text>
          </TouchableOpacity>
        </View>

        {pickerType && (
          <BottomSheet
            ref={bottomSheetRef}
            snapPoints={['50%']}
            enablePanDownToClose
            onClose={() => setPickerType(null)}
            backgroundStyle={{ backgroundColor: 'transparent' }}
          >
            <BottomSheetView>
              <SingleSelectPickerSheet 
                title={pickerType === 'language' ? 'Select Language' : 'Select Country'}
                options={pickerType === 'language' ? LANGUAGES : COUNTRIES}
                selectedValue={pickerType === 'language' ? watchedLanguage : watchedCountry}
                onSelect={(val) => {
                  setValue(pickerType === 'language' ? 'preferredLanguage' : 'preferredCountry', val, { shouldDirty: true });
                }}
                onClose={() => setPickerType(null)}
              />
            </BottomSheetView>
          </BottomSheet>
        )}
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
  form: {
    paddingHorizontal: spacing.xl,
  },
  inputGroup: {
    marginBottom: spacing.lg,
  },
  label: {
    fontWeight: '600',
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
  },
  disabledInput: {
    opacity: 0.7,
  },
  hint: {
    marginTop: 4,
    opacity: 0.6,
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
  saveButton: {
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    ...shadows.md,
  },
  saveButtonText: {
    fontWeight: '700',
  },
});
