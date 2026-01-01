/**
 * Number Conversion Utilities
 *
 * Functions for converting between Arabic and Hindi numerals
 * Ported from santri-project
 */

/**
 * Convert a number to Arabic-Indic numerals
 * @param num - The number to convert (or "-" for invalid values)
 * @returns String with Arabic-Indic numerals
 */
export function toArabicNumbers(num: number | string): string {
  if (num === '-' || num === null || num === undefined) return '-';
  if (typeof num !== 'number') return String(num);

  const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

  return num
    .toString()
    .split('')
    .map((digit) => arabicNumerals[parseInt(digit, 10)] || digit)
    .join('');
}

/**
 * Convert Arabic-Indic numerals to standard numerals
 * @param arabicNum - String with Arabic-Indic numerals
 * @returns String with standard numerals
 */
export function fromArabicNumbers(arabicNum: string): string {
  const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

  return arabicNum
    .split('')
    .map((char) => {
      const index = arabicNumerals.indexOf(char);
      return index >= 0 ? index.toString() : char;
    })
    .join('');
}

/**
 * Format a number with Arabic-Indic numerals and proper RTL support
 * @param num - The number to format
 * @returns Formatted number string
 */
export function formatArabicNumber(num: number): string {
  return toArabicNumbers(num);
}

/**
 * Pad a number with zeros and convert to Arabic numerals
 * @param num - The number to pad
 * @param length - Target length (default: 2)
 * @returns Padded Arabic numeral string
 */
export function padArabicNumber(num: number, length: number = 2): string {
  const padded = num.toString().padStart(length, '0');
  return toArabicNumbers(parseInt(padded, 10));
}

/**
 * Check if a string contains Arabic-Indic numerals
 * @param str - String to check
 * @returns True if contains Arabic-Indic numerals
 */
export function hasArabicNumerals(str: string): boolean {
  const arabicNumeralPattern = /[٠-٩]/;
  return arabicNumeralPattern.test(str);
}
