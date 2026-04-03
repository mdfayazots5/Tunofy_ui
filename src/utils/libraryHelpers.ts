import { formatDistanceToNow, parseISO } from 'date-fns';

export const formatRelativeTime = (isoString: string): string => {
  try {
    const date = parseISO(isoString);
    return formatDistanceToNow(date, { addSuffix: true });
  } catch (error) {
    return 'recently';
  }
};

export const getNotificationIcon = (type: string): string => {
  switch (type) {
    case 'featured_station':
      return 'star';
    case 'app_update':
      return 'download';
    case 'new_genre':
      return 'music';
    case 'system':
    default:
      return 'info';
  }
};
