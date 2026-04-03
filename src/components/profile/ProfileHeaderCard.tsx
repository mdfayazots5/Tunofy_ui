import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Camera, User } from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { spacing, borderRadius, shadows } from '../../theme/tokens';
import { UserProfile } from '../../types/profile';

interface ProfileHeaderCardProps {
  user: UserProfile | null;
  onAvatarPress?: () => void;
  showCameraIcon?: boolean;
}

export const ProfileHeaderCard: React.FC<ProfileHeaderCardProps> = ({
  user,
  onAvatarPress,
  showCameraIcon = false,
}) => {
  const { colors, typography } = useTheme();

  if (!user) return null;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.avatarContainer, { backgroundColor: colors.surface.card }]}
        onPress={onAvatarPress}
        activeOpacity={0.8}
      >
        {user.avatar ? (
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
        ) : (
          <User size={40} color={colors.brand.primary} />
        )}
        {showCameraIcon && (
          <View style={[styles.cameraIcon, { backgroundColor: colors.brand.primary }]}>
            <Camera size={16} color="#FFF" />
          </View>
        )}
      </TouchableOpacity>
      <Text style={[styles.name, { color: colors.text.primary, fontSize: typography.heading.h3.size }]}>
        {user.name}
      </Text>
      <Text style={[styles.email, { color: colors.text.secondary, fontSize: typography.body.medium.size }]}>
        {user.email}
      </Text>
      <Text style={[styles.memberSince, { color: colors.text.muted, fontSize: typography.body.small.size }]}>
        Member since {user.memberSince}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
    ...shadows.sm,
    position: 'relative',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  name: {
    fontWeight: '700',
    marginBottom: 4,
  },
  email: {
    marginBottom: 4,
  },
  memberSince: {
    fontWeight: '500',
    opacity: 0.7,
  },
});
