import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import Animated, { FadeIn, FadeOut, Layout } from 'react-native-reanimated';
import { useTheme } from '@theme/ThemeProvider';
import { spacing, borderRadius } from '@theme/tokens';
import { Search, X, SlidersHorizontal } from 'lucide-react-native';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear?: () => void;
  onFilterPress?: () => void;
  autoFocus?: boolean;
  placeholder?: string;
  showFilter?: boolean;
  isFilterActive?: boolean;
  containerStyle?: ViewStyle;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  onClear,
  onFilterPress,
  autoFocus,
  placeholder = 'Search for stations...',
  showFilter = true,
  isFilterActive = false,
  containerStyle,
}) => {
  const { colors, typography } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface.main }, containerStyle]}>
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: colors.surface.card,
            borderColor: colors.border.main,
          },
        ]}
      >
        <Search size={20} color={colors.text.secondary} style={styles.searchIcon} />
        <TextInput
          style={[
            styles.input,
            { color: colors.text.primary, fontSize: typography.body.medium.size },
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.text.secondary}
          autoFocus={autoFocus}
          autoCorrect={false}
          autoCapitalize="none"
          returnKeyType="search"
        />
        
        <View style={styles.rightActions}>
          {value.length > 0 && (
            <Animated.View 
              entering={FadeIn.duration(200)} 
              exiting={FadeOut.duration(200)}
              layout={Layout.springify()}
            >
              <TouchableOpacity onPress={onClear} style={styles.clearButton} activeOpacity={0.7}>
                <X size={18} color={colors.text.secondary} />
              </TouchableOpacity>
            </Animated.View>
          )}

          {showFilter && (
            <View style={styles.filterWrapper}>
              <View style={[styles.divider, { backgroundColor: colors.border.main }]} />
              <TouchableOpacity
                style={styles.filterIconButton}
                onPress={onFilterPress}
                activeOpacity={0.7}
              >
                <SlidersHorizontal 
                  size={20} 
                  color={isFilterActive ? colors.brand.primary : colors.text.secondary} 
                />
                {isFilterActive && (
                  <View style={[styles.activeIndicator, { backgroundColor: colors.brand.primary }]} />
                )}
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingVertical: 0,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clearButton: {
    padding: spacing.xs,
    marginRight: spacing.xs,
  },
  filterWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    width: 1,
    height: 24,
    marginHorizontal: spacing.xs,
  },
  filterIconButton: {
    padding: spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  activeIndicator: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: 'white',
  },
});
