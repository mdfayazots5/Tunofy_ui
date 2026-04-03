import React from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { spacing } from '../../theme/tokens';
import { StaticInfoHeader } from '../../components/common/StaticInfoHeader';
import { SocialLinkRow } from '../../components/common/SocialLinkRow';
import { ABOUT_CONTENT } from '../../constants/staticContent';

export const AboutScreen: React.FC<any> = ({ navigation }) => {
  const { colors, typography } = useTheme();
  const insets = useSafeAreaInsets();

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
          title="About Tunofy" 
          subtitle={ABOUT_CONTENT.tagline}
          showLogo={true}
        />

        <View style={styles.content}>
          <Text style={[styles.mission, { color: colors.text.secondary, fontSize: typography.body.large.size }]}>
            {ABOUT_CONTENT.mission}
          </Text>

          <View style={[styles.divider, { backgroundColor: colors.border.subtle }]} />

          <Text style={[styles.team, { color: colors.text.muted, fontSize: typography.body.medium.size }]}>
            {ABOUT_CONTENT.team}
          </Text>

          <SocialLinkRow links={ABOUT_CONTENT.socialLinks} />

          <View style={styles.versionContainer}>
            <Text style={[styles.versionLabel, { color: colors.text.muted, fontSize: typography.caption.size }]}>
              Version {ABOUT_CONTENT.version}
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
    alignItems: 'center',
  },
  mission: {
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: spacing.xl,
  },
  divider: {
    width: 40,
    height: 4,
    borderRadius: 2,
    marginBottom: spacing.xl,
  },
  team: {
    fontWeight: '600',
    marginBottom: spacing.xl,
  },
  versionContainer: {
    marginTop: spacing.xl,
    opacity: 0.5,
  },
  versionLabel: {
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});
