import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, LogOut } from 'lucide-react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

import { useTheme } from '../../theme/ThemeProvider';
import { spacing, borderRadius, shadows } from '../../theme/tokens';
import { useAuthStore } from '../../store/useAuthStore';
import { useSettingsStore } from '../../store/useSettingsStore';
import { SettingsItemRow } from '../../components/profile/SettingsItemRow';
import { ThemeSegmentedControl } from '../../components/profile/ThemeSegmentedControl';
import { SingleSelectPickerSheet } from '../../components/profile/SingleSelectPickerSheet';
import { LogoutConfirmationSheet } from '../../components/profile/LogoutConfirmationSheet';
import { LANGUAGES, COUNTRIES, PLAYBACK_QUALITIES } from '../../mocks/profileOptions';

export const SettingsScreen: React.FC = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { colors, typography } = useTheme();
  const { isAuthenticated, logout } = useAuthStore();
  const { 
    pushNotifications, setPushNotifications,
    theme, setTheme,
    playbackQuality, setPlaybackQuality,
    defaultLanguage, setDefaultLanguage,
    defaultCountry, setDefaultCountry,
    appVersion
  } = useSettingsStore();

  const [pickerType, setPickerType] = useState<'language' | 'country' | 'quality' | null>(null);
  const [showLogoutSheet, setShowLogoutSheet] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleLogout = () => {
    logout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth' }],
    });
  };

  const renderSection = (title: string, children: React.ReactNode) => (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.text.muted, fontSize: typography.body.small.size }]}>
        {title}
      </Text>
      <View style={[styles.sectionContent, { backgroundColor: colors.surface.card }]}>
        {children}
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft size={28} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text.primary, fontSize: typography.heading.h4.size }]}>
          Settings
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
      >
        {renderSection('NOTIFICATIONS', (
          <SettingsItemRow 
            label="Push Notifications" 
            isSwitch 
            switchValue={pushNotifications}
            onSwitchChange={setPushNotifications}
          />
        ))}

        {renderSection('APPEARANCE', (
          <View style={styles.themeContainer}>
            <Text style={[styles.themeLabel, { color: colors.text.primary, fontSize: typography.body.medium.size }]}>
              App Theme
            </Text>
            <ThemeSegmentedControl value={theme} onChange={setTheme} />
          </View>
        ))}

        {renderSection('PLAYBACK', (
          <>
            <SettingsItemRow 
              label="Streaming Quality" 
              value={PLAYBACK_QUALITIES.find(q => q.id === playbackQuality)?.label}
              onPress={() => setPickerType('quality')}
            />
            <SettingsItemRow 
              label="Default Language" 
              value={LANGUAGES.find(l => l.id === defaultLanguage)?.label}
              onPress={() => setPickerType('language')}
            />
            <SettingsItemRow 
              label="Default Country" 
              value={COUNTRIES.find(c => c.id === defaultCountry)?.label}
              onPress={() => setPickerType('country')}
            />
          </>
        ))}

        {renderSection('ABOUT', (
          <SettingsItemRow 
            label="App Version" 
            value={appVersion}
            showChevron={false}
          />
        ))}

        {isAuthenticated && (
          <View style={styles.dangerZone}>
            <SettingsItemRow 
              label="Logout" 
              isDanger 
              icon={<LogOut size={20} color={colors.error} />}
              onPress={() => setShowLogoutSheet(true)} 
              showChevron={false}
            />
          </View>
        )}
      </ScrollView>

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
              title={
                pickerType === 'language' ? 'Select Language' : 
                pickerType === 'country' ? 'Select Country' : 
                'Select Quality'
              }
              options={
                pickerType === 'language' ? LANGUAGES : 
                pickerType === 'country' ? COUNTRIES : 
                PLAYBACK_QUALITIES
              }
              selectedValue={
                pickerType === 'language' ? defaultLanguage : 
                pickerType === 'country' ? defaultCountry : 
                playbackQuality
              }
              onSelect={(val) => {
                if (pickerType === 'language') setDefaultLanguage(val);
                else if (pickerType === 'country') setDefaultCountry(val);
                else setPlaybackQuality(val as any);
              }}
              onClose={() => setPickerType(null)}
            />
          </BottomSheetView>
        </BottomSheet>
      )}

      {showLogoutSheet && (
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={['40%']}
          enablePanDownToClose
          onClose={() => setShowLogoutSheet(false)}
          backgroundStyle={{ backgroundColor: 'transparent' }}
        >
          <BottomSheetView>
            <LogoutConfirmationSheet 
              onConfirm={handleLogout}
              onCancel={() => setShowLogoutSheet(false)}
            />
          </BottomSheetView>
        </BottomSheet>
      )}
    </View>
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
  section: {
    marginTop: spacing.xl,
    paddingHorizontal: spacing.xl,
  },
  sectionTitle: {
    fontWeight: '700',
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  sectionContent: {
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.lg,
    ...shadows.sm,
  },
  themeContainer: {
    paddingVertical: spacing.lg,
  },
  themeLabel: {
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  dangerZone: {
    marginTop: spacing.xxl,
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.xl,
  },
});
