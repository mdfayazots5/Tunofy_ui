import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Twitter, Instagram, Facebook, Globe } from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { spacing, borderRadius } from '../../theme/tokens';

interface SocialLinkRowProps {
  links: Array<{ id: string; label: string; url: string }>;
}

export const SocialLinkRow: React.FC<SocialLinkRowProps> = ({ links }) => {
  const { colors } = useTheme();

  const getIcon = (id: string) => {
    switch (id) {
      case 'twitter': return <Twitter size={24} color={colors.text.primary} />;
      case 'instagram': return <Instagram size={24} color={colors.text.primary} />;
      case 'facebook': return <Facebook size={24} color={colors.text.primary} />;
      default: return <Globe size={24} color={colors.text.primary} />;
    }
  };

  return (
    <View style={styles.container}>
      {links.map((link) => (
        <TouchableOpacity
          key={link.id}
          style={[styles.link, { backgroundColor: colors.surface.card }]}
          onPress={() => Linking.openURL(link.url)}
          activeOpacity={0.7}
        >
          {getIcon(link.id)}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.xl,
    paddingVertical: spacing.xl,
  },
  link: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
