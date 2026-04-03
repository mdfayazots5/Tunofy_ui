export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  xxl: 48,
  xxxl: 64,
} as const;

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  full: 999,
} as const;

export const typography = {
  size: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
  },
  display: {
    large: { size: 32, weight: '700' },
    medium: { size: 28, weight: '700' },
  },
  heading: {
    large: { size: 24, weight: '600' },
    medium: { size: 20, weight: '600' },
    small: { size: 18, weight: '600' },
    h1: { size: 24, weight: '600' },
    h2: { size: 20, weight: '600' },
    h3: { size: 18, weight: '600' },
    h4: { size: 16, weight: '600' },
  },
  h1: { size: 32, weight: '700' },
  h2: { size: 28, weight: '700' },
  h3: { size: 24, weight: '600' },
  h4: { size: 20, weight: '600' },
  body: {
    large: { size: 16, weight: '400' },
    medium: { size: 14, weight: '400' },
    small: { size: 12, weight: '400' },
  },
  caption: {
    size: 12,
    weight: '400',
  },
} as const;

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
} as const;

export const lightColors = {
  brand: {
    primary: '#6C63FF',
    accent: '#FF6584',
  },
  surface: {
    main: '#F5F5FA',
    card: '#FFFFFF',
    overlay: 'rgba(0, 0, 0, 0.5)',
  },
  text: {
    primary: '#0F0F14',
    secondary: '#5F5F6E',
    muted: '#9E9EAE',
    inverse: '#FFFFFF',
  },
  semantic: {
    success: '#4CAF50',
    error: '#F44336',
    warning: '#FFC107',
    info: '#2196F3',
  },
  border: {
    main: '#E0E0E6',
    light: '#F0F0F5',
    subtle: '#E0E0E6',
  },
  primary: '#6C63FF',
  accent: '#FF6584',
  background: '#F5F5FA',
  card: '#FFFFFF',
  error: '#F44336',
  success: '#4CAF50',
  surface: '#F0F0F5',
  textSecondary: '#5F5F6E',
  textMuted: '#9E9EAE',
  border: '#E0E0E6',
} as const;

export const darkColors = {
  brand: {
    primary: '#6C63FF',
    accent: '#FF6584',
  },
  surface: {
    main: '#0F0F14',
    card: '#1A1A24',
    overlay: 'rgba(0, 0, 0, 0.7)',
  },
  text: {
    primary: '#F5F5FA',
    secondary: '#A0A0B0',
    muted: '#6E6E7E',
    inverse: '#0F0F14',
  },
  semantic: {
    success: '#66BB6A',
    error: '#EF5350',
    warning: '#FFCA28',
    info: '#42A5F5',
  },
  border: {
    main: '#2A2A36',
    light: '#3A3A46',
    subtle: '#2A2A36',
  },
  primary: '#6C63FF',
  accent: '#FF6584',
  background: '#0F0F14',
  card: '#1A1A24',
  error: '#EF5350',
  success: '#66BB6A',
  surface: '#1A1A24',
  textSecondary: '#A0A0B0',
  textMuted: '#6E6E7E',
  border: '#2A2A36',
} as const;
