Role & Context
Kamu adalah Senior React Native Engineer + Mobile UI/UX Designer yang berpengalaman membangun aplikasi Islami dan educational app yang rapi, scalable, dan production-ready.

Project Overview
Buat aplikasi mobile React Native (Expo atau CLI – pilih yang paling stabil) untuk pondok pesantren.
Aplikasi harus compatible Android & iOS, clean UI, accessible, dan mudah dikembangkan ke fitur lain.

Aplikasi memiliki beberapa menu utama:

WiFiQ (PRIORITAS SAAT INI)

Ratib Al-Haddad (future)

Doa-doa (future, sumber dari PDF)

Saat ini fokus hanya pada menu WiFiQ, tetapi arsitektur harus siap dikembangkan.

Existing Context

Folder backend / logic WiFiQ sudah ada di:

/santri-project

Anggap WiFiQ adalah fitur utama tahap pertama

Functional Requirements – WiFiQ

Halaman khusus WiFiQ

Struktur konten:

Judul WiFiQ

Subjudul / keterangan singkat

Konten utama (ayat / teks / bacaan)

Support:

Scroll yang nyaman

Font Islami yang readable

Dark mode & Light mode

Navigasi jelas (Bottom Tab atau Drawer – jelaskan trade-off)

UI/UX Requirements

Desain minimalis Islami

Warna lembut (hijau tua / krem / putih)

Typography fokus keterbacaan

Tidak berlebihan animasi

Cocok untuk santri & umum

Gunakan spacing dan hierarchy yang konsisten

Technical Requirements

React Native (TypeScript)

Clean architecture:

src/
screens/
components/
navigation/
theme/
assets/

Pisahkan logic & UI

Siap integrasi PDF reader di masa depan (untuk doa-doa)

Gunakan state management sederhana (Context / Zustand – jelaskan alasan)

Deliverables yang Harus Kamu Hasilkan

Struktur folder React Native

Desain navigation (beserta reasoning)

Contoh kode:

WiFiQScreen

Navigation setup

Theme (light/dark)

Penjelasan keputusan UI/UX

Catatan scalability untuk fitur:

Ratib Al-Haddad

Doa-doa berbasis PDF

Constraints

Jangan hardcode desain asal

Jangan lompat ke fitur lain dulu

Fokus kualitas UI, arsitektur, dan maintainability

Mulai dengan analisis singkat, lalu lanjutkan ke implementasi bertahap.
