import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

interface ExpandableDescriptionProps {
  text: string;
}

export const ExpandableDescription: React.FC<ExpandableDescriptionProps> = ({ text }) => {
  const [expanded, setExpanded] = useState(false);
  const { colors, spacing, typography } = useTheme();

  return (
    <View style={styles.container}>
      <Text
        style={[styles.text, { color: colors.textSecondary, fontSize: typography.size.sm, lineHeight: 20 }]}
        numberOfLines={expanded ? undefined : 3}
      >
        {text}
      </Text>
      {text.length > 100 && (
        <TouchableOpacity onPress={() => setExpanded(!expanded)} style={{ marginTop: spacing.xs }}>
          <Text style={[styles.readMore, { color: colors.primary, fontSize: typography.size.sm }]}>
            {expanded ? 'Read less' : 'Read more'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  text: {
    fontWeight: '400',
  },
  readMore: {
    fontWeight: '600',
  },
});
