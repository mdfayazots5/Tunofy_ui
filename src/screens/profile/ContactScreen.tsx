import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft, Mail, Phone, MapPin, Clock } from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { spacing, borderRadius, shadows } from '../../theme/tokens';
import { StaticInfoHeader } from '../../components/common/StaticInfoHeader';
import { CONTACT_CONTENT } from '../../constants/staticContent';

export const ContactScreen: React.FC<any> = ({ navigation }) => {
  const { colors, typography } = useTheme();
  const insets = useSafeAreaInsets();

  const renderContactItem = (icon: React.ReactNode, label: string, value: string, onPress?: () => void) => (
    <TouchableOpacity
      style={[styles.contactItem, { backgroundColor: colors.surface.card }]}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: colors.brand.primary + '15' }]}>
        {icon}
      </View>
      <View style={styles.contactInfo}>
        <Text style={[styles.contactLabel, { color: colors.text.muted, fontSize: typography.caption.size }]}>
          {label}
        </Text>
        <Text style={[styles.contactValue, { color: colors.text.primary, fontSize: typography.body.medium.size }]}>
          {value}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft size={28} color={colors.text.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: insets.bottom + spacing.xl }}
        showsVerticalScrollIndicator={false}
      >
        <StaticInfoHeader 
          title="Contact Us" 
          subtitle="We're here to help you with any questions or issues."
        />

        <View style={styles.content}>
          {renderContactItem(
            <Mail size={24} color={colors.brand.primary} />,
            'EMAIL SUPPORT',
            CONTACT_CONTENT.email,
            () => Linking.openURL(`mailto:${CONTACT_CONTENT.email}`)
          )}

          {renderContactItem(
            <Phone size={24} color={colors.brand.primary} />,
            'PHONE SUPPORT',
            CONTACT_CONTENT.phone,
            () => Linking.openURL(`tel:${CONTACT_CONTENT.phone}`)
          )}

          {renderContactItem(
            <MapPin size={24} color={colors.brand.primary} />,
            'OUR OFFICE',
            CONTACT_CONTENT.office
          )}

          <View style={[styles.infoCard, { backgroundColor: colors.surface.card }]}>
            <Clock size={20} color={colors.brand.primary} />
            <Text style={[styles.infoText, { color: colors.text.secondary, fontSize: typography.body.medium.size }]}>
              {CONTACT_CONTENT.responseTime}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  backButton: {
    padding: spacing.sm,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    ...shadows.sm,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.lg,
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    fontWeight: '700',
    marginBottom: 2,
    letterSpacing: 0.5,
  },
  contactValue: {
    fontWeight: '600',
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    marginTop: spacing.xl,
    gap: spacing.md,
    opacity: 0.8,
  },
  infoText: {
    flex: 1,
    fontWeight: '500',
  },
});
