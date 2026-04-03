export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  mobile?: string;
  memberSince: string;
  preferredLanguage: string;
  preferredCountry: string;
  favoriteGenres: string[];
}

export interface LanguageOption {
  id: string;
  label: string;
  code: string;
}

export interface CountryOption {
  id: string;
  label: string;
  code: string;
}

export interface GenreOption {
  id: string;
  label: string;
}

export interface PlaybackQualityOption {
  id: 'auto' | 'low' | 'high';
  label: string;
}

export type AppTheme = 'light' | 'dark' | 'system';

export interface AppSettings {
  pushNotifications: boolean;
  theme: AppTheme;
  playbackQuality: PlaybackQualityOption['id'];
  defaultLanguage: string;
  defaultCountry: string;
  appVersion: string;
}

export type IssueType = 'broken_stream' | 'wrong_details' | 'playback_issue' | 'app_issue' | 'general_feedback';

export interface FeedbackForm {
  issueType: IssueType;
  stationId?: string;
  subject: string;
  message: string;
  contactEmail: string;
}
