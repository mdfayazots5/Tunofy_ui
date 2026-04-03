export enum RootRoutes {
  SPLASH = 'Splash',
  ONBOARDING = 'Onboarding',
  AUTH = 'Auth',
  APP = 'App',
}

export enum AuthRoutes {
  WELCOME = 'Welcome',
  LOGIN = 'Login',
  REGISTER = 'Register',
  FORGOT_PASSWORD = 'ForgotPassword',
  RESET_PASSWORD = 'ResetPassword',
}

export enum AppRoutes {
  TABS = 'Tabs',
  STATION_DETAILS = 'StationDetails',
  FULL_PLAYER = 'FullPlayer',
  GUEST_RESTRICTED_PROMPT = 'GuestRestrictedPrompt',
  APP_UPDATE_PROMPT = 'AppUpdatePrompt',
}

export enum TabRoutes {
  HOME_STACK = 'HomeStack',
  SEARCH_STACK = 'SearchStack',
  FAVORITES_STACK = 'FavoritesStack',
  NOTIFICATIONS_STACK = 'NotificationsStack',
  PROFILE_STACK = 'ProfileStack',
}

export enum HomeRoutes {
  HOME = 'Home',
  TRENDING_STATIONS = 'TrendingStations',
  FEATURED_STATIONS = 'FeaturedStations',
  STATION_DETAILS = 'StationDetails',
  FULL_PLAYER = 'FullPlayer',
}

export enum SearchRoutes {
  SEARCH = 'Search',
  EXPLORE_GENRES = 'ExploreGenres',
  EXPLORE_LANGUAGES = 'ExploreLanguages',
  EXPLORE_COUNTRIES = 'ExploreCountries',
  STATION_DETAILS = 'StationDetails',
  FILTERED_STATION_LIST = 'FilteredStationList',
}

export enum FavoritesRoutes {
  FAVORITES = 'Favorites',
  STATION_DETAILS = 'StationDetails',
}

export enum NotificationsRoutes {
  NOTIFICATIONS = 'Notifications',
}

export enum ProfileRoutes {
  PROFILE = 'Profile',
  EDIT_PROFILE = 'EditProfile',
  SETTINGS = 'Settings',
  RECENT_LISTENING = 'RecentListening',
  FEEDBACK = 'Feedback',
  ABOUT = 'About',
  CONTACT = 'Contact',
  PRIVACY = 'Privacy',
  TERMS = 'Terms',
}
