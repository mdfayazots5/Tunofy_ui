import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Star, Download, Music, Info, Trash2 } from 'lucide-react-native';
import { Swipeable } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useTheme } from '../../theme/ThemeProvider';
import { spacing, borderRadius } from '../../theme/tokens';
import { AppNotification } from '../../types/library';
import { formatRelativeTime } from '../../utils/libraryHelpers';

interface NotificationItemProps {
  notification: AppNotification;
  onPress: (notification: AppNotification) => void;
  onDelete: (id: string) => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onPress,
  onDelete,
}) => {
  const { colors, typography } = useTheme();

  const getIcon = () => {
    const size = 20;
    const color = colors.brand.primary;
    switch (notification.type) {
      case 'featured_station':
        return <Star size={size} color={color} fill={color} />;
      case 'app_update':
        return <Download size={size} color={color} />;
      case 'new_genre':
        return <Music size={size} color={color} />;
      case 'system':
      default:
        return <Info size={size} color={color} />;
    }
  };

  const renderRightActions = (progress: any, dragX: any) => {
    return (
      <TouchableOpacity
        style={[styles.deleteAction, { backgroundColor: colors.error }]}
        onPress={() => onDelete(notification.id)}
      >
        <Trash2 size={24} color="#FFF" />
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity
        style={[
          styles.container,
          { backgroundColor: colors.surface.card, borderBottomColor: colors.border.subtle },
        ]}
        onPress={() => onPress(notification)}
        activeOpacity={0.7}
      >
        <View style={[styles.iconContainer, { backgroundColor: colors.surface.main }]}>
          {getIcon()}
        </View>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text
              style={[
                styles.title,
                {
                  color: colors.text.primary,
                  fontSize: typography.body.medium.size,
                  fontWeight: notification.isRead ? '500' : '700',
                },
              ]}
              numberOfLines={1}
            >
              {notification.title}
            </Text>
            {!notification.isRead && (
              <View style={[styles.unreadDot, { backgroundColor: colors.brand.primary }]} />
            )}
          </View>
          <Text
            style={[
              styles.body,
              { color: colors.text.secondary, fontSize: typography.caption.size },
            ]}
            numberOfLines={2}
          >
            {notification.body}
          </Text>
          <Text
            style={[
              styles.timestamp,
              { color: colors.text.muted, fontSize: typography.caption.size - 2 },
            ]}
          >
            {formatRelativeTime(notification.timestamp)}
          </Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: spacing.md,
    borderBottomWidth: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  title: {
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: spacing.sm,
  },
  body: {
    marginBottom: 6,
    lineHeight: 18,
  },
  timestamp: {
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  deleteAction: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
