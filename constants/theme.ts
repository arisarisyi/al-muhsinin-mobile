/**
 * Islamic Theme System for Santri Apps
 *
 * Color palette inspired by Islamic art and culture:
 * - Deep greens for spirituality & growth
 * - Gold accents for elegance & preciousness
 * - Earth tones for grounding
 * - Off-whites for traditional paper feel
 */

import { Platform } from 'react-native';

// Light Mode - Soft Islamic Colors
const lightTheme = {
  primary: '#2D5A3D',        // Deep green - Islami & natural
  primaryLight: '#3D7A52',   // Lighter green for hover states
  secondary: '#8B7355',      // Earth tone - Grounded
  accent: '#D4AF37',         // Gold - Elegance & precious
  background: '#FAF9F6',     // Off-white - Cream paper feel
  surface: '#FFFFFF',        // Pure white - Cards
  text: '#2C3333',           // Dark gray - High readability
  textSecondary: '#6B7280',  // Medium gray - Secondary text
  textTertiary: '#9CA3AF',   // Light gray - Tertiary text
  border: '#E5E7EB',         // Light gray - Subtle borders
  error: '#DC2626',          // Red - Error states
  success: '#059669',        // Green - Success states
  warning: '#D97706',        // Amber - Warning states
  info: '#0284C7',           // Blue - Info states

  // Navigation
  tabIconDefault: '#9CA3AF',
  tabIconSelected: '#2D5A3D',

  // WiFiQ Type Colors
  wifiq: {
    mutsalas: '#3498db',     // Blue - Sabtu/Saturn
    murabba: '#2ecc71',      // Green - Rabu/Mercury
    mukhamas: '#e74c3c',     // Red - Selasa/Mars
    musaddas: '#f39c12',     // Orange - Minggu/Sun
    musabba: '#9b59b6',      // Purple - Jumat/Venus
    musamman: '#1abc9c',     // Teal - Kamis/Jupiter
    mutassa: '#6970bb',      // Indigo - Senin/Moon
  },
};

// Dark Mode - Easy on Eyes (OLED Friendly)
const darkTheme = {
  primary: '#4A7C59',        // Lighter green - Dark mode
  primaryLight: '#5A9C69',   // Even lighter for hover
  secondary: '#A4916E',      // Lighter earth tone
  accent: '#E5C158',         // Lighter gold
  background: '#0F0F0F',     // Near black - OLED friendly
  surface: '#1A1A1A',        // Dark gray - Cards
  text: '#F9FAFB',           // Near white - Primary text
  textSecondary: '#D1D5DB',  // Light gray - Secondary text
  textTertiary: '#9CA3AF',   // Medium gray - Tertiary text
  border: '#374151',         // Medium gray - Borders
  error: '#F87171',          // Light red - Error
  success: '#34D399',        // Light green - Success
  warning: '#FBBF24',        // Light amber - Warning
  info: '#38BDF8',           // Light blue - Info

  // Navigation
  tabIconDefault: '#6B7280',
  tabIconSelected: '#4A7C59',

  // WiFiQ Type Colors (adjusted for dark mode)
  wifiq: {
    mutsalas: '#5DADE2',     // Lighter blue
    murabba: '#58D68D',      // Lighter green
    mukhamas: '#EC7063',     // Lighter red
    musaddas: '#F5B041',     // Lighter orange
    musabba: '#BB8FCE',      // Lighter purple
    musamman: '#48C9B0',     // Lighter teal
    mutassa: '#8591E8',      // Lighter indigo
  },
};

export const Colors = {
  light: lightTheme,
  dark: darkTheme,
};

export const Fonts = Platform.select({
  ios: {
    /** Arabic font - Traditional & readable */
    arabic: 'Amiri', // Will be loaded via expo-font
    /** Latin UI font - Modern & clean */
    sans: 'System',
    /** Serif for special content */
    serif: 'Georgia',
    /** Monospace for numbers/codes */
    mono: 'Menlo',
  },
  android: {
    arabic: 'Amiri',
    sans: 'Roboto',
    serif: 'serif',
    mono: 'monospace',
  },
  web: {
    arabic: "'Amiri', 'Scheherazade', 'Traditional Arabic', serif",
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace",
  },
  default: {
    arabic: 'Amiri',
    sans: 'System',
    serif: 'serif',
    mono: 'monospace',
  },
});

// Typography scale for consistent text sizing
export const Typography = {
  // Headings
  heading1: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '700' as const,
    letterSpacing: -0.5,
  },
  heading2: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '600' as const,
    letterSpacing: -0.25,
  },
  heading3: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600' as const,
  },
  heading4: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600' as const,
  },

  // Body
  bodyLarge: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400' as const,
  },
  body: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400' as const,
  },
  bodySmall: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400' as const,
  },

  // Special
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400' as const,
  },
  label: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500' as const,
  },

  // Arabic text (slightly larger for readability)
  arabicLarge: {
    fontSize: 28,
    lineHeight: 44,
    fontWeight: '400' as const,
  },
  arabic: {
    fontSize: 24,
    lineHeight: 40,
    fontWeight: '400' as const,
  },
  arabicSmall: {
    fontSize: 18,
    lineHeight: 32,
    fontWeight: '400' as const,
  },
};

// Spacing scale for consistent layout
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

// Border radius for consistent shapes
export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

// Shadow presets for depth
export const Shadow = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
};
