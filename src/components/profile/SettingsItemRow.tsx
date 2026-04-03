import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Switch } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { spacing, borderRadius } from '../../theme/tokens';

interface SettingsItemRowProps {
  label: string;
  value?: string;
  onPress?: () => void;
  showChevron?: boolean;
  isSwitch?: boolean;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
  isDanger?: boolean;
  icon?: React.ReactNode;
}

export const SettingsItemRow: React.FC<SettingsItemRowProps> = ({
  label,
  value,
  onPress,
  showChevron = true,
  isSwitch = false,
  switchValue = false,
  onSwitchChange,
  isDanger = false,
  icon,
}) => {
  const { colors, typography } = useTheme();

  const content = (
    <View style={[styles.container, { borderBottomColor: colors.border.subtle }]}>
      <View style={styles.leftContent}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <Text
          style={[
            styles.label,
            {
              color: isDanger ? colors.error : colors.text.primary,
              fontSize: typography.body.medium.size,
            },
          ]}
        >
          {label}
        </Text>
      </View>
      <View style={styles.rightContent}>
        {value && (
          <Text style={[styles.value, { color: colors.text.secondary, fontSize: typography.body.small.size }]}>
            {value}
          </Text>
        )}
        {isSwitch ? (
          <Switch
            value={switchValue}
            onValueChange={onSwitchChange}
            trackColor={{ false: colors.border.subtle, true: colors.brand.primary }}
            thumbColor="#FFF"
          />
        ) : (
          showChevron && <ChevronRight size={20} color={colors.text.muted} />
        )}
      </View>
    </View>
  );

  if (isSwitch) {
    return <View>{content}</View>;
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      {content}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    marginRight: spacing.md,
  },
  label: {
    fontWeight: '500',
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  value: {
    fontWeight: '400',
  },
});
