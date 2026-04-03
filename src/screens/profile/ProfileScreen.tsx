import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { 
  History, 
  Settings, 
  User, 
  LogOut, 
  MessageSquare, 
  Info, 
  Shield, 
  FileText, 
  Mail,
  Bell
} from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { spacing, borderRadius, shadows } from '../../theme/tokens';
import { useAuthStore } from '../../store/useAuthStore';
import { ProfileRoutes } from '../../navigation/navigation.constants';
import { ProfileHeaderCard } from '../../components/profile/ProfileHeaderCard';
import { PreferenceSummaryCard } from '../../components/profile/PreferenceSummaryCard';
import { SettingsItemRow } from '../../components/profile/SettingsItemRow';
import { GuestProfilePromptCard } from '../../components/profile/GuestProfilePromptCard';
import { LogoutConfirmationSheet } from '../../components/profile/LogoutConfirmationSheet';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

export const ProfileScreen: React.FC<any> = ({ navigation }) => {
  const { colors, typography } = useTheme();
  const insets = useSafeAreaInsets();
  const { user, logout, isAuthenticated } = useAuthStore();
  const [showLogoutSheet, setShowLogoutSheet] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleLogout = () => {
    logout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth' }],
    });
  };

  const handleSignIn = () => {
    navigation.navigate('Auth');
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
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}
        showsVerticalScrollIndicator={false}
      >
        {isAuthenticated ? (
          <>
            <ProfileHeaderCard 
              user={user} 
              onAvatarPress={() => navigation.navigate(ProfileRoutes.EDIT_PROFILE)} 
            />
            <PreferenceSummaryCard user={user} />
            
            {renderSection('ACCOUNT', (
              <>
                <SettingsItemRow 
                  label="Edit Profile" 
                  icon={<User size={20} color={colors.brand.primary} />}
                  onPress={() => navigation.navigate(ProfileRoutes.EDIT_PROFILE)} 
                />
                <SettingsItemRow 
                  label="Listening History" 
                  icon={<History size={20} color={colors.brand.primary} />}
                  onPress={() => navigation.navigate(ProfileRoutes.RECENT_LISTENING)} 
                />
                <SettingsItemRow 
                  label="Notification Preferences" 
                  icon={<Bell size={20} color={colors.brand.primary} />}
                  onPress={() => navigation.navigate(ProfileRoutes.SETTINGS)} 
                />
                <SettingsItemRow 
                  label="App Settings" 
                  icon={<Settings size={20} color={colors.brand.primary} />}
                  onPress={() => navigation.navigate(ProfileRoutes.SETTINGS)} 
                  showChevron
                />
              </>
            ))}
          </>
        ) : (
          <>
            <View style={{ height: insets.top + spacing.xl }} />
            <GuestProfilePromptCard onSignIn={handleSignIn} />
          </>
        )}

        {renderSection('SUPPORT', (
          <>
            <SettingsItemRow 
              label="Feedback / Report Issue" 
              icon={<MessageSquare size={20} color={colors.brand.primary} />}
              onPress={() => navigation.navigate(ProfileRoutes.FEEDBACK)} 
            />
            <SettingsItemRow 
              label="Contact Us" 
              icon={<Mail size={20} color={colors.brand.primary} />}
              onPress={() => navigation.navigate(ProfileRoutes.CONTACT)} 
            />
            <SettingsItemRow 
              label="About Tunofy" 
              icon={<Info size={20} color={colors.brand.primary} />}
              onPress={() => navigation.navigate(ProfileRoutes.ABOUT)} 
            />
          </>
        ))}

        {renderSection('LEGAL', (
          <>
            <SettingsItemRow 
              label="Privacy Policy" 
              icon={<Shield size={20} color={colors.brand.primary} />}
              onPress={() => navigation.navigate(ProfileRoutes.PRIVACY)} 
            />
            <SettingsItemRow 
              label="Terms & Conditions" 
              icon={<FileText size={20} color={colors.brand.primary} />}
              onPress={() => navigation.navigate(ProfileRoutes.TERMS)} 
            />
          </>
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

        <View style={styles.versionContainer}>
          <Text style={[styles.versionText, { color: colors.text.muted, fontSize: typography.body.small.size }]}>
            Tunofy v1.0.0
          </Text>
        </View>
      </ScrollView>

      {showLogoutSheet && (
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={['40%']}
          enablePanDownToClose
          onClose={() => setShowLogoutSheet(false)}
          backgroundStyle={{ backgroundColor: 'transparent' }}
          handleIndicatorStyle={{ backgroundColor: colors.border.subtle }}
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
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: spacing.xl,
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
  dangerZone: {
    marginTop: spacing.xl,
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.xl,
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  versionText: {
    fontWeight: '500',
    opacity: 0.6,
  },
});
