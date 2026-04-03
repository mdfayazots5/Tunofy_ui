import { NavigatorScreenParams } from '@react-navigation/native';
import { RootRoutes, AuthRoutes, AppRoutes, TabRoutes, HomeRoutes, SearchRoutes, FavoritesRoutes, NotificationsRoutes, ProfileRoutes } from './navigation.constants';

export type RootStackParamList = {
  [RootRoutes.SPLASH]: undefined;
  [RootRoutes.ONBOARDING]: undefined;
  [RootRoutes.AUTH]: NavigatorScreenParams<AuthStackParamList>;
  [RootRoutes.APP]: NavigatorScreenParams<AppStackParamList>;
};

export type AuthStackParamList = {
  [AuthRoutes.WELCOME]: undefined;
  [AuthRoutes.LOGIN]: undefined;
  [AuthRoutes.REGISTER]: undefined;
  [AuthRoutes.FORGOT_PASSWORD]: undefined;
  [AuthRoutes.RESET_PASSWORD]: { token?: string };
};

export type AppStackParamList = {
  [AppRoutes.TABS]: NavigatorScreenParams<TabStackParamList>;
  [AppRoutes.STATION_DETAILS]: { stationId: string };
  [AppRoutes.FULL_PLAYER]: { stationId: string };
  [AppRoutes.GUEST_RESTRICTED_PROMPT]: undefined;
  [AppRoutes.APP_UPDATE_PROMPT]: undefined;
};

export type TabStackParamList = {
  [TabRoutes.HOME_STACK]: NavigatorScreenParams<HomeStackParamList>;
  [TabRoutes.SEARCH_STACK]: NavigatorScreenParams<SearchStackParamList>;
  [TabRoutes.FAVORITES_STACK]: NavigatorScreenParams<FavoritesStackParamList>;
  [TabRoutes.NOTIFICATIONS_STACK]: NavigatorScreenParams<NotificationsStackParamList>;
  [TabRoutes.PROFILE_STACK]: NavigatorScreenParams<ProfileStackParamList>;
};

export type HomeStackParamList = {
  [HomeRoutes.HOME]: undefined;
  [HomeRoutes.TRENDING_STATIONS]: undefined;
  [HomeRoutes.FEATURED_STATIONS]: undefined;
  [HomeRoutes.STATION_DETAILS]: { stationId: string };
  [HomeRoutes.FULL_PLAYER]: { stationId: string };
};

export type SearchStackParamList = {
  [SearchRoutes.SEARCH]: undefined;
  [SearchRoutes.EXPLORE_GENRES]: undefined;
  [SearchRoutes.EXPLORE_LANGUAGES]: undefined;
  [SearchRoutes.EXPLORE_COUNTRIES]: undefined;
  [SearchRoutes.STATION_DETAILS]: { stationId: string };
  [SearchRoutes.FILTERED_STATION_LIST]: { type: 'genre' | 'language' | 'country'; id: string; label: string };
};

export type FavoritesStackParamList = {
  [FavoritesRoutes.FAVORITES]: undefined;
  [FavoritesRoutes.STATION_DETAILS]: { stationId: string };
};

export type NotificationsStackParamList = {
  [NotificationsRoutes.NOTIFICATIONS]: undefined;
};

export type ProfileStackParamList = {
  [ProfileRoutes.PROFILE]: undefined;
  [ProfileRoutes.EDIT_PROFILE]: undefined;
  [ProfileRoutes.SETTINGS]: undefined;
  [ProfileRoutes.RECENT_LISTENING]: undefined;
  [ProfileRoutes.FEEDBACK]: undefined;
  [ProfileRoutes.ABOUT]: undefined;
  [ProfileRoutes.CONTACT]: undefined;
  [ProfileRoutes.PRIVACY]: undefined;
  [ProfileRoutes.TERMS]: undefined;
};
