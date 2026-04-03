import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Bell, CheckCheck } from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { spacing } from '../../theme/tokens';
import { useNotificationsStore } from '../../store/useNotificationsStore';
import { NotificationItem } from '../../components/library/NotificationItem';
import { EmptyLibraryState } from '../../components/library/EmptyLibraryState';
import { AppRoutes, TabRoutes } from '../../navigation/navigation.constants';
import { AppNotification } from '../../types/library';

export const NotificationsScreen: React.FC<any> = ({ navigation }) => {
  const { colors, typography } = useTheme();
  const insets = useSafeAreaInsets();
  const { 
    notifications, 
    loadNotifications, 
    markAsRead, 
    markAllAsRead, 
    deleteNotification,
    getUnreadCount 
  } = useNotificationsStore();

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  const unreadCount = getUnreadCount();

  const onRefresh = () => {
    setRefreshing(true);
    loadNotifications();
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleNotificationPress = (notification: AppNotification) => {
    markAsRead(notification.id);
    
    if (notification.deepLink) {
      if (notification.deepLink === 'StationDetails' && notification.metadata?.stationId) {
        navigation.navigate(AppRoutes.STATION_DETAILS, { stationId: notification.metadata.stationId });
      } else if (notification.deepLink === 'ExploreGenres') {
        navigation.navigate(TabRoutes.SEARCH_STACK, { screen: 'ExploreGenres' });
      }
    }
  };

  const handleBrowsePress = () => {
    navigation.navigate(TabRoutes.SEARCH_STACK);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + spacing.md, borderBottomColor: colors.border.subtle }]}>
        <Text style={[styles.headerTitle, { color: colors.text.primary, fontSize: typography.heading.h2.size }]}>
          Notifications
        </Text>
        {unreadCount > 0 && (
          <TouchableOpacity
            style={[styles.markReadButton, { backgroundColor: colors.surface.card }]}
            onPress={markAllAsRead}
          >
            <CheckCheck size={20} color={colors.brand.primary} />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NotificationItem
            notification={item}
            onPress={handleNotificationPress}
            onDelete={deleteNotification}
          />
        )}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: insets.bottom + spacing.xxl },
          notifications.length === 0 && { flex: 1 },
        ]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.brand.primary} />
        }
        ListEmptyComponent={
          <EmptyLibraryState
            icon={Bell}
            title="No notifications yet"
            description="We'll notify you about new featured stations, app updates, and more."
            ctaText="Browse Stations"
            onCtaPress={handleBrowsePress}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontWeight: '800',
  },
  markReadButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingTop: 0,
  },
});
