/**
 * WiFiQ Calculator Utilities
 *
 * Ported from santri-project
 * Functions for calculating WiFiQ values based on input
 */

import type { WiFiQType, WiFiQValues, WiFiQCalculationResult } from '@/types/wifiq.types';

/**
 * Abajad (Arabic alphabet) values for calculation
 * Ported from santri-project/src/components/AbajadCalculator
 */
export const ABAJAD_VALUES: Record<string, number> = {
  ا: 1,
  ٱ: 1,
  أ: 1,
  إ: 1,
  آ: 1,
  ب: 2,
  ج: 3,
  د: 4,
  ه: 5,
  ة: 5,
  و: 6,
  ز: 7,
  ح: 8,
  ط: 9,
  ي: 10,
  یَ: 10,
  ى: 10,
  ی: 10,
  ك: 20,
  ل: 30,
  م: 40,
  ن: 50,
  س: 60,
  ع: 70,
  ف: 80,
  ص: 90,
  ق: 100,
  ر: 200,
  ش: 300,
  ت: 400,
  ث: 500,
  خ: 600,
  ذ: 700,
  ض: 800,
  ظ: 900,
  غ: 1000,
};

/**
 * Calculate Abajad total from Arabic text
 * @param text - Arabic text to calculate
 * @returns Object with total and calculation details
 */
export function calculateAbajad(text: string): {
  total: number;
  details: string;
  letters: string[];
} {
  let total = 0;
  const calculationParts: string[] = [];
  const lettersUsed: string[] = [];

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (Object.prototype.hasOwnProperty.call(ABAJAD_VALUES, char)) {
      const value = ABAJAD_VALUES[char];
      total += value;
      lettersUsed.push(char);
      calculationParts.push(`${char} (${value})`);
    }
  }

  const calculationString = calculationParts.join(' + ');
  const details = calculationParts.length > 0
    ? `${calculationString} = ${total}`
    : 'لم يتم إدخال حروف عربية صالحة';

  return { total, details, letters: lettersUsed };
}

/**
 * Calculate Miftah (Key) for a WiFiQ type
 * Ported from santri-project/src/utils/numbers.jsx
 */
export function calculateWifiq(total: number, type: WiFiQType): number | '-' {
  let result: number;

  switch (type) {
    case 'mutsalas':
      result = total / 3 - 4;
      break;
    case 'murabba':
      result = (total - 3) / 4;
      break;
    case 'mukhamas':
      result = total / 5 - 12;
      break;
    case 'musaddas':
      result = (total - 105) / 6;
      break;
    case 'musabba':
      result = total / 7 - 24;
      break;
    case 'musamman':
      result = (total - 252) / 8;
      break;
    case 'mutassa':
      result = total / 9 - 40;
      break;
    default:
      return '-';
  }

  // Check if result is non-negative integer
  const isInteger = Number.isInteger(result);
  const isNonNegative = result >= 0;

  return isInteger && isNonNegative ? result : '-';
}

/**
 * Get WiFiQ properties based on type
 * Ported from santri-project/src/utils/numbers.jsx
 */
export function getWifiqProperties(type: WiFiQType): {
  size: number;
  shakl: number;
  name: string;
} {
  switch (type) {
    case 'mutsalas':
      return { size: 3, shakl: 3, name: 'مُثَلَّث (3x3)' };
    case 'murabba':
      return { size: 4, shakl: 4, name: 'مُرَبَّع (4x4)' };
    case 'mukhamas':
      return { size: 5, shakl: 5, name: 'مُخَمَّس (5x5)' };
    case 'musaddas':
      return { size: 6, shakl: 6, name: 'مُسَدَّس (6x6)' };
    case 'musabba':
      return { size: 7, shakl: 7, name: 'مُسَبَّع (7x7)' };
    case 'musamman':
      return { size: 8, shakl: 8, name: 'مُثَمَّن (8x8)' };
    case 'mutassa':
      return { size: 9, shakl: 9, name: 'مُتسع (9x9)' };
    default:
      return { size: 0, shakl: 0, name: '' };
  }
}

/**
 * Calculate all WiFiQ values for a given type
 * Ported from santri-project/src/components/WifiqTable
 */
export function calculateAllWifiqValues(
  total: number,
  type: WiFiQType
): WiFiQValues {
  const miftah = calculateWifiq(total, type);

  if (miftah === '-') {
    return {
      miftah: 0,
      maghlaq: 0,
      adl: 0,
      tarh: 0,
      wafaq: 0,
      masaha: 0,
      dabit: 0,
      ghayah: 0,
    };
  }

  const maghlaq = calculateMaghlaq(miftah as number, type);
  const adl = calculateAdl(miftah as number, maghlaq);
  const tarh = calculateTarh(miftah as number, type);
  const wafaq = calculateWafaq(miftah as number, type);
  const masaha = calculateMasaha(type, wafaq);
  const dabit = calculateDabit(wafaq, masaha);
  const ghayah = calculateGhayah(wafaq, type);

  return {
    miftah,
    maghlaq,
    adl,
    tarh,
    wafaq,
    masaha,
    dabit,
    ghayah,
  };
}

/**
 * Calculate Maghlaq (Lock)
 */
function calculateMaghlaq(miftah: number, type: WiFiQType): number | '-' {
  if (typeof miftah !== 'number' || miftah < 0) return '-';

  let result: number;
  switch (type) {
    case 'mutsalas':
      result = miftah + 8;
      break;
    case 'murabba':
      result = miftah + 15;
      break;
    case 'mukhamas':
      result = miftah + 24;
      break;
    case 'musaddas':
      result = miftah + 35;
      break;
    case 'musabba':
      result = miftah + 48;
      break;
    case 'musamman':
      result = miftah + 63;
      break;
    case 'mutassa':
      result = miftah + 80;
      break;
    default:
      return '-';
  }

  return result >= 0 ? result : '-';
}

/**
 * Calculate Adl (Justice)
 */
function calculateAdl(miftah: number, maghlaq: number | '-'): number | '-' {
  if (maghlaq === '-') return '-';
  return miftah + maghlaq;
}

/**
 * Calculate Tarh (Subtraction)
 */
function calculateTarh(miftah: number, type: WiFiQType): number | '-' {
  const { size, shakl } = getWifiqProperties(type);
  if (size === 0) return '-';

  const jumlahBait = size * size;
  const setengahShakl = 0.5 * shakl;
  const tarh = (jumlahBait - 1) * setengahShakl;

  return Math.round(tarh);
}

/**
 * Calculate Wafaq (Concord)
 */
function calculateWafaq(miftah: number, type: WiFiQType): number | '-' {
  const { size, shakl } = getWifiqProperties(type);
  if (size === 0) return '-';

  const jumlahBait = size * size;
  const setengahShakl = 0.5 * shakl;
  const wafaq = (jumlahBait + 1) * setengahShakl;

  return wafaq >= 0 && Number.isInteger(wafaq) ? wafaq : '-';
}

/**
 * Calculate Masaha (Area)
 */
function calculateMasaha(type: WiFiQType, wafaq: number | '-'): number | '-' {
  if (wafaq === '-') return '-';

  const { shakl } = getWifiqProperties(type);
  const masaha = (wafaq as number) * shakl;

  return masaha >= 0 ? masaha : '-';
}

/**
 * Calculate Dabit (Controller)
 */
function calculateDabit(wafaq: number | '-', masaha: number | '-'): number | '-' {
  if (wafaq === '-' || masaha === '-') return '-';
  return (wafaq as number) + (masaha as number);
}

/**
 * Calculate Ghayah (Goal)
 */
function calculateGhayah(wafaq: number | '-', type: WiFiQType): number | '-' {
  if (wafaq === '-') return '-';

  let result: number;
  switch (type) {
    case 'mutsalas':
      result = wafaq * (3 * 2 + 2);
      break;
    case 'murabba':
      result = wafaq * (4 * 2 + 2);
      break;
    case 'mukhamas':
      result = wafaq * (5 * 2 + 2);
      break;
    case 'musaddas':
      result = wafaq * (6 * 2 + 2);
      break;
    case 'musabba':
      result = wafaq * (7 * 2 + 2);
      break;
    case 'musamman':
      result = wafaq * (8 * 2 + 2);
      break;
    case 'mutassa':
      result = wafaq * (9 * 2 + 2);
      break;
    default:
      return '-';
  }

  return result >= 0 ? result : '-';
}

/**
 * Generate angel name from value
 * Ported from santri-project AngelNamesDisplay
 */
export function generateAngelName(value: number | '-' | string): string {
  if (value === '-' || typeof value !== 'number') return '-';

  // Calculate angel value
  let adjustedValue = value;
  if (value < 51) {
    adjustedValue = value + 360;
  }
  const angelValue = adjustedValue - 51;

  // Convert to Abajad letters
  const abajadLetters = convertToAbajadLetters(angelValue);
  return abajadLetters + 'اييل';
}

/**
 * Generate Sufliyyah angel name from value
 * Ported from santri-project SufliyyahAngels
 */
export function generateSufliyyahAngelName(value: number | '-' | string): string {
  if (value === '-' || typeof value !== 'number') return '-';

  // Calculate evil angel value
  let adjustedValue = value;
  if (value < 51) {
    adjustedValue = value + 319;
  }
  const angelValue = adjustedValue - 51;

  // Convert to Abajad letters
  const abajadLetters = convertToAbajadLetters(angelValue);
  return abajadLetters + 'طيش';
}

/**
 * Convert number to Abajad letters
 * Helper function for angel name generation
 */
function convertToAbajadLetters(number: number): string {
  const abajadMap: Record<number, string> = {
    1: 'ا',
    2: 'ب',
    3: 'ج',
    4: 'د',
    5: 'ه',
    6: 'و',
    7: 'ز',
    8: 'ح',
    9: 'ط',
    10: 'ي',
    20: 'ك',
    30: 'ل',
    40: 'م',
    50: 'ن',
    60: 'س',
    70: 'ع',
    80: 'ف',
    90: 'ص',
    100: 'ق',
    200: 'ر',
    300: 'ش',
    400: 'ت',
    500: 'ث',
    600: 'خ',
    700: 'ذ',
    800: 'ض',
    900: 'ظ',
    1000: 'غ',
  };

  // Sort keys from large to small
  const keys = Object.keys(abajadMap)
    .map(Number)
    .sort((a, b) => b - a);

  let remaining = number;
  const letters: string[] = [];

  for (const key of keys) {
    if (remaining >= key) {
      const count = Math.floor(remaining / key);
      for (let i = 0; i < count; i++) {
        letters.push(abajadMap[key]);
      }
      remaining %= key;
    }
  }

  // Reverse for right-to-left writing
  return letters.reverse().join('');
}


