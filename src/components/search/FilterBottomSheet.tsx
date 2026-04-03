import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { spacing, borderRadius, shadows } from '@theme/tokens';
import { X } from 'lucide-react-native';
import { FilterChip } from './FilterChip';
import { Button } from '@components/common/Button';
import { FilterState } from '../../types/search';
import { GENRES, LANGUAGES, COUNTRIES } from '../../mocks/homeData';

interface FilterBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  initialFilters: FilterState;
  onApply: (filters: FilterState) => void;
}

export const FilterBottomSheet: React.FC<FilterBottomSheetProps> = ({
  visible,
  onClose,
  initialFilters,
  onApply,
}) => {
  const { colors, typography } = useTheme();
  const [tempFilters, setTempFilters] = useState<FilterState>(initialFilters);

  const toggleFilter = (type: keyof FilterState, value: string) => {
    setTempFilters((prev) => {
      const current = prev[type] as string[];
      const exists = current.includes(value);
      const next = exists
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [type]: next };
    });
  };

  const handleReset = () => {
    setTempFilters({
      genres: [],
      languages: [],
      countries: [],
      sortBy: 'popularity',
    });
  };

  const handleApply = () => {
    onApply(tempFilters);
    onClose();
  };

  const renderSection = (title: string, data: any[], type: keyof FilterState) => (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.text.primary, fontSize: typography.heading.small.size }]}>
        {title}
      </Text>
      <View style={styles.chipContainer}>
        {data.map((item) => (
          <FilterChip
            key={item.id}
            label={item.name}
            selected={(tempFilters[type] as string[]).includes(item.name)}
            onPress={() => toggleFilter(type, item.name)}
          />
        ))}
      </View>
    </View>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={[styles.overlay, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
        <SafeAreaView style={[styles.container, { backgroundColor: colors.surface.main }]}>
          <View style={[styles.header, { borderBottomColor: colors.border.main }]}>
            <Text style={[styles.title, { color: colors.text.primary, fontSize: typography.h2.size }]}>
              Filters
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color={colors.text.primary} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {renderSection('Genres', GENRES, 'genres')}
            {renderSection('Languages', LANGUAGES, 'languages')}
            {renderSection('Countries', COUNTRIES, 'countries')}

            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text.primary, fontSize: typography.heading.small.size }]}>
                Sort By
              </Text>
              <View style={styles.chipContainer}>
                {['popularity', 'name', 'recent'].map((sort) => (
                  <FilterChip
                    key={sort}
                    label={sort.charAt(0).toUpperCase() + sort.slice(1)}
                    selected={tempFilters.sortBy === sort}
                    onPress={() => setTempFilters({ ...tempFilters, sortBy: sort as any })}
                  />
                ))}
              </View>
            </View>
          </ScrollView>

          <View style={[styles.footer, { borderTopColor: colors.border.main }]}>
            <Button
              label="Reset"
              variant="ghost"
              onPress={handleReset}
              style={styles.footerButton}
            />
            <Button
              label="Apply Filters"
              variant="primary"
              onPress={handleApply}
              style={[styles.footerButton, { flex: 2 }]}
            />
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  container: {
    height: '80%',
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    ...shadows.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
    borderBottomWidth: 1,
  },
  title: {
    fontWeight: 'bold',
  },
  closeButton: {
    padding: spacing.xs,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: spacing.md,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  footer: {
    flexDirection: 'row',
    padding: spacing.lg,
    borderTopWidth: 1,
    gap: spacing.md,
  },
  footerButton: {
    flex: 1,
  },
});
