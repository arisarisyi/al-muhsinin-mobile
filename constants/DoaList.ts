/**
 * Doa List Constants
 *
 * Collection of various doa, hizib, and amalan
 */

import type { DoaItem } from '@/types/doa.types';

export const DOA_LIST: DoaItem[] = [
  // Amalan Harian
  {
    id: 'surat-al-mulk',
    name: 'Surat Al-Mulk',
    nameArabic: 'سورة الملك',
    category: 'amalan',
    description: 'Dibaca setiap malam, penyelamat dari siksa kubur',
  },
  {
    id: 'surat-as-sajdah',
    name: 'Surat As-Sajdah',
    nameArabic: 'سورة السجدة',
    category: 'amalan',
    description: 'Dibaca setiap malam, menghapus dosa',
  },
  {
    id: 'surat-al-waqiah',
    name: 'Surat Al-Waqiah',
    nameArabic: 'سورة الواقعة',
    category: 'amalan',
    description: 'Dibaca setiap malam, terhindar dari kefakiran',
  },
  {
    id: 'surat-al-kahfi',
    name: 'Surat Al-Kahfi',
    nameArabic: 'سورة الكهف',
    category: 'amalan',
    description: 'Dibaca setiap malam Jumat, cahaya dari kegelapan',
  },
  {
    id: 'ayat-kursi',
    name: 'Ayat Kursi',
    nameArabic: 'آية الكرسي',
    category: 'amalan',
    description: 'Dibaca setiap selesai shalat, pelindung',
  },

  // Hizib
  {
    id: 'hizib-jailani',
    name: 'Hizib Jailani',
    nameArabic: 'حزب الجيلاني',
    category: 'hizib',
    description: 'Karya Syekh Abdul Qadir Jailani',
  },
  {
    id: 'hizib-nawawi',
    name: 'Hizib Nawawi',
    nameArabic: 'حزب النووي',
    category: 'hizib',
    description: 'Karya Imam Nawawi',
  },
  {
    id: 'hizib-bahr',
    name: 'Hizib Bahr',
    nameArabic: 'حزب البحر',
    category: 'hizib',
    description: 'Karya Abu Hasan Asy-Syadzili',
  },
  {
    id: 'hizib-ashghal',
    name: 'Hizib Ashghal',
    nameArabic: 'حزب الأشغال',
    category: 'hizib',
    description: 'Karya Abul Abbas Al-Mursi',
  },

  // Doa Harian
  {
    id: 'doa-pagi',
    name: 'Doa Pagi',
    nameArabic: 'أذكار الصباح',
    category: 'doa_harian',
    description: 'Dibaca setiap pagi',
  },
  {
    id: 'doa-petang',
    name: 'Doa Petang',
    nameArabic: 'أذكار المساء',
    category: 'doa_harian',
    description: 'Dibaca setiap petang',
  },
  {
    id: 'doa-sebelum-tidur',
    name: 'Doa Sebelum Tidur',
    nameArabic: 'أذكار النوم',
    category: 'doa_harian',
    description: 'Dibaca sebelum tidur',
  },
  {
    id: 'doa-bangun-tidur',
    name: 'Doa Bangun Tidur',
    nameArabic: 'دعاء الاستيقاظ',
    category: 'doa_harian',
    description: 'Dibaca saat bangun tidur',
  },

  // Rawatib / Doa Mustajab
  {
    id: 'jaljalut-kubro',
    name: 'Jaljalut Kubro',
    nameArabic: 'جلجوت الكبر',
    category: 'rawatib',
    description: 'Doa mustajab untuk hajat besar',
  },
  {
    id: 'jaljalut-sugro',
    name: 'Jaljalut Sugro',
    nameArabic: 'جلجوت الصغر',
    category: 'rawatib',
    description: 'Doa mustajab untuk hajat',
  },
  {
    id: 'doa-syukur',
    name: 'Doa Syukur',
    nameArabic: 'دعاء الشكر',
    category: 'rawatib',
    description: 'Dibaca untuk mensyukuri nikmat Allah',
  },
  {
    id: 'doa-ubah-istiadzam',
    name: 'Doa Ubah Isti\'adzam',
    nameArabic: 'دعاء أبي حمزة',
    category: 'rawatib',
    description: 'Doa dari Abul Hamzah Al-Adhami',
  },
];

export const DOA_CATEGORY_LABELS: Record<string, string> = {
  amalan: 'Amalan Harian',
  hizib: 'Hizib & Wirid',
  doa_harian: 'Doa Harian',
  rawatib: 'Rawatib & Doa Mustajab',
};
