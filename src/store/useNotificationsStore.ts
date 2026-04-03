import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from './mmkvStorage';
import { AppNotification } from '../types/library';
import { MOCK_NOTIFICATIONS } from '../mocks/notifications';

interface NotificationsState {
  notifications: AppNotification[];
  
  // Actions
  loadNotifications: () => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  getUnreadCount: () => number;
}

export const useNotificationsStore = create<NotificationsState>()(
  persist(
    (set, get) => ({
      notifications: [],

      loadNotifications: () => {
        const { notifications } = get();
        if (notifications.length === 0) {
          set({ notifications: MOCK_NOTIFICATIONS });
        }
      },

      markAsRead: (id) => {
        const { notifications } = get();
        set({
          notifications: notifications.map((n) =>
            n.id === id ? { ...n, isRead: true } : n
          ),
        });
      },

      markAllAsRead: () => {
        const { notifications } = get();
        set({
          notifications: notifications.map((n) => ({ ...n, isRead: true })),
        });
      },

      deleteNotification: (id) => {
        const { notifications } = get();
        set({
          notifications: notifications.filter((n) => n.id !== id),
        });
      },

      getUnreadCount: () => {
        return get().notifications.filter((n) => !n.isRead).length;
      },
    }),
    {
      name: 'notifications-storage',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);
