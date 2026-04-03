import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Check } from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { spacing, borderRadius, shadows } from '../../theme/tokens';

interface Option {
  id: string;
  label: string;
}

interface SingleSelectPickerSheetProps {
  title: string;
  options: Option[];
  selectedValue: string;
  onSelect: (value: string) => void;
  onClose: () => void;
}

export const SingleSelectPickerSheet: React.FC<SingleSelectPickerSheetProps> = ({
  title,
  options,
  selectedValue,
  onSelect,
  onClose,
}) => {
  const { colors, typography } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface.card }]}>
      <View style={[styles.header, { borderBottomColor: colors.border.subtle }]}>
        <Text style={[styles.title, { color: colors.text.primary, fontSize: typography.heading.h4.size }]}>
          {title}
        </Text>
        <TouchableOpacity onPress={onClose}>
          <Text style={[styles.done, { color: colors.brand.primary, fontSize: typography.body.medium.size }]}>
            Done
          </Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={options}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isSelected = selectedValue === item.id;
          return (
            <TouchableOpacity
              style={[styles.option, { borderBottomColor: colors.border.subtle }]}
              onPress={() => onSelect(item.id)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.optionLabel,
                  {
                    color: isSelected ? colors.brand.primary : colors.text.primary,
                    fontWeight: isSelected ? '700' : '500',
                    fontSize: typography.body.medium.size,
                  },
                ]}
              >
                {item.label}
              </Text>
              {isSelected && <Check size={20} color={colors.brand.primary} />}
            </TouchableOpacity>
          );
        }}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: '80%',
    borderTopLeftRadius: borderRadius.xxl,
    borderTopRightRadius: borderRadius.xxl,
    ...shadows.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.xl,
    borderBottomWidth: 1,
  },
  title: {
    fontWeight: '800',
  },
  done: {
    fontWeight: '700',
  },
  list: {
    paddingBottom: spacing.xxxl,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.xl,
    borderBottomWidth: 1,
  },
  optionLabel: {
    flex: 1,
  },
});
