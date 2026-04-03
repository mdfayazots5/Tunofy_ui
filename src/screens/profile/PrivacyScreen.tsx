import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { spacing } from '../../theme/tokens';
import { StaticInfoHeader } from '../../components/common/StaticInfoHeader';
import { LegalDocumentSection } from '../../components/common/LegalDocumentSection';
import { PRIVACY_POLICY } from '../../constants/staticContent';

export const PrivacyScreen: React.FC<any> = ({ navigation }) => {
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
          title={PRIVACY_POLICY.title} 
          subtitle={`Last updated: ${PRIVACY_POLICY.lastUpdated}`}
        />

        <View style={styles.content}>
          {PRIVACY_POLICY.sections.map((section, index) => (
            <LegalDocumentSection 
              key={index}
              title={section.title}
              content={section.content}
            />
          ))}
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
  },
});
