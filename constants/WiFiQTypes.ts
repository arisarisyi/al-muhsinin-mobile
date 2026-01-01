/**
 * WiFiQ Type Constants
 *
 * Metadata for all 7 WiFiQ types
 */

import type { WiFiQType, WiFiQTypeMetadata } from '@/types/wifiq.types';

/**
 * WiFiQ types configuration
 * Contains all metadata for the 7 WiFiQ types
 */
export const WiFiQ_TYPES: Record<WiFiQType, WiFiQTypeMetadata> = {
  mutsalas: {
    name: 'مُثَلَّث',
    size: '3×3',
    day: 'السبت', // Saturday
    planet: 'الزحل', // Saturn
    color: '#3498db', // Blue
  },
  murabba: {
    name: 'مُرَبَّع',
    size: '4×4',
    day: 'الربعاء', // Wednesday
    planet: 'العطارد', // Mercury
    color: '#2ecc71', // Green
  },
  mukhamas: {
    name: 'مُخَمَّس',
    size: '5×5',
    day: 'الثلاثاء', // Tuesday
    planet: 'المريخ', // Mars
    color: '#e74c3c', // Red
  },
  musaddas: {
    name: 'مُسَدَّس',
    size: '6×6',
    day: 'الأحد', // Sunday
    planet: 'الشمس', // Sun
    color: '#f39c12', // Orange
  },
  musabba: {
    name: 'مُسَبَّع',
    size: '7×7',
    day: 'الجمعة', // Friday
    planet: 'الزهرة', // Venus
    color: '#9b59b6', // Purple
  },
  musamman: {
    name: 'مُثَمَّن',
    size: '8×8',
    day: 'الخميس', // Thursday
    planet: 'المشتري', // Jupiter
    color: '#1abc9c', // Teal
  },
  mutassa: {
    name: 'مُتَسَع',
    size: '9×9',
    day: 'الاثنين', // Monday
    planet: 'القمر', // Moon
    color: '#6970bb', // Indigo
  },
};

/**
 * Value labels for WiFiQ calculations
 */
export const WIFIQ_VALUE_LABELS = {
  miftah: {
    arabic: 'المفتاح',
    transliteration: 'Al-Miftah',
    meaning: 'The Key',
  },
  maghlaq: {
    arabic: 'المغلاق',
    transliteration: 'Al-Maghlaq',
    meaning: 'The Lock',
  },
  adl: {
    arabic: 'العدل',
    transliteration: 'Al-Adl',
    meaning: 'Justice',
  },
  tarh: {
    arabic: 'الطرح',
    transliteration: 'Al-Tarh',
    meaning: 'Subtraction',
  },
  wafaq: {
    arabic: 'الوفق',
    transliteration: 'Al-Wafaq',
    meaning: 'Concord',
  },
  masaha: {
    arabic: 'المساحة',
    transliteration: 'Al-Masaha',
    meaning: 'Area',
  },
  dabit: {
    arabic: 'الضابط',
    transliteration: 'Al-Dabit',
    meaning: 'Controller',
  },
  ghayah: {
    arabic: 'الغاية',
    transliteration: 'Al-Ghayah',
    meaning: 'Goal',
  },
} as const;

/**
 * Planet names for planetary hours
 */
export const PLANETS = {
  saturn: {
    arabic: 'الزحل',
    english: 'Saturn',
    color: '#3498db',
  },
  jupiter: {
    arabic: 'المشتري',
    english: 'Jupiter',
    color: '#f39c12',
  },
  mars: {
    arabic: 'المريخ',
    english: 'Mars',
    color: '#e74c3c',
  },
  sun: {
    arabic: 'الشمس',
    english: 'Sun',
    color: '#f1c40f',
  },
  venus: {
    arabic: 'الزهرة',
    english: 'Venus',
    color: '#9b59b6',
  },
  mercury: {
    arabic: 'العطارد',
    english: 'Mercury',
    color: '#2ecc71',
  },
  moon: {
    arabic: 'القمر',
    english: 'Moon',
    color: '#6970bb',
  },
} as const;

/**
 * Order of planets for planetary hours calculation
 * Starts from Saturn and follows the Chaldean order
 */
export const PLANETARY_ORDER = [
  'saturn',
  'jupiter',
  'mars',
  'sun',
  'venus',
  'mercury',
  'moon',
] as const;

/**
 * Get WiFiQ type metadata
 */
export function getWiFiQType(type: WiFiQType): WiFiQTypeMetadata {
  return WiFiQ_TYPES[type];
}

/**
 * Get color for WiFiQ type (respects theme)
 */
export function getWiFiQColor(
  type: WiFiQType,
  isDark: boolean = false
): string {
  const metadata = WiFiQ_TYPES[type];
  // Adjust color for dark mode if needed
  if (isDark) {
    // Return lighter versions for dark mode
    const darkModeColors: Record<WiFiQType, string> = {
      mutsalas: '#5DADE2',
      murabba: '#58D68D',
      mukhamas: '#EC7063',
      musaddas: '#F5B041',
      musabba: '#BB8FCE',
      musamman: '#48C9B0',
      mutassa: '#8591E8',
    };
    return darkModeColors[type];
  }
  return metadata.color;
}
