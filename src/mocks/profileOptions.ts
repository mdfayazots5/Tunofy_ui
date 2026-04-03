import { LanguageOption, CountryOption, GenreOption, PlaybackQualityOption, IssueType } from '../types/profile';

export const LANGUAGES: LanguageOption[] = [
  { id: 'en', label: 'English', code: 'en' },
  { id: 'es', label: 'Spanish', code: 'es' },
  { id: 'fr', label: 'French', code: 'fr' },
  { id: 'de', label: 'German', code: 'de' },
  { id: 'hi', label: 'Hindi', code: 'hi' },
  { id: 'ar', label: 'Arabic', code: 'ar' },
  { id: 'pt', label: 'Portuguese', code: 'pt' },
  { id: 'ru', label: 'Russian', code: 'ru' },
  { id: 'ja', label: 'Japanese', code: 'ja' },
  { id: 'zh', label: 'Chinese', code: 'zh' },
];

export const COUNTRIES: CountryOption[] = [
  { id: 'us', label: 'United States', code: 'US' },
  { id: 'gb', label: 'United Kingdom', code: 'GB' },
  { id: 'ca', label: 'Canada', code: 'CA' },
  { id: 'au', label: 'Australia', code: 'AU' },
  { id: 'in', label: 'India', code: 'IN' },
  { id: 'de', label: 'Germany', code: 'DE' },
  { id: 'fr', label: 'France', code: 'FR' },
  { id: 'br', label: 'Brazil', code: 'BR' },
  { id: 'mx', label: 'Mexico', code: 'MX' },
  { id: 'jp', label: 'Japan', code: 'JP' },
];

export const GENRES: GenreOption[] = [
  { id: 'pop', label: 'Pop' },
  { id: 'rock', label: 'Rock' },
  { id: 'jazz', label: 'Jazz' },
  { id: 'classical', label: 'Classical' },
  { id: 'hiphop', label: 'Hip Hop' },
  { id: 'electronic', label: 'Electronic' },
  { id: 'country', label: 'Country' },
  { id: 'blues', label: 'Blues' },
  { id: 'reggae', label: 'Reggae' },
  { id: 'metal', label: 'Metal' },
  { id: 'folk', label: 'Folk' },
  { id: 'latin', label: 'Latin' },
];

export const PLAYBACK_QUALITIES: PlaybackQualityOption[] = [
  { id: 'auto', label: 'Auto' },
  { id: 'low', label: 'Low (Data Saver)' },
  { id: 'high', label: 'High (Best Quality)' },
];

export const ISSUE_TYPES: { id: IssueType; label: string }[] = [
  { id: 'broken_stream', label: 'Broken Stream' },
  { id: 'wrong_details', label: 'Wrong Details' },
  { id: 'playback_issue', label: 'Playback Issue' },
  { id: 'app_issue', label: 'App Issue' },
  { id: 'general_feedback', label: 'General Feedback' },
];
