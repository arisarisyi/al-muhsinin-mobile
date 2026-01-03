/**
 * Doa Types
 */

export type DoaCategory = 'amalan' | 'hizib' | 'doa_harian' | 'rawatib';

export interface DoaItem {
  id: string;
  name: string;
  nameArabic: string;
  category: DoaCategory;
  description: string;
}

export interface DoaContent {
  id: string;
  title: string;
  titleArabic: string;
  category: DoaCategory;
  arabic: string[];
  transliteration?: string[];
  translation?: string[];
  benefits?: string;
  notes?: string;
}
