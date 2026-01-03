/**
 * Doa List Constants
 *
 * Collection of various doa, hizib, and amalan
 */

import type { DoaItem } from "@/types/doa.types"

export const DOA_LIST: DoaItem[] = [
  // Amalan Harian
  {
    id: "surat-al-mulk",
    name: "Surat Al-Mulk",
    nameArabic: "سورة الملك",
    category: "amalan",
    description: "Dibaca setiap malam, penyelamat dari siksa kubur",
    type: "text",
    sourceKey: "suratAlMulk",
  },
  {
    id: "surat-al-waqiah",
    name: "Surat Al-Waqiah",
    nameArabic: "سورة الواقعة",
    category: "amalan",
    description: "Dibaca setiap malam, terhindar dari kefakiran",
    type: "text",
    sourceKey: "suratAlWaqiah",
  },
  {
    id: "surat-al-kahfi",
    name: "Surat Al-Kahfi",
    nameArabic: "سورة الكهف",
    category: "amalan",
    description: "Dibaca setiap malam Jumat, cahaya dari kegelapan",
    type: "text",
    sourceKey: "suratAlKahfi",
  },
  {
    id: "ayat-kursi",
    name: "Ayat Kursi",
    nameArabic: "آية الكرسي",
    category: "amalan",
    description: "Dibaca setiap selesai shalat, pelindung",
    type: "text",
    sourceKey: "ayatKursi",
  },

  // Hizib
  {
    id: "hizib-jailani",
    name: "Hizib Jailani",
    nameArabic: "حزب الجيلاني",
    category: "hizib",
    description: "Karya Syekh Abdul Qadir Jailani",
    type: "text",
    sourceKey: "hizibJailani",
  },
  {
    id: "hizib-nawawi",
    name: "Hizib Nawawi",
    nameArabic: "حزب النووي",
    category: "hizib",
    description: "Karya Imam Nawawi",
    type: "text",
    sourceKey: "hizibNawawi",
  },
  {
    id: "hizib-bahr",
    name: "Hizib Bahr",
    nameArabic: "حزب البحر",
    category: "hizib",
    description: "Karya Abu Hasan Asy-Syadzili",
    type: "text",
    sourceKey: "hizibBahr",
  },
  {
    id: "hizib-ashghal",
    name: "Hizib Ashghal",
    nameArabic: "حزب الأشغال",
    category: "hizib",
    description: "Karya Abul Abbas Al-Mursi",
    type: "text",
    sourceKey: "hizibAshghal",
  },

  // Rawatib / Doa Mustajab
  {
    id: "jaljalut-kubro",
    name: "Jaljalut Kubro",
    nameArabic: "جلجوت الكبر",
    category: "rawatib",
    description: "Doa mustajab untuk hajat besar",
    type: "pdf",
    sourceKey: "jaljalut-kubro",
  },
  {
    id: "jaljalut-sugro",
    name: "Jaljalut Sugro",
    nameArabic: "جلجوت الصغر",
    category: "rawatib",
    description: "Doa mustajab untuk hajat",
    type: "pdf",
    sourceKey: "jaljalut-sughro",
  },
  {
    id: "doa-syukur",
    name: "Doa Syukur",
    nameArabic: "دعاء الشكر",
    category: "rawatib",
    description: "Dibaca untuk mensyukuri nikmat Allah",
    type: "text",
    sourceKey: "doaSyukur",
  },
  {
    id: "doa-ubah-istiadzam",
    name: "Doa Ubah Isti'adzam",
    nameArabic: "دعاء أبي حمزة",
    category: "rawatib",
    description: "Doa dari Abul Hamzah Al-Adhami",
    type: "text",
    sourceKey: "doaUbahIstiadzam",
  },
]

export const DOA_CATEGORY_LABELS: Record<string, string> = {
  amalan: "Amalan Harian",
  hizib: "Hizib & Wirid",
  doa_harian: "Doa Harian",
  rawatib: "Rawatib & Doa Mustajab",
}

/**
 * PDF Asset Mapping
 *
 * Maps sourceKey to PDF file paths
 * PDF files are stored locally in assets/pdf/
 */
export const PDF_MAP: Record<string, number> = {
  'jaljalut-kubro': require('@/assets/pdf/Jaljalut-kubro.pdf'),
  'jaljalut-sughro': require('@/assets/pdf/Jaljalut-sughro.pdf'),
}
