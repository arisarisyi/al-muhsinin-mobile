/**
 * Doa Content Mapper
 *
 * Maps sourceKey to actual content from surah-and-ayat.ts
 */

import * as Content from './surah-and-ayat';

export const DOA_CONTENT_MAP: Record<string, string[]> = {
  'suratAlMulk': Content.suratAlMulk,
  'suratAlWaqiah': Content.suratAlWaqiah,
  'suratAlKahfi': Content.suratAlKahfi,
  'ayatKursi': Content.ayatKursi,
  'hizibJailani': Content.hizibJailani,
  'hizibNawawi': Content.hizibNawawi,
  'hizibBahr': Content.hizibBahr,
  'hizibAshghal': Content.hizibAshghal,
  'doaSyukur': Content.doaSyukur,
  'doaUbahIstiadzam': Content.doaUbahIstiadzam,
};

/**
 * Get doa content by sourceKey
 */
export const getDoaContent = (sourceKey: string): string[] | null => {
  return DOA_CONTENT_MAP[sourceKey] || null;
};
