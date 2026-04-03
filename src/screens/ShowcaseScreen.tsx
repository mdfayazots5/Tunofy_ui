import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { spacing } from '@theme/tokens';
import { AppHeader } from '@components/layout/AppHeader';
import { SectionHeader } from '@components/layout/SectionHeader';
import { Button } from '@components/common/Button';
import { IconButton } from '@components/common/IconButton';
import { InputField } from '@components/forms/InputField';
import { TextArea } from '@components/forms/TextArea';
import { ToggleRow } from '@components/forms/ToggleRow';
import { EmptyState } from '@components/feedback/EmptyState';
import { ErrorState } from '@components/feedback/ErrorState';
import { LoadingPlaceholder } from '@components/feedback/LoadingPlaceholder';
import { Modal } from '@components/overlays/Modal';
import { useThemeStore } from '@store/useThemeStore';
import { Moon, Sun, Settings, Music, Search, Heart, Play, Pause, ChevronLeft } from 'lucide-react-native';

export const ShowcaseScreen = () => {
  const { colors, typography, isDark } = useTheme();
  const { setMode } = useThemeStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [toggleValue, setToggleValue] = useState(false);

  const toggleTheme = () => {
    setMode(isDark ? 'light' : 'dark');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.surface.main }]}>
      <AppHeader
        title="Tunofy Design System"
        leftAction={<IconButton icon={<ChevronLeft size={24} color={colors.text.primary} />} variant="ghost" />}
        rightAction={
          <IconButton
            icon={isDark ? <Sun size={24} color={colors.text.primary} /> : <Moon size={24} color={colors.text.primary} />}
            variant="ghost"
            onPress={toggleTheme}
          />
        }
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <SectionHeader title="Buttons" />
        <View style={styles.section}>
          <Button label="Primary Button" variant="primary" style={styles.margin} />
          <Button label="Secondary Button" variant="secondary" style={styles.margin} />
          <Button label="Outline Button" variant="outline" style={styles.margin} />
          <Button label="Ghost Button" variant="ghost" style={styles.margin} />
          <Button label="Loading Button" loading style={styles.margin} />
          <Button label="Disabled Button" disabled style={styles.margin} />
          <View style={styles.row}>
            <IconButton icon={<Play size={20} color={colors.text.inverse} />} variant="primary" style={styles.margin} />
            <IconButton icon={<Pause size={20} color={colors.text.inverse} />} variant="secondary" style={styles.margin} />
            <IconButton icon={<Heart size={20} color={colors.brand.primary} />} variant="outline" style={styles.margin} />
            <IconButton icon={<Settings size={20} color={colors.text.secondary} />} variant="ghost" style={styles.margin} />
          </View>
        </View>

        <SectionHeader title="Forms" />
        <View style={styles.section}>
          <InputField
            label="Username"
            placeholder="Enter your username"
            leftIcon={<Search size={20} color={colors.text.muted} />}
          />
          <InputField
            label="Email"
            placeholder="Enter your email"
            error="Please enter a valid email address"
          />
          <TextArea label="Bio" placeholder="Tell us about yourself" />
          <ToggleRow
            label="Push Notifications"
            description="Receive updates about new releases"
            value={toggleValue}
            onValueChange={setToggleValue}
          />
        </View>

        <SectionHeader title="Feedback" />
        <View style={styles.section}>
          <Text style={[styles.label, { color: colors.text.secondary, fontSize: typography.body.medium.size }]}>
            Loading Placeholder (Skeleton)
          </Text>
          <LoadingPlaceholder height={40} style={styles.margin} />
          <LoadingPlaceholder height={20} width="60%" style={styles.margin} />
          
          <Button label="Show Modal" variant="outline" onPress={() => setIsModalVisible(true)} style={styles.margin} />
        </View>

        <SectionHeader title="Empty & Error States" />
        <View style={[styles.section, { height: 300 }]}>
          <EmptyState
            title="No Music Found"
            description="Start exploring to find your favorite tunes."
            icon={<Music size={48} color={colors.text.muted} />}
            actionLabel="Explore Now"
            onActionPress={() => {}}
          />
        </View>
        <View style={[styles.section, { height: 300 }]}>
          <ErrorState onRetry={() => {}} />
        </View>
      </ScrollView>

      <Modal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        title="Welcome to Tunofy"
      >
        <Text style={{ color: colors.text.primary, fontSize: typography.body.large.size }}>
          This is a reusable modal component. It supports custom content, titles, and close buttons.
        </Text>
        <Button
          label="Close Modal"
          variant="primary"
          onPress={() => setIsModalVisible(false)}
          style={{ marginTop: spacing.lg }}
        />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  section: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  margin: {
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  label: {
    marginBottom: spacing.sm,
  },
});
