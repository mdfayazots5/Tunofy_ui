import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native';
import { Check } from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { spacing, borderRadius, shadows } from '../../theme/tokens';
import { FavoritesSortOption } from '../../types/library';

interface SortBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  currentOption: FavoritesSortOption;
  onSelect: (option: FavoritesSortOption) => void;
}

const OPTIONS: { label: string; value: FavoritesSortOption }[] = [
  { label: 'Recently Added', value: 'recently_added' },
  { label: 'By Name', value: 'name' },
  { label: 'Most Played', value: 'most_played' },
];

export const SortBottomSheet: React.FC<SortBottomSheetProps> = ({
  visible,
  onClose,
  currentOption,
  onSelect,
}) => {
  const { colors, typography } = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={[styles.content, { backgroundColor: colors.surface.card }]}>
          <View style={[styles.handle, { backgroundColor: colors.border.subtle }]} />
          <Text style={[styles.title, { color: colors.text.primary, fontSize: typography.heading.h4.size }]}>
            Sort Favorites
          </Text>
          <View style={styles.options}>
            {OPTIONS.map((option) => {
              const isSelected = currentOption === option.value;
              return (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.option,
                    { borderBottomColor: colors.border.subtle },
                  ]}
                  onPress={() => {
                    onSelect(option.value);
                    onClose();
                  }}
                >
                  <Text
                    style={[
                      styles.optionLabel,
                      {
                        color: isSelected ? colors.brand.primary : colors.text.primary,
                        fontSize: typography.body.medium.size,
                        fontWeight: isSelected ? '700' : '500',
                      },
                    ]}
                  >
                    {option.label}
                  </Text>
                  {isSelected && <Check size={20} color={colors.brand.primary} />}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  content: {
    borderTopLeftRadius: borderRadius.xxl,
    borderTopRightRadius: borderRadius.xxl,
    padding: spacing.xl,
    paddingBottom: spacing.xxxl,
    ...shadows.lg,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    fontWeight: '700',
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  options: {
    width: '100%',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
  },
  optionLabel: {
    flex: 1,
  },
});
