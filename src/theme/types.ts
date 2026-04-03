import { lightColors, spacing, borderRadius, typography, shadows } from './tokens';

export interface Colors {
  brand: {
    primary: string;
    accent: string;
  };
  surface: {
    main: string;
    card: string;
    overlay: string;
  };
  text: {
    primary: string;
    secondary: string;
    muted: string;
    inverse: string;
  };
  semantic: {
    success: string;
    error: string;
    warning: string;
    info: string;
  };
  border: {
    main: string;
    light: string;
    subtle: string;
  };
  // Common aliases to prevent crashes
  primary: string;
  accent: string;
  background: string;
  card: string;
  error: string;
  success: string;
  surface: string;
  textSecondary: string;
  textMuted: string;
  border: string;
}

export type Spacing = typeof spacing;
export type BorderRadius = typeof borderRadius;
export type Typography = typeof typography;
export type Shadows = typeof shadows;

export interface Theme {
  colors: Colors;
  spacing: Spacing;
  borderRadius: BorderRadius;
  typography: Typography;
  shadows: Shadows;
  isDark: boolean;
}

export type ThemeMode = 'light' | 'dark' | 'system';
